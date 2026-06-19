import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

export const metadata: Metadata = {
  title: "Earth Travel Journal | Jamin Sulic",
  description: "A personal travel and hiking journal is coming soon.",
};

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-white pt-24 text-gray-900 transition-colors duration-500 dark:bg-[#0B0C10] dark:text-gray-100">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <PageHeader
          eyebrow="Earth"
          title="Earth – Travel Journal"
          subtitle="A personal travel and hiking journal is coming soon."
        />

        <Card className="mt-12 p-8 text-center">
          <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
            This section will later include Switzerland hikes, travel entries, photos and an interactive world map.
          </p>
        </Card>
      </section>
    </main>
  );
}
