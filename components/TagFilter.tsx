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
                className={`border px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
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
                    className={`border px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                        activeTag === tag
                            ? 'border-zinc-200 bg-zinc-100 text-zinc-950'
                            : 'border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}
