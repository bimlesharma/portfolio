'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Software Developer Intern',
    company: 'Government of India',
    logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQGEkNw8gQ527g/company-logo_200_200/company-logo_200_200/0/1696920514115?e=2147483647&v=beta&t=OmAFbSl_dqMKQJIRP86cW2HYfNS-kbOIkWBs-8eo_Sc',
    date: 'Jun 2025 – Sep 2025, Jan 2026 – Present',
    description: [
      'Built interactive GIS-based web interfaces using React.js, enabling smooth navigation across complex multi-layer map views.',
      'Improved frontend rendering performance by 40% through optimized state updates and efficient component re-renders.',
      'Designed offline-capable UI workflows to support users on restricted-network government systems.',
      'Integrated real-time geospatial layers (WMS/WFS) into frontend components for dynamic data visualization.'
    ]
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative py-20 min-h-screen bg-white dark:bg-slate-900 overflow-x-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Professional journey and contributions
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

              <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    {/* Company Icon */}
                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          width={64}
                          height={64}
                          className="object-contain w-full h-full p-2"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                          {exp.company.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Date Badge */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      {exp.date}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  {exp.description.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
