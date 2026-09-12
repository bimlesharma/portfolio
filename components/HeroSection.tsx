'use client';
import { BrainCircuit, LayoutTemplate, Code } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';
import { TypeAnimation } from 'react-type-animation';
import AsciiPortrait from '@/components/AsciiPortrait';
import CursorEffect from '@/components/CursorEffect';

type SkillTagProps = {
  icon: React.ReactNode;
  text: string;
  position: string;
};

const SkillTag = ({ icon, text, position }: SkillTagProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 1 }}
    className={clsx(
      'absolute flex items-center gap-1.5 rounded-none border border-zinc-200 bg-white/80 py-1.5 pr-3 pl-1.5 shadow-sm backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/80',
      position
    )}
  >
    <div className="bg-zinc-100 p-1.5 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">{icon}</div>
    <span className="text-xs font-medium text-zinc-800 md:text-sm dark:text-zinc-100">
      {text}
    </span>
  </motion.div>
);

const HeroSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div id="home" className="relative min-h-screen w-full overflow-hidden bg-transparent font-sans">
      <CursorEffect />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main Section */}
        <main className="mt-20 lg:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8 }}
              className="text-center lg:text-left flex flex-col items-center lg:items-start px-4 sm:px-6 lg:px-0"
            >
              <p className="font-mono text-base font-semibold tracking-widest text-muted-foreground uppercase">Hi, I&apos;m</p>
              <h1 className="text-5xl font-extrabold text-foreground uppercase sm:text-5xl md:text-6xl">
                Bimlesh
              </h1>
              <div className='mt-2 flex h-20 items-center text-2xl font-bold text-foreground sm:text-2xl md:text-3xl'>
                {reduceMotion ? (
                  <span>Full Stack Developer</span>
                ) : (
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
                )}
              </div>
              <p className="mx-auto mt-4 hidden max-w-xl text-lg text-muted-foreground md:mx-0 md:block">
                Full-stack engineer passionate about building scalable, production-grade systems. Experienced in real-time visualizations, multi-tenant SaaS, GenAI-powered platforms, and containerized deployments.
              </p>
              <p className="mx-auto mt-2 hidden max-w-xl text-lg text-muted-foreground md:mx-0 md:block">
                Strong instincts around system design, performance optimization, caching, and security.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
                <motion.a
                  href="#work"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm transition duration-300 ease-in-out hover:bg-primary/90"
                >
                  View My Work
                </motion.a>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative cursor-pointer border border-border bg-background shadow-sm"
                >
                  <div className="relative flex items-center justify-center overflow-hidden px-6 py-3">
                    <div className="relative z-10 font-semibold text-foreground">
                      Let&apos;s Connect
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
              className="relative mb-10 -mt-12 flex h-[500px] items-center justify-center md:mt-0 lg:mb-0 lg:h-[650px]"
            >
              <div className="z-0 w-full h-full max-w-sm md:max-w-md lg:max-w-lg flex items-end justify-center rounded-b-full overflow-hidden">
                <AsciiPortrait
                  imageSrc="/images/me2.png"
                  cols={135}
                  revealRadius={100}
                />
              </div>

              {/* Floating Skill Tags */}
              <div className="hidden md:block">
                <SkillTag
                  icon={<BrainCircuit size={16} />}
                  text="Problem Solving"
                  position="top-10 left-0"
                />
                <SkillTag
                  icon={<LayoutTemplate size={16} />}
                  text="GenAI Engineer"
                  position="top-1/3 -right-8"
                />
                <SkillTag
                  icon={<Code size={16} />}
                  text="Software Development"
                  position="top-2/3 -left-10"
                />
              </div>
            </motion.div>
          </div>
        </main>
      </div>

    </div>
  );
};

export default HeroSection;
