import type { Metadata } from "next";
import NachhilfeClient from "../components/NachhilfeClient";

export const metadata: Metadata = {
  title: "Nachhilfe | Jamin Sulic",
  description:
    "Private tutoring in mathematics, German, English, informatics and learning coaching.",
};

export default function NachhilfePage() {
  return <NachhilfeClient />;
}
