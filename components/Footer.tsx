'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/bimlesharma', label: 'GitHub', color: '#333' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/bimlesharma', label: 'LinkedIn', color: '#0A66C2' },
    { icon: FaTwitter, href: 'https://twitter.com/bimlesharma', label: 'Twitter', color: '#1DA1F2' },
  ];

  return (
    <footer className="relative bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Bimlesh
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Full-stack engineer crafting scalable solutions and innovative web experiences.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <FaMapMarkerAlt className="text-emerald-400" />
              <span>New Delhi, India</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-200" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:bimlesh.mdb@gmail.com"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
                >
                  <FaEnvelope className="text-blue-400" />
                  bimlesh.mdb@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/bimlesharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
                >
                  <FaLinkedin className="text-blue-400" />
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/bimlesharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
                >
                  <FaGithub className="text-blue-400" />
                  GitHub Profile
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  aria-label={social.label}
                >
                  <social.icon className="text-lg text-slate-400 group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Let&apos;s Work Together
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-2"
          >
            © {currentYear} Bimlesh. Built with
            <FaHeart className="text-red-500 animate-pulse" />
            using Next.js & Tailwind CSS
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-slate-600"
          >
            Designed & Developed by Bimlesh Sharma
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
