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
                    <IoSearch className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-zinc-500 transition-colors group-focus-within:text-zinc-200" />
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search posts…"
                        className="w-full rounded-none border border-zinc-800 bg-zinc-950 py-2 pr-9 pl-9 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
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
                        <span className="border border-zinc-700 px-2 py-0.5 text-xs font-medium text-zinc-300">
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
                                    className="group relative z-10 -mx-4 flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-baseline sm:gap-8"
                                >
                                    <div className="shrink-0 w-32 text-sm text-neutral-500 font-mono flex items-center gap-2">
                                        <span className="relative -left-[1.05rem] hidden h-1.5 w-1.5 bg-zinc-700 transition-colors group-hover:bg-zinc-200 sm:block" />
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-2 text-xl font-semibold text-zinc-200 transition-colors group-hover:text-white">
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
                                                        className={`border px-2 py-0.5 text-xs font-medium tracking-wide transition-colors ${
                                                            category === activeTag
                                                                ? 'border-zinc-400 bg-zinc-800 text-zinc-100'
                                                                : 'border-zinc-800 text-zinc-400 group-hover:border-zinc-600 group-hover:text-zinc-200'
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
                    <div className="border border-dashed border-zinc-800 py-12 text-center text-zinc-500">
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
