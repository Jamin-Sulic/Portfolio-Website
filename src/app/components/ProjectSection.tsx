"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { projects, type ProjectItem } from "../../data/projects";

interface ProjectsSectionProps {
  showHeading?: boolean;
  className?: string;
}

export default function ProjectsSection({ showHeading = true, className = "" }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const { resolvedTheme } = useTheme();

  return (
    <section id="projects" className={`mx-auto max-w-6xl px-6 py-24 ${className}`}>
      {showHeading ? (
        <h2 className="mb-16 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
          Projects
        </h2>
      ) : null}

      <div className="grid gap-10 md:grid-cols-2">
        {projects.map((project) => {
          const imageSrc =
            resolvedTheme === "light"
              ? project.imageLight ?? project.image.replace(/(\.[\w]+)$/, "_light$1")
              : project.image;

          return (
            <motion.button
              key={project.title}
              type="button"
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 text-left transition-all duration-300 hover:border-orange-500 dark:border-gray-700 dark:hover:border-blue-500"
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -4 }}
            >
              <Image
                src={imageSrc}
                alt={project.title}
                width={800}
                height={600}
                className="h-64 w-full object-cover bg-gray-100 transition-opacity duration-500 group-hover:opacity-0 dark:bg-black"
              />

              {project.video ? (
                <motion.video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              ) : null}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-white dark:from-black/80">
                <h3 className="text-lg font-semibold">{project.title}</h3>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-700 shadow-sm transition hover:text-red-500 dark:bg-black/60 dark:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid gap-6 p-6 md:grid-cols-2">
                {selectedProject.video ? (
                  <video
                    src={selectedProject.video}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={800}
                    height={600}
                    className="h-full w-full rounded-xl object-cover"
                  />
                )}

                <div className="flex flex-col">
                  <h3 className="text-2xl font-semibold text-orange-600 dark:text-blue-400">
                    {selectedProject.title}
                  </h3>

                  <p className="mt-3 max-h-52 overflow-y-auto whitespace-pre-line text-sm leading-7 text-gray-700 dark:text-gray-300">
                    {selectedProject.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {selectedProject.techs.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="rounded-full border border-orange-300 bg-orange-100 px-3 py-1 text-sm text-orange-700 dark:border-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-orange-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                      GitHub
                    </a>
                    {selectedProject.website ? (
                      <a
                        href={selectedProject.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 transition hover:border-orange-500 hover:text-orange-600 dark:border-white/10 dark:text-gray-100 dark:hover:border-blue-500 dark:hover:text-blue-300"
                      >
                        Live Demo
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
