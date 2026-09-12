'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoMdSearch, IoMdClose, IoMdTime } from 'react-icons/io';
import type { SanityPost } from '@/lib/types/sanity';
import { urlForImage } from '@/sanity/lib/image';
import FallbackCover from '@/components/FallbackCover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ExploreClientProps {
    posts: SanityPost[];
    basePath: string;
}

export default function ExploreClient({ posts, basePath }: ExploreClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Get all unique tags
    const allTags = useMemo(() => {
        const tagMap = new Map<string, number>();
        posts.forEach(post => {
            post.categories?.forEach(category => {
                tagMap.set(category, (tagMap.get(category) || 0) + 1);
            });
        });
        return Array.from(tagMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }, [posts]);

    // Filter posts based on search and selected tag
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = searchQuery === '' ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (post.brief && post.brief.toLowerCase().includes(searchQuery.toLowerCase())) ||
                post.categories?.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTag = !selectedTag ||
                post.categories?.some(category => category === selectedTag);

            return matchesSearch && matchesTag;
        });
    }, [posts, searchQuery, selectedTag]);

    return (
        <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
            <p className="mb-8 text-sm text-muted-foreground">
                {posts.length} articles across {allTags.length} topics
            </p>

            <div className="mx-auto mb-8 max-w-2xl">
                <div className="relative">
                    <IoMdSearch className="absolute top-1/2 left-3 z-10 -translate-y-1/2 text-xl text-zinc-500" />
                    <Input
                        type="text"
                        placeholder="Search articles, topics, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-10 border-zinc-800 bg-zinc-950 pr-10 pl-10 text-white placeholder:text-zinc-500"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                        >
                            <IoMdClose className="text-2xl" />
                        </button>
                    )}
                </div>
            </div>

            {/* Topic Tags */}
            <div className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-white">Browse by Topic</h2>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`border px-3 py-1.5 text-sm transition-colors ${selectedTag === null
                                ? 'border-white bg-white text-zinc-950'
                                : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-500 hover:text-white'
                            }`}
                    >
                        All Topics ({posts.length})
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag.name}
                            onClick={() => setSelectedTag(tag.name)}
                            className={`border px-3 py-1.5 text-sm transition-colors ${selectedTag === tag.name
                                    ? 'border-white bg-white text-zinc-950'
                                    : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-500 hover:text-white'
                                }`}
                        >
                            {tag.name} ({tag.count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-neutral-400">
                    {filteredPosts.length === posts.length ? (
                        `Showing all ${posts.length} articles`
                    ) : (
                        `Found ${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''}`
                    )}
                    {selectedTag && ` in "${selectedTag}"`}
                    {searchQuery && ` matching "${searchQuery}"`}
                </p>
            </div>

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post: SanityPost) => (
                        <Link
                            href={`${basePath}/${post.slug.current}`}
                            key={post._id}
                            className="group relative overflow-hidden border border-zinc-800 bg-zinc-950 transition-colors hover:border-zinc-500"
                        >
                            <div className="aspect-video relative overflow-hidden">
                                {post.mainImage ? (
                                    <Image
                                        src={urlForImage(post.mainImage).url()}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <FallbackCover title={post.title} />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
                            </div>

                            <div className="relative p-4">
                                <h3 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-white">
                                    {post.title}
                                </h3>
                                <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                                    {post.brief}
                                </p>
                                <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <IoMdTime />
                                        {post.readTimeInMinutes} min
                                    </span>
                                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                                {post.categories && post.categories.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.categories.slice(0, 2).map((category: string, idx: number) => (
                                            <span key={idx} className="border border-zinc-700 px-2 py-0.5 text-xs text-zinc-400">
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
                <div className="py-12 text-center">
                    <p className="mb-4 text-lg text-zinc-500">No articles found</p>
                    <Button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedTag(null);
                        }}
                    >
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    );
}
