"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
  SiMongodb, SiPostgresql, SiDocker,
  SiTailwindcss, SiJavascript, SiGit, SiExpress, SiRedis,
  SiGraphql, SiPrisma, SiFigma, SiFastapi,
  SiFirebase, SiVercel
} from "react-icons/si";
import { FaGolang, FaAws } from "react-icons/fa6";


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
    // Languages - sorted by level
    {
      name: "JavaScript",
      icon: SiJavascript,
      color: "#F7DF1E",
      level: 95,
      category: "Language"
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      color: "#3178C6",
      level: 90,
      category: "Language"
    },
    {
      name: "Python",
      icon: SiPython,
      color: "#3776AB",
      level: 80,
      category: "Language"
    },
    {
      name: "Go",
      icon: FaGolang,
      color: "#00ADD8",
      level: 75,
      category: "Language"
    },

    // Frontend - sorted by level
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
      name: "Tailwind CSS",
      icon: SiTailwindcss,
      color: "#06B6D4",
      level: 90,
      category: "Frontend"
    },

    // Backend - sorted by level
    {
      name: "Node.js",
      icon: SiNodedotjs,
      color: "#339933",
      level: 90,
      category: "Backend"
    },
    {
      name: "Express.js",
      icon: SiExpress,
      color: "#ffffff",
      level: 88,
      category: "Backend"
    },
    {
      name: "FastAPI",
      icon: SiFastapi,
      color: "#009688",
      level: 75,
      category: "Backend"
    },

    // Databases - sorted by level
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
      name: "Redis",
      icon: SiRedis,
      color: "#DC382D",
      level: 80,
      category: "Database"
    },

    // ORM & API
    {
      name: "Prisma",
      icon: SiPrisma,
      color: "#ffffff",
      level: 82,
      category: "ORM"
    },
    {
      name: "GraphQL",
      icon: SiGraphql,
      color: "#E10098",
      level: 78,
      category: "API"
    },

    // Cloud & Deployment - sorted by level
    {
      name: "Vercel",
      icon: SiVercel,
      color: "#ffffff",
      level: 85,
      category: "Cloud"
    },
    {
      name: "Firebase",
      icon: SiFirebase,
      color: "#FFCA28",
      level: 80,
      category: "Cloud"
    },
    {
      name: "AWS",
      icon: FaAws,
      color: "#FF9900",
      level: 75,
      category: "Cloud"
    },

    // DevOps
    {
      name: "Docker",
      icon: SiDocker,
      color: "#2496ED",
      level: 82,
      category: "DevOps"
    },

    // Tools & Design - sorted by level
    {
      name: "Git",
      icon: SiGit,
      color: "#F05032",
      level: 92,
      category: "Tools"
    },
    {
      name: "Figma",
      icon: SiFigma,
      color: "#F24E1E",
      level: 85,
      category: "Design"
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

    return (
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        className="group relative"
        whileHover={{ y: -8, scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        {/* Glowing square card */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-950/50 backdrop-blur-sm">

          {/* Animated border progress - square */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.rect
              x="1"
              y="1"
              width="98"
              height="98"
              rx="20"
              fill="none"
              stroke={skill.color}
              strokeWidth="0.5"
              strokeDasharray="400"
              initial={{ strokeDashoffset: 400 }}
              animate={isInView ? { strokeDashoffset: 400 - (skill.level / 100) * 400 } : { strokeDashoffset: 400 }}
              transition={{
                duration: 2,
                delay: index * 0.15,
                ease: "easeOut"
              }}
              style={{
                filter: `drop-shadow(0 0 8px ${skill.color}80)`,
                opacity: 0.6
              }}
            />
          </svg>

          {/* Border overlay */}
          <div className="absolute inset-0 border border-gray-800/30 rounded-3xl pointer-events-none" />

          {/* Radial gradient glow - always visible */}
          <div
            className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${skill.color}30 0%, ${skill.color}10 40%, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2 p-4">

            {/* Flip container for Icon/Percentage */}
            <div className="relative w-20 h-20 [perspective:1000px]">
              <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* Front - Icon */}
                <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">
                  <skill.icon
                    size={48}
                    color={skill.color}
                    className="drop-shadow-2xl"
                    style={{
                      filter: `drop-shadow(0 0 12px ${skill.color}60)`
                    }}
                  />
                </div>

                {/* Back - Percentage */}
                <div
                  className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                >
                  <div
                    className="text-3xl font-bold"
                    style={{ color: skill.color }}
                  >
                    {skill.level}%
                  </div>
                </div>
              </div>
            </div>

            {/* Skill name */}
            <h3 className="text-base hidden md:block font-semibold text-gray-100 text-center">
              {skill.name}
            </h3>

            {/* Category badge */}
            <span
              className="text-xs px-3 py-1 rounded-full font-medium border"
              style={{
                backgroundColor: `${skill.color}15`,
                color: skill.color,
                borderColor: `${skill.color}40`
              }}
            >
              {skill.category}
            </span>
          </div>
        </div>
      </motion.div>
    );
  });

  SkillCard.displayName = 'SkillCard';

  return (
    <section ref={ref} className="relative min-h-screen py-20 bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
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
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
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
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4"
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
