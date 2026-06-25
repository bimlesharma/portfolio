import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getSanityPosts } from '@/lib/sanity-api';
import type { SanityPost } from '@/lib/types/sanity';
import { urlForImage } from '@/sanity/lib/image';
import { IoMdArrowBack } from "react-icons/io";
import ScrollProgress from '@/components/ScrollProgress';
import FallbackCover from '@/components/FallbackCover';
import BlogContent from '@/components/BlogContent';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import styles from '../blog.module.css';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 3600;

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

    // Get 3 recent posts excluding current one
    const recentPosts = allPosts.filter((p: SanityPost) => p.slug.current !== slug).slice(0, 3);
    const basePath = '/blog';

    // Extract headings for Table of Contents
    const headings = post.body
        ?.filter((block: any) => block._type === 'block' && (block.style === 'h2' || block.style === 'h3'))
        .map((block: any) => {
            const text = block.children?.map((c: any) => c.text).join('') || '';
            const slug = text.toLowerCase().replace(/\\s+/g, '-').replace(/[^\\w-]+/g, '');
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
            <main className="min-h-screen bg-[#0a0a0a] text-white">
                <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-12 items-start">
                    <article className="flex-1 w-full max-w-3xl min-w-0 mx-auto">
                        <Link href={basePath || '/'} className="inline-flex items-center gap-2 text-neutral-500 hover:text-purple-400 transition-colors mb-10 group text-sm font-medium">
                        <IoMdArrowBack className="group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>

                    {/* Header */}
                    <header className="mb-14">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
                            {post.title}
                        </h1>

                        {post.brief && (
                            <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                                {post.brief}
                            </p>
                        )}
                        
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 py-6 border-y border-neutral-900 mb-8">
                            {post.authorName && (
                                <div className="flex items-center gap-3">
                                    {post.authorImage && (
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-800">
                                            <Image 
                                                src={urlForImage(post.authorImage).url()} 
                                                alt={post.authorName} 
                                                fill 
                                                className="object-cover" 
                                            />
                                        </div>
                                    )}
                                    <span className="font-medium text-neutral-300">{post.authorName}</span>
                                </div>
                            )}
                            
                            <div className="flex items-center gap-4">
                                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}</span>
                                <span>•</span>
                                <span>{post.readTimeInMinutes} min read</span>
                            </div>
                        </div>

                        {post.categories && post.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {post.categories.map((category: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="text-sm font-mono text-neutral-500 hover:text-purple-400 transition-colors cursor-default"
                                    >
                                        #{category}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Cover Image */}
                    {post.mainImage ? (
                        <div className="aspect-video relative rounded-2xl overflow-hidden mb-16 shadow-2xl shadow-purple-900/20 border border-neutral-800">
                            <Image
                                src={urlForImage(post.mainImage).url()}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                {...(post.mainImage.lqip ? { placeholder: "blur", blurDataURL: post.mainImage.lqip } : {})}
                            />
                        </div>
                    ) : (
                        <div className="aspect-video relative rounded-2xl overflow-hidden mb-16 shadow-2xl shadow-purple-900/20 border border-neutral-800">
                            <FallbackCover title={post.title} />
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
                    <section className="max-w-3xl mx-auto px-6 py-16 mt-16 border-t border-neutral-900">
                        <h2 className="text-2xl font-bold mb-8 text-neutral-200">
                            Read Next
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentPosts.map((recentPost: SanityPost) => (
                                <Link
                                    key={recentPost._id}
                                    href={`${basePath}/${recentPost.slug.current}`}
                                    className="group flex flex-col gap-3"
                                >
                                    <div className="aspect-video relative overflow-hidden rounded-lg bg-neutral-900">
                                        {recentPost.mainImage ? (
                                            <Image
                                                src={urlForImage(recentPost.mainImage).url()}
                                                alt={recentPost.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                {...(recentPost.mainImage.lqip ? { placeholder: "blur", blurDataURL: recentPost.mainImage.lqip } : {})}
                                            />
                                        ) : (
                                            <FallbackCover title={recentPost.title} />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1 line-clamp-2 text-neutral-300 group-hover:text-purple-400 transition-colors">
                                            {recentPost.title}
                                        </h3>
                                        <p className="text-sm text-neutral-500">
                                            {new Date(recentPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
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
