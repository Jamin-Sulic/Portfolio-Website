"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  onDoneTyping?: () => void;
}

export default function HeroSection({ onDoneTyping }: HeroSectionProps) {
  const [doneTyping, setDoneTyping] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);

  const roles = [
    "Developer – bridging business and technology through clean design and smart systems",
    "Thinker – transforming complex problems into elegant solutions",
    "Problem Solver – turning challenges into opportunities with innovation",
    "Creator – building experiences that make a difference",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDoneTyping(true);
      window.dispatchEvent(new Event("hero-done-typing"));
      if (onDoneTyping) onDoneTyping();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onDoneTyping]);

  useEffect(() => {
    if (!doneTyping) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [doneTyping, roles.length]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 text-center text-gray-900 transition-colors duration-500 ease-in-out dark:bg-[#0B0C10] dark:text-gray-100"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute inset-0" style={{ y: y1 }}>
          {[...Array(30)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-gray-400/30 dark:bg-blue-300/10"
              style={{
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        <motion.div className="absolute inset-0" style={{ y: y2 }}>
          {[...Array(50)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-gray-400/20 dark:bg-blue-400/20"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>

      {/* ✨ Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold flex flex-col sm:flex-row justify-center items-center sm:items-baseline text-center sm:text-left leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Zeile 1: Hi, I’m */}
          <span className="text-gray-900 dark:text-white sm:mr-3">
            Hi, I&apos;m
          </span>

          {/* Zeile 2 (bei Mobile): Jamin Sulic */}
          <motion.span
            className={`typewriter text-orange-600 dark:text-blue-400 mt-1 sm:mt-0 ${doneTyping ? "done" : ""}`}
          >
            Jamin&nbsp;Sulic
          </motion.span>
        </motion.h1>


        <motion.div
          className="text-lg md:text-xl max-w-2xl text-gray-700 dark:text-gray-300 mt-6"
          initial={{ opacity: 0 }}
          animate={doneTyping ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="mb-2">Based in Zürich, Switzerland 🇨🇭</p>
          <div className="min-h-[4rem] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {doneTyping && (
            <motion.div
              className="mt-10 flex justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                type="button"
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition hover:bg-orange-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
              >
                View Projects
              </motion.button>

              <motion.a
                href="/contact"
                className="rounded-lg border border-orange-500 px-6 py-3 font-medium text-orange-700 transition hover:bg-orange-600 hover:text-white dark:border-blue-500 dark:text-blue-300 dark:hover:bg-blue-500 dark:hover:text-white"
                whileHover={{ scale: 1.05 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
