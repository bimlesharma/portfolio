import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  activeSection,
}: {
  items: { title: string; icon: React.ReactNode; href: string; id?: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
  activeSection?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} activeSection={activeSection} />
      <FloatingDockMobile items={items} className={mobileClassName} activeSection={activeSection} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
  activeSection,
}: {
  items: { title: string; icon: React.ReactNode; href: string; id?: string }[];
  className?: string;
  activeSection?: string;
}) => {
  const touchX = useMotionValue(Infinity);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - bounds.left;
    touchX.set(x);
  };

  const handleTouchEnd = () => {
    touchX.set(Infinity);
  };

  return (
    <motion.div
      ref={containerRef}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-end gap-3 rounded-2xl px-4 py-3 md:hidden",
        className,
      )}
    >
      {items.map((item) => (
        <MobileIconContainer key={item.title} mouseX={touchX} activeSection={activeSection} {...item} />
      ))}
    </motion.div>
  );
};

function MobileIconContainer({
  mouseX,
  icon,
  href,
  id,
  activeSection,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  id?: string;
  activeSection?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = id === activeSection;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return val - (bounds.left + bounds.width / 2);
  });

  const width = useSpring(useTransform(distance, [-100, 0, 100], [40, 80, 40]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(useTransform(distance, [-100, 0, 100], [40, 80, 40]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconSize = useSpring(useTransform(distance, [-100, 0, 100], [20, 40, 20]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        className={cn(
          "relative flex items-center justify-center rounded-full transition-colors duration-300",
          isActive
            ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20"
            : "bg-slate-800/50"
        )}
      >
        <motion.div
          style={{ width: iconSize, height: iconSize }}
          className={cn(
            "flex items-center justify-center",
            isActive ? "text-cyan-400" : "text-slate-300"
          )}
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}


const FloatingDockDesktop = ({
  items,
  className,
  activeSection,
}: {
  items: { title: string; icon: React.ReactNode; href: string; id?: string }[];
  className?: string;
  activeSection?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl px-4 pb-3 md:flex",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} activeSection={activeSection} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  id,
  activeSection,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  id?: string;
  activeSection?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = id === activeSection;
  const isBlog = id === "blog";

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  // Blog button is wider to accommodate text
  const widthTransform = useTransform(
    distance,
    [-150, 0, 150],
    isBlog ? [80, 120, 80] : [40, 80, 40]
  );
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} className="relative">
      <motion.div
        ref={ref}
        style={{ width: isBlog ? width : width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex items-center justify-center gap-2 transition-colors duration-300 overflow-hidden",
          isBlog ? "rounded-full px-3" : "rounded-full",
          isActive
            ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20"
            : "bg-slate-800/50"
        )}
      >
        {/* Rotating gradient ring for Blog */}
        {isBlog && (
          <>
            <motion.div
              className="absolute inset-[-100%]"
              style={{
                background: "conic-gradient(from 0deg, #000000, #ffffff, #000000)",
                opacity: 0.5,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner background to create border effect */}
            <div className="absolute inset-[2px] rounded-full bg-slate-900 z-0" />
          </>
        )}

        <AnimatePresence>
          {hovered && !isBlog && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-10 left-1/2 w-fit rounded-lg px-3 py-1.5 text-xs whitespace-pre font-medium shadow-xl z-50"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #a78bfa)",
                color: "#ffffff",
              }}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon and Blog text */}
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={cn(
            "flex items-center justify-center transition-colors duration-300 relative z-10",
            isActive ? "text-cyan-400" : isBlog ? "text-slate-300" : "text-slate-300"
          )}
        >
          {icon}
        </motion.div>

        {isBlog && (
          <span className="text-sm font-bold bg-slate-300 bg-clip-text text-transparent relative z-10">
            Blog
          </span>
        )}
      </motion.div>
    </a>
  );
}
