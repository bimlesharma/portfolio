'use client';

import { useRef } from 'react';
import React from 'react';
import { motion, useMotionValue, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: 'Secure Multi-LLM SaaS Platform',
    description: 'Secure multi-LLM SaaS platform with FastAPI and spaCy-driven data sanitization, ensuring safe prompt processing across organizations. Built scalable multi-tenant architecture with Auth0 RBAC and integrated Gemini API with LangChain pipelines.',
    tech: ['Next.js', 'Express.js', 'FastAPI', 'MongoDB', 'Redis', 'Auth0', 'LangChain'],
    color: '#8B5CF6',
    image: '/images/multi-llm-preview.png',
    github: '',
    demo: '',
  },
  {
    title: 'StockBubbles.net',
    description: 'Real-time stock-market visualization platform using dynamic bubble charts with performance-based sizing and coloring. Integrated multiple Indian indices with MongoDB Atlas + Redis caching for low-latency data delivery. Deployed on VPS using Docker and CI/CD.',
    tech: ['Next.js', 'Express.js', 'MongoDB', 'Redis', 'Docker'],
    color: '#10B981',
    image: '/images/stockbubbles-preview.png',
    github: '',
    demo: 'https://stockbubbles.net',
  },
  {
    title: 'CryptoWaley',
    description: 'Comprehensive cryptocurrency platform providing real-time market data, news, and educational resources. Built with modern web technologies featuring responsive design, SEO optimization, and dynamic content management.',
    tech: ['React.js', 'Next.js', 'Tailwind CSS', 'API Integration'],
    color: '#F59E0B',
    image: '/images/cryptowaley-preview.png',
    github: 'https://github.com/bimlesharma/CryptoWaley',
    demo: 'https://cryptowaley.com',
  },
  {
    title: 'Smart Delhi Ideathon 2025',
    description: 'Scalable Next.js event portal handling high-traffic spikes from 5,000+ participants. Developed 15+ reusable components and designed secure SQL-backed system for registrations and project submissions with strong validation workflows.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Firebase', 'Vercel'],
    color: '#3B82F6',
    image: '/images/sdi2025-preview.png',
    github: 'https://github.com/bimlesharma/sdi2025-website',
    demo: 'https://sdi2025.in',
  },
];

// export default function ProjectsSection() {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true });

//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const rotateX = useTransform(y, [-100, 100], [20, -20]);
//   const rotateY = useTransform(x, [-100, 100], [-20, 20]);

//   return (
//     <section
//       id="projects"
//       ref={sectionRef}
//       className="relative min-h-screen py-20 overflow-hidden bg-neutral-50 dark:bg-neutral-950"
//     >
//       {/* Grid background */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//             `,
//             backgroundSize: '50px 50px'
//           }}
//         />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent mb-4">
//             Featured Projects
//           </h2>
//           <p className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
//             A selection of my recent work, exploring cutting-edge web and AI technologies.
//           </p>
//         </motion.div>

//         {/* Projects grid */}

//       </div>
//     </section>
//   );
// }

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold text-sm border border-purple-200 dark:border-purple-800">
              ✨ Portfolio Showcase
            </span>
          </motion.div>

          <h2 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 dark:from-purple-400 dark:via-blue-400 dark:to-emerald-400 bg-clip-text text-transparent mb-6 leading-tight">
            Featured Projects
          </h2>
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Transforming ideas into reality through code, design, and innovation
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}


function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative group mb-32"
    >
      {/* Alternating Layout */}
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>

        {/* Image Side */}
        <motion.div
          className="w-full lg:w-1/2 relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow Effect */}
          <div
            className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, ${project.color} 0%, transparent 70%)`
            }}
          />

          {/* Image Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
            <div className="aspect-[16/10] relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Floating Number Badge */}
            <div
              className="absolute top-6 left-6 w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl"
              style={{ backgroundColor: project.color }}
            >
              {index + 1}
            </div>
          </div>
        </motion.div>

        {/* Content Side */}
        <div className="w-full lg:w-1/2 space-y-6">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight">
              {project.title}
            </h3>
            <div
              className="h-1.5 w-24 rounded-full"
              style={{ backgroundColor: project.color }}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {project.tech.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 rounded-xl font-semibold text-sm shadow-md border-2 transition-all"
                style={{
                  backgroundColor: `${project.color}15`,
                  borderColor: `${project.color}40`,
                  color: project.color,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl text-white font-bold shadow-lg flex items-center gap-2 transition-shadow hover:shadow-xl"
                style={{ backgroundColor: project.color }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Live
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-bold shadow-lg flex items-center gap-2 hover:bg-slate-900 dark:hover:bg-slate-600 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
