import type { Metadata } from "next";
import { EXPERIMENTAL_PAPER } from "./experiments";
import "./globals.css";
import "./paper.css";

export const metadata: Metadata = {
  title: "Ethan Bell | Software Engineer",
  description:
    "Ethan Bell is a software engineer and Biomedical Data Science master’s student at Stanford, working on projects and research across AI, medicine, and human-centred design.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-AU" className={EXPERIMENTAL_PAPER ? "paper-experimental" : undefined}><body>{children}</body></html>;
}
