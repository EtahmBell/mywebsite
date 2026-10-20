import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ethan Bell | Software Engineering & Digital Health",
  description: "Software engineer and entrepreneur focused on thoughtful technology and human-centered digital health.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
