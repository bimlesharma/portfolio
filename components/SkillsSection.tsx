'use client';

import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiMongodb, SiTypescript, SiPostgresql } from 'react-icons/si';

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: <FaReact className="text-sky-500" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-400" /> },
      { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
      { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
    ],
  },
  {
    category: 'Backend & DB',
    items: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> },
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
      { name: 'PostgreSQL', icon: <SiPostgresql className="text-indigo-500" /> },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', icon: <FaGitAlt className="text-orange-600" /> },
      { name: 'GitHub', icon: <FaGithub className="text-gray-800 dark:text-white" /> },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-10 text-center"
        >
          My Tech Stack
        </motion.h2>

        {skills.map((group, index) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-10"
          >
            <h3 className="text-xl font-semibold mb-4">{group.category}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {group.items.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center justify-center space-y-2 hover:scale-110 transition-transform duration-200"
                >
                  <div className="text-4xl">{skill.icon}</div>
                  <p className="text-sm text-center">{skill.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
