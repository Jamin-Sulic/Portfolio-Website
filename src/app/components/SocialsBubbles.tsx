"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export default function SocialBubbles() {
  const [showCV, setShowCV] = useState(false);

  const iconVariants: any = {
    initial: { scale: 1, boxShadow: "none" },
    hover: (shadow: string) => ({
      scale: 1.15,
      boxShadow: shadow,
      transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  const icons = [
    {
      name: "GitHub",
      icon: <Github size={22} />,
      link: "https://github.com/Jamin-Sulic",
      bg: "from-gray-800 to-gray-700",
      shadow: "0 0 25px rgba(255,255,255,0.2)",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={22} />,
      link: "https://www.linkedin.com/in/jamin-sulic-45226a363/",
      bg: "from-blue-600 to-blue-500",
      shadow: "0 0 25px rgba(59,130,246,0.6)",
    },
    {
      name: "Email",
      icon: <Mail size={22} />,
      link: "mailto:sulic.jamin@gmail.com",
      bg: "from-red-500 to-red-400",
      shadow: "0 0 25px rgba(239,68,68,0.6)",
    },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Social Icons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50 will-change-transform">
        {icons.map((item) => (
          <motion.a
            key={item.name}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.bg} flex items-center justify-center text-white shadow-lg cursor-pointer`}
            custom={item.shadow}
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            animate="initial"
          >
            {item.icon}
          </motion.a>
        ))}

        {/* CV Button */}
        <motion.button
          onClick={() => setShowCV(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-400 flex items-center justify-center text-white shadow-lg cursor-pointer"
          custom={"0 0 25px rgba(34,197,94,0.6)"}
          variants={iconVariants}
          initial="initial"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          animate="initial"
        >
          <FileText size={22} />
        </motion.button>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 mt-32 bg-gray-200 dark:bg-[#0b0c10] border-t border-gray-300 dark:border-gray-800 text-center text-gray-700 dark:text-gray-400 transition-colors duration-500">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 px-6">
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-blue-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="hover:text-blue-500 transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-blue-500 transition-colors"
            >
              About Me
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-blue-500 transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Copyright */}
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Jamin Sulic — All rights reserved.
          </div>
        </div>
      </footer>

      {/* CV Popup */}
      <AnimatePresence>
        {showCV && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white dark:bg-[#111] rounded-xl shadow-2xl w-[90%] max-w-4xl h-[80vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <button
                onClick={() => setShowCV(false)}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500"
              >
                ✕
              </button>

              <iframe
                src="/CV.pdf"
                className="w-full h-full"
                title="Jamin Sulic CV"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
