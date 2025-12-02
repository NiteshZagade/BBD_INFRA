"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import IconicProjects from "@/components/IconicProjects";

type Category = { slug: string; title: string; description: string; fallback?: string };
const categories: Category[] = [
  { slug: "roads-highways", title: "Roads & Highways", description: "We have successfully delivered a range of roads & highways projects.", fallback: "/images/home-hero-bridge.jpg" },
  { slug: "water-supply", title: "Rails & Metro", description: "We have successfully delivered a range of rails & metro projects.", fallback: "/images/home-urban.jpg" },
  { slug: "airports", title: "Airports", description: "We have successfully delivered a range of airport projects.", fallback: "/images/home-urban.jpg" },
  { slug: "urban-beautification", title: "Urban Development", description: "We have successfully delivered a range of urban development & beautification projects.", fallback: "/images/home-urban.jpg" },
  { slug: "water-infrastructure", title: "Water Infrastructure", description: "We have successfully delivered 24x7 water & distribution projects.", fallback: "/images/home-water.jpg" },
  { slug: "renewable-energy", title: "Renewable Energy", description: "We have successfully delivered a range of solar lighting & energy projects.", fallback: "/images/project-3.jpg" },
];

function CategoryImage({ slug, fallback, className }: { slug: string; fallback?: string; className?: string }) {
  const attempts = [".jpg", ".jpeg", ".png", ".webp", ".avif"].map((ext) => `/images/projects/categories/${slug}${ext}`);
  if (fallback) attempts.push(fallback);
  const [i, setI] = useState(0);
  const src = attempts[i] ?? "/images/project-2.jpg";
  return (
    <Image src={src} alt={slug} fill className={className ?? "object-cover"} unoptimized sizes="(min-width:768px) 30vw, 90vw" onError={() => setI((v) => v + 1)} />
  );
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-10">
      {/* Iconic Projects at top, per reference */}
      <section className="py-2 md:py-4">
        <div className="space-y-3 max-w-5xl text-left">
          <div className="flex items-center gap-3 text-[#0b1e3f]">
            <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
            <span className="text-base font-semibold uppercase tracking-[0.21em] sm:text-lg">Iconic Projects</span>
          </div>
          <h2 className="font-semibold text-[22px] sm:text-[24px] md:text-[26px] leading-tight text-[#0b1e3f] whitespace-nowrap">We have successfully delivered a range of projects. Some of our Iconic Projects.</h2>
        </div>
      </section>
      <div className="-mt-2 mb-12">
        <IconicProjects />
      </div>

      {/* All Projects category grid (reference layout) */}
      <section className="mb-12">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]/70">All Projects</p>
        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((c) => (
            <article key={c.slug} className="overflow-hidden rounded-xl border border-[#e6eaf4] bg-white shadow-[0_16px_44px_-36px_rgba(11,61,145,0.35)]">
              <div className="relative h-56 w-full">
                <CategoryImage slug={c.slug} fallback={c.fallback} />
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-center gap-2 text-[#0b1e3f]">
                  <span className="grid h-3.5 w-3.5 place-items-center rounded-[2px] border border-[#0b1e3f]" aria-hidden>
                    <span className="h-1.5 w-1.5 bg-[#0b1e3f]" />
                  </span>
                  <h3 className="text-[15px] font-semibold uppercase tracking-wide">{c.title}</h3>
                </div>
                <p className="text-sm text-[#405170]">{c.description}</p>
                <Link href={`/projects?category=${c.slug}`} className="text-[var(--bbd-primary)] font-semibold hover:text-[var(--bbd-accent)]">View All</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* Iconic Projects section removed per request */}
    </div>
  );
}
