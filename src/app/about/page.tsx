"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Stat = { label: string; value: number; prefix?: string; suffix?: string };
const stats: Stat[] = [
  { value: 62, label: "Live project sites" },
  { prefix: "₹", value: 800, suffix: "+ Cr", label: "Work in hand" },
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 0, suffix: " major incidents", label: "Safety record (10 yrs)" },
];

// pillars removed per request

const timeline = [
  { year: "2014", title: "Founded with vision", description: "Balaji Builders & Developers begins operations in Dongaon, delivering village pathways, civic upgrades, and water supply works across rural Maharashtra." },
  { year: "2017", title: "Government empanelment", description: "Secured the first Maharashtra Jeevan Pradhikaran mandate, expanded to 50+ experts, and formalised ISO-compliant QA/QC systems." },
  { year: "2020", title: "Urban & EPC expansion", description: "Entered EPC Mode 32 highways, RCC corridor projects, and landmark bridges using GPS-guided machinery and BIM-enabled coordination." },
  { year: "2024", title: "Recognised performance", description: "Completed ₹500+ Cr worth of projects with awards from MJP, PWD, and municipal councils for on-time delivery and safety excellence." },
  { year: "2025", title: "BBD Infra Pvt. Ltd.", description: "Merged the legacy entity into BBD Infra; launched Atlas™ command centre, strategic national JVs, and scaled to ₹800+ Cr work in hand." },
];

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.55, ease: "easeOut" } };

export default function AboutPage() {
  // Primary About banner image (place your file at public/images/about_us_image.jpg)
  const [heroSrc, setHeroSrc] = useState<string>("/images/about_us_image.jpg");
  const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
    const [display, setDisplay] = useState(0);
    const ref = useRef<HTMLSpanElement | null>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });

    useEffect(() => {
      if (!inView) return;
      let raf: number;
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setDisplay(Math.floor(p * value));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [inView, value]);

    return (
      <span ref={ref} className="text-3xl font-semibold text-[var(--bbd-primary)]">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </span>
    );
  };
  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative h-[40vh] sm:h-[45vh] w-screen overflow-hidden">
        <Image
          src={heroSrc}
          alt="Highway construction background"
          fill
          sizes="100vw"
          priority
          className="object-cover"
          unoptimized
          onError={() => setHeroSrc("/images/about-hero.jpg")}
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.45)]" />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-5 pb-8 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Home › About Us</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-white sm:text-5xl">ABOUT US</h1>
        </div>
      </section>
      {/* Content container (match Home style, no white boxes) */}
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-10">
        <section className="space-y-5 text-center">
          <motion.div
            className="flex items-center justify-center gap-3 text-[#0b1e3f]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <motion.span
              className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]"
              aria-hidden
              style={{ transformOrigin: "left" }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.span
              className="text-base font-semibold uppercase tracking-[0.21em] sm:text-lg"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            >
              About BBD Infra
            </motion.span>
          </motion.div>
          <h1 className="text-[30px] font-semibold leading-tight text-[#0b1e3f] sm:text-[34px]">
            <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, ease: "easeOut" }}>
              Building Reliable Infrastructure for a Sustainable Future
            </motion.span>
          </h1>
          <p className="mx-auto max-w-5xl text-left text-base sm:text-lg leading-8 text-[#405170]">BBD Infra Pvt. Ltd. (formerly Balaji Builders &amp; Developers) began its journey in 2014 in Dongaon, Buldhana. From a small contracting unit, we have grown into a trusted infrastructure development partner known for reliable execution, strong project management, and on‑time delivery. Over the past decade, we’ve completed 50+ major projects, laid 1,000+ km of water supply pipelines, built 100+ km of cement concrete roads, and delivered landmark assets such as the 350m Painganga River Bridge and the 600‑seater Auditorium at Wani. Our work spans water supply, road infrastructure, urban development, and solar high‑mast lighting, in collaboration with MJP, PWD, Urban Local Bodies, and Zilla Parishads.</p>
          <p className="mx-auto max-w-5xl text-left text-base sm:text-lg leading-8 text-[#405170]">Today, with ₹800+ crore worth of ongoing projects across 62 active sites, we continue to expand sustainably and strategically. We integrate technology at every stage of delivery through Primavera P6, BIM, GIS planning, IoT monitoring, and drone‑based progress analytics to ensure precision, transparency, and performance. Guided by experienced leadership and a skilled workforce, BBD Infra is actively contributing to national initiatives like PM Gati Shakti, Jal Jeevan Mission, Amrut 2.0, and Smart Cities Mission. Our purpose is simple: to build lasting infrastructure that improves access, strengthens regional connectivity, and supports resilient communities across India.</p>
          <div className="grid place-items-center gap-6 gap-y-10 text-center sm:grid-cols-2 mb-12 sm:mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <p className="text-xs uppercase tracking-[0.28em] text-[#405170]/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <motion.section {...fadeUp} className="space-y-6 mt-8 sm:mt-12">
          <div className="space-y-3 text-center">
            <motion.div
              className="flex items-center justify-center gap-3 text-[#0b1e3f]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <motion.span
                className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]"
                aria-hidden
                style={{ transformOrigin: "left" }}
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.span
                className="text-base font-semibold uppercase tracking-[0.21em] sm:text-lg"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              >
                Milestone
              </motion.span>
            </motion.div>
          </div>
          <div className="relative p-2 sm:p-0">
            <div className="absolute left-1/2 top-12 hidden h-[calc(100%-6rem)] w-[4px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[var(--bbd-primary)] via-[#0b3d91]/20 to-transparent sm:block" />
            <div className="flex flex-col gap-16">
              {timeline.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div key={item.year} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: "easeOut" }} className={`flex flex-col gap-6 sm:gap-10 ${isEven ? "sm:flex-row" : "sm:flex-row-reverse"} sm:items-center`}>
                    <div className="flex-1">
                      <article className="text-sm text-[#405170]"><h3 className="text-xl font-semibold text-[#0b1e3f]">{item.title}</h3><p className="mt-3">{item.description}</p></article>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className="hidden h-8 w-[2px] bg-gradient-to-b from-[var(--bbd-primary)] to-transparent sm:block" aria-hidden />
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[var(--bbd-primary)] text-lg font-semibold text-white shadow-[0_10px_25px_-18px_rgba(11,61,145,0.8)]">{item.year}</div>
                      <div className="hidden h-8 w-[2px] bg-gradient-to-b from-transparent to-[var(--bbd-primary)] sm:block" aria-hidden />
                    </div>
                    <div className="flex-1 hidden sm:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
