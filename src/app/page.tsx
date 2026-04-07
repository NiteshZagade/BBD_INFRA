"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import IconicProjects from "@/components/IconicProjects";
import { useSiteData } from "@/context/site-data";

const expertise = [
  {
    title: "Water\nInfrastructure",
    icon: "/images/water-network.png",
    description:
      "Delivering large-scale regional and urban water networks, elevated storage reservoirs, pumping stations, and smart 24x7 distribution systems engineered for reliability, efficiency, and long-term sustainability.",
  },
  {
    title: "Roads, Bridges & Urban Connectivity",
    icon: "/images/urban-dev.png",
    description:
      "Executing high-performance cement concrete roads, structural bridges, drainage systems, and integrated urban corridors designed to enhance mobility, withstand heavy loads, and ensure lifecycle durability.",
  },
  {
    title: "Smart & Sustainable Infrastructure",
    icon: "/images/re-energy.png",
    description:
      "Integrating solar-powered systems, energy-efficient technologies, and environmentally responsible construction practices to create resilient infrastructure aligned with future urban and environmental standards.",
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
    title: "Water Supply Network",
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

const staggerFade = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemFade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
  delayMs = 0,
  className,
  start = true,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  delayMs?: number;
  className?: string;
  start?: boolean;
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) {
      setDisplay(0);
      return;
    }
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
  }, [value, delayMs, start]);

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
  const legacyRef = useRef<HTMLElement | null>(null);
  const legacyInView = useInView(legacyRef, { once: true, amount: 0.3 });
  const performanceRef = useRef<HTMLDivElement | null>(null);
  const performanceInView = useInView(performanceRef, { once: true, amount: 0.25 });
  const clientsStatsRef = useRef<HTMLDivElement | null>(null);
  const clientsStatsInView = useInView(clientsStatsRef, { once: true, amount: 0.3 });

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
    { value: 1000, prefix: "₹", suffix: "+", unit: "CR", label: "Ongoing Projects Value" },
    { value: 150, prefix: "", suffix: "+", unit: "", label: "Employees" },
  ];

  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative w-full min-h-[85vh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/home-hero-bridge.jpg"
          aria-hidden="true"
        >
          <source src="/videos/hero-section-cinem-drone.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#071225]/28 via-[#071225]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040b18]/18 via-transparent to-[#040b18]/8" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-start px-5 pt-28 text-left sm:px-10 sm:pt-32 lg:pt-40">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl text-2xl font-semibold leading-snug text-white [text-shadow:0_6px_18px_rgba(0,0,0,0.2)] sm:text-4xl text-left"
          >
            <Typewriter text="Engineering India’s Infrastructure Growth From Rural Maharashtra to National-Scale" speed={30} />
          </motion.h1>
          <div className="mt-4 sm:mt-5 lg:mt-6 w-full max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
              className="max-w-2xl text-base font-serif font-medium text-white/95 [text-shadow:0_4px_14px_rgba(0,0,0,0.18)] sm:text-lg text-left"
            >
              Highways, bridges, water networks, urban development, and solar systems delivered with technology-first execution.
            </motion.p>
            <div className="mt-4 flex flex-wrap justify-start gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg bg-[#0b3d91] px-6 py-3 text-sm font-semibold !text-white shadow-[0_12px_28px_-16px_rgba(11,61,145,0.72)] transition hover:bg-[#0a337a] hover:text-white"
              >
                Explore Our Projects
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-white/45 bg-white/12 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_-18px_rgba(0,0,0,0.45)] backdrop-blur-sm transition hover:bg-white/18 hover:border-white/60"
              >
                About BBD Infra
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main container sections */}
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 pb-24 pt-12 sm:px-10">

      {/* Who we are */}
      <section className="py-8" ref={legacyRef}>
          <div className="mx-auto max-w-5xl space-y-3 text-center">
          <div className="flex items-center justify-center gap-3 text-[#0b1e3f]">
            <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
            <span className="text-lg font-semibold uppercase tracking-[0.21em] sm:text-xl">WHO WE ARE</span>
          </div>
          <h3 className="mx-auto max-w-4xl font-semibold text-[22px] leading-tight text-[#0b1e3f] sm:text-[24px] md:text-[26px]">
            Built to Execute at Scale. Positioned to Lead National Infrastructure Growth.
          </h3>
          <p className="mx-auto max-w-5xl text-base font-medium leading-relaxed text-[#0b1e3f] sm:text-lg md:text-xl">
            BBD Infra Pvt. Ltd. delivers high-value water systems, resilient road networks, and smart urban infrastructure across Maharashtra, combining disciplined execution, EPC-ready capabilities, and sustainable engineering to drive India&apos;s next phase of infrastructure expansion.
          </p>
        </div>

        {(() => {
          const items = legacyItems;
          return (
            <div className="mx-auto mt-6 grid w-full max-w-5xl grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 md:grid-cols-3">
              {items.map((it, idx) => (
                <div
                  key={it.label}
                  className={`flex min-w-0 flex-col items-center justify-start px-2 pt-2 text-center sm:px-4 ${
                    idx % 3 !== 0 ? "md:border-l md:border-dashed md:border-[#c8d5ee]" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-center gap-1.5 whitespace-normal text-[#0b1e3f]">
                    <span className="text-2xl leading-tight font-semibold sm:text-3xl">
                      <AnimatedCounter value={it.value} prefix={(it as any).prefix} suffix={it.suffix} start={legacyInView} />
                    </span>
                    {it.unit ? (
                      <span className="inline-block text-sm font-extrabold tracking-[0.08em] text-[var(--bbd-primary)] sm:text-base">
                        {(typeof it.unit === 'string' ? it.unit.toUpperCase() : it.unit)}{(typeof it.unit === 'string' && it.unit.toUpperCase() === 'KMS') ? '.' : ''}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 max-w-[14rem] text-center text-xs font-medium uppercase tracking-[0.12em] text-[#405170] whitespace-normal sm:text-sm">{it.label}</p>
                </div>
              ))}
            </div>
          );
        })()}
      </section>

      <motion.section {...fadeUp} className="py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto w-full max-w-5xl space-y-3 text-center">
            <div className="flex items-center justify-center gap-3 text-[#0b1e3f]">
              <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
              <span className="text-lg font-semibold uppercase tracking-[0.21em] sm:text-xl">Our Core Expertise</span>
            </div>
            <h2 className="mx-auto max-w-4xl font-semibold text-[22px] leading-tight text-[#0b1e3f] sm:text-[24px] md:text-[26px]">
              Multi-Sector Infrastructure Strength. One Execution Standard.
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 1 },
              show: { opacity: 1, transition: { staggerChildren: 0.35 } },
            }}
            className="mx-auto mt-6 grid w-full max-w-6xl grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 xl:grid-cols-3"
          >
            {expertise.map((item, idx) => (
              <motion.article
                key={item.title}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto flex h-full w-full max-w-sm flex-col items-center rounded-[26px] border border-[#d9e1ef] bg-white px-6 py-8 text-center shadow-[0_22px_55px_-34px_rgba(11,30,63,0.35)] transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-[#d1d5db] bg-white overflow-hidden p-1.5">
                  {item.icon ? (
                    // use native img for maximum compatibility with inline SVGs
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.icon}
                      alt=""
                      width={64}
                      height={64}
                      className="h-full w-full object-cover scale-[1.30]"
                      onError={(e) => {
                        // fallback to number if icon path fails
                        (e.currentTarget.parentElement as HTMLElement).innerText = String(idx + 1);
                      }}
                    />
                  ) : (
                    <span className="text-xl font-bold text-[#333]">{idx + 1}</span>
                  )}
                </span>
                <div className="mt-5 w-full">
                  <h3 className="whitespace-pre-line text-base font-bold uppercase tracking-[0.12em] text-black sm:text-lg">{item.title}</h3>
                  <div className="mx-auto mt-3 h-px w-20 bg-[#cccccc]" />
                  <p className="mt-4 text-sm leading-[1.6] text-[#666]">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <section className="pt-3 pb-8 sm:pt-4">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-7xl px-6"
        >
          <div className="mx-auto max-w-5xl space-y-3 text-center">
            <div className="flex items-center justify-center gap-3 text-[#0b1e3f]">
              <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
              <span className="text-lg font-semibold uppercase tracking-[0.21em] sm:text-xl">Landmark Projects</span>
            </div>
          </div>
          <div className="mt-6">
            <IconicProjects />
          </div>
        </motion.div>
      </section>

      <section className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen overflow-hidden py-12 sm:py-14 lg:py-16">
        <div
          ref={performanceRef}
          className="relative w-full overflow-hidden border-y border-[#dfe8f3] bg-[#f7f9fc]"
        >
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/images/Performacebg.png"
              alt=""
              fill
              className="object-cover opacity-[0.16]"
              aria-hidden
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(246,250,255,0.93)_38%,_rgba(236,244,252,0.95)_100%)]" />
            <div className="absolute left-1/2 top-[56%] h-[620px] w-[1320px] max-w-[96vw] -translate-x-1/2 rounded-[56px] bg-[radial-gradient(circle,_rgba(145,198,255,0.28)_0%,_rgba(145,198,255,0.16)_34%,_rgba(145,198,255,0)_72%)] blur-3xl" />
            <svg
              className="absolute inset-0 h-full w-full text-[#dbe7f6]"
              viewBox="0 0 1600 900"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M-40 150C150 12 364 14 556 156" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1218 38C1386 112 1490 244 1560 418" stroke="currentColor" strokeWidth="1.2" />
              <path d="M-52 618C112 504 298 522 458 672" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1018 842C1178 708 1334 694 1590 834" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1338 220C1450 282 1520 378 1580 516" stroke="currentColor" strokeWidth="1.2" />
              <path d="M-12 60C176 90 332 174 450 298" stroke="currentColor" strokeWidth="1.2" opacity="0.72" />
            </svg>
          </div>

          <motion.div
            className="relative z-10 mx-auto max-w-[1320px] px-6 py-10 sm:px-8 sm:py-12 lg:px-12"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="mx-auto max-w-4xl space-y-4 text-center">
              <div className="flex items-center justify-center gap-4 text-[#0b1e3f]">
                <span className="h-px w-14 bg-[#d2dceb] sm:w-24" aria-hidden></span>
                <span className="text-lg font-semibold uppercase tracking-[0.21em] sm:text-xl">Performance Metrics</span>
                <span className="h-px w-14 bg-[#d2dceb] sm:w-24" aria-hidden></span>
              </div>
              <h2 className="text-[28px] font-semibold leading-tight text-[#10233f] sm:text-[36px] lg:text-[42px]">
                Execution Discipline. Proven Reliability.
              </h2>
              <p className="mx-auto max-w-3xl text-[15px] leading-relaxed text-[#596985] sm:text-base lg:text-[18px]">
                Disciplined execution and zero-compromise standards drive reliable, on-time results.
              </p>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-[58%] h-[430px] w-[1100px] max-w-[94vw] -translate-x-1/2 rounded-[60px] bg-[radial-gradient(circle,_rgba(159,205,255,0.24)_0%,_rgba(159,205,255,0.12)_36%,_rgba(159,205,255,0)_72%)] blur-2xl" />

            <motion.div
              className="relative z-10 mx-auto mt-8 grid max-w-[1120px] gap-3 sm:gap-4 lg:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerFade}
            >
                {[
                  {
                    value: 95,
                    suffix: "%+",
                    title: "On-Time Delivery",
                    description: "Structured project monitoring through Primavera-led planning",
                    image: "/images/On-Time Delivery.png",
                    imageClassName: "scale-[2.45]",
                  },
                  {
                    value: 0,
                    suffix: "",
                    title: "Major Safety Incidents",
                    description: "OSHA-aligned protocols and full-site compliance systems",
                    image: "/images/Major Safety Incidents.png",
                    imageClassName: "scale-[2.3]",
                  },
                  {
                    value: 60,
                    suffix: "%+",
                    title: "Repeat Government Clients",
                    description: "Built on performance not promises",
                    image: "/images/Repeat Government Clients.png",
                    imageClassName: "scale-[2.25]",
                  },
                  {
                    value: 62,
                    suffix: "",
                    title: "District Operational Capability",
                    description: "Simultaneous execution across 62 live sites",
                    image: "/images/District Operational Capability.png",
                    imageClassName: "scale-[2.2]",
                  },
                ].map((item) => (
                  <motion.article
                    key={item.title}
                    variants={itemFade}
                    className="group relative overflow-hidden rounded-[28px] border border-white/90 bg-white/88 px-6 py-6 shadow-[0_22px_48px_-38px_rgba(38,84,149,0.2)] transition duration-300 hover:-translate-y-1 hover:border-[#cae0f7] hover:shadow-[0_30px_68px_-40px_rgba(38,84,149,0.3)] sm:px-7 sm:py-7"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(255,255,255,0.62))]" />
                    <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-[#e7eef8]/80" />

                    <div className="relative z-10 flex items-start gap-4">
                      <div className="relative mt-1 flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
                        <div className="relative h-[78px] w-[78px] sm:h-[92px] sm:w-[92px]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className={`object-contain ${item.imageClassName}`}
                          />
                        </div>
                      </div>

                      <div className="min-w-0 flex-1 pr-0">
                        <AnimatedCounter
                          value={item.value}
                          suffix={item.suffix}
                          start={performanceInView}
                          className="text-[30px] font-semibold leading-none text-[#10233f] sm:text-[35px]"
                        />
                        <h3 className="mt-2 max-w-[24rem] text-[20px] font-semibold leading-tight text-[#162a48] sm:text-[22px]">
                          {item.title}
                        </h3>
                        <div className="mt-3 h-px w-24 bg-[#d5deeb]" />
                        <p className="mt-3 max-w-[28rem] text-[15px] leading-7 text-[#55647d] sm:text-base">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Clients */}
      <section className="py-8">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-5xl space-y-3 text-center">
            <div className="flex items-center justify-center gap-3 text-[#0b1e3f]">
              <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
              <span className="text-lg font-semibold uppercase tracking-[0.21em] sm:text-xl">Our Clients</span>
            </div>
            <h2 className="font-semibold text-[26px] leading-tight text-[#0b1e3f] sm:text-[30px] md:text-[34px]">
              Trusted by Leading Government Authorities.
            </h2>
            <p className="mx-auto max-w-4xl text-sm leading-relaxed text-[#405170] sm:text-base md:text-[17px]">
              Consistently delivering high-value infrastructure projects for state departments, municipal corporations, and public development bodies across Maharashtra.
            </p>
          </div>
        </motion.div>

        <div className="mx-auto mt-6 max-w-7xl px-6">
          <div className="rounded-[32px] border border-[#e6eaf4] bg-white/90 p-6 shadow-[0_30px_70px_-40px_rgba(11,30,63,0.35)] sm:p-8">
            <motion.div
              className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerFade}
            >
              {[
                { src: "/images/pwd-maharashtra.png", label: "PWD Maharashtra", alt: "PWD Maharashtra" },
                { src: "/images/mjp.png", label: "Maharashtra Jeevan Pradhikaran", alt: "Maharashtra Jeevan Pradhikaran" },
                { src: "/images/Urban Development Department.svg", label: "Urban Development Department", alt: "Urban Development Department" },
                { src: "/images/jal-jeevan-mission1.png", label: "Jal Jeevan Mission", alt: "Jal Jeevan Mission" },
                { src: "/images/amrut-2.png", label: "AMRUT 2.0", alt: "AMRUT 2.0" },
                { src: "/images/Nagpur_Municipal_Corporation_logo.png", label: "Nagpur Municipal Corporation", alt: "Nagpur Municipal Corporation" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-[#e6eaf4] bg-white px-4 py-5 text-center shadow-[0_12px_30px_-24px_rgba(11,30,63,0.35)]"
                  variants={itemFade}
                >
                  <div className="flex h-16 items-center">
                    <Image src={item.src} alt={item.alt} width={160} height={64} className="h-14 w-auto object-contain" />
                  </div>
                  <p className="text-sm font-semibold text-[#0b1e3f]">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              ref={clientsStatsRef}
              className="mt-6 grid gap-4 md:grid-cols-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerFade}
            >
              {[
                { value: 7, label: "Government Partners" },
                { value: 15, label: "Municipal Councils" },
                { value: 3, label: "Zilla Parishads" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl border border-[#e6eaf4] bg-white px-6 py-7 text-center shadow-[0_16px_40px_-28px_rgba(11,30,63,0.35)]"
                  variants={itemFade}
                >
                  <p className="text-3xl font-semibold text-[#0b1e3f]">
                    <AnimatedCounter value={stat.value} start={clientsStatsInView} className="text-3xl font-semibold text-[#0b1e3f]" />
                    <span className="text-[var(--bbd-accent)]">+</span>
                  </p>
                  <div className="mx-auto mt-3 h-px w-12 bg-[var(--bbd-accent)]/60" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#405170] sm:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <motion.section
        {...fadeUp}
        className="relative overflow-hidden rounded-[28px] border border-[#0a2e71] bg-[#0B1E3F] px-6 py-8 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:px-10 sm:py-10"
      >
        {/* Right image with soft mask */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/home-hero-bridge.jpg"
            alt="Strategy meeting"
            fill
            className="object-cover object-center opacity-70"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3F] via-[#0B1E3F]/85 to-transparent" />
        </div>

        <div className="relative z-10 grid items-center gap-6 sm:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold leading-snug sm:text-3xl">Ready to discuss your next mandate?</h2>
            <p className="text-sm leading-relaxed text-white/90">
              Bring your stakeholders for a focused discovery session. We collaborate to define scope, milestones, and delivery frameworks backed by
              data driven insights and proven execution expertise.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 sm:flex-nowrap">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--bbd-accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_34px_-16px_rgba(255,107,0,0.55)] transition hover:bg-[var(--bbd-accent-soft)]"
              >
                <span aria-hidden>✉</span>
                Contact BBD Infra
              </Link>
              <a
                href="tel:+919921342002"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white/95 backdrop-blur-sm transition hover:bg-white/10"
              >
                <span aria-hidden>☎</span>
                +91 99213 42002
              </a>
              <a
                href="mailto:atharvasaoji99@bbdinfra.in"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white/95 backdrop-blur-sm transition hover:bg-white/10"
              >
                <span aria-hidden>✉</span>
                atharvasaoji99@bbdinfra.in
              </a>
            </div>
          </div>
        </div>
      </motion.section>
      </div>
    </>
  );
}
