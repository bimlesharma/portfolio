'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    trail: { x: number; y: number; alpha: number }[];
}

export default function CursorEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Initialize particles
        const initParticles = () => {
            const particleCount = 100;
            const colors = [
                '#3b82f6', // Blue
                '#8b5cf6', // Purple
                '#06b6d4', // Cyan
                '#10b981', // Emerald
                '#f59e0b', // Amber
            ];

            particlesRef.current = Array.from({ length: particleCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2.5 + 1.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                trail: [],
            }));
        };

        resizeCanvas();
        initParticles();
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            // Clear canvas with transparency (no black fade)
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Calculate distance and angle from mouse
                const dx = particle.x - mouseRef.current.x;
                const dy = particle.y - mouseRef.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 200;

                // Apply repulsion force from mouse
                if (distance < maxDistance && distance > 0) {
                    const force = (1 - distance / maxDistance) * 0.8;
                    const angle = Math.atan2(dy, dx);
                    particle.vx += Math.cos(angle) * force;
                    particle.vy += Math.sin(angle) * force;
                }

                // Apply friction
                particle.vx *= 0.95;
                particle.vy *= 0.95;

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around screen edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Add current position to trail
                particle.trail.push({ x: particle.x, y: particle.y, alpha: 1 });
                if (particle.trail.length > 15) {
                    particle.trail.shift();
                }

                // Draw trail
                particle.trail.forEach((point, index) => {
                    const alpha = (index / particle.trail.length) * 0.6;
                    const size = particle.size * (index / particle.trail.length);

                    ctx.beginPath();
                    ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                    ctx.fill();
                });

                // Draw main particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = particle.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    );
}
