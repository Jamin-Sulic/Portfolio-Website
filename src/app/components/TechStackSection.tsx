"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const techStack = [
  { name: "Python", icon: "/icons/python.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "Next.js", icon: "/icons/nextjs.svg" },
  { name: "Tailwind", icon: "/icons/tailwind.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "SQL", icon: "/icons/sql.svg" },
  { name: "Git", icon: "/icons/git.svg" },
  { name: "UiPath", icon: "/icons/uipath.svg" },
];

// Loop-Effekt durch Duplizieren
const repeatedStack = [...techStack, ...techStack, ...techStack];

export default function TechStackSection() {
  return (
    <section
      id="techstack"
      className="relative py-24 px-6 overflow-hidden bg-[#0B0C10] text-gray-100"
    >
      <h2 className="text-3xl font-bold mb-16 text-center text-blue-400">
        Tech Stack
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-14"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
        >
          {repeatedStack.map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                rotateX: -5,
                boxShadow: "0 0 20px rgba(59,130,246,0.6)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="flex flex-col items-center justify-center flex-shrink-0 w-28"
            >
              <div className="relative w-16 h-16 flex items-center justify-center bg-[#10141A] rounded-2xl border border-blue-600/30 shadow-md">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-blue-300">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Glow-Balken unten */}
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse blur-sm opacity-60" />
      </div>

      {/* weiches Fade oben/unten */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#0B0C10] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0B0C10] to-transparent pointer-events-none" />
    </section>
  );
}
