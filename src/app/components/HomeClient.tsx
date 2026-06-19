"use client";

import { useEffect, useState } from "react";
import BootScreen from "./BootScreen";
import HeroSection from "./HeroSection";
import ExperienceTimeline from "./ExperienceTimeline";
import TechStackSection from "./TechStackSection";
import ProjectsSection from "./ProjectSection";
import AboutMeSection from "./AboutMeSection";
import MessageWall from "./MessageWall";
import Footer from "./Footer";

export default function HomeClient() {
  const [loading, setLoading] = useState(true);
  const [showExtras, setShowExtras] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors duration-500 dark:bg-[#0B0C10] dark:text-gray-100">
      {loading ? (
        <BootScreen />
      ) : (
        <>
          <HeroSection onDoneTyping={() => setShowExtras(true)} />

          {showExtras ? (
            <>
              <ExperienceTimeline />
              <TechStackSection />
              <ProjectsSection />
              <MessageWall />
              <AboutMeSection />
              <Footer />
            </>
          ) : null}
        </>
      )}
    </main>
  );
}
