'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio built using Next.js, Tailwind CSS, and Framer Motion to showcase my skills and projects.',
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
    image: '/projects/portfolio.png',
    github: 'https://github.com/username/portfolio',
    demo: 'https://yourportfolio.vercel.app',
  },
  {
    title: 'Chat App',
    description: 'A real-time decentralized chat application using Web3, Solidity, and React for censorship-resistant communication.',
    tech: ['Solidity', 'React', 'EduChain'],
    image: '/projects/chatapp.png',
    github: 'https://github.com/username/chat-app',
    demo: '',
  },
  {
    title: 'AI Image Generator',
    description: 'A multi-user platform to generate AI images with custom models trained from uploaded user data.',
    tech: ['Go', 'Next.js', 'Supabase'],
    image: '/projects/ai-generator.png',
    github: '',
    demo: '',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6 bg-white dark:bg-gray-950 text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Projects I've Built
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              {/* Project Image */}
              <div className="relative w-full h-56">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-4 text-xl">
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
          ))}
        </div>
      </div>
    </section>
  );
}
