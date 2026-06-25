import React, { Suspense } from 'react';
import { getSanityPosts } from '@/lib/sanity-api';
import type { SanityPost } from '@/lib/types/sanity';
import { IoMdTrendingUp, IoMdGlobe } from "react-icons/io";
import BlogList from '@/components/BlogList';
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
    const basePath = '/blog';
    const allTags = Array.from(new Set(posts.flatMap((post: SanityPost) => post.categories || []))).sort() as string[];

    return (
        <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[150px]" />
            </div>

            {/* Header Section */}
            <section className="pt-32 pb-12 px-6 relative z-10 border-b border-neutral-900/50">
                <div className="max-w-3xl mx-auto flex flex-col items-start">

                    {/* Status Badge */}
                    <div className="flex items-center gap-3 mb-6 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
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
                        <div className="flex items-center gap-2.5 cursor-default">
                            <IoMdTrendingUp className="text-purple-400 text-base" />
                            <span className="text-neutral-200 font-semibold">{posts.length}</span> Published Posts
                        </div>
                        <span className="text-neutral-800">/</span>
                        <div className="flex items-center gap-2.5 cursor-default">
                            <IoMdGlobe className="text-blue-400 text-base" />
                            <span className="text-neutral-200 font-semibold">{allTags.length}</span> Unique Topics
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section — client component owns search + filter + list */}
            <section className="py-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <Suspense fallback={null}>
                        <BlogList posts={posts} allTags={allTags} basePath={basePath} />
                    </Suspense>
                </div>
            </section>
        </main>
    );
};

export default BlogPage;