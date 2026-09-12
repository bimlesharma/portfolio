import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import WorkSection from '@/components/WorkSection';
import ContactCta from '@/components/ContactCta';
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
      <AchievementsSection />
      <ContactCta />
      <Footer />
      <BackToTopButton />
      <AnimatedBackground />
    </main>
  );
}
