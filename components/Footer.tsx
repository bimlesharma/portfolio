'use client';

import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        
        {/* Left: Name and Year */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Bimlesh. All rights reserved.
        </p>

        {/* Center: Navigation (Optional) */}
        {/* 
        <div className="flex gap-6 text-sm">
          <a href="#about" className="hover:underline">About</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
        */}

        {/* Right: Social Icons */}
        <div className="flex gap-4 text-xl">
          <a href="https://github.com/bimlesharma" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-blue-600 transition" />
          </a>
          <a href="https://linkedin.com/in/bimlesharma" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-blue-600 transition" />
          </a>
          <a href="https://twitter.com/bimlesharma" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-blue-600 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
