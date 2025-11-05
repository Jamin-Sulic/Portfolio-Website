"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useTheme } from "next-themes";

interface Project {
  title: string;
  description: string;
  image: string;
  video: string;
  github: string;
  website: string;
  techs: string[];
}

const projects: Project[] = [
  {
    title: "AI Market Predictor (COMING SOON)",
    description:
      "An intelligent financial analysis platform that aggregates historical data from stocks, bonds, and crypto markets. Users can pick any past date to visualize real market trends or enter a future date to generate predictive insights powered by machine learning models (LSTM + sentiment analysis). Built with Python, TensorFlow, and Next.js.",
    image: "/Stock_Vision.png",
    video: "/videos/ai-market-preview.mp4",
    github: "https://github.com/yourusername/ai-market-predictor",
    website: "https://ai-market-predictor.vercel.app",
    techs: ["Python", "TensorFlow", "Next.js", "Machine Learning"],
  },
  {
    title: "Liar's Dice Online",
    description:
      "A real-time multiplayer bluffing game where players can create lobbies, chat via integrated Voice API, and track their wins and statistics on personal profiles. Dice are rolled, players raise bets on total counts, or call out a bluff to expose a lie. Built using React for the frontend and Spring Boot for the backend, with WebSockets for real-time updates.",
    image: "/Liars_Dice.png",
    video: "/Liars_Dice_Preview.mp4",
    github: "https://github.com/sopra-fs24-16-dudo",
    website: "https://github.com/sopra-fs24-16-dudo",
    techs: ["React", "Spring Boot", "WebSocket", "API"],
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { resolvedTheme } = useTheme();

  return (
    <section id="projects" className="max-w-6xl mx-auto py-24 px-6">
      <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
        Projects
      </h2>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, index) => {
          const imageSrc =
            resolvedTheme === "light"
              ? project.image.replace(/(\.[\w]+)$/, "_light$1")
              : project.image;

          const isDark = resolvedTheme === "dark";

          return (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Screenshot */}
              <Image
                src={imageSrc}
                alt={project.title}
                width={800}
                height={600}
                className="object-cover w-full h-64 bg-gray-100 dark:bg-black transition-opacity duration-500 group-hover:opacity-0"
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

              {/* Overlay */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 transition-colors duration-300 ${
                  isDark
                    ? "bg-gradient-to-t from-black/80 to-transparent text-white"
                    : "bg-transparent text-gray-900"
                }`}
              >
                <h3 className="text-lg font-semibold">{project.title}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
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
                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-2 text-orange-600 dark:text-blue-400">
                    {selectedProject.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {selectedProject.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.techs.map((tech, i) => (
                      <motion.span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full border transition-colors duration-300
                          bg-orange-100 text-orange-700 border-orange-300
                          dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-white transition-colors duration-300 bg-orange-700 hover:bg-orange-600 dark:bg-blue-900 dark:hover:bg-blue-700"
                    >
                      GitHub
                    </a>
                    <a
                      href={selectedProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-white transition-colors duration-300 bg-orange-600 hover:bg-orange-500 dark:bg-blue-600 dark:hover:bg-blue-500"
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
