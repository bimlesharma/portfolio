import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getSanityPosts } from '@/lib/sanity-api';
import type { SanityPost } from '@/lib/types/sanity';
import { urlForImage } from '@/sanity/lib/image';
import { IoMdArrowBack, IoMdTime } from "react-icons/io";
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
                {/* Ambient Background Glows */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-5%] left-[10%] w-[60%] h-[40%] bg-purple-600/10 rounded-full blur-[150px]" />
                    <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px]" />
                </div>

                <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-12 relative z-10">
                    <article className="flex-1 w-full max-w-3xl min-w-0 mx-auto">
                        <Link href={basePath || '/'} className="inline-flex items-center gap-2 text-neutral-500 hover:text-purple-400 transition-colors mb-12 group text-sm font-medium bg-neutral-900/50 backdrop-blur-md border border-neutral-800/50 px-4 py-2 rounded-full w-fit">
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
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700">
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
                                        className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-medium tracking-wide"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Cover Image — only shown if one exists */}
                    {post.mainImage && (
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
                                    className="group flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 -mx-4 px-4 py-6 rounded-2xl hover:bg-white/[0.02] transition-colors relative z-10"
                                >
                                    <div className="shrink-0 w-32 text-sm text-neutral-500 font-mono flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-purple-500 transition-colors hidden sm:block relative -left-[1.05rem]"></span>
                                        {new Date(recentPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-neutral-200 group-hover:text-purple-400 transition-colors mb-2">
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
