"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatedStat } from "@/components/AnimatedStat";

/* ── Project data ── */
type Project = {
  name: string;
  value: string;
  category: string;
  badge: string;
  location: string;
  status: "Active" | "Completed";
  bgColor: string;
};

const projects: Project[] = [
  // Water Supply
  { name: "Wani AMRUT 2.0 Water Supply Scheme", value: "₹140.62 Cr", category: "Water Supply", badge: "WATER", location: "Yavatmal, Maharashtra", status: "Active", bgColor: "#0D1A40" },
  { name: "Pandharkawda Water Supply Scheme", value: "₹68.44 Cr", category: "Water Supply", badge: "WATER", location: "Yavatmal, Maharashtra", status: "Completed", bgColor: "#0D1A40" },
{ name: "Daund Water Supply – Part 2 (AMRUT 2.0)", value: "₹60 Cr", category: "Water Supply", badge: "WATER", location: "Pune, Maharashtra", status: "Active", bgColor: "#0D1A40" },
  { name: "Hirabambai Regional Water Supply Scheme", value: "₹38 Cr", category: "Water Supply", badge: "WATER", location: "Amravati, Maharashtra", status: "Completed", bgColor: "#0D1A40" },
  { name: "Yelgaon Regional Water Supply Scheme", value: "₹22 Cr", category: "Water Supply", badge: "WATER", location: "Buldhana, Maharashtra", status: "Completed", bgColor: "#0D1A40" },
  // Roads & Bridges
  { name: "Jalna–Nanded Expressway", value: "₹700 Cr", category: "Roads & Bridges", badge: "ROADS", location: "Marathwada Region", status: "Active", bgColor: "#1C2B1A" },
  { name: "Amdapur–Janephal–Vishvi CC Road", value: "₹55.50 Cr", category: "Roads & Bridges", badge: "ROADS", location: "Buldhana Region", status: "Completed", bgColor: "#1C2B1A" },
  { name: "Painganga River Bridge", value: "₹25 Cr", category: "Roads & Bridges", badge: "ROADS", location: "Chandrapur Region", status: "Completed", bgColor: "#1C2B1A" },
  { name: "Urban Development Roads – Mehkar", value: "₹50 Cr", category: "Roads & Bridges", badge: "ROADS", location: "Buldhana, Maharashtra", status: "Completed", bgColor: "#1C2B1A" },
  { name: "EPC Improvements to Poladpur–Mahabaleshwar–Wai–Bhadale–Dahiwadi Road SH-139 & Pargaon Yawat Saswad Kapurhol–Bhor–Mandhardev–Wai–Surur Road SH-119, Tal. Wai Dist. Satara", value: "₹300 Cr", category: "Roads & Bridges", badge: "ROADS", location: "Satara, Maharashtra", status: "Active", bgColor: "#1C2B1A" },
  // Urban Development
  { name: "Lendi Talao Rejuvenation (AMRUT 2.0)", value: "₹14.31 Cr", category: "Urban Development", badge: "URBAN", location: "Lonar, Buldhana", status: "Completed", bgColor: "#1A1430" },
  { name: "Wainganga River Bank & Flood Control", value: "₹12 Cr", category: "Urban Development", badge: "URBAN", location: "Buldhana, Maharashtra", status: "Completed", bgColor: "#1A1430" },
  { name: "Chhatrapati Shivaji Maharaj Udyan", value: "₹8 Cr", category: "Urban Development", badge: "URBAN", location: "Buldhana, Maharashtra", status: "Completed", bgColor: "#1A1430" },
  { name: "Development of Healthy Streets in Shankarnagar and Dharampeth areas of Nagpur city as per Urban Street Design Guidelines", value: "₹25 Cr", category: "Urban Development", badge: "URBAN", location: "Nagpur, Maharashtra", status: "Active", bgColor: "#1A1430" },
  { name: "Proposed Beautification & Development at Open Space in Front of Gomukh Dhar Lonar", value: "", category: "Urban Development", badge: "URBAN", location: "Lonar, Buldhana", status: "Completed", bgColor: "#1A1430" },
  // Renewable Energy
  { name: "Providing & Erecting 100 Solar Mini High Mast Poles at Gram Panchayat Locations – Dist. Bhandara (Est. 1563/GND/2022-23)", value: "₹3.81 Cr", category: "Renewable Energy", badge: "SOLAR", location: "Bhandara, Maharashtra", status: "Completed", bgColor: "#1A1200" },
  { name: "Providing & Erecting 68 Solar Mini High Mast Poles at Gram Panchayat Locations – Dist. Bhandara (Est. 1565/BND/2022-23)", value: "₹2.59 Cr", category: "Renewable Energy", badge: "SOLAR", location: "Bhandara, Maharashtra", status: "Completed", bgColor: "#1A1200" },
  { name: "Providing & Erecting 46 Solar Mini High Mast Poles at Gram Panchayat Locations – Dist. Bhandara & Gondia (Est. 1564,1566/GND,BND/2022-23)", value: "₹1.75 Cr", category: "Renewable Energy", badge: "SOLAR", location: "Bhandara & Gondia, Maharashtra", status: "Completed", bgColor: "#1A1200" },
  { name: "Providing & Erecting 63 Solar Mini Highmast Poles at Nagar Panchayat Kalamb, Babhulgaon & Ralegaon (Est. 243/EE/YTL/2023-24)", value: "₹2.63 Cr", category: "Renewable Energy", badge: "SOLAR", location: "Yavatmal, Maharashtra", status: "Completed", bgColor: "#1A1200" },
  { name: "Providing & Erecting 48 Solar Mini Highmast Poles at Gram Panchayat Umerkhed & Mahagaon (Est. 235/EE/YTL/2023-24)", value: "₹2.00 Cr", category: "Renewable Energy", badge: "SOLAR", location: "Yavatmal, Maharashtra", status: "Completed", bgColor: "#1A1200" },
  { name: "Solar Mini Highmast Poles – Gram Panchayats", value: "₹8 Cr", category: "Renewable Energy", badge: "SOLAR", location: "Bhandara, Maharashtra", status: "Completed", bgColor: "#1A1200" },
  { name: "Solar Highmast Street Lighting – Wani", value: "₹6 Cr", category: "Renewable Energy", badge: "SOLAR", location: "Yavatmal, Maharashtra", status: "Completed", bgColor: "#1A1200" },
  { name: "Solar Mini Highmast – 63 Units", value: "₹5 Cr", category: "Renewable Energy", badge: "SOLAR", location: "Gondia, Maharashtra", status: "Completed", bgColor: "#1A1200" },
];

const FILTERS = ["All Projects", "Water Supply", "Roads & Bridges", "Urban Development", "Renewable Energy"];

const BADGE_COLORS: Record<string, string> = {
  WATER: "#C9960C",
  ROADS: "#C9960C",
  URBAN: "#C9960C",
  SOLAR: "#C9960C",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group overflow-hidden rounded-[3px] border border-[#DDE3EF] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(8,16,43,0.18)]"
    >
      {/* Colored top block (no image) */}
      <div
        className="relative flex h-[180px] w-full items-center justify-center"
        style={{ backgroundColor: project.bgColor }}
      >
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)", backgroundSize: "32px 32px" }}
        />
        {/* BBD monogram */}
        <span
          className="select-none text-[52px] font-bold tracking-widest text-white/10"
          style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
        >
          BBD
        </span>
        {/* Category badge */}
        <div className="absolute left-3 top-3">
          <span
            className="rounded-[2px] px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-[#08102B]"
            style={{ backgroundColor: BADGE_COLORS[project.badge] ?? "#C9960C" }}
          >
            {project.badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="mb-2 text-[16px] font-bold leading-snug text-[#08102B] transition-colors group-hover:text-[#08102B]"
          style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
        >
          {project.name}
        </h3>

        {/* Location */}
        <p className="mb-3 flex items-center gap-1.5 text-[12px] text-[#6B7C99]">
          <svg width="11" height="13" viewBox="0 0 11 13" fill="none" className="shrink-0">
            <path d="M5.5 0C3.015 0 1 2.015 1 4.5c0 3.375 4.5 8.5 4.5 8.5S10 7.875 10 4.5C10 2.015 7.985 0 5.5 0Zm0 6.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Z" fill="currentColor" />
          </svg>
          {project.location}
        </p>

        {/* Value + Status */}
        <div className="flex items-center justify-between border-t border-[#EDF0F7] pt-3">
          <span className="text-[13px] font-semibold text-[#08102B]">
            Value: {project.value}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-medium">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: project.status === "Active" ? "#16a34a" : "#C9960C" }}
            />
            <span style={{ color: project.status === "Active" ? "#16a34a" : "#C9960C" }}>
              Status: {project.status}
            </span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

const SLUG_TO_FILTER: Record<string, string> = {
  "water-supply":         "Water Supply",
  "roads-highways":       "Roads & Bridges",
  "urban-infrastructure": "Urban Development",
  "renewable-energy":     "Renewable Energy",
};

export default function ProjectsIndex() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  const initial = filterParam && FILTERS.includes(filterParam) ? filterParam
    : (filterParam && SLUG_TO_FILTER[filterParam]) ? SLUG_TO_FILTER[filterParam]
    : "All Projects";
  const [activeFilter, setActiveFilter] = useState(initial);

  useEffect(() => {
    const p = searchParams.get("filter");
    if (!p) return;
    const resolved = FILTERS.includes(p) ? p : SLUG_TO_FILTER[p];
    if (resolved) setActiveFilter(resolved);
  }, [searchParams]);

  const filtered = activeFilter === "All Projects"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-[#08102B]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/projects.jpg"
            alt="Projects background"
            fill
            className="object-cover object-center opacity-35"
            priority
            unoptimized
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#08102B]/90 via-[#08102B]/70 to-[#08102B]/30" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-10">
          <div className="border-l-4 border-[#C9960C] pl-10 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F59E0B]"
            >
              Portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 text-[clamp(34px,5vw,62px)] font-bold leading-[1.1] text-white"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
            >
              Projects That Define<br />Our Execution Standards.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10 text-[15px] font-light leading-[1.85] text-white/65 max-w-xl"
            >
              From water supply networks to road development programs — each project reflects our commitment to structured delivery, compliance, and long-term infrastructure quality across Maharashtra.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap gap-x-8 gap-y-4"
            >
              {([
                { prefix: "",  value: 62,  suffix: "+",   decimals: 0, label: "Active Sites" },
                { prefix: "₹", value: 1000, suffix: "Cr+", decimals: 0, label: "Work in Hand" },
                { prefix: "",  value: 4,   suffix: "+",   decimals: 0, label: "Key Sectors" },
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

      {/* ── Filterable project grid ── */}
      <section className="bg-[#FAFBFD] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">

          {/* Filter tabs */}
          <div className="mb-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`rounded-[3px] border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                  activeFilter === f
                    ? "border-[#08102B] bg-[#08102B] text-white"
                    : "border-[#DDE3EF] bg-white text-[#08102B] hover:border-[#08102B] hover:bg-[#08102B]/5"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden bg-[#C9960C] py-28">
        {/* BBD watermark */}
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
            Have a Project in Mind?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mb-9 text-[15px] font-light text-[#08102B]/75"
          >
            Let us bring our execution expertise to your infrastructure program.
          </motion.p>

          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-[3px] bg-[#08102B] px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#0D1A40] hover:shadow-lg"
          >
            Get in Touch
          </motion.a>
        </div>
      </section>
    </>
  );
}
