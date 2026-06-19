import type { Metadata } from "next";
import HomeClient from "./components/HomeClient";

export const metadata: Metadata = {
  title: "Jamin Sulic",
  description:
    "Jamin Sulic - Business Informatics Graduate of UZH working as an Application Engineer at Julius Baer.",
};

export default function Home() {
  return <HomeClient />;
}
