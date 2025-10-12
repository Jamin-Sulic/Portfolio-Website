"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function TechBubblesSection() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const techs = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "JavaScript",
    "Python",
    "C++",
    "SQL",
    "Java",
    "VB.NET",
    "UiPath",
    "Spring Boot",
    "NumPy",
    "Node.js",
    "Regex",
    "HTML",
    "CSS",
    "Workflows",
    "Git",
    "Google Cloud",
  ];

  return (
    <section
      id="techbubbles"
      className="relative flex flex-col items-center justify-center py-32 bg-[#0B0C10] text-white overflow-hidden"
      onClick={() => open && setOpen(false)}
    >
      {/* Pop-Me-Balloon */}
      <AnimatePresence mode="wait">
        {!open && (
          <motion.div
            key="balloon"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="flex items-center justify-center w-44 h-44 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 shadow-2xl cursor-pointer select-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: [1, 1.2, 0.8, 1.4, 0],
              opacity: [1, 1, 1, 0.6, 0],
              rotate: [0, -10, 8, 0],
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-xl font-semibold">POP ME!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title erscheint nach dem Pop */}
      <AnimatePresence>
        {open && (
          <motion.h2
            key="title"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
            className="absolute text-3xl font-bold text-blue-400"
          >
            My Tech Universe
          </motion.h2>
        )}
      </AnimatePresence>

      {/* Orbit-Bubbles */}
      <AnimatePresence>
        {open && (
          <div
            key="orbit"
            className="absolute top-1/2 left-1/2 w-[620px] h-[620px] -translate-x-1/2 -translate-y-1/2"
          >
            {techs.map((tech, i) => {
              const radius = 240; // Abstand
              const angle = (i / techs.length) * 2 * Math.PI;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              // Wenn gehovt → kommt in die Mitte
              const active = hovered === tech;

              return (
                <motion.div
                  key={tech}
                  onMouseEnter={() => setHovered(tech)}
                  onMouseLeave={() => setHovered(null)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: active ? 1.4 : 1,
                    x: active ? 0 : x,
                    y: active ? 0 : y,
                    zIndex: active ? 50 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                    delay: i * 0.02,
                  }}
                  className={`absolute top-1/2 left-1/2 w-24 h-24 flex items-center justify-center rounded-full text-xs font-medium select-none
                    ${active
                      ? "bg-gradient-to-br from-blue-500 to-blue-300 shadow-blue-400/60 shadow-xl"
                      : "bg-gradient-to-br from-blue-800 to-blue-500 shadow-md"
                    }`}
                >
                  <motion.span
                    animate={{
                      y: [0, -6, 0, 4, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 6 + Math.random() * 3,
                      ease: "easeInOut",
                    }}
                  >
                    {tech}
                  </motion.span>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Untertitel für gehovte Bubble */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="hoverlabel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 text-lg font-medium text-blue-300"
          >
            {hovered}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hintergrund-Glow */}
      <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-t from-blue-300/10 via-transparent to-blue-600/10" />
    </section>
  );
}
