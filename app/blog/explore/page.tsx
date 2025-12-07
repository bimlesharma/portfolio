import React from 'react';
import Link from 'next/link';
import { getHashnodePosts } from '@/lib/hashnode';
import { IoMdArrowBack } from "react-icons/io";
import { headers } from 'next/headers';
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
    const posts = await getHashnodePosts();

    // Check if we're on blog subdomain
    const headersList = await headers();
    const hostname = headersList.get('host') || '';
    const isSubdomain = hostname.startsWith('blog.');
    const basePath = isSubdomain ? '' : '/blog';

    return (
        <main className="min-h-screen bg-neutral-950 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-6 pt-12">
                <Link href={basePath || '/'} className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
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
