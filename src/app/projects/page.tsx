import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import ProjectsSection from "../components/ProjectSection";
import CTABox from "../components/CTABox";

export const metadata: Metadata = {
  title: "Projects | Jamin Sulic",
  description: "Selected projects by Jamin Sulic.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white pt-24 text-gray-900 transition-colors duration-500 dark:bg-[#0B0C10] dark:text-gray-100">
      <div className="mx-auto max-w-6xl px-6">
        <PageHeader
          eyebrow="Portfolio"
          title="Projects"
          subtitle="A curated selection of applications, experiments and product work across finance, AI and web development."
        />
      </div>

      <ProjectsSection showHeading={false} className="pt-16" />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <CTABox
          title="Want to talk about a project?"
          description="If something here resonates, I’m always happy to discuss the technical stack, process or potential collaboration."
          primaryLabel="Contact"
          primaryHref="/contact"
        />
      </section>
    </main>
  );
}
