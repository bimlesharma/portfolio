'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import PointerList from '@/components/PointerList';
import SectionHeader from '@/components/SectionHeader';

const education = [
  {
    degree: 'B.Tech in Artificial Intelligence & Data Science',
    institution: 'Guru Gobind Singh Indraprastha University, New Delhi',
    duration: '2022 – 2026',
    highlights: [
      'CGPA: 8.53',
      'Joint Secretary @ IEEE USAR',
    ],
  },
  {
    degree: 'CBSE Class XII',
    institution: 'Smt. Misri Devi Gyan Niketan, New Delhi',
    duration: '2021',
    highlights: ['91.84% in Board Exams'],
  },
  {
    degree: 'CBSE Class X',
    institution: 'Adarsh Jain Dharmik Shiksha Sadan, New Delhi',
    duration: '2019',
    highlights: ['87.17% in Board Exams'],
  },
];

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative bg-background py-12"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SectionHeader
            title="Education"
            description="Academic background and achievements"
          />
        </motion.div>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <Card className="py-5">
                <CardContent>
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="mb-1 text-xl font-semibold text-foreground">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  <Badge variant="outline">{edu.duration}</Badge>
                </div>

                {/* Highlights */}
                <PointerList items={edu.highlights} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
