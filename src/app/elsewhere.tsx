"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "./content";

// Strip height in CSS pixels at each breakpoint; keep in step with --strip-h in globals.css.
const HEIGHT = { mobile: 200, desktop: 300 };

export default function ElsewhereGallery({ photos }: { photos: Photo[] }) {
  // Index of the photograph whose caption is pinned open by a tap, click, Enter or Space.
  const [open, setOpen] = useState<number | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const strip = useRef<HTMLUListElement>(null);
  // Where the last press started, so a swipe or drag that scrolls the strip doesn't also toggle a caption.
  const press = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (direction: number) => {
    const el = strip.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  const focusPhoto = (index: number) => {
    strip.current?.querySelectorAll<HTMLButtonElement>(".photo-button")[index]?.focus();
  };

  return (
    <div className="elsewhere">
      <div className="strip-controls">
        <button type="button" className="strip-arrow" aria-label="Previous photographs" aria-controls="elsewhere-strip" disabled={edges.start} onClick={() => scroll(-1)}>←</button>
        <button type="button" className="strip-arrow" aria-label="Next photographs" aria-controls="elsewhere-strip" disabled={edges.end} onClick={() => scroll(1)}>→</button>
      </div>
      <ul className="elsewhere-strip" id="elsewhere-strip" ref={strip} aria-label="Photographs">
        {photos.map((photo, i) => {
          const captionId = `elsewhere-caption-${i}`;
          const expanded = open === i;
          const ratio = photo.width / photo.height;
          return (
            <li key={photo.src} style={{ "--ratio": ratio } as React.CSSProperties}>
              <figure className="photo" data-open={expanded}>
                <button
                  type="button"
                  className="photo-button"
                  aria-expanded={expanded}
                  aria-controls={captionId}
                  aria-describedby={captionId}
                  onPointerDown={(event) => (press.current = { x: event.clientX, y: event.clientY })}
                  onClick={(event) => {
                    // detail is 0 for keyboard activation; otherwise ignore presses that turned into a scroll.
                    const start = press.current;
                    if (event.detail > 0 && start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) return;
                    setOpen(expanded ? null : i);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setOpen(null);
                    if (event.key === "ArrowRight") focusPhoto(Math.min(i + 1, photos.length - 1));
                    if (event.key === "ArrowLeft") focusPhoto(Math.max(i - 1, 0));
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes={`(max-width: 700px) ${Math.ceil(HEIGHT.mobile * ratio)}px, ${Math.ceil(HEIGHT.desktop * ratio)}px`}
                  />
                </button>
                <figcaption className="photo-caption" id={captionId}>
                  <span className="photo-location">{photo.location}</span>
                  <span className="photo-date">{photo.date}</span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
