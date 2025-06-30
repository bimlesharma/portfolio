'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: 'Mock Project 1',
    description: 'A mock project to demonstrate the portfolio layout.',
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
    color: '#38BDF8',
    image: '/images/me.jpg',
    github: 'https://github.com/username/portfolio',
    demo: 'https://yourportfolio.vercel.app',
  },
  {
    title: 'Mock Project 2',
    description: 'A mock project to demonstrate the portfolio layout.',
    tech: ['Solidity', 'React', 'EduChain'],
    color: '#10B981',
    image: '/images/me.jpg',
    github: 'https://github.com/username/chat-app',
    demo: '',
  },
  {
    title: 'Mock Project 3',
    description: 'A mock project to demonstrate the portfolio layout.',
    tech: ['Go', 'Next.js', 'Supabase'],
    color: '#8B5CF6',
    image: '/images/me.jpg',
    github: '',
    demo: '',
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
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h- pb-32 py-20 overflow-hidden bg-neutral-50 dark:bg-neutral-950"
    >
      {/* ... your existing header and grid background ... */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
            A selection of my recent work, exploring cutting-edge web and AI technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}


function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [20, -20]);
  const rotateY = useTransform(x, [-100, 100], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Background radial glow */}
      <div
        className="absolute -inset-10 blur-3xl opacity-20 z-0"
        style={{
          background: `radial-gradient(circle at center, ${project.color}33 0%, transparent 80%)`
        }}
      />

      <motion.div
        className="relative z-10 w-full h-full bg-white dark:bg-neutral-900/20 border border-gray-200/30 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm p-4"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.3 }
        }}
      >
        {/* Floating sparkles */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: project.color,
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
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Image */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-2 relative z-10">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{project.description}</p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 mt-3 text-lg">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                <FaGithub />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
