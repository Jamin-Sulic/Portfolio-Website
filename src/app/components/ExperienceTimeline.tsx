"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const experiences = [
  {
    period: "Jun 2025 – Sep 2025",
    title: "Julius Baer",
    role: "Robotic Process Automation Developer Intern",
    description:
      "Automated banking processes with UiPath and developed reusable RPA libraries. Built bots for trade automation, login flows, and process migration.",
  },
  {
    period: "Jan 2024 – Present",
    title: "Stewards",
    role: "Event Security / Team Lead",
    description:
      "Coordinated security teams and implemented safety procedures.",
  },
  {
    period: "Sep 2022 – Jan 2026",
    title: "University of Zurich",
    role: "B.Sc. Business Informatics (Minor: Banking & Finance)",
    description:
      "Studying IT, Finance and Business Informatics with a focus on data-driven systems.",
  },
  {
    period: "Sep 2016 – Aug 2022",
    title: "Highschool Limmattal",
    role: "Swiss Matura (PAM – Physics & Applied Mathematics)",
    description:
      "Graduated with a focus on mathematics and applied sciences.",
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
        {/* Vertikale Linie */}
        <div className="absolute left-[1.125rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500 rounded-full" />

        {experiences.map((exp, i) => (
          <TimelineItem key={i} exp={exp} />
        ))}
      </div>
    </section>
  );
}

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
            {/* Punkt exakt auf der Linie */}
            <motion.span
className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-400 ring-4 ring-white dark:ring-[#0B0C10]"               style={{
                transform: "translate(-50%, -50%)",
                backgroundColor: hovered
                  ? "rgb(245, 245, 255)" // leicht weißlich-blau
                  : "rgb(59,130,246)", // Tailwind blue-500
              }}
              animate={{
                scale: hovered ? 1.15 : 1,
                boxShadow: hovered
                  ? "0 0 8px 3px rgba(255,255,255,0.4)"
                  : "0 0 0px rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            />

            {/* Karte rechts */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
              className="ml-10 flex-1 bg-white dark:bg-[#0B0C10] border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 transition-colors duration-500 hover:border-blue-400"
            >
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {exp.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {exp.role}
              </p>
              <p className="text-sm italic text-gray-400 dark:text-gray-500">
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
