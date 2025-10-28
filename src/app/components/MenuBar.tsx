"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smooth Scroll zu einer Section
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Hintergrund-Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={handleMenuToggle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Menü */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-[220px] h-full bg-gray-300 dark:bg-[#333] text-gray-900 dark:text-white shadow-xl flex flex-col items-center pt-16 z-40"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}
          >
            {/* Menu Links */}
            <button
              onClick={() => scrollToSection("#home")}
              className="py-4 text-lg font-semibold hover:text-blue-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("#experience")}
              className="py-4 text-lg font-semibold hover:text-blue-500 transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("#techstack")}
              className="py-4 text-lg font-semibold hover:text-blue-500 transition-colors"
            >
              Tech Stack
            </button>
            <button
              onClick={() => scrollToSection("#projects")}
              className="py-4 text-lg font-semibold hover:text-blue-500 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("#about")}
              className="py-4 text-lg font-semibold hover:text-blue-500 transition-colors"
            >
              About Me
            </button>
            <button
              onClick={() => window.dispatchEvent(new Event("openContactPopup"))}
              className="py-4 text-lg font-semibold hover:text-blue-500 transition-colors"
            >
              Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Burger Menü Button */}
      <div className="fixed top-6 left-6 z-50 flex items-center justify-center cursor-pointer">
        <motion.div
          onClick={handleMenuToggle}
          className="relative w-8 h-6 flex flex-col justify-between"
        >
          <motion.div
            className="w-full h-[3px] bg-white rounded-full"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 12 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-full h-[3px] bg-white rounded-full"
            animate={{
              opacity: isMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-full h-[3px] bg-white rounded-full"
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -9 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </>
  );
}
