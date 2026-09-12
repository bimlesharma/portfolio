import React from 'react';
import Link from 'next/link';
import { getSanityPosts } from '@/lib/sanity-api';
import { IoMdArrowBack } from "react-icons/io";
import type { Metadata } from 'next';
import ExploreClient from '@/components/ExploreClient';

export const metadata: Metadata = {
    title: 'Explore',
    description: 'Search and explore articles by topics, tags, and keywords.',
    openGraph: {
        title: 'Explore | Bimlesh Blog',
        description: 'Search and explore articles by topics, tags, and keywords.',
        type: 'website',
    },
};

export const revalidate = 3600;

const ExplorePage = async () => {
    const posts = await getSanityPosts();
    const basePath = '/blog';

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-6 pt-12">
                <Link href={basePath || '/'} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors group hover:text-white">
                    <IoMdArrowBack className="group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>
            </div>

            {/* Client Component with Search and Filters */}
            <ExploreClient posts={posts} basePath={basePath} />
        </main>
    );
};

export default ExplorePage;
