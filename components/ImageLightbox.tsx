'use client';
import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

interface ImageLightboxProps {
    src: string;
    alt: string;
    onClose: () => void;
}

export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
    const [mounted, setMounted] = useState(false);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [handleKeyDown]);

    if (!mounted) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 flex items-center gap-2 rounded-none border border-zinc-700 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-300 transition-all hover:bg-zinc-900 hover:text-white"
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
                    className="max-h-[90vh] max-w-full rounded-none object-contain shadow-2xl ring-1 ring-white/10"
                />
            </div>

            {/* Hint text */}
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-neutral-600 font-mono">
                Click anywhere or press ESC to close
            </p>
        </div>,
        document.body
    );
}
