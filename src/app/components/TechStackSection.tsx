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
  const [darkMode, setDarkMode] = useState(false); // für Demo, setze via Context oder Hook

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
      id="techstack"
      className="relative flex flex-col items-center justify-center min-h-screen
                 text-gray-900 dark:text-white overflow-hidden transition-colors duration-500 ease-in-out"
      onClick={() => open && setOpen(false)}
    >
      {/* Motion Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-20 blur-3xl"
        animate={{
          background: darkMode
            ? "conic-gradient(from 0deg, #1E3A8A, #4338CA, #9333EA, #EC4899, #1E3A8A)"
            : "conic-gradient(from 0deg, #BFDBFE, #60A5FA, #818CF8, #A78BFA, #BFDBFE)",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Center Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Pop Me Balloon */}
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
          {open && !hovered && (
            <motion.h2
              key="title"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.6, duration: 0.3, type: "spring" }}
              className="absolute top-112 left-1/2 -translate-x-1/2 -translate-y-32
                         text-3xl font-bold text-blue-400"
            >
              My Tech Universe
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Orbit Bubbles */}
        <AnimatePresence>
          {open && (
            <div key="orbit" className="relative w-[680px] h-[680px]">
              {techs.map((tech, i) => {
                const radius = 260;
                const angle = (i / techs.length) * 2 * Math.PI;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const active = hovered === tech.name;

                return (
                  <div
                    key={tech.name}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    onMouseEnter={() => setHovered(tech.name)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="absolute -inset-10" />

                    <motion.div
                      layout
                      animate={{
                        scale: active ? 1.35 : 1,
                        x: active ? -x : 0,
                        y: active ? -y : 0,
                        zIndex: active ? 50 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 230,
                        damping: 18,
                        mass: 0.6,
                      }}
                      className={`w-24 h-24 
                                  flex flex-col items-center justify-center 
                                  rounded-full text-xs font-medium select-none
                                  shadow-lg cursor-pointer
                                  ${active
                                    ? "bg-gradient-to-br from-blue-500 to-blue-300 shadow-blue-400/60 shadow-2xl"
                                    : "bg-gradient-to-br from-blue-800 to-blue-500 hover:shadow-blue-400/40"
                                  }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-3xl">{tech.icon}</div>
                      <span className="mt-1">{tech.name}</span>
                    </motion.div>
                  </div>
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
    </section>
  );
}
