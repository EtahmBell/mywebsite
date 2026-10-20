import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Website4Dog | Life is better with a dog",
  description: "A little space to celebrate life with your best friend. Discover the everyday essentials for happy dogs and their people.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
