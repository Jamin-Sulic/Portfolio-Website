"use client";

import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Nachhilfe", href: "/nachhilfe" },
  { label: "Travel", href: "/travel" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-32 bg-gray-200 dark:bg-[#0b0c10] border-t border-gray-300 dark:border-gray-800 text-center text-gray-700 dark:text-gray-400 transition-colors duration-500">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 px-6">
        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-blue-500">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Jamin Sulic — All rights reserved
        </div>
      </div>
    </footer>
  );
}
