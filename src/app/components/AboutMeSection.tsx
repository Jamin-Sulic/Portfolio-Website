"use client";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function AboutGoogle() {
  return (
    <section
      id="about"
      className="relative max-w-4xl mx-auto py-24 px-6 
                 text-gray-900 dark:text-gray-100 bg-white dark:bg-[#0B0C10] 
                 transition-colors duration-500"
    >
      <h2 className="text-3xl font-bold mb-16 text-center">
        About Me
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl mx-auto border-2 border-gray-200 dark:border-gray-800 
                   rounded-3xl shadow-lg p-8 sm:p-10 bg-white dark:bg-[#0B0C10] 
                   transition-colors duration-300"
      >
        {/* Fake Google Searchbar */}
        <div className="flex items-center gap-2 border rounded-full px-4 py-2 mb-6 
                        bg-gray-100 dark:bg-gray-800">
          <Search size={18} className="text-gray-500 dark:text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Who is Jamin Sulic?
          </p>
        </div>

        <motion.div
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 25px rgba(59,130,246,0.2)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="p-4 sm:p-6 rounded-2xl"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Jamin Sulic — Business Informatics Student @ UZH
          </h3>

          <p className="text-gray-700 dark:text-gray-300 mb-2">
            I’m passionate about automation, efficient systems, and creating seamless digital experiences.  
            My goal is to make everyday processes smoother — one smart solution at a time.
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            Outside of tech: volleyball, gym, and a perfectly brewed espresso ☕.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-5 text-sm text-blue-500 dark:text-blue-400 font-medium"
          >
            #automation #UX #designthinking #coffee
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
