"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import {
  FaReact,
  FaPython,
  FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiSpringboot,
  SiNodedotjs,
  SiGooglecloud,
  SiUipath,
  SiMysql,
  SiMongodb,
  SiTensorflow,
  SiDocker
} from "react-icons/si";

export default function TechStackSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const techs = [
    { 
      name: "React", 
      icon: <FaReact className="text-sky-400" />,
      color: "from-sky-500/20 to-sky-600/20",
      description: "UI Library"
    },
    { 
      name: "Next.js", 
      icon: <SiNextdotjs className="text-gray-900 dark:text-gray-100" />,
      color: "from-gray-500/20 to-gray-700/20",
      description: "React Framework"
    },
    { 
      name: "Tailwind", 
      icon: <SiTailwindcss className="text-sky-400" />,
      color: "from-sky-400/20 to-cyan-500/20",
      description: "CSS Framework"
    },
    { 
      name: "TypeScript", 
      icon: <SiTypescript className="text-blue-500" />,
      color: "from-blue-500/20 to-blue-600/20",
      description: "Type Safety"
    },
    { 
      name: "JavaScript", 
      icon: <SiJavascript className="text-yellow-400" />,
      color: "from-yellow-400/20 to-yellow-500/20",
      description: "Programming"
    },
    { 
      name: "Python", 
      icon: <FaPython className="text-yellow-400" />,
      color: "from-yellow-500/20 to-blue-500/20",
      description: "Backend & AI"
    },
    { 
      name: "TensorFlow", 
      icon: <SiTensorflow className="text-orange-400" />,
      color: "from-yellow-500/20 to-orange-500/20",
      description: "Backend & AI"
    },
    { 
      name: "C++", 
      icon: <SiCplusplus className="text-blue-500" />,
      color: "from-blue-600/20 to-indigo-600/20",
      description: "Algorithms Complexity"
    },
    { 
      name: "UiPath", 
      icon: <SiUipath className="text-orange-400" />,
      color: "from-orange-400/20 to-orange-600/20",
      description: "RPA Automation"
    },
    { 
      name: "Spring Boot", 
      icon: <SiSpringboot className="text-green-500" />,
      color: "from-green-500/20 to-green-600/20",
      description: "Java Framework"
    },
    { 
      name: "Node.js", 
      icon: <SiNodedotjs className="text-green-400" />,
      color: "from-green-400/20 to-green-600/20",
      description: "Runtime"
    },
    { 
      name: "MySQL", 
      icon: <SiMysql className="text-blue-400" />,
      color: "from-blue-400/20 to-blue-600/20",
      description: "Database"
    },
     {
      name: "MongoDB", 
      icon: <SiMongodb className="text-green-400" />,
      color: "from-green-400/20 to-green-600/20",
      description: "Database"
    },
    { 
      name: "Google Cloud", 
      icon: <SiGooglecloud className="text-indigo-400" />,
      color: "from-indigo-400/20 to-blue-500/20",
      description: "Cloud Platform"
    },
    { 
      name: "AWS", 
      icon: <FaAws className="text-orange-400" />,
      color: "from-orange-400/20 to-orange-500/20",
      description: "Cloud Services"
    },
    { 
      name: "Docker", 
      icon: <SiDocker className="text-blue-400" />,
      color: "from-blue-400/20 to-blue-500/20",
      description: "Containerization"
    },
  
  ];

  return (
    <section
      id="techstack"
      className="relative flex flex-col items-center justify-center min-h-screen py-20 px-6
                 bg-white dark:bg-[#0B0C10]
                 transition-colors duration-500"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-3xl font-bold mb-5 text-center">
          Tech Stack
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Technologies I work with
        </p>
      </motion.div>

      {/* 3D Floating Cards Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
        {techs.map((tech, index) => (
          <TechCard
            key={tech.name}
            tech={tech}
            index={index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}
interface TechItem {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface TechCardProps {
  tech: TechItem;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function TechCard({ tech, index, isHovered, onHover, onLeave }: TechCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 20
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 20
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative group"
    >
      {/* Sharp Glass Card - KEIN BLUR */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className= {"relative h-40 rounded-2xl p-6 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden cursor-pointer transition-all duration-300"}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        {/* Shimmer Effect - Glänzender Wisch-Effekt */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: isHovered ? [-200, 200] : -200,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
        />

        {/* Content - Alles scharf */}
        <div 
          className="relative z-10 flex flex-col items-center justify-center h-full gap-3"
          style={{ transform: "translateZ(20px)" }}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotateY: isHovered ? 360 : 0,
            }}
            transition={{ duration: 0.6 }}
            className="text-5xl"
          >
            {tech.icon}
          </motion.div>
          
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {tech.name}
            </h3>
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? "auto" : 0
              }}
              transition={{ duration: 0.3 }}
              className="text-xs text-gray-600 dark:text-gray-400 mt-1"
            >
              {tech.description}
            </motion.p>
          </div>
        </div>

        {/* Glow Effect on Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: isHovered
              ? "0 0 30px rgba(59, 130, 246, 0.5)"
              : "0 0 0px rgba(59, 130, 246, 0)"
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}