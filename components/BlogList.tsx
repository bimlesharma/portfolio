'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { SanityPost } from '@/lib/types/sanity';
import TagFilter from '@/components/TagFilter';
import FadeInItem from '@/components/FadeInItem';
import { IoSearch, IoClose } from 'react-icons/io5';

interface BlogListProps {
    posts: SanityPost[];
    allTags: string[];
    basePath: string;
}

export default function BlogList({ posts, allTags, basePath }: BlogListProps) {
    const searchParams = useSearchParams();
    const activeTag = searchParams.get('tag');
    const [query, setQuery] = useState('');

    const filteredPosts = useMemo(() => {
        let result = posts;
        if (activeTag) {
            result = result.filter(p => p.categories?.includes(activeTag));
        }
        if (query.trim()) {
            const q = query.toLowerCase();
            result = result.filter(
                p =>
                    p.title?.toLowerCase().includes(q) ||
                    p.brief?.toLowerCase().includes(q)
            );
        }
        return result;
    }, [posts, activeTag, query]);

    const showingFiltered = activeTag || query.trim();

    return (
        <>
            {/* Search + Tag Filter block */}
            <div className="mt-8 flex flex-col gap-4">
                {/* Search Bar */}
                <div className="relative group w-full max-w-sm">
                    <IoSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-purple-400 transition-colors text-base pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search posts…"
                        className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-purple-500/50 text-neutral-200 placeholder-neutral-600 text-sm font-mono rounded-full pl-9 pr-9 py-2 outline-none transition-all focus:bg-neutral-900/80 focus:shadow-[0_0_0_3px_rgba(168,85,247,0.1)]"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-200 transition-colors"
                            aria-label="Clear search"
                        >
                            <IoClose />
                        </button>
                    )}
                </div>

                {/* Tag Filter */}
                <TagFilter tags={allTags} activeTag={activeTag} />
            </div>

            {/* Active filter indicator */}
            {showingFiltered && (
                <div className="flex items-center gap-2 mt-8 text-sm text-neutral-400 font-mono">
                    {query.trim() && (
                        <span>
                            Results for <span className="text-white">&ldquo;{query}&rdquo;</span>
                        </span>
                    )}
                    {activeTag && query.trim() && <span className="text-neutral-700">·</span>}
                    {activeTag && (
                        <span className="bg-purple-500/15 text-purple-300 border border-purple-500/25 px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {activeTag}
                        </span>
                    )}
                    <span className="text-neutral-600">·</span>
                    <span className="text-neutral-500">
                        {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                    </span>
                </div>
            )}

            {/* Post list */}
            <div className="mt-6">
                {filteredPosts.length > 0 ? (
                    <div className="flex flex-col gap-2 relative">
                        {/* Subtle timeline line */}
                        <div className="absolute left-[7.5rem] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent hidden sm:block pointer-events-none" />

                        {filteredPosts.map((post, index) => (
                            <FadeInItem key={post._id} delay={index * 0.07}>
                                <Link
                                    href={`${basePath}/${post.slug.current}`}
                                    className="group flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 -mx-4 px-4 py-6 rounded-2xl hover:bg-white/[0.02] transition-colors relative z-10"
                                >
                                    <div className="shrink-0 w-32 text-sm text-neutral-500 font-mono flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-purple-500 transition-colors hidden sm:block relative -left-[1.05rem]" />
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-neutral-200 group-hover:text-purple-400 transition-colors mb-2.5">
                                            {post.title}
                                        </h3>
                                        <p className="text-neutral-400 text-base leading-relaxed mb-4 line-clamp-2">
                                            {post.brief}
                                        </p>
                                        {post.categories && post.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {post.categories.slice(0, 3).map((category, idx) => (
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
                            </FadeInItem>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-neutral-500 bg-neutral-900/20 rounded-3xl border border-neutral-800/50 border-dashed">
                        <p className="text-lg mb-2">No posts found</p>
                        <p className="text-sm text-neutral-600">
                            {query ? `No results for "${query}"` : `No posts tagged "${activeTag}"`}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
