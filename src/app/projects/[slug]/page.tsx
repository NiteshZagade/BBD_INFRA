"use client";

import Image from "next/image";
import Link from "next/link";
import { iconicProjects } from "../data";
import { use, useMemo, useState } from "react";

function DetailImage({ slug, className }: { slug: string; className?: string }) {
  const files = [".jpg", ".jpeg", ".png", ".webp", ".avif"].map((ext) => `/images/projects/${slug}-2${ext}`);
  const [idx, setIdx] = useState(0);
  const src = idx < files.length ? files[idx] : "/images/project-2.jpg";
  return (
    <Image src={src} alt={slug} fill className={className ?? "object-cover"} sizes="(min-width:768px) 40vw, 90vw" unoptimized onError={() => setIdx((i) => i + 1)} />
  );
}

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = iconicProjects.find((p) => p.slug === slug);
  // Soft fallback to avoid 404 during content setup; shows a basic page instead
  if (!project) {
    return (
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-10">
        <h1 className="text-2xl font-semibold text-[#0b1e3f]">Project not found</h1>
        <p className="mt-2 text-sm text-[#405170]">The project you are looking for isn&apos;t in the Iconic list yet. Please go back to Projects and choose another entry.</p>
        <div className="mt-4">
          <Link href="/projects" className="rounded-full bg-[var(--bbd-accent)] px-6 py-2 text-white">Back to Projects</Link>
        </div>
      </div>
    );
  }
  const { slug: projSlug, title, location, value, scope, impact } = project;
  const highlighted = useMemo(() => {
    // Highlight the part after the last dash if present, else the last word
    const dash = title.lastIndexOf("–");
    if (dash !== -1) {
      return { a: title.slice(0, dash + 1).trim(), b: title.slice(dash + 1).trim() };
    }
    const lastSpace = title.lastIndexOf(" ");
    return { a: title.slice(0, lastSpace), b: title.slice(lastSpace + 1) };
  }, [title]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-10">
      {/* Hero block with dark blue backdrop */}
      <section className="rounded-2xl bg-[#0b3d91] p-6 text-white md:p-8">
        <nav className="mb-2 text-xs text-[#cfd8ea]">
          <Link href="/" className="hover:underline text-[#e7ecf9]">Home</Link> <span className="opacity-60">›</span> <Link href="/projects" className="hover:underline text-[#e7ecf9]">Projects</Link> <span className="opacity-60">›</span> <span className="text-white/90">{title}</span>
        </nav>
        <div className="grid items-start gap-6 md:grid-cols-5">
          <div className="md:col-span-3 space-y-3">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              <span className="opacity-95">{highlighted.a} </span>
              <span className="text-[var(--bbd-accent)]">{highlighted.b}</span>
            </h1>
            <p className="text-sm text-white/85">{location}</p>
            <p className="max-w-2xl text-sm leading-relaxed text-white/90">{scope}</p>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-xl md:col-span-2 md:h-72">
            <DetailImage slug={projSlug} />
          </div>
        </div>
      </section>

      {/* Info strip (no Awarding Body) */}
      <section className="mt-6 overflow-hidden rounded-xl">
        <div className="grid gap-px bg-[#0b3d91] p-1 md:grid-cols-3">
          <div className="rounded-lg bg-[#0b3d91] p-4 text-white">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Value</div>
            <div className="mt-1 text-base">{value}</div>
          </div>
          <div className="rounded-lg bg-[#0b3d91] p-4 text-white">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Location</div>
            <div className="mt-1 text-base">{location}</div>
          </div>
          <div className="rounded-lg bg-[#0b3d91] p-4 text-white">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Scope (Summary)</div>
            <div className="mt-1 text-base line-clamp-1">{scope}</div>
          </div>
        </div>
      </section>

      {/* Detailed text blocks */}
      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[#0b1e3f]">Scope</h2>
          <p className="text-sm leading-relaxed text-[#405170]">{scope}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[#0b1e3f]">Impact</h2>
          <p className="text-sm leading-relaxed text-[#405170]">{impact}</p>
        </div>
      </section>
    </div>
  );
}
