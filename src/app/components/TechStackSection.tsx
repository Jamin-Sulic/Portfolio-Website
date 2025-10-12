"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaReact,
  FaPython,
  FaJava,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiSpringboot,
  SiNodedotjs,
  SiGooglecloud,
  SiUipath,
  SiMysql,
} from "react-icons/si";

export default function TechBubblesSection() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const techs = [
    { name: "React", icon: <FaReact className="text-sky-400" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-gray-900 dark:text-gray-100" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-sky-400" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "Python", icon: <FaPython className="text-yellow-400" /> },
    { name: "C++", icon: <SiCplusplus className="text-blue-500" /> },
    { name: "Java", icon: <FaJava className="text-red-500" /> },
    { name: "UiPath", icon: <SiUipath className="text-orange-400" /> },
    { name: "Spring Boot", icon: <SiSpringboot className="text-green-500" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-400" /> },
    { name: "MySQL", icon: <SiMysql className="text-blue-400" /> },
    { name: "Google Cloud", icon: <SiGooglecloud className="text-indigo-400" /> },
    { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
  ];

  return (
    <section
      id="techbubbles"
      key="techbubbles"
      className="relative flex flex-col items-center justify-center min-h-screen
                bg-gray-100 text-gray-900 
                dark:bg-[#0B0C10] dark:text-white 
                overflow-hidden transition-colors duration-700 ease-in-out"
      onClick={() => open && setOpen(false)}
    >
      {/* Container für zentrierte Positionierung */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Pop-Me-Balloon */}
        <AnimatePresence mode="wait">
          {!open && (
            <motion.div
              key="balloon"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         flex items-center justify-center w-44 h-44 rounded-full 
                         bg-gradient-to-br from-blue-600 to-blue-400 shadow-2xl 
                         cursor-pointer select-none"
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
              <span className="text-xl font-semibold text-white">POP ME!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title */}
        <AnimatePresence>
          {open && (
            <motion.h2
              key="title"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-32
                         text-3xl font-bold text-blue-400"
            >
              My Tech Universe
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Orbit Bubbles */}
        <AnimatePresence>
          {open && (
            <div
              key="orbit"
              className="relative w-[680px] h-[680px]"
            >
              {techs.map((tech, i) => {
                const radius = 260;
                const angle = (i / techs.length) * 2 * Math.PI;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const active = hovered === tech.name;

                return (
                  <motion.div
                    key={tech.name}
                    onMouseEnter={() => setHovered(tech.name)}
                    onMouseLeave={() => setHovered(null)}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: 1,
                      scale: active ? 1.25 : 1,
                      x: active ? 0 : x,
                      y: active ? 0 : y,
                      zIndex: active ? 50 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 18,
                      mass: 0.6,
                      delay: i * 0.03,
                    }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 
                                flex flex-col items-center justify-center 
                                rounded-full text-xs font-medium select-none
                                shadow-lg cursor-pointer
                                ${active
                                  ? "bg-gradient-to-br from-blue-500 to-blue-300 shadow-blue-400/60"
                                  : "bg-gradient-to-br from-blue-800 to-blue-500 hover:shadow-blue-400/40"
                                }`}
                    whileHover={{
                      scale: 1.2,
                      y: -5,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-3xl">{tech.icon}</div>
                    <span className="mt-1">{tech.name}</span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover Label */}
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

      {/* Background Glow */}
      <div
        className="absolute inset-0 -z-10 blur-3xl 
                   bg-gradient-to-t from-blue-200/30 via-transparent to-blue-500/20 
                   dark:from-blue-400/20 dark:via-transparent dark:to-indigo-800/30 
                   transition-colors duration-700 ease-in-out"
      />
    </section>
  );
}