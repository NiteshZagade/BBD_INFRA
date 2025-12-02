"use client";

import { useState } from "react";
import { useSiteData } from "@/context/site-data";

export default function AdminPage() {
  const { data, updateStats, setFinances } = useSiteData();
  const [stats, setStats] = useState(data.stats);
  const [finances, setFinancesDraft] = useState(data.finances);

  const handleStatChange = (key: keyof typeof stats, value: number) => {
    setStats((prev) => ({ ...prev, [key]: value }));
  };

  const handleFinanceChange = (index: number, field: "year" | "revenue" | "profit", value: number) => {
    setFinancesDraft((prev) => prev.map((point, idx) => (idx === index ? { ...point, [field]: value } : point)));
  };

  const addFinanceRow = () => {
    setFinancesDraft((prev) => [...prev, { year: prev[prev.length - 1].year + 1, revenue: 0, profit: 0 }]);
  };

  const removeFinanceRow = (index: number) => {
    setFinancesDraft((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSave = () => {
    updateStats(stats);
    setFinances(finances);
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-5 pb-24 pt-16 sm:px-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-[#0b1e3f]">Admin Portal</h1>
        <p className="text-sm text-[#405170]">Update live metrics and finance highlights reflected across the public site.</p>
      </header>

      <section className="space-y-4 rounded-[28px] border border-[#dbe4f4] bg-white p-6 shadow-[0_16px_30px_-28px_rgba(11,61,145,0.25)]">
        <h2 className="text-xl font-semibold text-[#0b1e3f]">Headline numbers</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {Object.entries(stats).map(([key, value]) => (
            <label key={key} className="text-sm text-[#405170]">
              <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-[#0b1e3f]/60">{key}</span>
              <input
                type="number"
                min={0}
                value={value}
                onChange={(e) => handleStatChange(key as keyof typeof stats, Number(e.target.value))}
                className="mt-2 w-full rounded-xl border border-[#c8d5ee] px-4 py-3 text-sm text-[#0b1e3f] focus:border-[var(--bbd-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-primary)]/20"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-[28px] border border-[#dbe4f4] bg-white p-6 shadow-[0_16px_30px_-28px_rgba(11,61,145,0.25)]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#0b1e3f]">Finance chart data</h2>
          <button
            type="button"
            onClick={addFinanceRow}
            className="rounded-full border border-[#c8d5ee] px-4 py-2 text-sm font-semibold text-[#0b1e3f] hover:border-[var(--bbd-primary)] hover:text-[var(--bbd-primary)]"
          >
            + Add Year
          </button>
        </div>
        <div className="space-y-3 text-sm text-[#405170]">
          {finances.map((point, index) => (
            <div key={point.year} className="grid gap-3 rounded-[18px] border border-[#e6ecfb] bg-[#f8faff] p-4 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <label className="text-xs uppercase tracking-[0.3em] text-[#0b1e3f]/60">
                Year
                <input
                  type="number"
                  value={point.year}
                  min={2000}
                  onChange={(e) => handleFinanceChange(index, "year", Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-[#c8d5ee] px-3 py-2 text-sm text-[#0b1e3f] focus:border-[var(--bbd-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-primary)]/20"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-[#0b1e3f]/60">
                Revenue (₹ Cr)
                <input
                  type="number"
                  value={point.revenue}
                  min={0}
                  onChange={(e) => handleFinanceChange(index, "revenue", Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-[#c8d5ee] px-3 py-2 text-sm text-[#0b1e3f] focus:border-[var(--bbd-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-primary)]/20"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-[#0b1e3f]/60">
                Profit (₹ Cr)
                <input
                  type="number"
                  value={point.profit}
                  min={0}
                  onChange={(e) => handleFinanceChange(index, "profit", Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-[#c8d5ee] px-3 py-2 text-sm text-[#0b1e3f] focus:border-[var(--bbd-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-primary)]/20"
                />
              </label>
              <button
                type="button"
                onClick={() => removeFinanceRow(index)}
                className="rounded-full border border-[#f4c7ac] px-3 py-2 text-xs font-semibold text-[#b44300] hover:bg-[#fff1ea]"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-[var(--bbd-primary)] px-8 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_-16px_rgba(11,61,145,0.45)] transition hover:bg-[var(--bbd-primary-soft)]"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
