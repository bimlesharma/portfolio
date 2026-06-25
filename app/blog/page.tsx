import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSanityPosts } from '@/lib/sanity-api';
import type { SanityPost } from '@/lib/types/sanity';
import { urlForImage } from '@/sanity/lib/image';
import { IoMdTime, IoMdTrendingUp, IoMdGlobe } from "react-icons/io";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import FallbackCover from '@/components/FallbackCover';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Thoughts, tutorials, and insights on development, design, and everything in between.',
    openGraph: {
        title: 'Blog | Bimlesh',
        description: 'Thoughts, tutorials, and insights on development, design, and everything in between.',
        type: 'website',
    },
};

export const revalidate = 3600;

const BlogPage = async () => {
    const posts = await getSanityPosts();
    const featuredPost = posts[0];
    const otherPosts = posts.slice(1);
    const basePath = '/blog';

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Header Section */}
            <section className="pt-20 pb-16 px-6 border-b border-neutral-900">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        Writing
                    </h1>
                    <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                        Thoughts on software engineering, AI, and building products.
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm text-neutral-500">
                        <span>{posts.length} Posts</span>
                        <span>•</span>
                        <span>{new Set(posts.flatMap(post => post.categories || [])).size} Topics</span>
                    </div>
                </div>
            </section>

            {/* Clean Text List of Posts */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    {posts.length > 0 ? (
                        <div className="flex flex-col gap-10">
                            {posts.map((post: SanityPost) => (
                                <Link
                                    href={`${basePath}/${post.slug.current}`}
                                    key={post._id}
                                    className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
                                >
                                    <div className="shrink-0 w-32 text-sm text-neutral-500 font-mono">
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-medium text-neutral-200 group-hover:text-purple-400 transition-colors mb-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-neutral-400 text-base leading-relaxed mb-3 line-clamp-2">
                                            {post.brief}
                                        </p>
                                        {post.categories && post.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {post.categories.slice(0, 3).map((category: string, idx: number) => (
                                                    <span key={idx} className="text-xs font-mono text-neutral-500 group-hover:text-purple-500/70 transition-colors">
                                                        #{category}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-neutral-500">
                            No posts found.
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default BlogPage;