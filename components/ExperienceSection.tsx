'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import PointerList from '@/components/PointerList';
import SectionHeader from '@/components/SectionHeader';

const experiences = [
  {
    role: 'Software Developer Intern',
    company: 'Government of India',
    logo: '/images/gov-india-logo.jpg',
    date: 'Jun 2025 – Sep 2025, Jan 2026 – Apr 2026',
    description: [
      'Architected and developed a full-stack WebGIS platform using Next.js, Express.js, and GeoServer to visualize 170+ Electronic Navigational Chart (ENC) layer types with interactive spatial analysis tools.',
      'Designed multi-tier system architecture (6 Docker Compose services, Nginx reverse proxy) with offline deployment support for air-gapped government environments (~1.1 GB self-contained package).',
      'Built project workspace state management that serializes entire user sessions — map viewport, layers, drawings, markers, imported files, tool states — into persistent JSON objects backed by Redis + MongoDB.',
      'Developed spatial analysis engine using PostGIS ST_Intersects with GiST indexing, supporting buffer queries across multiple geometry types (point, line, polygon, rectangle, circle, coordinates).',
    ]
  },
  {
    role: 'Web Developer Intern',
    company: 'CryptoWaley',
    logo: '/images/cryptowaley-logo.jpeg',
    date: 'Mar 2024 – Jun 2024',
    description: [
      'Engineered scalable and reusable React.js UI components, improving development speed by 30% and establishing a consistent design system across the platform.',
      'Developed a fully dynamic, SEO-friendly blog module supporting real-time content publishing, resulting in a 25% increase in user engagement and session duration.',
      'Optimized application performance through state management improvements, code-splitting, and memoization, delivering smoother interactions and faster load times.',
    ]
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-x-hidden bg-background py-12"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SectionHeader
            title="Work Experience"
            description="Professional journey and contributions"
          />
        </motion.div>

        <div className="space-y-4">
          {experiences.map((exp, index) => (
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
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border bg-background">
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          width={64}
                          height={64}
                          className="object-contain w-full h-full p-2"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary text-2xl font-bold text-primary-foreground">
                          {exp.company.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="mb-1 text-xl font-semibold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <Badge variant="outline">{exp.date}</Badge>
                </div>

                {/* Description */}
                <PointerList items={exp.description} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
