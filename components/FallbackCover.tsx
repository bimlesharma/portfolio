import React from 'react';

interface FallbackCoverProps {
    title: string;
    className?: string;
}

export default function FallbackCover({ title, className = '' }: FallbackCoverProps) {
    // Generate a consistent gradient based on title
    const getGradientColors = (str: string) => {
        const gradients = [
            'from-purple-600 via-pink-600 to-blue-600',
            'from-cyan-600 via-blue-600 to-purple-600',
            'from-emerald-600 via-teal-600 to-cyan-600',
            'from-orange-600 via-red-600 to-pink-600',
            'from-indigo-600 via-purple-600 to-pink-600',
            'from-rose-600 via-pink-600 to-fuchsia-600',
            'from-amber-600 via-orange-600 to-red-600',
            'from-lime-600 via-green-600 to-emerald-600',
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
