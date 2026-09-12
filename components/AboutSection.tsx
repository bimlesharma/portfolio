'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PointerList from '@/components/PointerList';

export default function AboutSection() {
  return (
    <section id="about" className="bg-background py-12 text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 sm:px-6 lg:px-8 md:flex-row">
        
        {/* Left - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative h-56 w-56 overflow-hidden border">
            <Image
              src="/images/me.jpg"
              alt="About me image"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Right - Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full space-y-4 md:w-1/2"
        >
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About Me
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Hey there! I&apos;m <strong>Bimlesh</strong>, a full-stack engineer who architects and ships production-grade systems end-to-end. I specialize in building fast, scalable, and deployment-ready platforms.
            <br /><br />
            I work with modern technologies like <strong>React</strong>, <strong>Next.js</strong>, <strong>Express.js</strong>, <strong>MongoDB</strong>, <strong>PostgreSQL</strong>, <strong>Redis</strong>, and <strong>Docker</strong>. I&apos;m also deeply interested in <strong>AI/ML</strong> and building intelligent, data-driven applications.
          </p>
          <PointerList
            items={[
              '2+ years of full-stack development experience',
              'Built production systems for Government of India',
              'Exploring AI, GenAI, and creative tech',
              'Based in New Delhi, India',
            ]}
          />
        </motion.div>

      </div>
    </section>
  );
}
