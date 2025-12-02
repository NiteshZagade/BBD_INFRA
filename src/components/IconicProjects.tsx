"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { iconicProjects } from "@/app/projects/data";

function ProjectImage({ slug, className }: { slug: string; className?: string }) {
  const attempts = [".jpg", ".jpeg", ".png", ".webp", ".avif"].map((ext) => `/images/projects/${slug}-1${ext}`);
  const [i, setI] = useState(0);
  const src = attempts[i] ?? "/images/project-1.jpg";
  return (
    <Image
      src={src}
      alt={slug}
      fill
      sizes="(min-width:768px) 40vw, 90vw"
      className={className ?? "object-cover"}
      unoptimized
      onError={() => setI((v) => v + 1)}
    />
  );
}

function ProjectCard({ slug, title, location, value }: { slug: string; title: string; location: string; value: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="overflow-hidden rounded-xl border border-[#e6eaf4] bg-white shadow-[0_20px_48px_-36px_rgba(11,61,145,0.35)] transition-transform duration-300"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <ProjectImage slug={slug} />
      </div>
      <div className="space-y-4 p-6">
        <h3 className="text-[15px] font-semibold uppercase tracking-wide text-[#0b1e3f]">{title}</h3>
        <div className="flex flex-wrap items-center gap-5 text-sm text-[#405170]">
          <span className="inline-flex items-center gap-1">
            <span className="font-bold text-[#0b1e3f]">₹</span>
            <span>{value.replace(/^₹\s*/, "")}</span>
          </span>
          <span className="h-4 w-px bg-[#e2e8f5]" aria-hidden></span>
          <span className="inline-flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0b1e3f]"><path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg>
            <span>{location}</span>
          </span>
        </div>
        <Link href={`/projects/${slug}`} className="inline-block text-[var(--bbd-accent)] font-semibold hover:text-[var(--bbd-accent-soft)]">View More</Link>
      </div>
    </motion.article>
  );
}

export default function IconicProjects() {
  const items = iconicProjects.slice(0, 2);
  return (
    <section className="mx-auto max-w-7xl">
      <div className="mx-auto grid max-w-4xl gap-8 justify-items-center sm:grid-cols-2">
        {items.map((p) => (
          <ProjectCard key={p.slug} slug={p.slug} title={p.title} location={p.location} value={p.value} />
        ))}
      </div>
    </section>
  );
}
