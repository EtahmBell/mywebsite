import { EXPERIMENTAL_PAPER } from "./experiments";

type Point = [number, number];

// Smooth curve through the points (Catmull-Rom converted to cubic Béziers); closed curves wrap around.
function curve(points: Point[], closed = false) {
  const n = points.length;
  const p = (i: number) => (closed ? points[(i + n) % n] : points[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const [p0, p1, p2, p3] = [p(i - 1), p(i), p(i + 1), p(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return closed ? `${d} Z` : d;
}

// A loose bundle of near-parallel lines that drift apart and back together along the path.
function bundle(base: Point[], count: number, step: Point, seed: number) {
  return Array.from({ length: count }, (_, k) =>
    curve(
      base.map(([x, y], j) => {
        const t = j / (base.length - 1);
        const spread = k * (0.55 + 0.9 * Math.sin(Math.PI * t) + 0.25 * Math.sin(seed + k * 1.7 + t * 5));
        return [x + step[0] * spread, y + step[1] * spread] as Point;
      }),
    ),
  );
}

// Nested topographic rings around a peak: irregular, slightly off-centre, and looser towards the outside.
function island(cx: number, cy: number, radius: number, rings: number, seed: number, stretch: Point = [1, 1], drift: Point = [0, 0], from = 1) {
  return Array.from({ length: rings - from + 1 }, (_, i) => {
    const k = i + from;
    const scale = Math.pow(k / rings, 0.8);
    const points = Array.from({ length: 18 }, (_, j) => {
      const a = (j / 18) * Math.PI * 2;
      const wobble = 1 + 0.16 * Math.sin(2 * a + seed) + 0.09 * Math.sin(3 * a + seed * 1.7) + 0.05 * scale * Math.sin(5 * a + seed * 2.3);
      const r = radius * scale * wobble;
      return [cx + drift[0] * k + Math.cos(a) * r * stretch[0], cy + drift[1] * k + Math.sin(a) * r * stretch[1]] as Point;
    });
    return curve(points, true);
  });
}

// A topographic form whose chosen ring is also filled as a faint pooled wash, like the shaded paper in the reference.
// Pass null for no wash, where a fill would cross a sticky section title (whose paper background would cut it off).
function pooled(lines: string[], ring: number | null) {
  return { lines, wash: ring === null ? "" : lines[ring], pool: true };
}

const shapes: Record<string, { viewBox: string; lines: string[]; wash: string; pool?: boolean }> = {
  // Hero: falls through the space between the introduction and the portrait, then drifts off the left edge.
  hero: {
    viewBox: "0 0 1440 800",
    lines: bundle([[860, -30], [815, 110], [750, 255], [700, 400], [650, 525], [565, 615], [430, 672], [255, 700], [80, 722], [-80, 740]], 5, [13, 9], 1),
    wash: "M-40 800 L-40 742 C120 724 300 700 450 676 C590 650 650 560 700 470 C720 520 690 640 600 720 C500 800 300 800 -40 800 Z",
  },
  // Hero, top right: a single small peak beyond the portrait.
  "hero-isle": { viewBox: "0 0 400 400", ...pooled(island(200, 200, 170, 6, 0.6, [1.15, 0.85], [2, -1]), 2) },
  // Projects: a pooled cluster, two peaks inside shared outer rings, mostly beyond the left edge.
  projects: { viewBox: "0 0 520 520", ...pooled([...island(260, 260, 240, 7, 2.1, [0.9, 1.1], [1, 2], 4), ...island(215, 205, 95, 4, 4.2, [1.2, 0.8]), ...island(320, 335, 70, 3, 1.3)], 1) },
  // Experience: a wide, gently stretched peak in the right-hand margin.
  experience: { viewBox: "0 0 480 480", ...pooled(island(240, 240, 220, 8, 3.4, [0.8, 1.15], [-2, 1]), 4) },
  // Experience into Education: tall, loosely nested rings rising from beyond the left edge.
  "experience-left": { viewBox: "0 0 640 760", ...pooled([...island(300, 380, 330, 9, 1.9, [0.75, 1.1], [3, -2], 2), ...island(360, 250, 90, 4, 5.6, [0.8, 1.2])], null) },
  // Education: a broad pooled form in the open space to the right of the degrees.
  education: { viewBox: "0 0 620 440", ...pooled([...island(310, 220, 250, 8, 0.9, [1.15, 0.78], [2, 1], 3), ...island(250, 200, 85, 4, 3.3, [1.3, 0.8]), ...island(395, 255, 55, 3, 2.2)], 1) },
  // Research: a quiet bundle in the right-hand margin.
  research: {
    viewBox: "0 0 260 800",
    lines: bundle([[300, 90], [230, 210], [160, 360], [150, 500], [205, 640], [300, 760]], 4, [-12, 3], 2),
    wash: "M300 120 C250 220 200 340 190 470 C185 600 240 700 300 770 Z",
  },
  // Awards: a small pooled form at the right edge.
  awards: { viewBox: "0 0 360 360", ...pooled([...island(180, 180, 160, 5, 5.1, [1.1, 0.9], [0, 0], 3), ...island(150, 165, 60, 3, 0.4)], 0) },
  // Contact: a low sweep from the right edge into the open space beside the links.
  contact: {
    viewBox: "0 0 800 220",
    lines: bundle([[840, 20], [700, 70], [540, 120], [380, 150], [200, 170], [40, 200]], 4, [6, 10], 3),
    wash: "M840 220 L840 60 C720 90 600 140 430 170 C300 192 160 205 60 220 Z",
  },
};

export default function Contour({ variant }: { variant: keyof typeof shapes }) {
  if (!EXPERIMENTAL_PAPER) return null;
  const { viewBox, lines, wash, pool } = shapes[variant];
  // Flowing bands stretch with their section; topographic islands keep their proportions.
  const stretch = variant === "hero" || variant === "research" || variant === "contact";
  const blur = `contour-soft-${variant}`;
  return (
    <svg className={`contour contour-${variant}${pool ? " contour-isle" : ""}`} viewBox={viewBox} preserveAspectRatio={stretch ? "none" : "xMidYMid meet"} aria-hidden="true" focusable="false">
      {wash && (
        <>
          <defs>
            <filter id={blur} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <path className="contour-wash" d={wash} filter={`url(#${blur})`} />
        </>
      )}
      {lines.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
