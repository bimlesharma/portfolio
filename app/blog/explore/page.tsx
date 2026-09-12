import React from 'react';
import { getSanityPosts } from '@/lib/sanity-api';
import type { Metadata } from 'next';
import ExploreClient from '@/components/ExploreClient';
import PageHeader from '@/components/PageHeader';

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
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 lg:px-8">
                <PageHeader
                    crumbs={[
                        { label: "Home", href: "/" },
                        { label: "Blog", href: basePath },
                        { label: "Explore" },
                    ]}
                    eyebrow="Digital Garden"
                    title="Explore"
                    description="Search and explore articles by topics, tags, and keywords."
                />
            </div>

            {/* Client Component with Search and Filters */}
            <ExploreClient posts={posts} basePath={basePath} />
        </main>
    );
};

export default ExplorePage;
