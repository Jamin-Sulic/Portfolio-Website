"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../util/supabase";

interface Message {
  id?: number;
  title: string;
  text: string;
  author: string;
  created_at?: string;
}

export default function MessageWall() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<Message>({ title: "", text: "", author: "" });
  const [visibleStart, setVisibleStart] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Dark mode
  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Load messages from Supabase
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("portfolio_messages")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) {
          console.error("Supabase fetch error:", error);
        } else {
          setMessages(data || []);
        }
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      }
    };
    
    fetchMessages();

    // Realtime subscription
    const channel = supabase
      .channel("portfolio_messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "portfolio_messages" },
        (payload) => {
          setMessages((prev) => [payload.new as Message, ...prev].slice(0, 20));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto-switch if > 4
  useEffect(() => {
    if (messages.length <= 4) return;
    const interval = setInterval(() => {
      setVisibleStart((prev) => (prev + 4) % messages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const handleSubmit = async () => {
    if (!input.title.trim() || !input.text.trim() || !input.author.trim()) return;

    const newMsg = { 
      title: input.title.trim(),
      text: input.text.slice(0, 100).trim(),
      author: input.author.trim()
    };

    try {
      const { error } = await supabase.from("portfolio_messages").insert([newMsg]);
      if (error) {
        console.error("Supabase insert error:", error);
        return;
      }
      setInput({ title: "", text: "", author: "" });
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // Display logic
  let displayMessages: Message[] = [];
  if (messages.length <= 4) {
    displayMessages = messages;
  } else {
    const slice = messages.slice(visibleStart, visibleStart + 4);
    displayMessages =
      slice.length < 4 ? [...slice, ...messages.slice(0, 4 - slice.length)] : slice;
  }

  const hoverShadow = isDark
    ? "0 10px 25px rgba(96,165,250,0.25), 0 0 20px rgba(255,255,255,0.08)"
    : "0 10px 25px rgba(255,165,0,0.25), 0 0 20px rgba(255,255,255,0.08)";

  return (
    <section className="relative mt-20 max-w-6xl mx-auto text-center px-6 py-16 bg-gray-50 dark:bg-[#0B0C10] rounded-2xl text-gray-900 dark:text-gray-100 transition-colors duration-500 ease-in-out">
      <h2 className="text-3xl font-bold mb-10">Leave a Message</h2>

      {/* Input Form */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Title"
          value={input.title}
          onChange={(e) => setInput({ ...input, title: e.target.value })}
          className="p-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-[#111] dark:text-gray-100 w-full md:w-1/4"
        />
        <input
          type="text"
          placeholder="Your Message (max 100 chars)"
          value={input.text}
          onChange={(e) => setInput({ ...input, text: e.target.value })}
          maxLength={100}
          className="p-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-[#111] dark:text-gray-100 w-full md:w-1/2"
        />
        <input
          type="text"
          placeholder="Name"
          value={input.author}
          onChange={(e) => setInput({ ...input, author: e.target.value })}
          className="p-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-[#111] dark:text-gray-100 w-full md:w-1/4"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-3 rounded-lg font-medium bg-orange-600 text-white hover:bg-orange-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
      >
        Submit
      </button>

      {/* Messages Grid */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        <AnimatePresence mode="wait">
          {displayMessages.map((msg, i) => (
            <motion.div
              key={`${msg.id}-${i}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              whileHover={{ scale: 1, boxShadow: hoverShadow }}
              className="w-full h-52 bg-gray-100/80 dark:bg-white/5 backdrop-blur-lg border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-md hover:shadow-xl p-5 text-left flex flex-col transition-all duration-300 ease-in-out overflow-hidden"
            >
              <h3 className="text-lg font-semibold mb-2 text-orange-600 dark:text-blue-400 truncate">
                {msg.title}
              </h3>
              <p className="text-sm text-gray-800 dark:text-gray-300 line-clamp-3 leading-relaxed flex-1">
                {msg.text}
              </p>
              <p className="mt-2 text-xs text-right italic text-gray-500 dark:text-gray-400">
                ~ <span className="font-medium not-italic">{msg.author}</span>
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}