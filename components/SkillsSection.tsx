"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
  SiMongodb, SiPostgresql, SiDocker,
  SiTailwindcss, SiJavascript, SiGit,
} from "react-icons/si";
// import { FaAws } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";


type Skill = {
  name: string;
  icon: React.ElementType;
  color: string;
  level: number;
  category: string;
};

const ModernSkills = () => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
    margin: "100px"
  });

  // Prevent re-renders by stabilizing animation trigger
  React.useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const skills: Skill[] = React.useMemo(() => [
    {
      name: "React.js",
      icon: SiReact,
      color: "#61DAFB",
      level: 95,
      category: "Frontend"
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      color: "#ffffff",
      level: 92,
      category: "Frontend"
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      color: "#3178C6",
      level: 90,
      category: "Language"
    },
    {
      name: "Node.js",
      icon: SiNodedotjs,
      color: "#339933",
      level: 90,
      category: "Backend"
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
      color: "#F7DF1E",
      level: 95,
      category: "Language"
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      color: "#47A248",
      level: 88,
      category: "Database"
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      color: "#336791",
      level: 85,
      category: "Database"
    },
    {
      name: "Docker",
      icon: SiDocker,
      color: "#2496ED",
      level: 82,
      category: "DevOps"
    },
    // {
    //   name: "AWS",
    //   icon: FaAws,
    //   color: "#FF9900",
    //   level: 78,
    //   category: "Cloud"
    // },
    // {
    //   name: "GraphQL",
    //   icon: SiGraphql,
    //   color: "#E10098",
    //   level: 70,
    //   category: "API"
    // },
    {
      name: "Go (Golang)",
      icon: FaGolang,
      color: "#00ADD8",
      level: 75,
      category: "Backend"
    },
    {
      name: "Git",
      icon: SiGit,
      color: "#F05032",
      level: 92,
      category: "Version Control"
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
      color: "#06B6D4",
      level: 90,
      category: "Styling"
    },
    {
      name: "Python",
      icon: SiPython,
      color: "#3776AB",
      level: 80,
      category: "Language"
    }
  ], []);

  const containerVariants = React.useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }), []);

  const cardVariants = React.useMemo(() => ({
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20
      }
    }
  }), []);

  const SkillCard = React.memo(({ skill, index }: { skill: Skill, index: number }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    const handleMouse = React.useCallback((event: React.MouseEvent) => {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct * 100);
      y.set(yPct * 100);
    }, [x, y]);

    const handleMouseLeave = React.useCallback(() => {
      x.set(0);
      y.set(0);
    }, [x, y]);

    return (
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        className="group relative"
        style={{
          perspective: 1000,
        }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background radial glow behind the card */}
        <div
          className="absolute -inset-10 blur-3xl opacity-30 z-0"
          style={{
            background: `radial-gradient(circle at center, ${skill.color}33 0%, transparent 80%)`
          }}
        />
        <motion.div
          className={`relative w-full h-24 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl p-4 overflow-hidden shadow-lg`}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          {/* Glowing background effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
            style={{
              background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)`
            }}
          />

          {/* Content - Horizontal Layout */}
          <div className="relative z-10 h-full flex items-center gap-4">
            {/* Icon and Name */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <motion.div
                className="p-2 rounded-lg flex-shrink-0"
                style={{
                  backgroundColor: `${skill.color}20`,
                  border: `1px solid ${skill.color}40`
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: `${skill.color}30`
                }}
              >
                <skill.icon
                  size={24}
                  color={skill.color}
                  role="img"
                  aria-label={skill.name}
                  className="drop-shadow-lg"
                />
              </motion.div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {skill.name}
                </h3>
                <motion.span
                  className="text-xs px-2 py-0.5 rounded-full border bg-slate-100 dark:bg-slate-700 inline-block mt-1"
                  style={{
                    color: skill.color,
                    borderColor: `${skill.color}40`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {skill.category}
                </motion.span>
              </div>
            </div>

            {/* Progress bar - Vertical on right */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="text-xs font-semibold" style={{ color: skill.color }}>
                {skill.level}%
              </span>
              <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: skill.color,
                    boxShadow: `0 0 8px ${skill.color}40`
                  }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.1 + 0.8,
                    ease: "easeOut"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Floating sparkles */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {[...Array(6)].map((_, i) => {
              // Seeded random for consistent SSR/client positions
              const seed = index * 1000 + i;
              const leftPos = ((seed * 9301 + 49297) % 233280) / 233280 * 80 + 10;
              const topPos = ((seed * 7919 + 31337) % 233280) / 233280 * 70 + 10;

              return (
                <motion.span
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: skill.color,
                    filter: 'blur(3px)',
                    opacity: 0.6,
                    left: `${leftPos}%`,
                    top: `${topPos}%`,
                  }}
                  animate={{
                    x: [0, 4, -4, 0],
                    y: [0, -6, 6, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.3, 0.8],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </div>

        </motion.div>
      </motion.div>
    );
  });

  SkillCard.displayName = 'SkillCard';

  return (
    <section ref={ref} className="relative min-h-screen py-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent">
              My Skills
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A comprehensive overview of the technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ModernSkills;
