"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

const projects = [
  {
    title: "AI Market Predictor",
    description:
      "An intelligent financial analysis platform that aggregates historical data from stocks, bonds, and crypto markets. Users can pick any past date to visualize real market trends — or enter a future date to generate predictive insights powered by machine learning models (LSTM + sentiment analysis). Built with Python, TensorFlow, and Next.js.",
    image: "/images/ai-market.png",
    video: "/videos/ai-market-preview.mp4",
    github: "https://github.com/yourusername/ai-market-predictor",
    website: "https://ai-market-predictor.vercel.app",
  },
  {
    title: "Liar’s Dice Online",
    description:
      "A real-time multiplayer bluffing game where players can create lobbies, chat via integrated Voice API, and track their wins and statistics on personal profiles. Built using React for the frontend and Spring Boot for the backend, with WebSockets for real-time updates.",
    image: "/images/liars-dice.png",
    video: "/videos/liars-dice-preview.mp4",
    github: "https://github.com/yourusername/liars-dice",
    website: "https://liars-dice.vercel.app",
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="max-w-6xl mx-auto py-24 px-6">
      <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
        Projects
      </h2>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative group overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            {/* Screenshot */}
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={600}
              className="object-cover w-full h-64 transition-opacity duration-500 group-hover:opacity-0"
            />

            {/* Video Preview */}
            <motion.video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 object-cover w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup / Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Content */}
              <div className="grid md:grid-cols-2 gap-6 p-6">
                <video
                  src={selectedProject.video}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-lg w-full h-full object-cover"
                />

                <div>
                  <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {selectedProject.description}
                  </p>

                  <div className="flex gap-4">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href={selectedProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}