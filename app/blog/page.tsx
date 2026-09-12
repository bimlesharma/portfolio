import React, { Suspense } from 'react';
import Link from 'next/link';
import { getSanityPosts } from '@/lib/sanity-api';
import type { SanityPost } from '@/lib/types/sanity';
import { IoMdTrendingUp, IoMdGlobe } from "react-icons/io";
import BlogList from '@/components/BlogList';
import PageHeader from '@/components/PageHeader';
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
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <PageHeader
                    crumbs={[
                        { label: "Home", href: "/" },
                        { label: "Blog" },
                    ]}
                    eyebrow="Digital Garden"
                    title="Writing & Thoughts"
                    description="Deep dives into software engineering, artificial intelligence, and building polished products. Welcome to my digital garden where I document what I build and learn."
                >
                    <Link
                        href="/blog/explore"
                        className="text-sm font-medium text-foreground transition hover:text-muted-foreground"
                    >
                        Explore by topic
                    </Link>
                    <div className="mt-6 flex items-center gap-5 text-sm font-mono text-muted-foreground">
                        <div className="flex items-center gap-2.5">
                            <IoMdTrendingUp className="text-base text-foreground" />
                            <span className="font-semibold text-foreground">{posts.length}</span> Published Posts
                        </div>
                        <span className="text-border">/</span>
                        <div className="flex items-center gap-2.5">
                            <IoMdGlobe className="text-base text-foreground" />
                            <span className="font-semibold text-foreground">{allTags.length}</span> Unique Topics
                        </div>
                    </div>
                </PageHeader>

                <Suspense fallback={null}>
                    <BlogList posts={posts} allTags={allTags} basePath={basePath} />
                </Suspense>
            </div>
        </main>
    );
};

export default BlogPage;