"use client";

import { useState } from "react";
import type { Photo } from "./content";

export default function ElsewhereGallery({ photos }: { photos: Photo[] }) {
  // Index of the photograph whose caption is pinned open by a tap, click, Enter or Space.
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className="elsewhere-grid">
      {photos.map((photo, i) => {
        const captionId = `elsewhere-caption-${i}`;
        const expanded = open === i;
        return (
          <li key={photo.src}>
            <figure className="photo" data-open={expanded}>
              <button
                type="button"
                className="photo-button"
                aria-expanded={expanded}
                aria-controls={captionId}
                aria-describedby={captionId}
                onClick={() => setOpen(expanded ? null : i)}
                onKeyDown={(event) => event.key === "Escape" && setOpen(null)}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" style={photo.position ? { objectPosition: photo.position } : undefined} />
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
  );
}
