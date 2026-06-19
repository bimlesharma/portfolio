'use client';
import { IoLogoTwitter, IoLogoLinkedin } from 'react-icons/io5';
import { useEffect, useState } from 'react';

export default function ShareButtons({ title }: { title: string }) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    return (
        <div className="flex items-center gap-4 py-8 border-t border-neutral-800 mt-12">
            <span className="text-neutral-400 font-medium">Share this post:</span>
            <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-900 text-neutral-400 hover:text-blue-400 hover:bg-neutral-800 rounded-full transition-colors"
                aria-label="Share on Twitter"
            >
                <IoLogoTwitter size={20} />
            </a>
            <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-900 text-neutral-400 hover:text-blue-600 hover:bg-neutral-800 rounded-full transition-colors"
                aria-label="Share on LinkedIn"
            >
                <IoLogoLinkedin size={20} />
            </a>
        </div>
    );
}
