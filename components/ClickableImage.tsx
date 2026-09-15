'use client';
import { useState } from 'react';
import ImageLightbox from './ImageLightbox';
import { Expand } from 'lucide-react';

interface ClickableImageProps {
    src: string;
    alt: string;
}

export default function ClickableImage({ src, alt }: ClickableImageProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="relative group cursor-zoom-in"
                onClick={() => setIsOpen(true)}
                title="Click to expand"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt}
                    className="w-full rounded-none border border-zinc-800 object-cover transition-all duration-300 group-hover:border-zinc-500 group-hover:brightness-90"
                />
                {/* Expand icon hint on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="rounded-none border border-white/10 bg-black/60 p-3 backdrop-blur-sm">
                        <Expand className="size-5 text-white" />
                    </div>
                </div>
            </div>

            {isOpen && (
                <ImageLightbox
                    src={src}
                    alt={alt}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
