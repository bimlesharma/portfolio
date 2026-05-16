'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const ASCII_CHARS = '@%#*+=-:. ';

interface AsciiPortraitProps {
  imageSrc: string;
  cols?: number;
  revealRadius?: number;
}

export default function AsciiPortrait({ imageSrc, cols = 110, revealRadius = 100 }: AsciiPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const asciiRef = useRef<HTMLPreElement>(null);
  const [asciiLines, setAsciiLines] = useState<string[] | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate ASCII art
  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      // ASCII chars are ~2x taller than wide, compensate
      const rows = Math.floor(cols * aspectRatio * 0.55);

      canvas.width = cols;
      canvas.height = rows;
      ctx.drawImage(img, 0, 0, cols, rows);

      const imageData = ctx.getImageData(0, 0, cols, rows);
      const pixels = imageData.data;
      const lines: string[] = [];

      for (let y = 0; y < rows; y++) {
        let line = '';
        for (let x = 0; x < cols; x++) {
          const offset = (y * cols + x) * 4;
          const r = pixels[offset];
          const g = pixels[offset + 1];
          const b = pixels[offset + 2];
          const a = pixels[offset + 3];

          if (a < 50) {
            line += ' ';
            continue;
          }

          const brightness = r * 0.299 + g * 0.587 + b * 0.114;
          const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
          line += ASCII_CHARS[charIndex];
        }
        lines.push(line);
      }

      setAsciiLines(lines);
    };

    img.src = imageSrc;
  }, [isMounted, imageSrc, cols]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLPreElement>) => {
    const pre = asciiRef.current;
    if (!pre) return;
    const rect = pre.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  if (!isMounted) {
    return <div className="relative w-full h-full flex items-end justify-center" />;
  }

  // Build the radial mask for the image, positioned at cursor
  // Coordinates are relative to the <pre> element
  const maskStyle = {
    WebkitMaskImage: `radial-gradient(circle ${revealRadius}px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 55%, transparent 100%)`,
    maskImage: `radial-gradient(circle ${revealRadius}px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 55%, transparent 100%)`,
    opacity: isHovering ? 1 : 0,
  };

  return (
    <div className="relative w-full h-full flex items-end justify-center">
      <canvas ref={canvasRef} className="hidden" />

      {asciiLines ? (
        <motion.pre
          ref={asciiRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative text-[3px] sm:text-[3.6px] md:text-[4.2px] lg:text-[5px] leading-[1.15] font-mono text-cyan-400 select-none whitespace-pre tracking-[0.04em]"
          style={{
            textShadow: '0 0 6px rgba(6, 182, 212, 0.35), 0 0 16px rgba(6, 182, 212, 0.12)',
            fontFamily: "'Courier New', 'Consolas', monospace",
          }}
        >
          {/* ASCII text */}
          {asciiLines.map((line, i) => (
            <span key={i} className="block pointer-events-none">{line}</span>
          ))}

          {/* Real Image Overlay - Stretches perfectly over the text block */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-in-out"
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              ...maskStyle,
            }}
          />
        </motion.pre>
      ) : (
        <div className="w-full h-full animate-pulse bg-slate-800/30 rounded-b-full" />
      )}

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.15) 2px, rgba(6, 182, 212, 0.15) 4px)',
        }}
      />
    </div>
  );
}
