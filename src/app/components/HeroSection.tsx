"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center h-screen text-center px-6
                 bg-white text-gray-900
                 dark:bg-[#0B0C10] dark:text-gray-100
                 transition-colors duration-500 ease-in-out"
    >
      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-4 
                   text-gray-900 dark:text-white transition-colors duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hi, I'm <span className="text-blue-600 dark:text-blue-400">Jamin Sulic</span>
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl max-w-2xl 
                   text-gray-700 dark:text-gray-300 transition-colors duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Based in Zürich, Switzerland 🇨🇭 <br />
        Developer – bridging business and technology
        through clean design and smart systems.
      </motion.p>

      <motion.div
        className="mt-8 flex gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <a
          href="#projects"
          className="px-6 py-3 rounded-lg font-medium transition
                     bg-blue-600 text-white hover:bg-blue-700
                     dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-6 py-3 rounded-lg font-medium border transition
                     border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white
                     dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500"
        >
          Contact Me
        </a>
      </motion.div>

      {/* Background gradient (Light/Dark) */}
      <div
        className="absolute inset-0 -z-10 blur-3xl transition-colors duration-500
                   bg-gradient-to-tr from-blue-200/30 via-transparent to-blue-400/10
                   dark:from-blue-900/20 dark:via-transparent dark:to-blue-600/10"
      ></div>
    </section>
  );
}
