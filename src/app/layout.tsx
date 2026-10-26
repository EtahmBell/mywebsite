import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ethan Bell | Software Engineer",
  description:
    "Ethan Bell is a software engineer and Biomedical Data Science master’s student at Stanford, working on projects and research across AI, medicine, and human-centered design.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
