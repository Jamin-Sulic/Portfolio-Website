"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Tutoring", href: "/nachhilfe" },
  { label: "Travel", href: "/travel" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Hintergrund Overlay */}
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
            className="fixed top-5 left-0 z-40 flex h-full w-[250px] flex-col items-start border-r border-gray-200 bg-white/95 px-6 pt-16 text-gray-900 shadow-xl backdrop-blur dark:border-white/10 dark:bg-[#111]/95 dark:text-white"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}
          >
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
              jamin.ch
            </div>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="w-full rounded-2xl px-3 py-4 text-lg font-semibold transition hover:bg-gray-100 hover:text-orange-600 dark:hover:bg-white/5 dark:hover:text-blue-400"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Burger Menü Button */}
      <div className="fixed top-6 left-6 z-50 flex items-center justify-center cursor-pointer">
        <motion.div onClick={handleMenuToggle} className="relative w-8 h-6 flex flex-col justify-between">
          <motion.div
            className="w-full h-[3px] rounded-full bg-gray-900 dark:bg-white"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 12 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-full h-[3px] rounded-full bg-gray-900 dark:bg-white"
            animate={{
              opacity: isMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-full h-[3px] rounded-full bg-gray-900 dark:bg-white"
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
