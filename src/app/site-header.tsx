"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  // Expose the header's height so sticky section titles can sit just below it.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 8);
      // The current section is the last one whose top has passed the sticky header.
      let active: string | null = null;
      for (const { id } of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) active = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) active = links[links.length - 1].id;
      setCurrent(active);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className="header" ref={headerRef} data-scrolled={scrolled}>
      <a className="wordmark" href="#" aria-label="Ethan Bell, home">Ethan Bell</a>
      <nav aria-label="Main navigation">
        {links.map(({ id, label }) => (
          <a key={id} href={`#${id}`} aria-current={current === id ? "location" : undefined}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
