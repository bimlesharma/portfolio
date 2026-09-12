'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    trail: { x: number; y: number; alpha: number }[];
}

const COLORS = ['#06b6d4', '#a78bfa', '#10b981', '#f59e0b', '#ec4899'];

function shouldEnableCursorEffect(): boolean {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
}

export default function CursorEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999, inside: false });
    const animationFrameRef = useRef<number | undefined>(undefined);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        setEnabled(shouldEnableCursorEffect());

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setEnabled(shouldEnableCursorEffect());

        motionQuery.addEventListener('change', update);
        return () => motionQuery.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const canvas = canvasRef.current;
        const host = canvas?.parentElement;
        if (!canvas || !host) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            const { width, height } = host.getBoundingClientRect();
            const nextWidth = Math.max(1, Math.floor(width));
            const nextHeight = Math.max(1, Math.floor(height));
            if (canvas.width === nextWidth && canvas.height === nextHeight) return;
            canvas.width = nextWidth;
            canvas.height = nextHeight;
            initParticles();
        };

        const initParticles = () => {
            const coarse = window.matchMedia('(pointer: coarse)').matches;
            const particleCount = coarse ? 48 : 90;

            particlesRef.current = Array.from({ length: particleCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                size: Math.random() * 2.2 + 1.2,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                trail: [],
            }));
        };

        const pointFromEvent = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
            mouseRef.current = inside ? { x, y, inside: true } : { x: -9999, y: -9999, inside: false };
        };

        const leaveHero = () => {
            mouseRef.current = { x: -9999, y: -9999, inside: false };
        };

        resizeCanvas();

        const resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(host);
        host.addEventListener('pointermove', pointFromEvent);
        host.addEventListener('pointerleave', leaveHero);

        let visible = true;
        const visibility = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        visibility.observe(host);

        const animate = () => {
            if (visible) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particlesRef.current.forEach((particle) => {
                    if (mouseRef.current.inside) {
                        const dx = particle.x - mouseRef.current.x;
                        const dy = particle.y - mouseRef.current.y;
                        const distance = Math.hypot(dx, dy);
                        const maxDistance = 180;

                        if (distance < maxDistance && distance > 0) {
                            const force = (1 - distance / maxDistance) * 0.7;
                            const angle = Math.atan2(dy, dx);
                            particle.vx += Math.cos(angle) * force;
                            particle.vy += Math.sin(angle) * force;
                        }
                    }

                    particle.vx *= 0.96;
                    particle.vy *= 0.96;
                    if (Math.hypot(particle.vx, particle.vy) < 0.08) {
                        particle.vx += (Math.random() - 0.5) * 0.04;
                        particle.vy += (Math.random() - 0.5) * 0.04;
                    }

                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    if (particle.x < 0) particle.x = canvas.width;
                    if (particle.x > canvas.width) particle.x = 0;
                    if (particle.y < 0) particle.y = canvas.height;
                    if (particle.y > canvas.height) particle.y = 0;

                    particle.trail.push({ x: particle.x, y: particle.y, alpha: 1 });
                    if (particle.trail.length > 12) particle.trail.shift();

                    particle.trail.forEach((point, index) => {
                        const alpha = (index / particle.trail.length) * 0.55;
                        const size = particle.size * (index / particle.trail.length);
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                        ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                        ctx.fill();
                    });

                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = particle.color;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                });
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            resizeObserver.disconnect();
            visibility.disconnect();
            host.removeEventListener('pointermove', pointFromEvent);
            host.removeEventListener('pointerleave', leaveHero);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            style={{ background: 'transparent' }}
            aria-hidden="true"
        />
    );
}
