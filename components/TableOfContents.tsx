'use client';
import { useEffect, useState } from 'react';

interface Heading {
    text: string;
    slug: string;
    style: string;
}

interface TableOfContentsProps {
    headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        headings.forEach((heading) => {
            const el = document.getElementById(heading.slug);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div className="sticky top-24">
            <h4 className="text-lg font-semibold mb-4 text-white">Table of Contents</h4>
            <ul className="space-y-3 text-sm">
                {headings.map((heading, idx) => (
                    <li
                        key={idx}
                        className={`${heading.style === 'h3' ? 'ml-4' : ''}`}
                    >
                        <a
                            href={`#${heading.slug}`}
                            className={`block transition-colors hover:text-purple-400 ${
                                activeId === heading.slug ? 'text-purple-400 font-medium' : 'text-neutral-400'
                            }`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
