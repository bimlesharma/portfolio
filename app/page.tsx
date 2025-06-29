'use client';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';
import {ModeToggle} from '@/components/ModeToggle';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <main>
      <ModeToggle />
      <HeroSection />
      {/* <AboutSection /> */}
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
      <Footer />
      <BackToTopButton />
      <AnimatedBackground />
      {/* <AnimatedBackground
        // direction="diagonal"
        // speed={0.6}
        // squareSize={50}
        // borderColor="#444"
        // hoverFillColor="#1e1e1e"
      /> */}
      {/* <FloatingDock /> */}
    </main>
  );
}
