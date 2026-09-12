import React from 'react';

interface FallbackCoverProps {
    title: string;
    className?: string;
}

export default function FallbackCover({ title, className = '' }: FallbackCoverProps) {
    // Generate a consistent gradient based on title
    const getGradientColors = (str: string) => {
        const gradients = [
            'from-zinc-900 to-zinc-700',
            'from-zinc-800 to-zinc-950',
            'from-neutral-800 to-zinc-900',
            'from-zinc-700 to-zinc-950',
        ];

        // Use title to consistently pick a gradient
        const hash = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return gradients[hash % gradients.length];
    };

    const gradientClass = getGradientColors(title);

    return (
        <div className={`relative w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center p-8 ${className}`}>
            {/* Overlay pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Title */}
            <h3 className="relative text-white font-bold text-2xl md:text-3xl lg:text-4xl text-center leading-tight drop-shadow-lg line-clamp-4">
                {title}
            </h3>
        </div>
    );
}
