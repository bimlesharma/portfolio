import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getSanityPosts } from '@/lib/sanity-api';
import type { SanityPost } from '@/lib/types/sanity';
import { urlForImage } from '@/sanity/lib/image';
import { IoMdArrowBack } from "react-icons/io";
import ScrollProgress from '@/components/ScrollProgress';
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
            <main className="min-h-screen bg-[#050505] text-white relative">
                <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 lg:flex-row">
                    <article className="mx-auto w-full max-w-3xl min-w-0 flex-1">
                        <Link href={basePath || '/'} className="mb-8 inline-flex w-fit items-center gap-2 border border-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-400 transition-colors group hover:text-white">
                            <IoMdArrowBack className="group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                    {/* Header */}
                    <header className="mb-14">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-[1.15] tracking-tight drop-shadow-lg">
                            {post.title}
                        </h1>

                        {post.brief && (
                            <p className="text-xl text-neutral-400 mb-8 leading-relaxed font-light">
                                {post.brief}
                            </p>
                        )}
                        
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 py-6 border-y border-neutral-900 mb-8">
                            {post.authorName && (
                                <div className="flex items-center gap-3">
                                    {post.authorImage && (
                                        <div className="relative h-10 w-10 overflow-hidden border border-zinc-700 bg-zinc-900">
                                            <Image 
                                                src={urlForImage(post.authorImage).url()} 
                                                alt={post.authorName} 
                                                fill 
                                                className="object-cover" 
                                            />
                                        </div>
                                    )}
                                    <span className="font-semibold text-neutral-200 tracking-wide">{post.authorName}</span>
                                </div>
                            )}
                            
                            <div className="flex items-center gap-4 font-mono">
                                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}</span>
                                <span className="text-neutral-700">•</span>
                                <span>{post.readTimeInMinutes} min read</span>
                            </div>
                        </div>

                        {post.categories && post.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {post.categories.map((category: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="border border-zinc-700 px-2 py-0.5 text-xs font-medium tracking-wide text-zinc-300"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Cover Image — only shown if one exists */}
                    {post.mainImage && (
                        <div className="relative mb-8 aspect-video overflow-hidden rounded-none border border-zinc-800">
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
                    <section className="max-w-3xl mx-auto px-6 py-16 mt-16 border-t border-neutral-900/50 relative z-10">
                        <h2 className="text-2xl font-bold mb-8 text-neutral-200">
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
                                        <h3 className="mb-2 text-lg font-semibold text-zinc-200 transition-colors group-hover:text-white">
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
