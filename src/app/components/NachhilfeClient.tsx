"use client";

import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import PageHeader from "./PageHeader";
import Card from "./Card";
import ContactForm from "./ContactForm";
import WhatsAppButton from "./WhatsAppButton";

type Language = "de" | "en";

type Review = {
  name: string;
  rating: number;
  text: string;
};

const STORAGE_KEY = "jamin-tutoring-reviews";

const copy = {
  de: {
    toggle: "English",
    eyebrow: "Nachhilfe",
    title: "📘 Private Nachhilfe mit Geduld, Struktur und klaren Lernplänen",
    subtitle:
      "Ich unterstütze Schülerinnen und Schüler online mit ruhiger, freundlicher Begleitung. Gemeinsam bauen wir Verständnis auf, bereiten Prüfungen vor und entwickeln Lernstrategien, die wirklich helfen.",
    groupsTitle: "Für wen ich da bin",
    groups: ["Primarschule", "Sekundarschule", "Gymnasium", "Berufsmaturität"],
    subjectsTitle: "Fächer",
    subjects: [
      "Mathematik",
      "Deutsch",
      "Englisch",
      "Informatik",
      "Lerncoaching",
      "Weitere Fächer auf Anfrage",
    ],
    aboutTitle: "Über mich",
    about: [
      "Business-Informatics-Absolvent der UZH.",
      "Erfahrung als Nachhilfelehrer.",
      "Online-Unterricht möglich und klar strukturiert.",
      "Geduldig, zuverlässig und verständlich in der Erklärung.",
      "Fokus auf Verständnis, Prüfungsvorbereitung, Lernstrategien und individuelle Lernpläne.",
    ],
    freeLessonText:
      "Die erste Kennenlernstunde ist ",
    contactTitle: "Kontakt",
    contactText:
      "Schreib mir kurz Fach, Schulstufe und Verfügbarkeit. Ich melde mich so schnell wie möglich.",
    contactFormTitle: "Nachhilfe-Anfrage",
    contactName: "Name",
    contactContact: "E-Mail oder Telefon",
    contactMessage: "Deine Nachricht",
    contactSubmit: "Senden",
    contactSending: "Wird gesendet...",
    contactSuccess: "Nachricht erfolgreich gesendet.",
    contactError: "Etwas ist schiefgelaufen. Bitte nochmals versuchen.",
    reviewsTitle: "Bewertungen von Schülern",
    reviewsText:
      "Hier können später direkt neue Rückmeldungen und Sternbewertungen ergänzt werden.",
    reviewFormTitle: "Bewertung hinzufügen",
    reviewName: "Name",
    reviewText: "Bewertung",
    reviewRating: "Sterne",
    reviewButton: "Bewertung speichern",
    reviewPlaceholder: "z. B. Hat mir geholfen, Mathe besser zu verstehen.",
    addReviewHint: "Neue Bewertungen erscheinen direkt unten auf der Seite.",
    noReviews: "Noch keine Bewertungen vorhanden.",
  },
  en: {
    toggle: "Deutsch",
    eyebrow: "Tutoring",
    title: "📘 Private tutoring with patience, structure and clear study plans",
    subtitle:
      "I support students online with calm and friendly guidance. Together we build understanding, prepare for exams and develop study strategies that truly help.",
    groupsTitle: "Who I support",
    groups: ["Primary school", "Secondary school", "Gymnasium", "Berufsmaturität"],
    subjectsTitle: "Subjects",
    subjects: [
      "Mathematics",
      "German",
      "English",
      "Informatics",
      "Learning coaching",
      "Other subjects on request",
    ],
    aboutTitle: "About me",
    about: [
      "Business Informatics graduate of the University of Zurich.",
      "Experience as a tutor.",
      "Online lessons available and clearly structured.",
      "Patient, reliable and easy to understand.",
      "Focus on understanding, exam preparation, study strategies and individual study plans.",
    ],
    freeLessonText: "The first introductory lesson is ",
    contactTitle: "Contact",
    contactText:
      "Send me the subject, school level and your availability in a short message. I’ll get back to you as soon as possible.",
    contactFormTitle: "Tutoring request",
    contactName: "Name",
    contactContact: "Email or phone",
    contactMessage: "Your message",
    contactSubmit: "Send",
    contactSending: "Sending...",
    contactSuccess: "Message sent successfully.",
    contactError: "Something went wrong. Please try again.",
    reviewsTitle: "Student reviews",
    reviewsText:
      "You can add more feedback and star ratings directly on this page later.",
    reviewFormTitle: "Add a review",
    reviewName: "Name",
    reviewText: "Review",
    reviewRating: "Stars",
    reviewButton: "Save review",
    reviewPlaceholder: "e.g. Helped me understand math much better.",
    addReviewHint: "New reviews appear directly below on the page.",
    noReviews: "No reviews yet.",
  },
} as const;

const initialReviews: Review[] = [
  {
    name: "Lena",
    rating: 4,
    text: "Sehr geduldig erklärt und gute Lernpläne vorbereitet.",
  },
  {
    name: "Noah",
    rating: 5,
    text: "Die Prüfungsaufgaben wurden viel verständlicher und strukturierter.",
  },
];

export default function NachhilfeClient() {
  const [language, setLanguage] = useState<Language>("de");
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [reviewForm, setReviewForm] = useState({ name: "", text: "", rating: 5 });

  const t = useMemo(() => copy[language], [language]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Review[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      }
    } catch {
      // Ignore invalid storage state.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // Ignore storage failures.
    }
  }, [reviews]);

  const addReview = () => {
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) return;

    setReviews((prev) => [
      {
        name: reviewForm.name.trim(),
        text: reviewForm.text.trim(),
        rating: reviewForm.rating,
      },
      ...prev,
    ]);
    setReviewForm({ name: "", text: "", rating: 5 });
  };

  return (
    <main className="min-h-screen bg-white pt-24 text-gray-900 transition-colors duration-500 dark:bg-[#0B0C10] dark:text-gray-100">
      <section className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={() => setLanguage((current) => (current === "de" ? "en" : "de"))}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition hover:border-orange-500 hover:text-orange-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:hover:border-blue-500 dark:hover:text-blue-300"
          >
            {t.toggle}
          </button>
        </div>

        <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t.groupsTitle}
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {t.groups.map((group) => (
              <span
                key={group}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
              >
                {group}
              </span>
            ))}
          </div>

          <h3 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">
            {t.subjectsTitle}
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {t.subjects.map((subject) => (
              <div
                key={subject}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 dark:border-white/10 dark:bg-[#0B0C10] dark:text-gray-200"
              >
                {subject}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 rounded-3xl bg-gray-50 p-5 dark:bg-white/5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t.aboutTitle}
            </h3>
            <ul className="grid gap-3 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {t.about.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 text-orange-600 dark:text-blue-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
              {t.freeLessonText}
              <span className="font-semibold text-blue-600 dark:text-blue-400">kostenlos</span>.
            </p>
          </div>
        </Card>

        <Card className="p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t.contactTitle}
          </h3>
          <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
            {t.contactText}
          </p>

          <div className="mt-8">
            <ContactForm
              embedded
              title={t.contactFormTitle}
              compact
              namePlaceholder={t.contactName}
              contactPlaceholder={t.contactContact}
              messagePlaceholder={t.contactMessage}
              submitLabel={t.contactSubmit}
              sendingLabel={t.contactSending}
              successMessage={t.contactSuccess}
              errorMessage={t.contactError}
              helperLinkHref="https://wa.me/41787193115"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <WhatsAppButton phoneNumber="41787193115" label="WhatsApp" />
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Card className="p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t.reviewsTitle}
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300">
                {t.reviewsText}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 rounded-3xl bg-gray-50 p-5 dark:bg-white/5">
            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600 dark:text-blue-400">
              {t.reviewFormTitle}
            </h4>
            <div className="grid gap-3">
              <input
                type="text"
                value={reviewForm.name}
                onChange={(event) =>
                  setReviewForm((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder={t.reviewName}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-[#0B0C10] dark:text-gray-100 dark:focus:border-blue-500"
              />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setReviewForm((prev) => ({ ...prev, rating }))}
                    className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-white/10 dark:bg-[#0B0C10] dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-300"
                  >
                    {rating}{" "}
                    <Star
                      className="ml-1 inline h-4 w-4"
                      fill={reviewForm.rating >= rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={reviewForm.text}
                onChange={(event) =>
                  setReviewForm((prev) => ({ ...prev, text: event.target.value }))
                }
                placeholder={t.reviewPlaceholder}
                rows={4}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-[#0B0C10] dark:text-gray-100 dark:focus:border-blue-500"
              />
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t.addReviewHint}
                </p>
                <button
                  type="button"
                  onClick={addReview}
                  className="rounded-full bg-orange-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-orange-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  {t.reviewButton}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  className="rounded-3xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B0C10]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {review.name}
                    </div>
                    <div className="flex text-yellow-500">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="h-4 w-4"
                          fill={review.rating > starIndex ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                    {review.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.noReviews}</p>
            )}
          </div>
        </Card>
      </section>
    </main>
  );
}
