"use client";

const awards = [
  { year: 2024, title: "Safety Excellence – State Awards", note: "Zero major incidents in 5 years across EPC mandates." },
  { year: 2023, title: "On‑Time Delivery Commendation", note: "Multiple projects commissioned ahead of schedule." },
  { year: 2022, title: "Sustainability Recognition", note: "Solar lighting roll‑out saving 80% municipal energy." },
];

export default function AwardsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 pb-24 pt-16 sm:px-10">
      <header className="space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--bbd-primary)]">
          Awards & Recognitions
        </p>
        <h1 className="text-4xl font-semibold text-[#0b1e3f] sm:text-5xl">Recognised for sustained excellence.</h1>
        <p className="text-base leading-relaxed text-[#405170]">
          Our work has been acknowledged by state agencies and industry forums for quality, safety, and timely delivery.
        </p>
      </header>

      <section className="grid gap-6 rounded-[28px] border border-[#dbe4f4] bg-white p-8">
        {awards.map((a) => (
          <div key={a.year} className="grid items-center gap-4 rounded-[18px] bg-[#f7f9ff] px-5 py-4 sm:grid-cols-[0.2fr_1fr]">
            <div className="text-2xl font-semibold text-[var(--bbd-primary)]">{a.year}</div>
            <div className="text-sm text-[#405170]">
              <p className="font-semibold text-[#0b1e3f]">{a.title}</p>
              <p>{a.note}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

