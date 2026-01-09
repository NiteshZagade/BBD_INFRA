"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Note: images use royalty-free Unsplash placeholders representing each equipment type.
type FleetItem = { name: string; slug: string };

// Expect images at /public/images/plants/<slug>.jpg placed by the user.
const fleet: FleetItem[] = [
  { name: "Vogele Paver", slug: "vogele-paver" },
  { name: "Grader", slug: "grader" },
  { name: "Soil Compactor", slug: "soil-compactor" },
  { name: "Baby Roller", slug: "baby-roller" },
  { name: "Tandem Roller", slug: "tandem-roller" },
  { name: "Hyundai 215 Excavators", slug: "hyundai-215-excavators" },
  { name: "Excavators 70", slug: "excavators-70" },
  { name: "Tippers 6 Tyres", slug: "tippers-6-tyres" },
  { name: "Tippers 10 Tyres", slug: "tippers-10-tyres" },
  { name: "Tippers 12 Tyres", slug: "tippers-12-tyres" },
  { name: "Tractors", slug: "tractors" },
  { name: "Backhoe Loaders", slug: "backhoe-loaders" },
  { name: "Loaders", slug: "loaders" },
  { name: "Transit Mixers", slug: "transit-mixers" },
  { name: "RMC Plants", slug: "rmc-plants" },
  { name: "Ajax Fiori", slug: "ajax-fiori" },
  { name: "Hydra", slug: "hydra" },
  { name: "Water Tankers", slug: "water-tankers" },
  { name: "Diesel Tanker", slug: "diesel-tanker" },
  { name: "350TPH Crusher Plant", slug: "crusher-350tph" },
];

export default function PlantMachineryPage() {
  const [open, setOpen] = useState<null | FleetItem>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const PMImage = ({ slug, alt, className }: { slug: string; alt: string; className?: string }) => {
    const candidates = [
      `/images/plants/${slug}.jpg`,
      `/images/plants/${slug}.jpeg`,
      `/images/plants/${slug}.png`,
      `/images/plants/${slug}.webp`,
      `/images/plants/${slug}.avif`,
      `/images/plant/${slug}.jpg`,
      `/images/plant/${slug}.jpeg`,
      `/images/plant/${slug}.png`,
      `/images/plant/${slug}.webp`,
      `/images/plant/${slug}.avif`,
    ];
    const [idx, setIdx] = useState(0);
    const current = idx < candidates.length ? candidates[idx] : "/next.svg";
    return (
      <Image
        key={current}
        src={current}
        alt={alt}
        width={1200}
        height={750}
        className={className ?? "h-52 w-full object-cover"}
        unoptimized
        onError={() => {
          setIdx((i) => i + 1);
        }}
      />
    );
  };
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 pb-24 pt-12 sm:px-10">
      <header className="mb-2">
        <div className="flex items-center gap-3 text-[#0b1e3f]">
          <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
          <h1 className="text-xl font-semibold uppercase tracking-[0.21em] sm:text-2xl">Plant &amp; Machinery</h1>
        </div>
      </header>

      <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {fleet.map((item) => (
          <figure key={item.name} className="group">
            <button
              type="button"
              onClick={() => setOpen(item)}
              className="block w-full overflow-hidden rounded-md border border-[#e5e7eb] bg-white shadow-sm outline-none transition-transform duration-300 group-hover:scale-[1.01] focus:ring-2 focus:ring-[#0b3d91]/40"
              aria-label={`Open ${item.name} image`}
            >
              <PMImage slug={item.slug} alt={item.name} className="h-52 w-full object-cover" />
            </button>
            <figcaption className="mt-3 text-center text-[17px] font-semibold text-[#0b1e3f]">{item.name}</figcaption>
          </figure>
        ))}
      </section>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${open.name} – enlarged view`}
        >
          <div className="relative w-[92vw] max-w-5xl">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(null);
              }}
              className="absolute -right-2 -top-2 z-10 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[#0b1e3f] shadow hover:bg-white"
              aria-label="Close image"
            >
              Close
            </button>
            <div className="relative h-[70vh] w-full" onClick={(e) => e.stopPropagation()}>
              <PMImage slug={open.slug} alt={open.name} className="h-full w-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
