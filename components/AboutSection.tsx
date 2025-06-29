'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="w-64 h-64 relative rounded-2xl overflow-hidden shadow-lg">
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
          className="w-full md:w-1/2 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            About Me
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-md leading-relaxed">
            Hey there! I&apos;m <strong>Bimlesh</strong>, a passionate full stack developer with a love for clean code, thoughtful UX, and building things that matter.
            <br /><br />
            I specialize in creating fast, responsive, and accessible web apps using modern technologies like <strong>React</strong>, <strong>Next.js</strong>, <strong>Node.js</strong>, and <strong>Tailwind CSS</strong>. I&apos;m also deeply interested in <strong>AI/ML</strong> and how it intersects with web applications.
          </p>
          <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
            <li>💻 1+ years of full-stack experience</li>
            <li>🧠 Always exploring AI + creative tech</li>
            <li>🌍 Based in Delhi, India</li>
            <li>☕ Coffee + code = productivity</li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
