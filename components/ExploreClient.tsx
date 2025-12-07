'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoMdSearch, IoMdClose, IoMdTime } from 'react-icons/io';
import type { HashnodePost, HashnodeTag } from '@/lib/types/hashnode';
import FallbackCover from '@/components/FallbackCover';

interface ExploreClientProps {
    posts: HashnodePost[];
    basePath: string;
}

export default function ExploreClient({ posts, basePath }: ExploreClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Get all unique tags
    const allTags = useMemo(() => {
        const tagMap = new Map<string, number>();
        posts.forEach(post => {
            post.tags?.forEach(tag => {
                tagMap.set(tag.name, (tagMap.get(tag.name) || 0) + 1);
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
                post.brief.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags?.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTag = !selectedTag ||
                post.tags?.some(tag => tag.name === selectedTag);

            return matchesSearch && matchesTag;
        });
    }, [posts, searchQuery, selectedTag]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4">
                    Explore Articles
                </h1>
                <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                    Search through {posts.length} articles across {allTags.length} topics
                </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
                <div className="relative">
                    <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search articles, topics, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 transition-colors"
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
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-white">Browse by Topic</h2>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-4 py-2 rounded-full transition-all ${selectedTag === null
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                : 'bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:border-purple-500/50 hover:text-white'
                            }`}
                    >
                        All Topics ({posts.length})
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag.name}
                            onClick={() => setSelectedTag(tag.name)}
                            className={`px-4 py-2 rounded-full transition-all ${selectedTag === tag.name
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                    : 'bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:border-purple-500/50 hover:text-white'
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post: HashnodePost) => (
                        <Link
                            href={`${basePath}/${post.slug}`}
                            key={post.id}
                            className="group relative bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)]"
                        >
                            <div className="aspect-video relative overflow-hidden">
                                {post.coverImage?.url ? (
                                    <Image
                                        src={post.coverImage.url}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <FallbackCover title={post.title} />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
                            </div>

                            <div className="p-6 relative">
                                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
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
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.slice(0, 2).map((tag: HashnodeTag, idx: number) => (
                                            <span key={idx} className="px-2 py-1 text-xs bg-neutral-800/50 border border-neutral-700 rounded-full text-neutral-400">
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-2xl text-neutral-500 mb-4">No articles found</p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedTag(null);
                        }}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}
