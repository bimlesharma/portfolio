import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import WorkSection from '@/components/WorkSection';
import ContactSection from '@/components/ContactSection';
import ExperienceSection from '@/components/ExperienceSection';
import AchievementsSection from '@/components/AchievementsSection';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <WorkSection />
      <SkillsSection />
      <ExperienceSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
      <BackToTopButton />
      <AnimatedBackground />
    </main>
  );
}
