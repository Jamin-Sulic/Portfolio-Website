"use client";

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
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
            onClick={() => window.dispatchEvent(new Event("openContactPopup"))}
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
  );
}
