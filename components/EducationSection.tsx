'use client';

import { motion } from 'framer-motion';

const education = [
  {
    degree: 'B.Tech in Artificial Intelligence & Data Science',
    institution: 'University School of Automation & Robotics, GGSIPU',
    duration: '2022 – 2026',
    highlights: [
      'Jt. Secretary @ IEEE USAR',
      '8.5 CGPA (Top 10% of the class)',
      // 'Executive Member @ E-Cell, IIT Bombay',
      // 'Co-Founder @ TechNexus Community',
    ],
  },
  {
    degree: 'Senior Secondary (Class 12)',
    institution: 'XYZ Public School',
    duration: '2020 – 2021',
    highlights: ['92% in Board Exams', 'Grade A+'],
  },
  {
    degree: 'Secondary (Class 10)',
    institution: 'XYZ Public School',
    duration: '2018 – 2019',
    highlights: ['Best Student of the Year', '90% in Board Exams'],
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="relative py-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
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
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Education
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
            My academic background and key accomplishments through the years.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-gray-300 dark:border-gray-700 pl-6 space-y-12">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute -left-[13px] top-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-950 shadow-md" />

              <div className="bg-white dark:bg-neutral-900/40 rounded-xl p-6 border border-gray-200 dark:border-gray-700 backdrop-blur-md shadow-sm transition hover:shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                <p className="text-gray-700 dark:text-gray-400">{edu.institution}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{edu.duration}</p>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  {edu.highlights.map((point, i) => (
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
