import React, { Suspense } from 'react';
import Link from 'next/link';
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
            <section className="relative z-10 border-b border-zinc-900 px-6 pt-16 pb-8">
                <div className="max-w-3xl mx-auto flex flex-col items-start">

                    {/* Status Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 border border-zinc-800 px-3 py-1">
                        <span className="inline-flex h-1.5 w-1.5 bg-zinc-300" />
                        <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase">Bimlesh&apos;s Digital Garden</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg">
                        Writing & Thoughts
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-8 font-light">
                        Deep dives into software engineering, artificial intelligence, and building polished products. Welcome to my digital garden where I document what I build and learn.
                    </p>

                    <Link
                        href="/blog/explore"
                        className="mb-10 text-sm font-semibold text-zinc-300 transition hover:text-zinc-200"
                    >
                        Explore by topic →
                    </Link>

                    {/* Stats Line */}
                    <div className="flex items-center gap-5 text-sm font-mono text-neutral-500">
                        <div className="flex items-center gap-2.5 cursor-default">
                            <IoMdTrendingUp className="text-zinc-300 text-base" />
                            <span className="text-neutral-200 font-semibold">{posts.length}</span> Published Posts
                        </div>
                        <span className="text-neutral-800">/</span>
                        <div className="flex items-center gap-2.5 cursor-default">
                            <IoMdGlobe className="text-base text-zinc-300" />
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