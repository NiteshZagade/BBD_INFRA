"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import { AnimatedStat } from "@/components/AnimatedStat";
import Image from "next/image";
import Link from "next/link";
import IconicProjects from "@/components/IconicProjects";
import { useSiteData } from "@/context/site-data";

/* ─── Typewriter ─── */
function Typewriter({ text, speed = 28 }: { text: string; speed?: number }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let raf: number;
    const start = performance.now();
    const step = (now: number) => {
      const chars = Math.min(text.length, Math.floor(((now - start) / 1000) * speed));
      if (chars !== i) { i = chars; setOut(text.slice(0, i)); }
      if (i < text.length) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, speed]);
  return <span aria-label={text}>{out}<span className="type-caret" /></span>;
}

/* ─── Animated Counter ─── */
function AnimatedCounter({
  value, prefix = "", suffix = "", delayMs = 0, className, start = true,
}: {
  value: number; prefix?: string; suffix?: string; delayMs?: number; className?: string; start?: boolean;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!start) { setDisplay(0); return; }
    let frame: number | null = null;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const duration = 1400;
    const startRun = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        setDisplay(Math.floor(p * value));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    if (delayMs > 0) timeout = setTimeout(startRun, delayMs);
    else startRun();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (timeout) clearTimeout(timeout);
    };
  }, [value, delayMs, start]);
  return (
    <span className={className}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── Fade variants ─── */
const fadeUpTransition: Transition = { duration: 0.6, ease: "easeOut" };
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: fadeUpTransition,
};
const stagger = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;
const itemFade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

/* ─── Services data ─── */
const services = [
  {
    num: "01",
    title: "Water Supply Systems",
    desc: "End-to-end water infrastructure including pipelines, treatment plants, and distribution networks for urban and rural needs.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-11 w-11">
        <rect width="44" height="44" rx="2" fill="#FEF3C7"/>
        {/* Water drop */}
        <path d="M22 7 C22 7 11 20 11 27 C11 33 16 37 22 37 C28 37 33 33 33 27 C33 20 22 7 22 7Z" stroke="#C9960C" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
        {/* Inner highlight */}
        <path d="M16.5 27 C16.5 23.5 18.5 20.5 20.5 18.5" stroke="#C9960C" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
        {/* Ripple */}
        <path d="M14 40 Q18 38 22 40 Q26 42 30 40" stroke="#C9960C" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Road Networks",
    desc: "Construction and development of road networks, bridges, and connectivity infrastructure aligned with government mandates.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-11 w-11">
        <rect width="44" height="44" rx="2" fill="#FEF3C7"/>
        {/* Road perspective */}
        <path d="M5 38 L17 9 M39 38 L27 9" stroke="#C9960C" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Horizon */}
        <line x1="13" y1="9" x2="31" y2="9" stroke="#C9960C" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Center dashes */}
        <line x1="22" y1="35" x2="22" y2="29" stroke="#C9960C" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round"/>
        <line x1="22" y1="24" x2="22" y2="18" stroke="#C9960C" strokeWidth="1.4" strokeDasharray="2.5 2.5" strokeLinecap="round"/>
        <line x1="22" y1="15" x2="22" y2="11" stroke="#C9960C" strokeWidth="1.2" strokeDasharray="2 2" strokeLinecap="round"/>
        {/* Ground shadows */}
        <line x1="5" y1="38" x2="39" y2="38" stroke="#C9960C" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Urban Development",
    desc: "Civic infrastructure including drainage systems, public amenities, and smart urban project delivery.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-11 w-11">
        <rect width="44" height="44" rx="2" fill="#FEF3C7"/>
        {/* Buildings skyline */}
        <rect x="5" y="22" width="8" height="16" stroke="#C9960C" strokeWidth="1.5" fill="none"/>
        <rect x="15" y="13" width="9" height="25" stroke="#C9960C" strokeWidth="1.5" fill="none"/>
        <rect x="26" y="17" width="7" height="21" stroke="#C9960C" strokeWidth="1.5" fill="none"/>
        <rect x="35" y="25" width="5" height="13" stroke="#C9960C" strokeWidth="1.5" fill="none"/>
        {/* Windows */}
        <rect x="7" y="25" width="2" height="2" fill="#C9960C" opacity="0.7"/>
        <rect x="7" y="30" width="2" height="2" fill="#C9960C" opacity="0.7"/>
        <rect x="17" y="17" width="2" height="2" fill="#C9960C" opacity="0.7"/>
        <rect x="21" y="17" width="2" height="2" fill="#C9960C" opacity="0.7"/>
        <rect x="17" y="23" width="2" height="2" fill="#C9960C" opacity="0.7"/>
        <rect x="28" y="21" width="2" height="2" fill="#C9960C" opacity="0.7"/>
        <rect x="28" y="27" width="2" height="2" fill="#C9960C" opacity="0.7"/>
        {/* Ground */}
        <line x1="3" y1="38" x2="41" y2="38" stroke="#C9960C" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Irrigation Systems",
    desc: "Canals, lift irrigation schemes, and agricultural water management infrastructure across Maharashtra.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-11 w-11">
        <rect width="44" height="44" rx="2" fill="#FEF3C7"/>
        {/* Canal channel */}
        <path d="M6 34 L6 18 L38 18 L38 34" stroke="#C9960C" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
        {/* Water waves */}
        <path d="M9 24 Q14.5 21 20 24 Q25.5 27 31 24 Q34.5 22 36 23" stroke="#C9960C" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M9 29 Q14.5 26 20 29 Q25.5 32 31 29 Q34.5 27 36 28" stroke="#C9960C" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {/* Inlet pipe */}
        <line x1="22" y1="8" x2="22" y2="18" stroke="#C9960C" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 12 L22 8 L26 12" stroke="#C9960C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Overflow at bottom */}
        <path d="M6 34 Q22 38 38 34" stroke="#C9960C" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.45"/>
      </svg>
    ),
  },
  {
    num: "05",
    title: "Renewable Energy",
    desc: "Solar installations and energy-efficient infrastructure systems for sustainable public and commercial projects.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-11 w-11">
        <rect width="44" height="44" rx="2" fill="#FEF3C7"/>
        {/* Solar panel frame */}
        <rect x="7" y="13" width="30" height="19" rx="1" stroke="#C9960C" strokeWidth="1.6" fill="none"/>
        {/* Panel grid lines */}
        <line x1="7" y1="20" x2="37" y2="20" stroke="#C9960C" strokeWidth="1" opacity="0.55"/>
        <line x1="7" y1="26" x2="37" y2="26" stroke="#C9960C" strokeWidth="1" opacity="0.55"/>
        <line x1="17" y1="13" x2="17" y2="32" stroke="#C9960C" strokeWidth="1" opacity="0.55"/>
        <line x1="27" y1="13" x2="27" y2="32" stroke="#C9960C" strokeWidth="1" opacity="0.55"/>
        {/* Stand */}
        <line x1="22" y1="32" x2="22" y2="38" stroke="#C9960C" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="15" y1="38" x2="29" y2="38" stroke="#C9960C" strokeWidth="1.6" strokeLinecap="round"/>
        {/* Sun */}
        <circle cx="37" cy="9" r="2.5" stroke="#C9960C" strokeWidth="1.3" fill="none"/>
        <line x1="37" y1="4.5" x2="37" y2="3.5" stroke="#C9960C" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="40.5" y1="5.5" x2="41.5" y2="4.5" stroke="#C9960C" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="41.5" y1="9" x2="42.5" y2="9" stroke="#C9960C" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="40.5" y1="12.5" x2="41.5" y2="13.5" stroke="#C9960C" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "06",
    title: "Bridges & Structures",
    desc: "Structural engineering for bridges, culverts, retaining walls, and complex load-bearing infrastructure.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-11 w-11">
        <rect width="44" height="44" rx="2" fill="#FEF3C7"/>
        {/* Bridge deck */}
        <line x1="3" y1="30" x2="41" y2="30" stroke="#C9960C" strokeWidth="2" strokeLinecap="round"/>
        {/* Left tower */}
        <line x1="13" y1="16" x2="13" y2="30" stroke="#C9960C" strokeWidth="2" strokeLinecap="round"/>
        <line x1="11" y1="16" x2="15" y2="16" stroke="#C9960C" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Right tower */}
        <line x1="31" y1="16" x2="31" y2="30" stroke="#C9960C" strokeWidth="2" strokeLinecap="round"/>
        <line x1="29" y1="16" x2="33" y2="16" stroke="#C9960C" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Main cable */}
        <path d="M13 16 Q22 21 31 16" stroke="#C9960C" strokeWidth="1.3" fill="none"/>
        {/* Stay cables – left */}
        <line x1="13" y1="16" x2="3" y2="30" stroke="#C9960C" strokeWidth="1" strokeLinecap="round" opacity="0.65"/>
        <line x1="13" y1="16" x2="8" y2="30" stroke="#C9960C" strokeWidth="1" strokeLinecap="round" opacity="0.65"/>
        {/* Stay cables – right */}
        <line x1="31" y1="16" x2="41" y2="30" stroke="#C9960C" strokeWidth="1" strokeLinecap="round" opacity="0.65"/>
        <line x1="31" y1="16" x2="36" y2="30" stroke="#C9960C" strokeWidth="1" strokeLinecap="round" opacity="0.65"/>
        {/* Hangers */}
        <line x1="19" y1="19.5" x2="19" y2="30" stroke="#C9960C" strokeWidth="0.9" strokeLinecap="round" opacity="0.55"/>
        <line x1="25" y1="19.5" x2="25" y2="30" stroke="#C9960C" strokeWidth="0.9" strokeLinecap="round" opacity="0.55"/>
        {/* Water */}
        <path d="M3 35 Q12 33 22 35 Q32 37 41 35" stroke="#C9960C" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
];

/* ─── Clients data ─── */
const clients = [
  { src: "/images/pwd-maharashtra.png", label: "PWD Maharashtra" },
  { src: "/images/mjp.png", label: "Maharashtra Jeevan Pradhikaran" },
  { src: "/images/Urban Development Department.svg", label: "Urban Development Dept." },
  { src: "/images/jal-jeevan-mission1.png", label: "Jal Jeevan Mission" },
  { src: "/images/amrut-2.png", label: "AMRUT 2.0" },
  { src: "/images/Nagpur_Municipal_Corporation_logo.png", label: "Nagpur Municipal Corporation" },
];

export default function Home() {
  const { data } = useSiteData();

  /* ── Refs for counter start triggers ── */
  const numbersRef = useRef<HTMLDivElement>(null);
  const numbersInView = useInView(numbersRef, { once: true, amount: 0.3 });

  const clientsRef = useRef<HTMLDivElement>(null);
  const clientsInView = useInView(clientsRef, { once: true, amount: 0.3 });

  const keyNumbers = [
    { value: 11, prefix: "", suffix: "+", label: "Years of Operation" },
    { value: 800, prefix: "₹", suffix: "Cr+", label: "Work in Hand" },
    { value: 62, prefix: "", suffix: "+", label: "Active Project Sites" },
    { value: 200, prefix: "", suffix: "+", label: "Workforce" },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════
          HERO — full-bleed video + new design overlay
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden bg-[#08102B]">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          autoPlay muted loop playsInline preload="metadata"
          poster="/images/home-hero-bridge.jpg"
          aria-hidden="true"
        >
          <source src="/videos/hero-section-cinem-drone.mp4" type="video/mp4" />
        </video>

        {/* Gold grid overlay */}
        <div className="hero-grid-overlay" />

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08102B]/80 via-[#08102B]/50 to-[#08102B]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08102B]/60 via-transparent to-transparent" />

        {/* Glow orb */}
        <div
          className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/4"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,.18) 0%, transparent 65%)" }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 py-24 sm:px-10">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_400px] xl:gap-20">

            {/* Left: headline + CTA */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B]"
              >
                <span className="h-px w-9 bg-[#F59E0B]" />
                Maharashtra-Based · Pan India Execution
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-7 font-[var(--font-cormorant)] text-[clamp(38px,5.5vw,66px)] font-bold leading-[1.07] text-white"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
              >
                <Typewriter text="Engineering India's Infrastructure Growth" speed={25} />
                <br />
                <em className="not-italic text-[#F59E0B]">From Rural Maharashtra</em>
                <br />
                to National-Scale
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/about"
                  className="rounded-[2px] bg-[#C9960C] px-9 py-[14px] text-[13px] font-semibold uppercase tracking-[0.1em] text-[#08102B] transition hover:bg-[#F59E0B] hover:-translate-y-0.5"
                >
                  Our Story
                </Link>
                <Link
                  href="/projects"
                  className="rounded-[2px] border border-white/30 px-9 py-[14px] text-[13px] font-medium uppercase tracking-[0.1em] text-white transition hover:border-[#F59E0B] hover:text-[#F59E0B]"
                >
                  View Projects
                </Link>
              </motion.div>
            </div>

            {/* Right: stats card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="hidden rounded-[4px] border border-[rgba(201,150,12,0.2)] bg-white/[0.04] p-10 lg:block"
            >
              <div className="grid grid-cols-2 gap-8">
                {([
                  { prefix: "",  value: 2014,                       suffix: "",    decimals: 0, label: "Year Founded" },
                  { prefix: "",  value: data.stats.projectsDelivered, suffix: "+", decimals: 0, label: "Projects Delivered" },
                ] as const).map((s, i) => (
                  <div key={s.label}>
                    <div
                      className="text-[42px] font-bold leading-none text-[#F59E0B]"
                      style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                    >
                      <AnimatedStat prefix={s.prefix} value={s.value} suffix={s.suffix} decimals={s.decimals} delayMs={i * 150} />
                    </div>
                    <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">{s.label}</div>
                  </div>
                ))}

                <div className="col-span-2 h-px bg-[rgba(201,150,12,0.15)]" />

                {([
                  { prefix: "₹", value: 800,                   suffix: "Cr+", decimals: 0, label: "Work in Hand" },
                  { prefix: "",  value: data.stats.workforce,   suffix: "+",   decimals: 0, label: "Workforce" },
                ] as const).map((s, i) => (
                  <div key={s.label}>
                    <div
                      className="text-[42px] font-bold leading-none text-[#F59E0B]"
                      style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                    >
                      <AnimatedStat prefix={s.prefix} value={s.value} suffix={s.suffix} decimals={s.decimals} delayMs={i * 150} />
                    </div>
                    <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          KEY NUMBERS — dark navy strip
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#08102B] py-20" ref={numbersRef}>
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div
            className="grid divide-x divide-[rgba(201,150,12,0.12)] sm:grid-cols-2 lg:grid-cols-4"
            style={{ background: "rgba(201,150,12,0.04)", border: "1px solid rgba(201,150,12,0.12)" }}
          >
            {keyNumbers.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="px-10 py-12 text-center"
              >
                <div
                  className="flex items-baseline justify-center gap-1 text-[54px] font-bold leading-none text-[#F59E0B]"
                  style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                >
                  <AnimatedCounter
                    value={item.value}
                    prefix={item.prefix}
                    start={numbersInView}
                    delayMs={i * 100}
                    className="text-[54px] font-bold leading-none text-[#F59E0B]"
                  />
                  <span className="text-[28px] text-[#F59E0B]">{item.suffix}</span>
                </div>
                <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.12em] text-white/50">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES GRID — light gray background
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#F1F4FA] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <motion.div {...fadeUp} className="mb-14">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">What We Do</p>
            <h2
              className="text-[clamp(30px,4vw,48px)] font-bold leading-[1.15] text-[#08102B]"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              Infrastructure Solutions<br />Built to Last
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid gap-[2px] bg-[rgba(11,30,61,0.08)] sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((svc) => (
              <motion.div
                key={svc.num}
                variants={itemFade}
                className="group cursor-default bg-[#FAFBFD] px-8 py-10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#08102B]"
              >
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C9960C]">{svc.num}</p>
                <div className="mb-4">{svc.icon}</div>
                <h3
                  className="mb-2.5 text-[20px] font-bold text-[#08102B] transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                >
                  {svc.title}
                </h3>
                <p className="text-[13px] font-light leading-[1.75] text-[#6B7C99] transition-colors duration-300 group-hover:text-white/60">
                  {svc.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ABOUT STRIP — dark navy2 with pillars
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#0D1A40] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-10 lg:grid-cols-2">
          {/* Left */}
          <motion.div {...fadeUp}>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Who We Are</p>
            <h2
              className="mb-6 text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] text-white"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              Built to Execute at Scale.<br />Positioned to Lead.
            </h2>
            <p className="mb-8 text-[15px] font-light leading-[1.9] text-white/60">
              BBD Infra Pvt. Ltd. delivers high-value water systems, resilient road networks, and smart
              urban infrastructure across Maharashtra, combining disciplined execution, EPC-ready
              capabilities, and sustainable engineering to drive India&apos;s next phase of infrastructure expansion.
            </p>
            <Link
              href="/about"
              className="inline-flex rounded-[2px] border border-[rgba(201,150,12,0.4)] px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#F59E0B] transition hover:bg-[rgba(201,150,12,0.1)]"
            >
              Learn More →
            </Link>
          </motion.div>

          {/* Right: pillars */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-2 gap-5"
          >
            {[
              { name: "EPC Capability", text: "Full engineering, procurement and construction services delivered in-house across all project types." },
              { name: "Quality First", text: "ISO 9001:2015 certified processes with on-site QC teams and third-party audit compliance." },
              { name: "On-Time Delivery", text: "95%+ on-time completion rate backed by Primavera-led planning and real-time site monitoring." },
              { name: "Safety Culture", text: "Zero major safety incidents across all active sites through OSHA-aligned protocols and training." },
            ].map((p) => (
              <motion.div
                key={p.name}
                variants={itemFade}
                className="rounded-[2px] border border-[rgba(201,150,12,0.15)] border-t-[3px] border-t-[#C9960C] bg-white/[0.04] p-6"
              >
                <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#F59E0B]">{p.name}</p>
                <p className="text-[12px] font-light leading-[1.7] text-white/55">{p.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          LANDMARK PROJECTS — carousel
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#08102B] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <motion.div {...fadeUp} className="mb-14">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Our Work</p>
            <h2
              className="text-[clamp(32px,4.5vw,54px)] font-bold leading-[1.1] text-white"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              Landmark Projects
            </h2>
          </motion.div>
          <IconicProjects />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          OUR CLIENTS
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#FAFBFD] py-24" ref={clientsRef}>
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Partners</p>
            <h2
              className="mb-4 text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] text-[#08102B]"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              Trusted by Leading Government Authorities
            </h2>
            <p className="mx-auto max-w-2xl text-[15px] font-light leading-relaxed text-[#4A5C7A]">
              Consistently delivering high-value infrastructure projects for state departments,
              municipal corporations, and public development bodies across Maharashtra.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
          >
            {clients.map((c) => (
              <motion.div
                key={c.label}
                variants={itemFade}
                className="flex flex-col items-center gap-4 rounded border border-[#e6eaf4] bg-white px-5 py-6 text-center shadow-[0_8px_24px_-16px_rgba(11,30,63,0.2)] transition hover:shadow-[0_12px_32px_-14px_rgba(11,30,63,0.3)]"
              >
                <div className="flex h-16 items-center">
                  <Image src={c.src} alt={c.label} width={160} height={64} className="h-14 w-auto object-contain" />
                </div>
                <p className="text-[13px] font-semibold text-[#0F1F3D]">{c.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mt-8 grid gap-4 md:grid-cols-3"
          >
            {[
              { value: 7, label: "Government Partners" },
              { value: 15, label: "Municipal Councils" },
              { value: 3, label: "Zilla Parishads" },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={itemFade}
                className="rounded border border-[#e6eaf4] bg-white px-7 py-8 text-center shadow-[0_8px_24px_-16px_rgba(11,30,63,0.2)]"
              >
                <p
                  className="text-[38px] font-bold leading-none text-[#08102B]"
                  style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                >
                  <AnimatedCounter value={s.value} start={clientsInView} className="text-[38px] font-bold text-[#08102B]" />
                  <span className="text-[#C9960C]">+</span>
                </p>
                <div className="mx-auto mt-3 h-px w-10 bg-[#C9960C]/50" />
                <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-[#6B7C99]">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BANNER — gold background
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#C9960C] py-20 text-center">
        {/* Watermark text */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[-20px] top-1/2 -translate-y-1/2 select-none text-[260px] font-black leading-none text-black/5"
          style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
        >
          BBD
        </span>

        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-10">
          <motion.div {...fadeUp}>
            <h2
              className="mb-4 text-[clamp(18px,2.6vw,34px)] font-bold text-[#08102B] whitespace-nowrap"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              Planning Your Next Infrastructure Project?
            </h2>
            <p className="mb-9 text-[clamp(11px,1.15vw,15px)] font-light text-[#0D1A40] whitespace-nowrap">
              Connect with a team focused on structured execution, compliance, and reliable delivery at every stage.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-[2px] bg-[#08102B] px-11 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#0D1A40] hover:-translate-y-0.5"
              >
                Start the Conversation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
