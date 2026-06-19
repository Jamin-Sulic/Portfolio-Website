"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";

interface ContactFormProps {
  title?: string;
  compact?: boolean;
  embedded?: boolean;
  namePlaceholder?: string;
  contactPlaceholder?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  sendingLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  helperText?: string;
  helperLinkLabel?: string;
  helperLinkHref?: string;
}

export default function ContactForm({
  title = "Send a message",
  compact = false,
  embedded = false,
  namePlaceholder = "Your name",
  contactPlaceholder = "Email or phone",
  messagePlaceholder = "Your message",
  submitLabel = "Send",
  sendingLabel = "Sending...",
  successMessage = "Message sent successfully.",
  errorMessage = "Something went wrong. Please try again.",
  helperText,
  helperLinkLabel,
  helperLinkHref,
}: ContactFormProps) {
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = async () => {
    if (!formData.message.trim() || !formData.contact.trim()) return;
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/xrbyobok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Form error");

      setStatus("success");
      setFormData({ name: "", contact: "", message: "" });
      setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2200);
    }
  };

  return (
    <div
      className={
        embedded
          ? ""
          : "rounded-3xl border border-gray-200 bg-white/85 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5"
      }
    >
      <h3 className={`text-xl font-semibold text-gray-900 dark:text-white ${embedded ? "mb-4" : ""}`}>
        {title}
      </h3>
      <div className={`mt-5 grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
        <input
          type="text"
          name="name"
          placeholder={namePlaceholder}
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-[#0B0C10] dark:text-gray-100 dark:focus:border-blue-500"
        />
        <input
          type="text"
          name="contact"
          placeholder={contactPlaceholder}
          value={formData.contact}
          onChange={handleChange}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-[#0B0C10] dark:text-gray-100 dark:focus:border-blue-500"
        />
      </div>
      <textarea
        name="message"
        placeholder={messagePlaceholder}
        value={formData.message}
        onChange={handleChange}
        rows={compact ? 4 : 6}
        className="mt-4 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-[#0B0C10] dark:text-gray-100 dark:focus:border-blue-500"
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={handleSend}
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {status === "sending" ? sendingLabel : submitLabel}
        </button>
        {status === "success" ? (
          <span className="text-sm text-emerald-600 dark:text-emerald-400">{successMessage}</span>
        ) : null}
        {status === "error" ? (
          <span className="text-sm text-red-600 dark:text-red-400">{errorMessage}</span>
        ) : null}
      </div>
      {helperText && helperLinkLabel && helperLinkHref ? (
        <a
          href={helperLinkHref}
          target={helperLinkHref.startsWith("http") ? "_blank" : undefined}
          rel={helperLinkHref.startsWith("http") ? "noopener noreferrer" : undefined}
          className="mt-3 inline-block text-sm text-gray-600 transition hover:text-orange-600 dark:text-gray-300 dark:hover:text-blue-300"
        >
          {helperText} <span className="font-medium underline">{helperLinkLabel}</span>
        </a>
      ) : null}
    </div>
  );
}
