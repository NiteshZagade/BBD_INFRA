"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import IconicProjects from "@/components/IconicProjects";
import DatawrapperEmbed from "@/components/DatawrapperEmbed";
import { useSiteData } from "@/context/site-data";

const expertise = [
  {
    title: "Water Infrastructure",
    icon: "/images/icon-water.svg",
    description:
      "BBD Infra designs and executes 24×7 smart water supply networks across Maharashtra. Expertise: gravity mains, ESRs, WTPs, pumping stations, and IoT‑enabled SCADA systems. Delivering sustainable water infrastructure under Jal Jeevan Mission and Amrut 2.0.",
  },
  {
    title: "INFRA  Development",
    icon: "/images/icon-building.svg",
    description:
      "End to end design and construction of public, commercial, and residential projects including auditoriums, community halls, industrial warehouses, housing complexes, and cement concrete roads with culverts and drainage systems.",
  },
  {
    title: "Urban Beautification",
    icon: "/images/icon-urban.svg",
    description:
      "Transforming cities with smart, eco‑friendly design, BBD Infra executes lakefronts, gardens, and public plazas. Projects integrate rainwater harvesting, native landscaping, and zero waste execution.",
  },
  {
    title: "Renewable Energy",
    icon: "/images/icon-solar.svg",
    description:
      "A leader in renewable energy infrastructure, installing 500 + solar high mast lights and achieving up to 80 % energy savings. Integrates solar grids, IoT monitoring, and net zero construction practices.",
  },
];
function Typewriter({ text, speed = 28 }: { text: string; speed?: number }) {
  const [out, setOut] = useState("");

  useEffect(() => {
    let i = 0;
    let raf: number;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const cps = speed; // characters per second approx
      const chars = Math.min(text.length, Math.floor((elapsed / 1000) * cps));
      if (chars !== i) {
        i = chars;
        setOut(text.slice(0, i));
      }
      if (i < text.length) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, speed]);

  return (
    <span aria-label={text}>
      {out}
      <span className="type-caret" />
    </span>
  );
}

const capabilities = [
  {
    title: "Highways & Mobility",
    description:
      "Expressways, concrete corridors, and multimodal hubs executed under EPC, PPP, and HAM frameworks with predictive safety monitoring.",
    image: "/images/home-highways.jpg",
  },
  {
    title: "Water Infrastructure",
    description:
      "24x7 supply systems, ESRs, WTPs, pumping stations, and SCADA-enabled networks delivering reliable potable water to urban and rural grids.",
    image: "/images/home-water.jpg",
  },
  {
    title: "Urban Development",
    description:
      "Lake rejuvenation, riverfront promenades, civic plazas, and transport terminals crafted with ESG-aligned materials and smart-city amenities.",
    image: "/images/home-urban.jpg",
  },
];

// removed Iconic Projects block; keep homepage lean per client request

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
  delayMs = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  delayMs?: number;
  className?: string;
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame: number | null = null;
    let timeout: number | null = null;
    const duration = 1200;

    const startRun = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setDisplay(Math.floor(progress * value));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    if (delayMs > 0) {
      // @ts-ignore
      timeout = window.setTimeout(startRun, delayMs);
    } else {
      startRun();
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (timeout) clearTimeout(timeout);
    };
  }, [value, delayMs]);

  return (
    <span className={className ?? "text-4xl font-semibold text-[var(--bbd-primary)]"}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};

const FinanceChart = ({ data }: { data: { year: number; revenue: number; profit: number }[] }) => {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const path = useMemo(() => {
    return data
      .map((point, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - (point.revenue / maxRevenue) * 80 - 10;
        return `${x},${y}`;
      })
      .join(" ");
  }, [data, maxRevenue]);

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="h-48 w-full text-[var(--bbd-primary)]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8 }}
    >
      <polyline points={path} fill="none" stroke="url(#grad)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0b3d91" />
          <stop offset="100%" stopColor="#ff6b00" />
        </linearGradient>
      </defs>
      {data.map((point, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - (point.revenue / maxRevenue) * 80 - 10;
        return <circle key={point.year} cx={x} cy={y} r={1.5} fill="#ff6b00" />;
      })}
    </motion.svg>
  );
};

export default function Home() {
  const { data } = useSiteData();
  const [heroSrc, setHeroSrc] = useState<string>("/images/home-hero-bridge.jpg");

  const homeStats = [
    { label: "Projects Delivered", value: data.stats.projectsDelivered, suffix: "+" },
    { label: "KM of Highways", value: data.stats.kmsHighway, suffix: " km" },
    { label: "Team Strength", value: data.stats.workforce, suffix: "+" },
    { label: "Years of Reliability", value: data.stats.yearsExperience, suffix: "" },
  ];

  const legacyItems = [
    { value: 1000, prefix: "", suffix: "+", unit: "KMS", label: "Water Pipelines" },
    { value: 100, prefix: "", suffix: "+", unit: "KMS", label: "Road Infrastructure" },
    { value: 500, prefix: "", suffix: "+", unit: "", label: "Solar Installations" },
    { value: 50, prefix: "", suffix: "+", unit: "", label: "Completed Projects" },
    { value: 800, prefix: "₹", suffix: "+", unit: "CR", label: "Ongoing Projects Value" },
    { value: 150, prefix: "", suffix: "+", unit: "", label: "Employees" },
  ];

  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative w-screen min-h-[85vh] overflow-hidden">
        <Image
          src={heroSrc}
          alt="BBD Infra — cable-stayed bridge at dusk"
          fill
          sizes="100vw"
          priority
          className="object-cover"
          unoptimized
          onError={() => setHeroSrc("/images/about-herov1.jpg")}
          key={heroSrc}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/30 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-start px-5 pt-28 text-left sm:px-10 sm:pt-32 lg:pt-40">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl text-2xl font-semibold leading-snug text-[#0b1e3f] sm:text-4xl text-left"
          >
            <Typewriter text="Building Reliable Infrastructure for a Sustainable Future" speed={30} />
          </motion.h1>
          <div className="mt-4 sm:mt-5 lg:mt-6 w-full max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
              className="max-w-2xl text-sm font-semibold tracking-wide text-[var(--bbd-accent)] sm:text-base text-left"
            >
              Highways, bridges, water networks, urban development, and solar systems delivered with technology-first execution.
            </motion.p>
            <div className="mt-3 flex flex-wrap justify-start gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-[#0b1e3f]/50 px-6 py-3 text-[#0b1e3f] transition hover:border-[var(--bbd-primary)] hover:text-[var(--bbd-primary)]"
              >
                About BBD Infra
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--bbd-accent)] px-6 py-3 text-white shadow-[0_12px_32px_-16px_rgba(255,107,0,0.55)] transition hover:bg-[var(--bbd-accent-soft)]"
              >
                Explore Our Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main container sections */}
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-5 pb-24 pt-12 sm:px-10">

      {/* A legacy of transformation */}
      <section className="py-6 md:py-10">
          <div className="space-y-3 max-w-5xl text-left">
          <div className="flex items-center gap-3 text-[#0b1e3f]">
            <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
            <span className="text-base font-semibold uppercase tracking-[0.21em] sm:text-lg">A legacy of transformation</span>
          </div>
          <h3 className="font-semibold text-[#0b1e3f] text-[30px]">Over 4 decades of infra-excellence</h3>
          <p className="max-w-5xl text-lg font-bold leading-relaxed text-[#0b1e3f] sm:text-xl">
            From our humble beginnings in 2014, BBD Infra has grown into a trusted partner for Maharashtra&apos;s most critical infrastructure needs. Our journey is built on perseverance, quality, and a relentless drive to connect communities.
          </p>
        </div>

        {(() => {
          const items = legacyItems;
          return (
            <div className="mt-6 grid max-w-5xl grid-cols-2 gap-4 sm:gap-4 md:grid-cols-3">
              {items.map((it, idx) => (
                <div
                  key={it.label}
                  className={`min-w-0 pt-2 pr-4 md:pr-8 text-left ${
                    idx % 3 !== 0 ? 'md:border-l md:border-dashed md:border-[#c8d5ee] md:pl-8' : 'md:pl-0'
                  } ${idx % 2 === 0 ? 'pl-0' : 'pl-4'}`}
                >
                  <div className="flex flex-wrap items-baseline gap-1.5 whitespace-normal text-[#0b1e3f]">
                    <span className="text-2xl leading-tight font-semibold sm:text-3xl">
                      <AnimatedCounter value={it.value} prefix={(it as any).prefix} suffix={it.suffix} />
                    </span>
                    {it.unit ? (
                      <span className="ml-1 inline-block text-sm sm:text-base font-extrabold tracking-[0.08em] text-[var(--bbd-primary)] pr-2 sm:pr-3">
                        {(typeof it.unit === 'string' ? it.unit.toUpperCase() : it.unit)}{(typeof it.unit === 'string' && it.unit.toUpperCase() === 'KMS') ? '.' : ''}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-[#405170] whitespace-normal">{it.label}</p>
                </div>
              ))}
            </div>
          );
        })()}
      </section>

      <motion.section {...fadeUp} className="py-12 -mt-6">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-3 max-w-5xl text-left">
            <div className="flex items-center gap-3 text-[#0b1e3f]">
              <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
              <span className="text-base font-semibold uppercase tracking-[0.21em] sm:text-lg">Our Expertise</span>
            </div>
            <h2 className="font-semibold text-[30px] leading-tight text-[#0b1e3f]">Building Tomorrow’s Infrastructure, Today</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 1 },
              show: { opacity: 1, transition: { staggerChildren: 0.35 } },
            }}
            className="mt-4 grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
          >
            {expertise.map((item, idx) => (
              <motion.article
                key={item.title}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-start text-left transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-[#d1d5db] text-2xl font-bold text-[#333]">
                  {idx + 1}
                </span>
                <div className="mt-5 w-full max-w-xs">
                  <h3 className="text-base font-bold uppercase tracking-[0.12em] text-black">{item.title}</h3>
                  <div className="mt-2 h-px w-full bg-[#cccccc]" />
                  <p className="mt-4 text-sm leading-[1.6] text-[#666]">
                    {idx === 0
                      ? "BBD Infra designs and executes 24×7 smart water supply networks across Maharashtra. Expertise: gravity mains, ESRs, WTPs, pumping stations, and IoT‑enabled SCADA systems. Delivering sustainable water infrastructure under Jal Jeevan Mission and Amrut 2.0."
                      : item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      
      {/* Iconic Projects heading (match Our Expertise style) */}
      <section className="pt-4 pb-2 -mt-6 md:-mt-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-3 max-w-5xl text-left">
            <div className="flex items-center gap-3 text-[#0b1e3f]">
              <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
              <span className="text-base font-semibold uppercase tracking-[0.21em] sm:text-lg">Iconic Projects</span>
            </div>
            <h2 className="font-semibold text-[22px] sm:text-[24px] md:text-[26px] leading-tight text-[#0b1e3f] whitespace-nowrap">We have successfully delivered a range of projects. Some of our Iconic Projects.</h2>
          </div>
        </div>
      </section>

      {/* Iconic Projects (DBL-style) below the heading */}
      <div className="mt-0">
        <IconicProjects />
      </div>

      {/* Maharashtra project footprint */}
      <section className="mt-10">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-3 max-w-5xl text-left">
            <div className="flex items-center gap-3 text-[#0b1e3f]">
              <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
              <span className="text-base font-semibold uppercase tracking-[0.21em] sm:text-lg">Maharashtra Project Footprint</span>
            </div>
            <p className="text-sm text-[#405170]">Hover over markers to view district-wise highlights.</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-[#e6eaf4] bg-white p-2">
            <DatawrapperEmbed chartId="OnBCa" minHeight={528} />
          </div>
        </div>
      </section>

      <motion.section {...fadeUp} className="rounded-[32px] border border-[#dbe4f4] bg-gradient-to-r from-white via-[#eef4ff] to-white px-8 py-10 sm:flex sm:items-center sm:justify-between">
        <div className="space-y-3 text-[#0b1e3f]">
          <h2 className="text-3xl font-semibold">Ready to discuss your next mandate?</h2>
          <p className="text-base text-[#405170]">
            Bring your stakeholders for a discovery session. We&apos;ll align scope, milestones, and delivery frameworks backed by Atlas™ insights.
          </p>
        </div>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--bbd-accent)] px-8 py-3 text-white shadow-[0_15px_34px_-16px_rgba(255,107,0,0.5)] transition hover:bg-[var(--bbd-accent-soft)] sm:mt-0"
        >
          Contact BBD Infra
        </Link>
      </motion.section>
      </div>
    </>
  );
}
