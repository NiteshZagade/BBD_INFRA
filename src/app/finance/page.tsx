"use client";

import FinanceChart from "@/components/FinanceChart";
import { useSiteData } from "@/context/site-data";

export default function FinancePage() {
  const { data } = useSiteData();
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 pb-24 pt-16 sm:px-10">
      <header className="space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--bbd-primary)]">
          Finance
        </p>
        <h1 className="text-4xl font-semibold text-[#0b1e3f] sm:text-5xl">Year-on-Year Performance</h1>
        <p className="text-base leading-relaxed text-[#405170]">
          Consistent growth driven by disciplined execution, diversified order books, and technology-backed project controls.
        </p>
      </header>

      <section className="grid gap-8 rounded-[28px] border border-[#dbe4f4] bg-white p-6 lg:grid-cols-[1.2fr_0.8fr]">
        <FinanceChart data={data.finances} />
        <div className="space-y-4 text-sm text-[#405170]">
          {data.finances.map((point) => (
            <div key={point.year} className="flex items-center justify-between rounded-[18px] bg-[#f4f7ff] px-4 py-3">
              <span className="text-sm font-semibold text-[#0b1e3f]">{point.year}</span>
              <div className="text-right">
                <p>Revenue: ₹{point.revenue} Cr</p>
                <p>Profit: ₹{point.profit} Cr</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

