"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const lines = [
  "> Initializing portfolio...",
  "> Loading experience modules...",
  "> Connecting to database...",
  "> System online ✅",
];

export default function BootScreen() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setDisplayedLines((prev) => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600); // Abstand zwischen Zeilen
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-start justify-center h-screen px-6 bg-[#0B0C10] font-mono text-blue-400 text-lg">
      {displayedLines.map((line, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="leading-relaxed"
        >
          {line}
        </motion.p>
      ))}
      <motion.span
        className="text-blue-500"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        ▍
      </motion.span>
    </div>
  );
}
