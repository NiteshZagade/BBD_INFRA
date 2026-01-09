"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type DistrictPoint = {
  key: string;
  name: string;
  // Normalised coordinates in 0..100 (viewBox mapped)
  x: number;
  y: number;
  completed?: string;
  ongoing?: string;
  value?: string;
};

// Approximate locations for a few districts where client projects exist.
const districts: DistrictPoint[] = [
  { key: "buldhana", name: "Buldhana", x: 32, y: 38, completed: "CC roads, beautification", value: "₹50+ Cr" },
  { key: "yavatmal", name: "Yavatmal", x: 56, y: 52, completed: "Wani 24x7 WSS, Pandharkawda WSS", value: "₹200+ Cr" },
  { key: "amaravati", name: "Amravati", x: 50, y: 34, completed: "Roads & Water", value: "₹40+ Cr" },
  { key: "pune", name: "Pune (Indapur)", x: 20, y: 60, completed: "Indapur CC Roads", value: "₹100+ Cr" },
  { key: "lonar", name: "Lonar", x: 35, y: 45, completed: "Lendi Talao Rejuvenation", value: "₹14.31 Cr" },
];

// Simple silhouette path for Maharashtra (stylised, not exact). If you have a precise SVG
// place it at public/images/maps/maharashtra-outline.svg and swap this path.
function MahaSilhouette(props: React.SVGProps<SVGPathElement>) {
  return (
    <path
      {...props}
      d="M140 360 l60 -40 40 -20 30 -45 50 -20 65 20 40 -10 30 25 35 10 25 -20 40 0 30 40 30 10 25 35 -10 40 10 35 -25 25 -20 40 -40 15 -15 35 -45 10 -30 20 -40 -15 -35 15 -55 -15 -40 -35 -35 -10 -45 -40 -20 -30 0 -40 20 -20 z"
    />
  );
}

function Pin({ cx, cy }: { cx: number; cy: number }) {
  // A simple red map pin composed of a circle and a tail triangle
  const r = 2.6;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <circle r={r} fill="#e53935" stroke="#b71c1c" strokeWidth={0.6} />
      <path d={`M0 ${r} L ${-1.6} ${r + 4} L ${1.6} ${r + 4} Z`} fill="#e53935" />
      <circle r={1.1} fill="#fff" />
    </g>
  );
}

export default function MaharashtraMap() {
  const [hover, setHover] = useState<DistrictPoint | null>(null);

  const tooltip = useMemo(() => {
    if (!hover) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute rounded-lg bg-[#0b3d91] p-3 text-white shadow-lg"
        style={{ left: `calc(${hover.x}% + 8px)`, top: `calc(${hover.y}% - 6px)` }}
      >
        <div className="text-[13px] font-semibold">{hover.name}</div>
        {hover.value && (
          <div className="mt-1 text-[12px] text-white/90">Value: {hover.value}</div>
        )}
        {hover.completed && (
          <div className="text-[12px] text-white/90">Completed: {hover.completed}</div>
        )}
        {hover.ongoing && (
          <div className="text-[12px] text-white/90">Ongoing: {hover.ongoing}</div>
        )}
      </motion.div>
    );
  }, [hover]);

  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-[#e6eaf4] bg-white p-4">
      <div className="relative mx-auto h-[440px] w-full max-w-4xl">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          {/* silhouette filled with site background (#EDEDED) */}
          <MahaSilhouette fill="var(--color-background)" stroke="#EDEDED" strokeWidth={2} />

          {/* District pins */}
          {districts.map((d) => (
            <g
              key={d.key}
              onMouseEnter={() => setHover(d)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
            >
              <Pin cx={(d.x / 100) * 400} cy={(d.y / 100) * 400} />
              <text
                x={(d.x / 100) * 400 + 6}
                y={(d.y / 100) * 400 - 2}
                fontSize={10}
                fill="#0b3d91"
              >
                {d.name}
              </text>
            </g>
          ))}
        </svg>
        {tooltip}
      </div>
    </div>
  );
}
