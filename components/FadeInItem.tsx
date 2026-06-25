'use client';
import { useEffect, useRef, useState } from 'react';

interface FadeInItemProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export default function FadeInItem({ children, delay = 0, className = '' }: FadeInItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect(); // fire once
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(18px)',
                transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}
