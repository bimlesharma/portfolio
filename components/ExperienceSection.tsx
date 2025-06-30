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
    <section
      id="experience"
      className="relative py-20 min-h-screen bg-neutral-50 dark:bg-neutral-950"
    >
      {/* Grid Background (like Projects section) */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent mb-4">
            Experience
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
            A timeline of roles and internships that shaped my tech journey.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-gray-300 dark:border-gray-700 pl-6 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Dot on the timeline */}
              <div className="absolute -left-[13px] top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white dark:border-gray-950 shadow-md" />

              <div className="bg-white dark:bg-neutral-900/40 rounded-xl p-6 border border-gray-200 dark:border-gray-700 backdrop-blur-md shadow-sm transition hover:shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                <p className="text-gray-700 dark:text-gray-400">{exp.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{exp.date}</p>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  {exp.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
