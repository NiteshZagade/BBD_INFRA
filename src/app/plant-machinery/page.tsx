"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedStat } from "@/components/AnimatedStat";

type FleetItem = { name: string; slug: string };

const fleet: FleetItem[] = [
  { name: "250 TPH Crusher Plants",  slug: "crusher-350tph" },
  { name: "RMC Plants",              slug: "rmc-plants" },
  { name: "Vögele Pavers",           slug: "vogele-paver" },
  { name: "Graders",                 slug: "grader" },
  { name: "Soil Compactors",         slug: "soil-compactor" },
  { name: "Baby Rollers",            slug: "baby-roller" },
  { name: "Tandem Rollers",          slug: "tandem-roller" },
  { name: "Excavators",              slug: "hyundai-215-excavators" },
  { name: "Tippers 6 Tyres",         slug: "tippers-6-tyres" },
  { name: "Tippers 10 Tyres",        slug: "tippers-10-tyres" },
  { name: "Tippers 12 Tyres",        slug: "tippers-12-tyres" },
  { name: "Tractors",                slug: "tractors" },
  { name: "Backhoe Loaders",         slug: "backhoe-loaders" },
  { name: "Loaders",                 slug: "loaders" },
  { name: "Transit Mixers",          slug: "transit-mixers" },
  { name: "Self Loading Concrete Mixers", slug: "ajax-fiori" },
  { name: "Hydras",                  slug: "hydra" },
  { name: "Water Tankers",           slug: "water-tankers" },
  { name: "Diesel Tankers",          slug: "diesel-tanker" },
];

const candidates = (slug: string) => [
  `/images/plants/${slug}.jpg`,
  `/images/plants/${slug}.jpeg`,
  `/images/plants/${slug}.png`,
  `/images/plants/${slug}.webp`,
  `/images/plants/${slug}.avif`,
  `/images/plant/${slug}.jpg`,
  `/images/plant/${slug}.jpeg`,
  `/images/plant/${slug}.png`,
  "/images/home-hero-bridge.jpg",
];

function PMImage({ slug, alt, className }: { slug: string; alt: string; className?: string }) {
  const list = candidates(slug);
  const [idx, setIdx] = useState(0);
  return (
    <Image
      key={list[idx]}
      src={list[idx]}
      alt={alt}
      width={800}
      height={500}
      className={className ?? "h-52 w-full object-cover"}
      unoptimized
      onError={() => setIdx((i) => Math.min(i + 1, list.length - 1))}
    />
  );
}

export default function PlantMachineryPage() {
  const [open, setOpen] = useState<FleetItem | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-[#08102B]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/new_bg.png"
            alt="Plant & Machinery background"
            fill
            className="object-cover object-center opacity-40"
            priority
            unoptimized
          />
        </div>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#08102B]/90 via-[#08102B]/70 to-[#08102B]/30" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-10">
          <div className="border-l-4 border-[#C9960C] pl-10 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F59E0B]"
            >
              Plants &amp; Machinery
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 text-[clamp(34px,5vw,62px)] font-bold leading-[1.1] text-white"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
            >
              High-Performance Equipment<br />for Every Site Condition.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10 text-[15px] font-light leading-[1.85] text-white/65 max-w-xl"
            >
              BBD Infra maintains a dedicated fleet of modern, well-maintained equipment to ensure precision, efficiency, and on-time delivery across all active project sites — from water infrastructure to road construction.
            </motion.p>

            {/* Inline stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap gap-x-8 gap-y-4"
            >
              {([
                { prefix: "", value: 150, suffix: "+",  decimals: 0, label: "Equipment Units" },
                { prefix: "", value: 95,  suffix: "%+", decimals: 0, label: "Uptime Rate" },
                { prefix: "", value: 12,  suffix: "",   decimals: 0, label: "Equipment Categories" },
              ] as const).map((s, i) => (
                <div key={i} className="flex flex-col gap-1 border-t border-[rgba(201,150,12,0.4)] pt-3 pr-8">
                  <span className="text-[clamp(20px,2.5vw,26px)] font-bold text-[#F59E0B]"
                    style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
                    <AnimatedStat prefix={s.prefix} value={s.value} suffix={s.suffix} decimals={s.decimals} delayMs={i * 150} />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Fleet grid ── */}
      <section className="bg-[#FAFBFD] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Our Fleet</p>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold leading-[1.15] text-[#08102B]"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
              Equipment Built for Scale
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fleet.map((item, i) => (
              <motion.figure
                key={item.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => setOpen(item)}
                  className="block w-full overflow-hidden border border-[#e6eaf4] bg-white outline-none transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_40px_-20px_rgba(8,16,43,0.2)] focus:ring-2 focus:ring-[#C9960C]/40"
                  aria-label={`View ${item.name}`}
                >
                  <div className="overflow-hidden">
                    <PMImage
                      slug={item.slug}
                      alt={item.name}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="border-t border-[#e6eaf4] px-4 py-3 text-left">
                    <p className="text-[14px] font-semibold text-[#08102B]">{item.name}</p>
                  </div>
                </button>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why It Matters ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Why It Matters</p>
              <h2
                className="mb-6 text-[clamp(28px,4vw,46px)] font-bold leading-[1.15] text-[#08102B]"
                style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
              >
                Equipment as a<br />Competitive Advantage
              </h2>
              <p className="text-[15px] font-light leading-[1.85] text-[#4A5568]">
                Our investment in modern, well-maintained machinery means we reduce dependency on third-party contractors, improve cost control, and maintain consistent quality standards across every site.
              </p>
            </motion.div>

            {/* Right — benefit list */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              {[
                { title: "Reduced Downtime", desc: "Preventive maintenance schedules and dedicated mechanics ensure 95%+ equipment uptime across all sites." },
                { title: "Quality Control", desc: "On-site lab equipment enables real-time testing of materials, ensuring compliance with project specifications." },
                { title: "Cost Efficiency", desc: "Owned fleet eliminates rental overhead, improving project margins and enabling competitive tendering." },
                { title: "Digital Tracking", desc: "GPS-enabled equipment tracking and utilization monitoring across all 62 active sites." },
                { title: "Scalable Deployment", desc: "Fleet can be rapidly reallocated across sites based on project priority and schedule requirements." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-4 rounded-[3px] border border-[#EDF0F7] bg-[#FAFBFD] px-5 py-4"
                >
                  <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-[#08102B]" />
                  <p className="text-[14px] leading-[1.7] text-[#2D3748]">
                    <span className="font-semibold text-[#08102B]">{item.title}:</span>{" "}
                    <span className="font-light">{item.desc}</span>
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden bg-[#C9960C] py-28">
        <span
          className="pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 select-none text-[clamp(120px,18vw,200px)] font-bold leading-none text-[#B8860B]/30"
          style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
          aria-hidden
        >
          BBD
        </span>
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-5 text-center sm:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-4 text-[clamp(26px,4vw,48px)] font-bold leading-tight text-[#08102B]"
            style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
          >
            Ready to Execute at Scale?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mb-9 text-[15px] font-light text-[#08102B]/75"
          >
            Our equipment fleet and trained operators are ready to be deployed on your next project.
          </motion.p>
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-[3px] bg-[#08102B] px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#0D1A40] hover:shadow-lg"
          >
            Contact Us
          </motion.a>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#08102B]/90 backdrop-blur-sm p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${open.name} – enlarged view`}
        >
          <div className="relative w-[92vw] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute -right-3 -top-3 z-10 rounded-[2px] bg-[#C9960C] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#08102B] hover:bg-[#F59E0B]"
              aria-label="Close"
            >
              Close ✕
            </button>
            <div className="relative h-[72vh] w-full border border-[rgba(201,150,12,0.2)]">
              <PMImage slug={open.slug} alt={open.name} className="h-full w-full object-contain" />
            </div>
            <p className="mt-3 text-center text-[13px] font-semibold uppercase tracking-[0.15em] text-[#F59E0B]">
              {open.name}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
