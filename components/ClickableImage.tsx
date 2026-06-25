'use client';
import { useState } from 'react';
import ImageLightbox from './ImageLightbox';
import { IoExpand } from 'react-icons/io5';

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
                    className="w-full rounded-xl border border-neutral-800 object-cover transition-all duration-300 group-hover:brightness-90 group-hover:border-purple-500/30"
                />
                {/* Expand icon hint on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-sm rounded-full p-3 border border-white/10">
                        <IoExpand className="text-white text-xl" />
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
