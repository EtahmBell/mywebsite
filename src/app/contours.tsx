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

// Topographic contours, traced the way a terrain map is drawn: a gentle slope plus a few elongated ridges and
// low peaks, with lines at evenly spaced heights. Slopes give long flowing lines; only the peaks close into rings.
type Bump = { x: number; y: number; rx: number; ry: number; angle: number; height: number };

function terrain(width: number, height: number, slope: Point, bumps: Bump[], levels: number, washLevel: number | null, seed: number) {
  const step = 8;
  const nx = Math.ceil(width / step) + 1;
  const ny = Math.ceil(height / step) + 1;
  // Gentle, uneven undulation so slopes wander and rings come out lopsided rather than as tidy ellipses.
  const ripple = (x: number, y: number) =>
    0.32 * Math.sin(x * 0.011 + seed) * Math.cos(y * 0.009 + seed * 1.3) +
    0.22 * Math.sin((x + y) * 0.007 + seed * 2.1) +
    0.14 * Math.cos(x * 0.017 - y * 0.013 + seed * 0.7);
  const field = (x: number, y: number) =>
    slope[0] * x + slope[1] * y + ripple(x, y) +
    bumps.reduce((sum, b) => {
      const a = (b.angle * Math.PI) / 180;
      const u = ((x - b.x) * Math.cos(a) + (y - b.y) * Math.sin(a)) / b.rx;
      const v = (-(x - b.x) * Math.sin(a) + (y - b.y) * Math.cos(a)) / b.ry;
      return sum + b.height * Math.exp(-(u * u + v * v));
    }, 0);
  const grid = Array.from({ length: ny }, (_, j) => Array.from({ length: nx }, (_, i) => field(i * step, j * step)));
  const values = grid.flat();
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const lines: string[] = [];
  let wash = "";
  for (let l = 1; l <= levels; l++) {
    const level = lo + ((hi - lo) * l) / (levels + 1);
    for (const { points, closed } of trace(grid, level, step)) {
      // Drop specks; keep every third traced point so the smoothing reads as a hand-drawn line.
      if (points.length < 8) continue;
      const kept = points.filter((_, i) => i % 3 === 0 || (!closed && i === points.length - 1));
      const d = curve(kept, closed);
      lines.push(d);
      if (closed && l === washLevel && d.length > wash.length) wash = d;
    }
  }
  return { lines, wash, pool: true };
}

// Marching squares: the contour at one height through a grid of samples, joined into continuous lines.
function trace(grid: number[][], level: number, step: number) {
  const ny = grid.length;
  const nx = grid[0].length;
  const at = new Map<string, Point>();
  const links = new Map<string, string[]>();
  const point = (key: string, x0: number, y0: number, v0: number, x1: number, y1: number, v1: number) => {
    const t = (level - v0) / (v1 - v0);
    at.set(key, [(x0 + (x1 - x0) * t) * step, (y0 + (y1 - y0) * t) * step]);
  };
  const link = (a: string, b: string) => {
    links.set(a, [...(links.get(a) ?? []), b]);
    links.set(b, [...(links.get(b) ?? []), a]);
  };
  // Which cell edges (top, right, bottom, left) each corner pattern joins.
  const cases: Record<number, [number, number][]> = {
    1: [[3, 2]], 2: [[2, 1]], 3: [[3, 1]], 4: [[0, 1]], 5: [[0, 1], [3, 2]], 6: [[0, 2]], 7: [[3, 0]],
    8: [[3, 0]], 9: [[0, 2]], 10: [[3, 0], [2, 1]], 11: [[0, 1]], 12: [[3, 1]], 13: [[2, 1]], 14: [[3, 2]],
  };
  for (let j = 0; j < ny - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      const [a, b, c, d] = [grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]];
      const index = (a >= level ? 8 : 0) | (b >= level ? 4 : 0) | (c >= level ? 2 : 0) | (d >= level ? 1 : 0);
      if (!cases[index]) continue;
      const edges = [`h${i},${j}`, `v${i + 1},${j}`, `h${i},${j + 1}`, `v${i},${j}`];
      point(edges[0], i, j, a, i + 1, j, b);
      point(edges[1], i + 1, j, b, i + 1, j + 1, c);
      point(edges[2], i, j + 1, d, i + 1, j + 1, c);
      point(edges[3], i, j, a, i, j + 1, d);
      for (const [e0, e1] of cases[index]) link(edges[e0], edges[e1]);
    }
  }
  const seen = new Set<string>();
  const walk = (start: string) => {
    const points: Point[] = [];
    let previous = "";
    let current: string | undefined = start;
    while (current && !seen.has(current)) {
      seen.add(current);
      points.push(at.get(current)!);
      const next: string | undefined = (links.get(current) ?? []).find((k) => k !== previous && !seen.has(k));
      previous = current;
      current = next;
    }
    const closed = (links.get(start) ?? []).includes(previous) && points.length > 2;
    return { points, closed };
  };
  const result: { points: Point[]; closed: boolean }[] = [];
  // Open lines start at the grid's edge (one link); whatever remains are closed rings.
  for (const [key, neighbours] of links) if (neighbours.length === 1 && !seen.has(key)) result.push(walk(key));
  for (const key of links.keys()) if (!seen.has(key)) result.push(walk(key));
  return result;
}

const shapes: Record<string, { viewBox: string; lines: string[]; wash: string; pool?: boolean }> = {
  // Hero: falls through the space between the introduction and the portrait, then drifts off the left edge.
  hero: {
    viewBox: "0 0 1440 800",
    lines: bundle([[860, -30], [815, 110], [750, 255], [700, 400], [650, 525], [565, 615], [430, 672], [255, 700], [80, 722], [-80, 740]], 5, [13, 9], 1),
    wash: "M-40 800 L-40 742 C120 724 300 700 450 676 C590 650 650 560 700 470 C720 520 690 640 600 720 C500 800 300 800 -40 800 Z",
  },
  // Hero, top right: a low peak on a slope, beyond the portrait.
  "hero-isle": { viewBox: "0 0 400 400", ...terrain(400, 400, [0.004, 0.006], [{ x: 230, y: 190, rx: 150, ry: 80, angle: -25, height: 3.2 }], 6, 4, 0.6) },
  // Projects: two pooled peaks joined by a saddle, mostly beyond the left edge.
  projects: {
    viewBox: "0 0 520 520",
    ...terrain(520, 520, [0.003, -0.002], [{ x: 230, y: 200, rx: 170, ry: 80, angle: 35, height: 3 }, { x: 330, y: 340, rx: 90, ry: 60, angle: -20, height: 2.2 }], 7, 5, 2.1),
  },
  // Experience: a long diagonal ridge in the right-hand margin.
  experience: { viewBox: "0 0 480 480", ...terrain(480, 480, [-0.002, 0.004], [{ x: 250, y: 230, rx: 230, ry: 70, angle: 55, height: 3 }, { x: 190, y: 330, rx: 70, ry: 50, angle: 10, height: 1.4 }], 7, 5, 3.4) },
  // Experience into Education: a tall, gently winding valley from beyond the left edge. No wash: it crosses a title.
  "experience-left": {
    viewBox: "0 0 640 760",
    ...terrain(640, 760, [0.004, 0.001], [{ x: 300, y: 300, rx: 110, ry: 300, angle: 12, height: 3 }, { x: 360, y: 560, rx: 90, ry: 70, angle: 0, height: 1.6 }], 8, null, 1.9),
  },
  // Education: a broad, landscape-shaped ridge with a pooled summit, in the open space right of the degrees.
  education: {
    viewBox: "0 0 620 440",
    ...terrain(620, 440, [0.001, 0.005], [{ x: 300, y: 220, rx: 260, ry: 90, angle: -8, height: 3 }, { x: 390, y: 240, rx: 70, ry: 45, angle: 15, height: 1.4 }], 7, 5, 0.9),
  },
  // Research: a quiet bundle in the right-hand margin.
  research: {
    viewBox: "0 0 260 800",
    lines: bundle([[300, 90], [230, 210], [160, 360], [150, 500], [205, 640], [300, 760]], 4, [-12, 3], 2),
    wash: "M300 120 C250 220 200 340 190 470 C185 600 240 700 300 770 Z",
  },
  // Awards: a small pooled form at the right edge.
  awards: { viewBox: "0 0 360 360", ...terrain(360, 360, [0.003, 0.004], [{ x: 170, y: 180, rx: 120, ry: 60, angle: -30, height: 2.6 }], 5, 3, 5.1) },
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
