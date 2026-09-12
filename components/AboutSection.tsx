'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="bg-background px-6 py-12 text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row">
        
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
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            About Me
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Hey there! I&apos;m <strong>Bimlesh</strong>, a full-stack engineer who architects and ships production-grade systems end-to-end. I specialize in building fast, scalable, and deployment-ready platforms.
            <br /><br />
            I work with modern technologies like <strong>React</strong>, <strong>Next.js</strong>, <strong>Express.js</strong>, <strong>MongoDB</strong>, <strong>PostgreSQL</strong>, <strong>Redis</strong>, and <strong>Docker</strong>. I&apos;m also deeply interested in <strong>AI/ML</strong> and building intelligent, data-driven applications.
          </p>
          <ul className="list-disc pl-5 text-muted-foreground">
            <li>💻 2+ years of full-stack development experience</li>
            <li>🏛️ Built production systems for Government of India</li>
            <li>🧠 Exploring AI + GenAI + creative tech</li>
            <li>🌍 Based in New Delhi, India</li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
