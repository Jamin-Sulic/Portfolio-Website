export interface ExperienceItem {
  period: string;
  title: string;
  role: string;
  description: string;
  logo: string;
  bgColor: string;
  logoClass?: string;
}

export const experiences: ExperienceItem[] = [
  {
    period: "2026 – Present",
    title: "Julius Baer",
    role: "Application Engineer – Graduate Programme",
    description:
      "Working as an Application Engineer in the Graduate Programme, with focus on software engineering, banking technology, data platforms and modern application development.",
    logo: "/JB.png",
    bgColor: "bg-white dark:bg-gray-800",
    logoClass: "scale-240",
  },
  {
    period: "Jun 2025 – Sep 2025",
    title: "Julius Bär",
    role: "Robotic Process Automation Developer Intern",
    description:
      "Automated banking processes with UiPath and developed reusable RPA libraries. Built bots for trade automation, login flows, and process migration.",
    logo: "/JB.png",
    bgColor: "bg-white dark:bg-gray-800",
    logoClass: "scale-240",
  },
  {
    period: "Sep 2022 – Jan 2026",
    title: "University of Zurich",
    role: "B.Sc. Business Informatics (Minor: Banking & Finance)",
    description:
      "Studying IT, Finance and Business Informatics with a focus on data-driven systems.",
    logo: "/UZH.jpg",
    bgColor: "bg-white dark:bg-gray-800",
  },
  {
    period: "Sep 2016 – Aug 2022",
    title: "Kantonsschule Limmattal",
    role: "Swiss Matura (PAM – Physics & Applied Mathematics)",
    description:
      "Graduated with a focus on mathematics and applied sciences.",
    logo: "/KSL.png",
    bgColor: "bg-white dark:bg-gray-800",
  },
];
