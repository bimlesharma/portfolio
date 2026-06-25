'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface TagFilterProps {
    tags: string[];
    activeTag: string | null;
}

export default function TagFilter({ tags, activeTag }: TagFilterProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const setTag = useCallback(
        (tag: string | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (tag) {
                params.set('tag', tag);
            } else {
                params.delete('tag');
            }
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [router, pathname, searchParams]
    );

    if (tags.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-8">
            <button
                onClick={() => setTag(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 border ${
                    !activeTag
                        ? 'bg-white text-neutral-950 border-white shadow-[0_0_12px_rgba(255,255,255,0.15)]'
                        : 'bg-transparent text-neutral-400 border-neutral-700 hover:border-neutral-500 hover:text-neutral-200'
                }`}
            >
                All Posts
            </button>

            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => setTag(activeTag === tag ? null : tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 border ${
                        activeTag === tag
                            ? 'bg-purple-500/20 text-purple-200 border-purple-400/60 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                            : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-purple-500/40 hover:text-purple-300 hover:bg-purple-500/5'
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}
