import { EXPERIMENTAL_PAPER } from "./experiments";

type Point = [number, number];

// Smooth curve through the points (Catmull-Rom converted to cubic Béziers).
function curve(points: Point[]) {
  const p = (i: number) => points[Math.max(0, Math.min(points.length - 1, i))];
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [p(i - 1), p(i), p(i + 1), p(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
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

const shapes = {
  // Hero: falls through the space between the introduction and the portrait, then drifts off the left edge.
  hero: {
    viewBox: "0 0 1440 800",
    lines: bundle([[930, -30], [885, 110], [800, 255], [730, 400], [660, 520], [565, 615], [430, 672], [255, 700], [80, 722], [-80, 740]], 5, [13, 9], 1),
    wash: "M-40 800 L-40 742 C120 724 300 700 450 676 C590 650 650 560 700 470 C720 520 690 640 600 720 C500 800 300 800 -40 800 Z",
  },
  // Research: a quiet bundle in the right-hand margin.
  research: {
    viewBox: "0 0 260 800",
    lines: bundle([[300, 90], [230, 210], [160, 360], [150, 500], [205, 640], [300, 760]], 4, [-12, 3], 2),
    wash: "",
  },
  // Contact: a low sweep from the right edge into the open space beside the links.
  contact: {
    viewBox: "0 0 800 220",
    lines: bundle([[840, 20], [700, 70], [540, 120], [380, 150], [200, 170], [40, 200]], 4, [6, 10], 3),
    wash: "M840 220 L840 60 C720 90 600 140 430 170 C300 192 160 205 60 220 Z",
  },
};

export default function Contour({ variant }: { variant: keyof typeof shapes }) {
  if (!EXPERIMENTAL_PAPER) return null;
  const { viewBox, lines, wash } = shapes[variant];
  return (
    <svg className={`contour contour-${variant}`} viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {wash && <path className="contour-wash" d={wash} />}
      {lines.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
