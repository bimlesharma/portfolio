// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import { Menu, X, BrainCircuit, LayoutTemplate, Code } from 'lucide-react';
// import { motion } from 'framer-motion';
// import clsx from 'clsx';
// import FloatingDockContainer from '@/components/FloatingDockContainer';

// type SkillTagProps = {
//   icon: React.ReactNode;
//   text: string;
//   position: string;
//   color: 'green' | 'blue' | 'yellow';
// };

// const colorMap = {
//   green: 'bg-green-100 text-green-600',
//   blue: 'bg-blue-100 text-blue-600',
//   yellow: 'bg-yellow-100 text-yellow-500',
// };

// const SkillTag = ({ icon, text, position, color }: SkillTagProps) => (
//   <div
//     className={clsx(
//       'absolute flex items-center gap-2 bg-white/50 dark:bg-white/10 backdrop-blur-sm shadow-lg rounded-full pl-2 px-4 py-2 transform transition-transform hover:scale-105',
//       position
//     )}
//   >
//     <div className={clsx('p-2 rounded-full', colorMap[color])}>{icon}</div>
//     <span className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base">
//       {text}
//     </span>
//   </div>
// );

// const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
//   <a href={href} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition-colors">
//     {children}
//   </a>
// );

// const HeroSection = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navLinks = [
//     { href: '#', text: 'About' },
//     { href: '#', text: 'Service' },
//     { href: '#', text: 'Works' },
//     { href: '#', text: 'Products' },
//     { href: '#', text: 'Contact' },
//   ];

//   return (
//     <div className="min-h-screen w-full font-sans overflow-hidden ">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         {/* <header className="flex justify-between items-center py-6">
//           <h1 className="text-3xl font-bold">bimlesh.</h1>
//           <nav className="hidden lg:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <NavLink key={link.text} href={link.href}>
//                 {link.text}
//               </NavLink>
//             ))}
//           </nav>
//           <div className="hidden lg:flex items-center">
//             <a
//               href="#contact"
//               className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition-opacity"
//             >
//               Connect with me
//             </a>
//           </div>
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="lg:hidden text-gray-800 dark:text-white"
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </header> */}

//         {/* Mobile Menu */}
//         {/* {isMenuOpen && (
//           <div className="lg:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg p-6 shadow-xl absolute top-20 left-4 right-4 z-50">
//             <nav className="flex flex-col items-center gap-4">
//               {navLinks.map((link) => (
//                 <NavLink key={link.text} href={link.href}>
//                   {link.text}
//                 </NavLink>
//               ))}
//               <a
//                 href="#contact"
//                 className="w-full text-center mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition-opacity"
//               >
//                 Sign up
//               </a>
//             </nav>
//           </div>
//         )} */}

//         {/* Main Section */}
//         <main className="mt-12 lg:mt-32">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             {/* Left */}
//             <div className="text-center lg:text-left flex flex-col items-center lg:items-start px-4 sm:px-6 lg:px-0">
//               <p className="text-base text-blue-500 font-semibold">Hello, I’m</p>
//               <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
//                 Bimlesh Sharma
//               </h1>
//               <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto md:mx-0 mt-4">
//                 Full Stack Developer • AI Explorer • Tech Storyteller.
//                 <br />
//                 I craft blazing-fast apps with Next.js, Node, and cutting-edge AI integrations.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
//                 <motion.a
//                   href="#projects"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition"
//                 >
//                   🚀 View My Work
//                 </motion.a>
//                 <motion.a
//                   href="#contact"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition"
//                 >
//                   ✉️ Contact Me
//                 </motion.a>
//               </div>
//             </div>

//             {/* Right */}
//             <div className="relative flex justify-center items-center h-[500px] lg:h-[650px] mb-10 -mt-12 md:mt-0 lg:mb-0 bg-pink-80">
//               <div className="z-0 w-full h-full max-w-sm md:max-w-md lg:max-w-lg flex items-end justify-center rounded-b-full overflow-hidden">
//                 <Image
//                   src="/images/me2.png"
//                   alt="Bimlesh Sharma"
//                   width={450}
//                   height={600}
//                   priority
//                   className="object-contain object-bottom h-full"
//                 />
//               </div>

//               {/* Floating Skill Tags */}
//               <div className="hidden md:block">
//                 <SkillTag
//                   icon={<BrainCircuit size={20} />}
//                   text="Problem Solving"
//                   position="top-10 left-0"
//                   color="green"
//                 />
//                 <SkillTag
//                   icon={<LayoutTemplate size={20} />}
//                   text="UI/UX Design"
//                   position="top-1/3 -right-8"
//                   color="blue"
//                 />
//                 <SkillTag
//                   icon={<Code size={20} />}
//                   text="Software Development"
//                   position="top-2/3 -left-10"
//                   color="yellow"
//                 />
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Dock */}
//       <FloatingDockContainer />
//     </div>
//   );
// };

// export default HeroSection;






'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X, BrainCircuit, LayoutTemplate, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import FloatingDockContainer from '@/components/FloatingDockContainer';

type SkillTagProps = {
  icon: React.ReactNode;
  text: string;
  position: string;
  color: 'green' | 'blue' | 'yellow';
};

const colorMap = {
  green: 'bg-green-100 text-green-600',
  blue: 'bg-blue-100 text-blue-600',
  yellow: 'bg-yellow-100 text-yellow-500',
};

const SkillTag = ({ icon, text, position, color }: SkillTagProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 1 }}
    className={clsx(
      'absolute flex items-center gap-2 bg-white/50 dark:bg-white/10 backdrop-blur-sm shadow-lg rounded-full pl-2 px-4 py-2 transform transition-transform hover:scale-105',
      position
    )}
  >
    <div className={clsx('p-2 rounded-full', colorMap[color])}>{icon}</div>
    <span className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base">
      {text}
    </span>
  </motion.div>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition-colors">
    {children}
  </a>
);

const HeroSection = () => {
  return (
    <div className="min-h-screen w-full font-sans overflow-hidden ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section */}
        <main className="mt-12 lg:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left flex flex-col items-center lg:items-start px-4 sm:px-6 lg:px-0"
            >
              <p className="text-base text-blue-500 font-semibold">Hi, I’m</p>
              <h1 className="text-5xl sm:text-5xl md:text-6xl font-extrabold leading-tight uppercase">
                Bimlesh
              </h1>
              <h2 className='text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2'>
                Full Stack Developer • Programmer • AI Explorer
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto md:mx-0 mt-4">
                Building Applications with Modern Technologies and cutting-edge AI integrations.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto md:mx-0 mt-4">
                Let’s connect and create something impactful together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-3 rounded-lg bg-gray-900 text-white dark:text font-semibold shadow-md transition duration-300 ease-in-out hover:shadow-[0_0_20px_4px_rgba(255,0,255,0.6)] hover:ring-2 hover:ring-pink-500 hover:ring-offset-2 hover:ring-offset-black"
                >
                  View My Work
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-3 rounded-lg bg-gray-900 text-white dark:text font-semibold shadow-md transition duration-300 ease-in-out hover:shadow-[0_0_20px_4px_rgba(0,255,255,0.5)] hover:ring-2 hover:ring-cyan-400 hover:ring-offset-2 hover:ring-offset-black"
                >
                  Contact With Me
                </motion.a>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center items-center h-[500px] lg:h-[650px] mb-10 -mt-12 md:mt-0 lg:mb-0 bg-pink-80"
            >
              <div className="z-0 w-full h-full max-w-sm md:max-w-md lg:max-w-lg flex items-end justify-center rounded-b-full overflow-hidden">
                <Image
                  src="/images/me2.png"
                  alt="Bimlesh Sharma"
                  width={450}
                  height={600}
                  priority
                  className="object-contain object-bottom h-full"
                />
              </div>

              {/* Floating Skill Tags */}
              <div className="hidden md:block">
                <SkillTag
                  icon={<BrainCircuit size={20} />}
                  text="Problem Solving"
                  position="top-10 left-0"
                  color="green"
                />
                <SkillTag
                  icon={<LayoutTemplate size={20} />}
                  text="UI/UX Design"
                  position="top-1/3 -right-8"
                  color="blue"
                />
                <SkillTag
                  icon={<Code size={20} />}
                  text="Software Development"
                  position="top-2/3 -left-10"
                  color="yellow"
                />
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Dock */}
      <FloatingDockContainer />
    </div>
  );
};

export default HeroSection;
