'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left - Textual Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-5 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
            Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">Bimlesh</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300">
            Full Stack Developer & AI Explorer 🚀
          </h2>
          <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 max-w-md">
            I build blazing fast, accessible, and beautiful web apps with React, Node, and AI-powered features.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold shadow hover:bg-blue-700 transition"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-2xl font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition"
            >
              Contact Me
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 mt-4 justify-center md:justify-start">
            <a href="https://github.com/bimlesharma" target="_blank" rel="noopener noreferrer">
              <FaGithub size={28} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition" />
            </a>
            <a href="https://linkedin.com/in/bimlesharma" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={28} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition" />
            </a>
            <a href="https://twitter.com/bimlesharma" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={28} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition" />
            </a>
          </div>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex justify-center"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 relative">
            <Image
              src="/images/me.jpg"
              alt="Profile image"
              fill
              className="rounded-full object-cover shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
