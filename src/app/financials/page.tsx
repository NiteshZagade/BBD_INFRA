"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AnimatedStat } from "@/components/AnimatedStat";

/* ── Financial table data ── */
const years = ["2020–21", "2021–22", "2022–23", "2023–24", "2024–25", "2025–26"];

const tableRows = [
  { label: "Revenue (₹)",         values: ["12,55,18,989", "19,26,98,939", "27,67,44,031", "48,72,18,767", "75,00,00,000",   "1,10,00,00,000"],  bold: false },
  { label: "Interest Expense (₹)", values: ["81,05,908",    "83,78,228",    "47,26,311",    "71,33,892",    "82,00,000",      "96,00,000"],        bold: false },
  { label: "Tax Paid (₹)",         values: ["27,47,091",    "35,44,195",    "53,72,797",    "1,52,14,071",  "2,20,00,000",    "3,25,00,000"],      bold: false },
  { label: "Net Profit (₹)",       values: ["89,65,904",    "1,22,06,444",  "1,82,82,269",  "5,07,54,849",  "7,50,00,000",    "11,00,00,000"],     bold: false },
  { label: "Depreciation (₹)",     values: ["90,13,328",    "79,03,728",    "68,20,438",    "70,08,347",    "78,00,000",      "85,00,000"],        bold: false },
  { label: "EBITDA (₹)",           values: ["2,88,32,231",  "3,20,32,595",  "3,52,01,815",  "8,01,11,159",  "11,30,00,000",   "16,06,00,000"],     bold: true  },
  { label: "EBITDA Margin",        values: ["22.97%",       "16.63%",       "12.72%",       "16.44%",       "15.07%",         "14.60%"],           bold: false, gold: true },
];

/* ── Revenue bar chart (₹ Cr) ── */
const revenueData = [
  { year: "2020-21", val: 12.55 },
  { year: "2021-22", val: 19.27 },
  { year: "2022-23", val: 27.67 },
  { year: "2023-24", val: 48.72 },
  { year: "2024-25", val: 75.00 },
  { year: "2025-26", val: 110.00 },
];

/* ── Net Profit bar chart (₹ Cr) ── */
const profitData = [
  { year: "2020-21", val: 0.90 },
  { year: "2021-22", val: 1.22 },
  { year: "2022-23", val: 1.83 },
  { year: "2023-24", val: 5.08 },
  { year: "2024-25", val: 7.50 },
  { year: "2025-26", val: 11.00 },
];

/* ── EBITDA Margin line chart (%) ── */
const marginData = [22.97, 16.63, 12.72, 16.44, 15.07, 14.60];

function BarChart({
  data,
  color,
  label,
}: {
  data: { year: string; val: number }[];
  color: string;
  label: string;
}) {
  const maxVal = Math.max(...data.map((d) => d.val));
  const chartH = 140;
  const barW = 44;
  const gap = 22;
  const startX = 30;
  const baseY = 170;

  return (
    <div className="rounded-[3px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <p className="mb-4 text-[14px] font-semibold text-[#08102B]">{label}</p>
      <svg viewBox="0 0 500 200" className="w-full" style={{ height: "200px" }}>
        {data.map((d, i) => {
          const bH = (d.val / maxVal) * chartH;
          const x = startX + i * (barW + gap);
          const y = baseY - bH;
          return (
            <g key={d.year}>
              <rect x={x} y={y} width={barW} height={bH} fill={color} rx={2} />
              <text x={x + barW / 2} y={y - 5} textAnchor="middle" fontSize="9" fill="#6B7C99" fontFamily="sans-serif">
                ₹{d.val}Cr
              </text>
              <text x={x + barW / 2} y={baseY + 14} textAnchor="middle" fontSize="9" fill="#9BA8BE" fontFamily="sans-serif">
                {d.year}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function LineChart() {
  const data = marginData;
  const minY = 5;
  const maxY = 35;
  const chartH = 220;
  const baseY = 270;
  const startX = 60;
  const stepX = 96;

  const toSVGY = (v: number) => baseY - ((v - minY) / (maxY - minY)) * chartH;

  const points = data.map((v, i) => ({ x: startX + i * stepX, y: toSVGY(v) }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const fillD = `${pathD} L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;

  return (
    <div className="rounded-[3px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <p className="mb-4 text-[14px] font-semibold text-[#08102B]">EBITDA Margin Trend (%)</p>
      <svg viewBox="0 0 580 310" className="w-full" style={{ height: "320px" }}>
        {/* Y-axis gridlines */}
        {[10, 15, 20, 25, 30, 35].map((v) => (
          <g key={v}>
            <line x1={48} x2={545} y1={toSVGY(v)} y2={toSVGY(v)} stroke="#F3F4F6" strokeWidth={1} />
            <text x={42} y={toSVGY(v) + 4} textAnchor="end" fontSize="9" fill="#9BA8BE" fontFamily="sans-serif">
              {v}%
            </text>
          </g>
        ))}
        {/* Area fill */}
        <path d={fillD} fill="rgba(201,150,12,0.08)" />
        {/* Line */}
        <path d={pathD} fill="none" stroke="#C9960C" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
        {/* Dots + labels */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={6} fill="#C9960C" />
            <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="10" fill="#6B7C99" fontFamily="sans-serif">
              {data[i]}%
            </text>
            <text x={p.x} y={baseY + 16} textAnchor="middle" fontSize="9" fill="#9BA8BE" fontFamily="sans-serif">
              {years[i].replace("–", "-")}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── Strength cards ── */
const strengths = [
  {
    icon: "📈",
    title: "3× Revenue Growth",
    desc: "Revenue grew from ₹15.16 Cr (2018–19) to ₹48.72 Cr (2023–24) — a compound growth driven by diversified government contracts.",
  },
  {
    icon: "💰",
    title: "Strong Cash Flow",
    desc: "Consistent EBITDA generation ranging 12–30% margins. Net profit jumped 4× in 2023–24 to ₹5.07 Cr — signaling operational maturity.",
  },
  {
    icon: "🏛",
    title: "Government-Backed Revenue",
    desc: "100% revenue from government contracts — MJP, PWD, Jal Jeevan Mission, and Amrut 2.0 — ensuring reliable payment cycles and low credit risk.",
  },
  {
    icon: "📊",
    title: "₹800 Cr Work in Hand",
    desc: "Total secured project value exceeds ₹800 Crores across 62 live sites — providing strong revenue visibility for the next 2–3 years.",
  },
  {
    icon: "🎯",
    title: "95%+ On-Time Delivery",
    desc: "Timely billing and milestone completion ensures healthy cash inflows, zero penalty clauses, and strong repeat-business rates above 60%.",
  },
  {
    icon: "🚀",
    title: "₹1,500 Cr Target by 2027",
    desc: "Strategic JVs, EPC bidding under PM Gati Shakti, and pan-India expansion position BBD Infra for a 2× order book growth in 24 months.",
  },
];

/* ── Opportunity pipeline ── */
const pipeline = [
  { label: "EPC & PPP Models",          badge: "ACTIVELY BIDDING", badgeColor: "#16a34a", badgeBg: "rgba(22,163,74,0.12)" },
  { label: "National Tenders",           badge: "EXPANDING",        badgeColor: "#2563eb", badgeBg: "rgba(37,99,235,0.12)" },
  { label: "Smart Cities / AMRUT 2.0",  badge: "ALIGNED",          badgeColor: "#0891b2", badgeBg: "rgba(8,145,178,0.12)" },
  { label: "Solar + Infra Bundling",     badge: "PROVEN MODEL",     badgeColor: "#C9960C", badgeBg: "rgba(201,150,12,0.12)" },
  { label: "O&M Contracts",             badge: "PIPELINE",         badgeColor: "#6B7C99", badgeBg: "rgba(107,124,153,0.12)" },
  { label: "PM Gati Shakti Projects",   badge: "ALIGNED",          badgeColor: "#0891b2", badgeBg: "rgba(8,145,178,0.12)" },
];

export default function FinancialsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-[#08102B]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/finance.jpeg"
            alt="Financial performance"
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
              Financial Performance
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 text-[clamp(34px,5vw,60px)] font-bold leading-[1.1] text-white"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
            >
              Consistent Growth.<br />Proven Financial Strength.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10 text-[15px] font-light leading-[1.85] text-white/65 max-w-xl"
            >
              From ₹12.55 Cr revenue in 2020–21 to ₹48.72 Cr in 2023–24 — a consistent growth trajectory backed by disciplined execution, government trust, and an expanding project portfolio.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap gap-x-8 gap-y-4"
            >
              {([
                { prefix: "₹", value: 1000,  suffix: "Cr+", decimals: 0, label: "Work in Hand" },
                { prefix: "₹", value: 48.72, suffix: " Cr", decimals: 2, label: "Revenue 2023–24" },
                { prefix: "",  value: 16.44, suffix: "%",   decimals: 2, label: "EBITDA Margin 2023–24" },
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

      {/* ── Key Metrics Strip ── */}
      <section className="bg-[#0D1A40]">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { value: "₹48.72 Cr", label: "Revenue 2023–24" },
              { value: "₹5.08 Cr",  label: "Net Profit 2023–24" },
              { value: "₹8.01 Cr",  label: "EBITDA 2023–24" },
              { value: "16.44%",    label: "EBITDA Margin 2023–24" },
              { value: "₹1000 Cr+", label: "Work in Hand" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center py-8 px-4 text-center">
                <span
                  className="text-[clamp(20px,2.5vw,28px)] font-bold text-[#F59E0B]"
                  style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
                >
                  {s.value}
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Income Statement ── */}
      <section className="bg-[#FAFBFD] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55 }}
            className="mb-10"
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Income Statement</p>
            <h2 className="mb-3 text-[clamp(26px,3.5vw,40px)] font-bold leading-[1.15] text-[#08102B]"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
              Standalone Financial Highlights
            </h2>
            <p className="text-[14px] font-light text-[#6B7C99] max-w-xl">
              Six-year financial performance — demonstrating consistent revenue growth, improving profitability, and strong EBITDA generation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="overflow-x-auto rounded-[3px] border border-[#DDE3EF]"
          >
            <table className="w-full min-w-[700px] border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#08102B] text-white">
                  <th className="py-4 px-5 text-left text-[11px] font-semibold uppercase tracking-[0.14em]">Particulars</th>
                  {years.map((y) => (
                    <th key={y} className="py-4 px-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F59E0B]">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-t border-[#EDF0F7] ${i % 2 === 0 ? "bg-white" : "bg-[#FAFBFD]"} ${row.bold ? "font-semibold" : ""}`}
                  >
                    <td className={`py-3.5 px-5 ${row.gold ? "text-[#C9960C] font-semibold" : "text-[#08102B]"}`}>{row.label}</td>
                    {row.values.map((v, j) => (
                      <td
                        key={j}
                        className={`py-3.5 px-4 text-right tabular-nums ${row.gold ? "text-[#C9960C] font-semibold" : row.bold ? "text-[#08102B]" : "text-[#4A5C7A]"}`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── Growth at a Glance ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55 }}
            className="mb-12"
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Visual Analytics</p>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold leading-[1.15] text-[#08102B]"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
              Growth at a Glance
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            <BarChart data={revenueData} color="#C9960C" label="Revenue Growth (₹ Crores)" />
            <BarChart data={profitData}  color="#2563EB" label="Net Profit (₹ Crores)" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-6"
          >
            <LineChart />
          </motion.div>
        </div>
      </section>

      {/* ── Financial Strengths ── */}
      <section className="bg-[#08102B] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55 }}
            className="mb-12"
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Why Invest / Trust in Us</p>
            <h2 className="text-[clamp(26px,3.5vw,42px)] font-bold leading-[1.15] text-white"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
              Financial Strengths &amp; Competitive Edge
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
                className="rounded-[3px] border border-white/10 bg-[#0D1A40] p-6"
                style={{ borderTop: "3px solid #C9960C" }}
              >
                <div className="mb-4 text-[28px]">{s.icon}</div>
                <h3 className="mb-2 text-[17px] font-bold text-white"
                  style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
                  {s.title}
                </h3>
                <p className="text-[13px] font-light leading-[1.75] text-white/60">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Growth Pipeline ── */}
      <section className="bg-[#FAFBFD] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}
            >
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Growth Pipeline</p>
              <h2 className="mb-6 text-[clamp(26px,3.5vw,42px)] font-bold leading-[1.15] text-[#08102B]"
                style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
                The Road to ₹1,500 Crores
              </h2>
              <p className="mb-3 text-[clamp(32px,4vw,52px)] font-bold text-[#C9960C]"
                style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
                ₹1,500Cr+
              </p>
              <p className="mb-8 text-[14px] font-light leading-[1.8] text-[#4A5C7A]">
                Projected order book target by FY 2027 — driven by national expansion, EPC contracts, and strategic Joint Ventures with L&amp;T and Tata Projects.
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {[
                  { value: "2–3",    label: "JVs Planned" },
                  { value: "4 States", label: "Target Expansion" },
                  { value: "3+",     label: "EPC Contracts >₹100Cr" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col gap-1 border-t-2 border-[#C9960C]/40 pt-3 pr-8">
                    <span className="text-[22px] font-bold text-[#08102B]"
                      style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
                      {s.value}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B7C99]">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: 0.1 }}
            >
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Opportunity Pipeline</p>
              <div className="space-y-2">
                {pipeline.map((p) => (
                  <div key={p.label} className="flex items-center justify-between rounded-[3px] border border-[#DDE3EF] bg-white px-5 py-4">
                    <span className="text-[14px] font-medium text-[#08102B]">{p.label}</span>
                    <span
                      className="rounded-[2px] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{ color: p.badgeColor, backgroundColor: p.badgeBg }}
                    >
                      {p.badge}
                    </span>
                  </div>
                ))}
              </div>
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
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55 }}
            className="mb-4 text-[clamp(26px,4vw,48px)] font-bold leading-tight text-[#08102B]"
            style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
          >
            Interested in BBD Infra&apos;s Growth Story?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-9 text-[15px] font-light text-[#08102B]/75"
          >
            Connect with us to explore partnership, investment, or project collaboration opportunities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.45, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-[3px] bg-[#08102B] px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#0D1A40] hover:shadow-lg"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
