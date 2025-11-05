"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface HeroSectionProps {
  onDoneTyping?: () => void;
}

export default function HeroSection({ onDoneTyping }: HeroSectionProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [doneTyping, setDoneTyping] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);

  const roles = [
    "Developer – bridging business and technology through clean design and smart systems",
    "Thinker – transforming complex problems into elegant solutions",
    "Problem Solver – turning challenges into opportunities with innovation",
    "Creator – building experiences that make a difference",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDoneTyping(true);
      if (onDoneTyping) onDoneTyping();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onDoneTyping]);

  useEffect(() => {
    if (!doneTyping) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [doneTyping, roles.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSend = async () => {
    if (!formData.message.trim() || !formData.contact.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xrbyobok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", contact: "", message: "" });
        setTimeout(() => setShowPopup(false), 2000);
        setTimeout(() => setStatus("idle"), 2000);
      } else throw new Error("Form error");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex flex-col items-center justify-center h-screen text-center px-6 overflow-hidden
                 bg-white dark:bg-[#0B0C10]
                 text-gray-900 dark:text-gray-100
                 transition-colors duration-500 ease-in-out"
    >
      {/* 🌌 Hintergrundsterne */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute inset-0" style={{ y: y1 }}>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gray-400/30 dark:bg-blue-300/10"
              style={{
                width: Math.random() * 3 + 2 + "px",
                height: Math.random() * 3 + 2 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        <motion.div className="absolute inset-0" style={{ y: y2 }}>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gray-400/20 dark:bg-blue-400/20"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>

      {/* ✨ Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold flex justify-center items-baseline h-[4rem] md:h-[5rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gray-900 dark:text-white mr-4">Hi, I&apos;m</span>
          <motion.span
            className={`typewriter text-orange-600 dark:text-blue-400 ${doneTyping ? "done" : ""}`}
          >
            Jamin&nbsp;Sulic
          </motion.span>
        </motion.h1>

        <motion.div
          className="text-lg md:text-xl max-w-2xl text-gray-700 dark:text-gray-300 mt-6"
          initial={{ opacity: 0 }}
          animate={doneTyping ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="mb-2">Based in Zürich, Switzerland 🇨🇭</p>
          <div className="min-h-[4rem] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Buttons */}
        <AnimatePresence>
          {doneTyping && (
            <motion.div
              className="flex gap-6 mt-6 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 rounded-lg font-medium bg-orange-600 text-white hover:bg-orange-700 
                           dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                whileHover={{ scale: 1.05 }}
              >
                View Projects
              </motion.button>

              <motion.button
                onClick={() => setShowPopup(true)}
                className="px-6 py-3 rounded-lg font-medium border border-orange-500 text-orange-600 hover:bg-orange-600 hover:text-white
                           dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white transition"
                whileHover={{ scale: 1.05 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 📩 Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#f8f6f3] dark:bg-[#111] text-gray-900 dark:text-gray-100 rounded-2xl p-8 shadow-lg w-[90%] max-w-md relative transition-colors duration-700 ease-in-out"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-orange-500">Send me a message 💬</h3>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mb-3 p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-[#0B0C10]"
              />
              <input
                type="text"
                name="contact"
                placeholder="Your Email or Phone"
                value={formData.contact}
                onChange={handleChange}
                className="w-full mb-3 p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-[#0B0C10]"
              />
              <textarea
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-[#0B0C10]"
              />

              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 rounded-md border border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={status === 'sending'}
                  className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700 transition disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending...' : 'Send'}
                </button>
              </div>

              {status === 'success' && (
                <motion.p
                  className="text-green-500 text-sm mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ✅ Message sent successfully!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  className="text-red-500 text-sm mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ❌ Something went wrong. Try again.
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
