"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
  SiMongodb, SiPostgresql, SiDocker, SiGraphql,
  SiTailwindcss, SiJavascript, SiGit, SiRedis
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
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
      level: 90,
      category: "Frontend"
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      color: "#3178C6",
      level: 88,
      category: "Language"
    },
    {
      name: "Node.js",
      icon: SiNodedotjs,
      color: "#339933",
      level: 85,
      category: "Backend"
    },
    {
      name: "Python",
      icon: SiPython,
      color: "#3776AB",
      level: 82,
      category: "Language"
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
      color: "#F7DF1E",
      level: 92,
      category: "Language"
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      color: "#47A248",
      level: 85,
      category: "Database"
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      color: "#336791",
      level: 80,
      category: "Database"
    },
    {
      name: "Docker",
      icon: SiDocker,
      color: "#2496ED",
      level: 75,
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
      level: 77,
      category: "Backend"
    },
    {
      name: "Git",
      icon: SiGit,
      color: "#F05032",
      level: 90,
      category: "Version Control"
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
      color: "#06B6D4",
      level: 90,
      category: "Styling"
    }
  ], []);

  const categories = React.useMemo(() =>
    Array.from(new Set(skills.map(skill => skill.category))),
    [skills]
  );

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
        type: "spring",
        stiffness: 100,
        damping: 12
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
        // variants={cardVariants}
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
          className={`relative w-full h-48  backdrop-blur-sm border border-slate-200/50 dark:border-gray-700/50 rounded-2xl p-6 overflow-hidden`}
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

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <motion.div
                className="p-3 rounded-xl"
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
                  size={32}
                  color={skill.color}
                  role="img"
                  aria-label={skill.name}
                  className="drop-shadow-lg"
                />
              </motion.div>

              <motion.span
                className="text-xs px-2 py-1 rounded-full border"
                style={{
                  color: skill.color,
                  borderColor: `${skill.color}40`,
                  backgroundColor: `${skill.color}10`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {skill.category}
              </motion.span>
            </div>

            <div>
              <h3 className="text-slate-900 dark:text-white text-lg font-semibold mb-3">
                {skill.name}
              </h3>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Proficiency</span>
                  <span style={{ color: skill.color }}>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: skill.color,
                      boxShadow: `0 0 10px ${skill.color}40`
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
          </div>

          {/* Floating particles */}
          {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: skill.color,
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`
                }}
                animate={{
                  x: [0, 10, -10, 0],
                  y: [0, -10, 10, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div> */}
          {/* Floating sparkles */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: skill.color,
                  filter: 'blur(3px)',
                  opacity: 0.6,
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 70 + 10}%`,
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
            ))}
          </div>

        </motion.div>
      </motion.div>
    );
  });

  SkillCard.displayName = 'SkillCard';

  return (
    <section ref={ref} className="relative min-h-screen py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-950 ">
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
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
              My Skills
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
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

        {/* Categories Summary */}
        {/* <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
            Technology Categories
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.span
                key={category}
                className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-blue-300 font-medium backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0 }}
                animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  delay: 1.2 + index * 0.1,
                  type: "spring",
                  stiffness: 300 
                }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(59, 130, 246, 0.3)",
                  transition: { duration: 0.2 }
                }}
              >
                {category}
              </motion.span>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default ModernSkills;
