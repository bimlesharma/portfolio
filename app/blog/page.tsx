import React, { Suspense } from 'react';
import Link from 'next/link';
import { getSanityPosts } from '@/lib/sanity-api';
import type { SanityPost } from '@/lib/types/sanity';
import { IoMdTrendingUp, IoMdGlobe } from "react-icons/io";
import TagFilter from '@/components/TagFilter';
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

const BlogPage = async ({ searchParams }: { searchParams: Promise<{ tag?: string }> }) => {
    const posts = await getSanityPosts();
    const { tag: activeTag } = await searchParams;
    const basePath = '/blog';

    // Collect all unique tags across all posts
    const allTags = Array.from(new Set(posts.flatMap((post: SanityPost) => post.categories || []))).sort() as string[];

    // Filter posts based on active tag
    const filteredPosts = activeTag
        ? posts.filter((post: SanityPost) => post.categories?.includes(activeTag))
        : posts;

    return (
        <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
            {/* Ambient Background Glows for Vibe */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[150px]" />
            </div>

            {/* Header Section */}
            <section className="pt-32 pb-16 px-6 relative z-10 border-b border-neutral-900/50 mb-4">
                <div className="max-w-3xl mx-auto flex flex-col items-start">
                    
                    {/* Status Badge */}
                    <div className="flex items-center gap-3 mb-6 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-semibold">Bimlesh's Digital Garden</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg">
                        Writing & Thoughts
                    </h1>
                    
                    <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-10 font-light">
                        Deep dives into software engineering, artificial intelligence, and building polished products. Welcome to my digital garden where I document what I build and learn.
                    </p>
                    
                    {/* Stats Line */}
                    <div className="flex items-center gap-5 text-sm font-mono text-neutral-500">
                        <div className="flex items-center gap-2.5 hover:text-neutral-300 transition-colors cursor-default">
                            <IoMdTrendingUp className="text-purple-400 text-base" /> 
                            <span className="text-neutral-200 font-semibold">{posts.length}</span> Published Posts
                        </div>
                        <span className="text-neutral-800">/</span>
                        <div className="flex items-center gap-2.5 hover:text-neutral-300 transition-colors cursor-default">
                            <IoMdGlobe className="text-blue-400 text-base" /> 
                            <span className="text-neutral-200 font-semibold">{allTags.length}</span> Unique Topics
                        </div>
                    </div>

                    {/* Tag Filter — client component, wrapped in Suspense */}
                    <Suspense fallback={null}>
                        <TagFilter tags={allTags} activeTag={activeTag ?? null} />
                    </Suspense>
                </div>
            </section>

            {/* Content Section (Clean Text List) */}
            <section className="py-12 px-6">
                <div className="max-w-3xl mx-auto">

                    {/* Active filter indicator */}
                    {activeTag && (
                        <div className="flex items-center gap-2 mb-8 text-sm text-neutral-400">
                            <span>Showing posts tagged</span>
                            <span className="bg-purple-500/15 text-purple-300 border border-purple-500/25 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                {activeTag}
                            </span>
                            <span className="text-neutral-600">·</span>
                            <span className="text-neutral-500">{filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}</span>
                        </div>
                    )}

                    {filteredPosts.length > 0 ? (
                        <div className="flex flex-col gap-2 relative">
                            {/* Subtle line indicator on the left */}
                            <div className="absolute left-[7.5rem] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent hidden sm:block pointer-events-none"></div>
                            
                            {filteredPosts.map((post: SanityPost) => (
                                <Link
                                    href={`${basePath}/${post.slug.current}`}
                                    key={post._id}
                                    className="group flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 -mx-4 px-4 py-6 rounded-2xl hover:bg-white/[0.02] transition-colors relative z-10"
                                >
                                    <div className="shrink-0 w-32 text-sm text-neutral-500 font-mono flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-purple-500 transition-colors hidden sm:block relative -left-[1.05rem]"></span>
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-neutral-200 group-hover:text-purple-400 transition-colors mb-2.5">
                                            {post.title}
                                        </h3>
                                        <p className="text-neutral-400 text-base leading-relaxed mb-4 line-clamp-2">
                                            {post.brief}
                                        </p>
                                        
                                        {/* Beautiful Pill Tags — clickable to filter */}
                                        {post.categories && post.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {post.categories.slice(0, 3).map((category: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className={`px-2.5 py-1 rounded-full text-xs font-medium tracking-wide border transition-colors ${
                                                            category === activeTag
                                                                ? 'bg-purple-500/20 text-purple-200 border-purple-400/50'
                                                                : 'bg-purple-500/10 text-purple-400/80 group-hover:text-purple-300 border-purple-500/10 group-hover:border-purple-500/30'
                                                        }`}
                                                    >
                                                        {category}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-neutral-500 bg-neutral-900/20 rounded-3xl border border-neutral-800/50 border-dashed max-w-3xl mx-auto">
                            <p className="text-lg mb-2">No posts found for <span className="text-purple-400">#{activeTag}</span></p>
                            <p className="text-sm text-neutral-600">Try a different tag or view all posts.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default BlogPage;