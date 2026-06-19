"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [revealed, setRevealed] = useState(pathname !== "/");

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setRevealed(pathname !== "/");
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const reveal = () => {
      window.setTimeout(() => setRevealed(true), 240);
    };

    window.addEventListener("hero-done-typing", reveal);
    return () => window.removeEventListener("hero-done-typing", reveal);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      initial={{ opacity: 0, x: 70 }}
      animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 70 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-6 right-6 z-50 p-3 rounded-full border border-gray-600 
                 bg-white/70 dark:bg-gray-900/80 text-gray-800 dark:text-gray-100 
                 shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}
