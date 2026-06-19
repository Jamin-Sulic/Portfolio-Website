import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import MenuBar from "./components/MenuBar";
import ThemeSwitch from "./components/ThemeSwitch";
import SocialBubbles from "./components/SocialsBubbles";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Jamin Sulic",
  description:
    "Jamin Sulic - Business Informatics Graduate of UZH working as an Application Engineer at Julius Baer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProviderWrapper>
          {children}
          <MenuBar />
          <ThemeSwitch />
          <SocialBubbles />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
