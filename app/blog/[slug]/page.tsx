import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getHashnodePosts } from '@/lib/hashnode';
import type { HashnodePost, HashnodeTag } from '@/lib/types/hashnode';
import { IoMdArrowBack, IoMdTime, IoMdCalendar } from "react-icons/io";
import ScrollProgress from '@/components/ScrollProgress';
import FallbackCover from '@/components/FallbackCover';
import BlogContent from '@/components/BlogContent';
import styles from '../blog.module.css';
import { headers } from 'next/headers';
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
        description: post.subtitle || post.brief,
        keywords: post.tags?.map(tag => tag.name) || [],
        openGraph: {
            title: post.title,
            description: post.subtitle || post.brief,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: ['Bimlesh'],
            images: post.coverImage?.url ? [{ url: post.coverImage.url }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.subtitle || post.brief,
            images: post.coverImage?.url ? [post.coverImage.url] : [],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [post, allPosts] = await Promise.all([
        getPostBySlug(slug),
        getHashnodePosts()
    ]);

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white">
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <Link href="/blog" className="mt-8 text-purple-400 hover:underline">
                    Back to Blog
                </Link>
            </div>
        );
    }

    // Get 3 recent posts excluding current one
    const recentPosts = allPosts.filter((p: HashnodePost) => p.slug !== slug).slice(0, 3);

    // Check if we're on blog subdomain
    const headersList = await headers();
    const hostname = headersList.get('host') || '';
    const isSubdomain = hostname.startsWith('blog.');
    const basePath = isSubdomain ? '' : '/blog';

    return (
        <>
            <ScrollProgress />
            <main className="min-h-screen bg-neutral-950 text-white relative">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
                </div>

                <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                    <Link href={basePath || '/'} className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group">
                        <IoMdArrowBack className="group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>

                    {/* Header */}
                    <header className="mb-12">
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 mb-6">
                            <span className="flex items-center gap-1.5">
                                <IoMdCalendar className="text-purple-400" />
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                                <IoMdTime className="text-purple-400" />
                                {post.readTimeInMinutes} min read
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Subtitle */}
                        {post.subtitle && (
                            <p className="text-xl text-neutral-400 mb-6">
                                {post.subtitle}
                            </p>
                        )}

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag: HashnodeTag, idx: number) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 text-sm bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 hover:bg-purple-500/20 transition-colors"
                                    >
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Cover Image */}
                    {post.coverImage?.url ? (
                        <div className="aspect-video relative rounded-2xl overflow-hidden mb-16 shadow-2xl shadow-purple-900/20 border border-neutral-800">
                            <Image
                                src={post.coverImage.url}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="aspect-video relative rounded-2xl overflow-hidden mb-16 shadow-2xl shadow-purple-900/20 border border-neutral-800">
                            <FallbackCover title={post.title} />
                        </div>
                    )}

                    {/* Content with enhanced code blocks */}
                    <BlogContent html={post.content.html} className={styles.blogContent} />
                </article>

                {/* Read Next Section */}
                {recentPosts.length > 0 && (
                    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-neutral-800">
                        <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            Read Next
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recentPosts.map((recentPost: HashnodePost) => (
                                <Link
                                    key={recentPost.id}
                                    href={`${basePath}/${recentPost.slug}`}
                                    className="group bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        {recentPost.coverImage?.url ? (
                                            <Image
                                                src={recentPost.coverImage.url}
                                                alt={recentPost.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <FallbackCover title={recentPost.title} />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                                            {recentPost.title}
                                        </h3>
                                        <p className="text-sm text-neutral-500 flex items-center gap-1">
                                            <IoMdTime />
                                            {recentPost.readTimeInMinutes} min read
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
