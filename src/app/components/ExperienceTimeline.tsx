"use client";

import { Variants, Transition, motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const experiences = [
  {
    period: "Jun 2025 – Sep 2025",
    title: "Julius Baer",
    role: "Robotic Process Automation Developer Intern",
    description:
      "Automated banking processes with UiPath and developed reusable RPA libraries. Built bots for trade automation, login flows, and process migration.",
    logo: "/JB.png",
    bgColor: "bg-white dark:bg-gray-800",
    logoClass: "scale-240",
  },
  {
    period: "Sep 2022 – Jan 2026",
    title: "University of Zurich",
    role: "B.Sc. Business Informatics (Minor: Banking & Finance)",
    description:
      "Studying IT, Finance and Business Informatics with a focus on data-driven systems.",
    logo: "/UZH.jpg",
    bgColor: "bg-white dark:bg-gray-800",
  },
  {
    period: "Sep 2016 – Aug 2022",
    title: "Kantonsschule Limmattal",
    role: "Swiss Matura (PAM – Physics & Applied Mathematics)",
    description:
      "Graduated with a focus on mathematics and applied sciences.",
    logo: "/KSL.png",
    bgColor: "bg-white dark:bg-gray-800"
  },
];

export default function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="relative max-w-4xl mx-auto py-24 px-6 text-gray-900 dark:text-gray-100"
    >
      <h2 className="text-3xl font-bold mb-20 text-center">
        Experience & Education
      </h2>

      <div className="relative pl-10">
        {/* Vertical timeline line */}
        <div className="absolute left-[2.5rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500 rounded-full" />

        {experiences.map((exp, i) => (
          <TimelineItem key={i} exp={exp} />
        ))}
      </div>
    </section>
  );
}

// Reusable variants for smooth pulsing hover animation
import { easeInOut } from "framer-motion";
const cardVariants: Variants = {
  hidden: {
    scale: 0.95,
    opacity: 0,
    borderColor: "#ffffff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    transition: { duration: 0.45, ease: easeInOut } as Transition,
  },
  rest: {
    scale: 1,
    opacity: 1,
    borderColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    transition: { duration: 0.4, ease: easeInOut } as Transition,
  },
  hover: {
    borderColor: "#60a5fa",
    // Keep visible and reset any scale/opacity from the hidden state
    scale: 1,
    opacity: 1,
    boxShadow: "0 12px 30px rgba(96,165,250,0.18)",
    transition: { duration: 0.35, ease: easeInOut } as Transition,
  },
};

function TimelineItem({ exp }: { exp: any }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="relative mb-24 flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {inView && (
          <>
            {/* Left side: logo + timeline line */}
            <div className="relative flex flex-col items-center">

              {/* Logo Circle */}
              <motion.div
                className="relative flex flex-col items-center -ml-9.5"                
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 1 }}
                transition={{ duration: 1.5, type: "spring" }}
                
              >
                {/* Holo Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{
                    opacity: hovered ? 1 : 0,
                    scale: hovered ? 1.15 : 0.8,
                  }}
                  transition={{ duration: 0.4, ease: easeInOut } as Transition}
                  style={{
                    background:
                      "conic-gradient(from 0deg, #60a5fa, #a78bfa, #ec4899, #f59e0b, #60a5fa)",
                    width: "80px",
                    height: "80px",
                    filter: "blur(6px)",
                    zIndex: 0,
                  }}
                />

                {/* Logo */}
                <motion.div
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden
                             border-4 border-white dark:border-gray-900 shadow-xl z-10
                             ${exp.bgColor}`}
                  animate={{
                    scale: hovered ? 1.1 : 1,
                    boxShadow: hovered
                      ? "0 0 25px rgba(96,165,250,0.4)"
                      : "0 8px 15px rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={exp.logo}
                    alt={exp.title}
                    className={`w-full h-full object-contain p-0 scale-105 ${
                      (exp as any).logoClass ?? ""
                    }`}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Right side: text card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate={inView ? (hovered ? "hover" : "rest") : "hidden"}
              className="ml-10 flex-1 bg-white dark:bg-[#0B0C10] rounded-lg p-6 border-2 border-solid"
            >
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {exp.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                {exp.role}
              </p>
              <p className="text-sm italic text-gray-400 dark:text-gray-500 mt-1">
                {exp.period}
              </p>
              <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
