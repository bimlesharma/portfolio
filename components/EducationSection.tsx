'use client';

import { motion } from 'framer-motion';

const education = [
  {
    degree: 'B.Tech in Artificial Intelligence & Data Science',
    institution: 'University School of Automation & Robotics, GGSIPU',
    duration: '2022 – 2026',
    highlights: [
      'Media Head @ IEEE USAR',
      'Executive Member @ E-Cell, IIT Bombay',
      'General Manager @ TechNexus Community',
    ],
  },
  {
    degree: 'Senior Secondary (Class 12)',
    institution: 'XYZ Public School',
    duration: '2020 – 2022',
    highlights: ['92% overall with Computer Science as major'],
  },
  {
    degree: 'Secondary (Class 10)',
    institution: 'XYZ Public School',
    duration: '2018 – 2020',
    highlights: ['Top 5% in School in Board Exams'],
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-20 px-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Education
        </motion.h2>

        <div className="relative border-l border-gray-300 dark:border-gray-700 pl-6 space-y-10">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute left-[-11px] top-1 w-4 h-4 bg-green-600 rounded-full border-2 border-white dark:border-gray-950" />

              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{edu.duration}</p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                {edu.highlights.map((point, i) => (
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
