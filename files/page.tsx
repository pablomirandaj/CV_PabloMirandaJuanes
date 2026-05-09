import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";

// Heavy components loaded client-side only
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const ParticlesBackground = dynamic(() => import("@/components/ui/ParticlesBackground"), { ssr: false });
const ScrollProgressBar = dynamic(() => import("@/components/ui/ScrollProgressBar"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Global UI chrome */}
      <CustomCursor />
      <ParticlesBackground />
      <ScrollProgressBar />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
