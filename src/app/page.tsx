"use client";

import { useState, useEffect } from "react";
import BootScreen from "./components/BootScreen";
import HeroSection from "./components/HeroSection";
import ThemeSwitch from "./components/ThemeSwitch";
import ExperienceTimeline from "./components/ExperienceTimeline";
import TechStackSection from "./components/TechStackSection";


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
<main className="min-h-screen bg-white text-gray-900 dark:bg-[#0B0C10] dark:text-gray-100 transition-colors duration-500">
  {loading ? <BootScreen /> : <HeroSection />}
  <ExperienceTimeline />
  <TechStackSection />
</main>

  );
}
