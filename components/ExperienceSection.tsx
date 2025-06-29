'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Full Stack Web Developer',
    company: 'Cryptowaley',
    date: 'Jan 2024 – Present',
    description: [
      'Developed scalable Web3 applications with React.js and Solidity.',
      'Optimized frontend performance by 30% using Next.js and dynamic imports.',
      'Built authentication flows using MetaMask and ENS integration.'
    ]
  },
  {
    role: 'Data Analyst Intern',
    company: 'Ernst & Young (EY)',
    date: 'Jun 2023 – Dec 2023',
    description: [
      'Cleaned and visualized financial data using Python and Power BI.',
      'Generated insights from large datasets to improve business decisions.',
      'Collaborated with senior analysts to automate monthly reporting.'
    ]
  },
  {
    role: 'IBM AI Intern',
    company: 'IBM',
    date: 'Jan 2023 – May 2023',
    description: [
      'Trained NLP models using Python and Hugging Face Transformers.',
      'Integrated chatbots into IBM Watson platforms for internal tools.',
      'Published internal technical documentation and research summaries.'
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Experience
        </motion.h2>

        <div className="relative border-l border-gray-300 dark:border-gray-700 pl-6 space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Dot on the timeline */}
              <div className="absolute left-[-11px] top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white dark:border-gray-950" />

              <h3 className="text-xl font-semibold">{exp.role}</h3>
              <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{exp.date}</p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                {exp.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
