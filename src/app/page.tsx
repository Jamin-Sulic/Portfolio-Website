"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootScreen from "./components/BootScreen";
import HeroSection from "./components/HeroSection";
import ThemeSwitch from "./components/ThemeSwitch";
import ExperienceTimeline from "./components/ExperienceTimeline";
import TechStackSection from "./components/TechStackSection";
import SocialBubbles from "./components/SocialsBubbles";
import ProjectsSection from "./components/ProjectSection";
import AboutMeSection from "./components/AboutMeSection";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showExtras, setShowExtras] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-[#0B0C10] dark:text-gray-100 transition-colors duration-500">
      {loading ? (
        <BootScreen />
      ) : (
        <>
          {/* HeroSection gibt Callback, wenn Typing vorbei ist */}
          <HeroSection onDoneTyping={() => setShowExtras(true)} />

          {/* Sequenziell: MenuBar, SocialBubbles, ThemeSwitch */}
          <AnimatePresence>
            {showExtras && (
              <>
                {/* MenuBar von links */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 25, delay: 0.5 }}
                  className="fixed top-0 left-0 z-50"
                >
                  <MenuBar />
                </motion.div>

                {/* SocialBubbles von rechts unten */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 25, delay: 0.5 }}
                  className="fixed bottom-0 right-0 z-50"
                >
                  <SocialBubbles />
                </motion.div>

                {/* ThemeSwitch von rechts oben */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 25, delay: 0.5 }}
                  className="fixed top-0 right-0 z-50"
                >
                  <ThemeSwitch />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Rest der Page */}
          <ExperienceTimeline />
          <TechStackSection />
          <ProjectsSection />
          <AboutMeSection />
          <Footer scrollToSection={scrollToSection} />
        </>
      )}
    </main>
  );
}
