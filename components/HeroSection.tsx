'use client';
import Image from 'next/image';
import { BrainCircuit, LayoutTemplate, Code, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { TypeAnimation } from 'react-type-animation';
import FloatingDockContainer from '@/components/FloatingDockContainer';

type SkillTagProps = {
  icon: React.ReactNode;
  text: string;
  position: string;
  color: 'green' | 'blue' | 'yellow';
};

const colorMap = {
  green: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  yellow: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
};

const SkillTag = ({ icon, text, position, color }: SkillTagProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 1 }}
    className={clsx(
      'absolute flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg rounded-full pl-2 px-4 py-2 transform transition-transform hover:scale-105 border border-slate-200 dark:border-slate-700',
      position
    )}
  >
    <div className={clsx('p-2 rounded-full', colorMap[color])}>{icon}</div>
    <span className="font-medium text-slate-800 dark:text-slate-100 text-sm md:text-base">
      {text}
    </span>
  </motion.div>
);

const HeroSection = () => {
  return (
    <div className="min-h-screen w-full font-sans overflow-x-hidden ">
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
              <p className="text-base text-blue-600 dark:text-blue-400 font-semibold">Hi, I&apos;m</p>
              <h1 className="text-5xl sm:text-5xl md:text-6xl font-extrabold leading-tight uppercase bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Bimlesh
              </h1>
              <div className='text-2xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mt-2 h-20 flex items-center'>
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'Software Engineer',
                    2000,
                    'AI Explorer',
                    2000,
                    'Problem Solver',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>
              <p className="hidden md:block text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto md:mx-0 mt-4">
                Full-stack engineer who builds fast, scalable, and deployment-ready systems. Experienced in real-time visualizations, multi-tenant SaaS, secure backend architectures, and high-traffic platforms.
              </p>
              <p className="hidden md:block text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto md:mx-0 mt-2">
                Strong engineering instincts around performance optimization, caching, API design, and system architecture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg transition duration-300 ease-in-out"
                >
                  View My Work
                </motion.a>

                <motion.a
                  href="/bimlesh_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative rounded-lg shadow-lg group cursor-pointer"
                >
                  <div className="relative px-6 py-3 rounded-lg overflow-hidden flex items-center justify-center">
                    {/* Rotating Gradient Ring */}
                    <motion.div
                      className="absolute inset-[-1000%]"
                      style={{
                        background: "conic-gradient(from 0deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Inner Background Mask */}
                    <div className="absolute inset-[2px] rounded-[6px] bg-white dark:bg-slate-800 transition-colors duration-300 group-hover:bg-blue-50 dark:group-hover:bg-slate-700" />

                    {/* Content */}
                    <div className="relative z-10 flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      My Resume
                      <ExternalLink size={20} />
                    </div>
                  </div>
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
                  text="GenAI Engineer"
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
