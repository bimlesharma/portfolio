'use client';
import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { IoClose, IoExpand } from 'react-icons/io5';

interface ImageLightboxProps {
    src: string;
    alt: string;
    onClose: () => void;
}

export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [handleKeyDown]);

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 flex items-center gap-2 text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-full text-sm transition-all"
                aria-label="Close lightbox"
            >
                <IoClose className="text-lg" />
                <span className="font-mono text-xs">ESC</span>
            </button>

            {/* Image container */}
            <div
                className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
                />
            </div>

            {/* Hint text */}
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-neutral-600 font-mono">
                Click anywhere or press ESC to close
            </p>
        </div>
    );
}
