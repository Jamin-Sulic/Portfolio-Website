import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import ContactForm from "../components/ContactForm";
import CTABox from "../components/CTABox";

export const metadata: Metadata = {
  title: "Contact | Jamin Sulic",
  description: "Contact Jamin Sulic via form, LinkedIn, GitHub or email.",
};

const contactLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jamin-sulic-45226a363/" },
  { label: "GitHub", href: "https://github.com/Jamin-Sulic" },
  { label: "Email", href: "mailto:sulic.jamin@gmail.com" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-24 text-gray-900 transition-colors duration-500 dark:bg-[#0B0C10] dark:text-gray-100">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <PageHeader
          eyebrow="Get in touch"
          title="Contact"
          subtitle="If you want to discuss a project, tutoring, or anything else on jamin.ch, this is the best place to start."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ContactForm title="Contact form" />

          <div className="grid gap-6">
            <CTABox
              title="Prefer WhatsApp?"
              description="For tutoring and quick questions, WhatsApp is the fastest way to reach me."
              primaryLabel="WhatsApp"
              primaryHref="https://wa.me/41787193115"
            />

            <Card className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Direct links
              </h3>
              <div className="mt-5 grid gap-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-white/10 dark:bg-[#0B0C10] dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </section>
    </main>
  );
}
