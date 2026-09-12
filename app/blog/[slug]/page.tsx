import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getSanityPosts } from '@/lib/sanity-api';
import type { SanityPost } from '@/lib/types/sanity';
import { urlForImage } from '@/sanity/lib/image';
import ScrollProgress from '@/components/ScrollProgress';
import PageHeader from '@/components/PageHeader';
import { Badge } from '@/components/ui/badge';
import BlogContent from '@/components/BlogContent';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import styles from '../blog.module.css';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 3600;

export async function generateStaticParams() {
    const posts = await getSanityPosts();
    return posts
        .filter((post) => post.slug?.current)
        .map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.brief,
        keywords: post.categories || [],
        openGraph: {
            title: post.title,
            description: post.brief,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: ['Bimlesh'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.brief,
        },
        alternates: {
            canonical: `https://bimlesh.dev/blog/${post.slug.current}`,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [post, allPosts] = await Promise.all([
        getPostBySlug(slug),
        getSanityPosts()
    ]);

    if (!post) {
        notFound();
    }

    // Smart related posts: rank by number of shared categories, fall back to latest
    const currentCategories = new Set(post.categories || []);
    const recentPosts = allPosts
        .filter((p: SanityPost) => p.slug.current !== slug)
        .map((p: SanityPost) => ({
            post: p,
            score: (p.categories || []).filter((c: string) => currentCategories.has(c)).length,
        }))
        .sort((a, b) => b.score - a.score || new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime())
        .slice(0, 3)
        .map(({ post }) => post);
    const basePath = '/blog';

    // Extract headings for Table of Contents
    const headings = post.body
        ?.filter((block: any) => block._type === 'block' && (block.style === 'h2' || block.style === 'h3'))
        .map((block: any) => {
            const text = block.children?.map((c: any) => c.text).join('') || '';
            const slug = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            return { text, slug, style: block.style };
        }) || [];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": post.title,
                        "image": post.mainImage ? [urlForImage(post.mainImage).url()] : [],
                        "datePublished": post.publishedAt,
                        "dateModified": post.publishedAt,
                        "author": [
                            {
                                "@type": "Person",
                                "name": "Bimlesh",
                                "url": "https://bimlesh.dev",
                            },
                        ],
                    }),
                }}
            />
            <ScrollProgress />
            <main className="min-h-screen bg-background text-foreground">
                <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:px-8">
                    <article className="mx-auto w-full min-w-0 max-w-3xl flex-1">
                    <PageHeader
                        crumbs={[
                            { label: "Home", href: "/" },
                            { label: "Blog", href: basePath },
                            { label: post.title },
                        ]}
                        title={post.title}
                        description={post.brief}
                    >
                        <div className="flex flex-wrap items-center gap-6 border-y border-border py-4 text-sm text-muted-foreground">
                            {post.authorName && (
                                <div className="flex items-center gap-3">
                                    {post.authorImage && (
                                        <div className="relative h-10 w-10 overflow-hidden border border-border bg-muted">
                                            <Image
                                                src={urlForImage(post.authorImage).url()}
                                                alt={post.authorName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <span className="font-semibold tracking-wide text-foreground">{post.authorName}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-4 font-mono">
                                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}</span>
                                <span className="text-border">/</span>
                                <span>{post.readTimeInMinutes} min read</span>
                            </div>
                        </div>

                        {post.categories && post.categories.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {post.categories.map((category: string) => (
                                    <Badge key={category} variant="outline">
                                        {category}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </PageHeader>

                    {/* Cover Image — only shown if one exists */}
                    {post.mainImage && (
                        <div className="relative mb-8 aspect-video overflow-hidden border border-border">
                            <Image
                                src={urlForImage(post.mainImage).url()}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                {...(post.mainImage.lqip ? { placeholder: "blur", blurDataURL: post.mainImage.lqip } : {})}
                            />
                        </div>
                    )}

                    {/* Content with enhanced code blocks */}
                    <BlogContent value={post.body} className={styles.blogContent} />

                    <ShareButtons title={post.title} />
                </article>

                {headings.length > 0 && (
                    <aside className="hidden lg:block w-64 shrink-0 relative">
                        <TableOfContents headings={headings} />
                    </aside>
                )}
                </div>

                {/* Read Next Section */}
                {recentPosts.length > 0 && (
                    <section className="relative z-10 mx-auto mt-16 max-w-3xl border-t border-border px-4 py-12 sm:px-6 lg:px-8">
                        <h2 className="mb-8 text-xl font-semibold text-foreground">
                            Read Next
                        </h2>
                        <div className="flex flex-col gap-2 relative">
                            {/* Subtle line indicator on the left */}
                            <div className="absolute left-[7.5rem] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent hidden sm:block pointer-events-none"></div>

                            {recentPosts.map((recentPost: SanityPost) => (
                                <Link
                                    key={recentPost._id}
                                    href={`${basePath}/${recentPost.slug.current}`}
                                    className="group relative z-10 -mx-4 flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-baseline sm:gap-8"
                                >
                                    <div className="shrink-0 w-32 text-sm text-neutral-500 font-mono flex items-center gap-2">
                                        <span className="relative -left-[1.05rem] hidden h-1.5 w-1.5 bg-zinc-700 transition-colors group-hover:bg-zinc-200 sm:block"></span>
                                        {new Date(recentPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-muted-foreground">
                                            {recentPost.title}
                                        </h3>
                                        {recentPost.brief && (
                                            <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                                                {recentPost.brief}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
