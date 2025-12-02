"use client";

const insights = [
  {
    title: "BBD Infra shortlisted for multi-state Jal Jeevan Mission EPC packages",
    category: "Corporate",
    date: "February 2025",
    summary:
      "Pre-qualified consortiums formed with national partners position BBD Infra to deliver complex, multi-district water supply mandates under Jal Jeevan Mission.",
  },
  {
    title: "Smart corridor milestone: Indapur CC road achieves COD 45 days early",
    category: "Project Update",
    date: "January 2025",
    summary:
      "Integrated planning, GPS-guided compaction, and AI risk dashboards enabled accelerated delivery of the 100+ km Indapur corridor, unlocking mobility benefits sooner.",
  },
  {
    title: "Green construction pledge targets 30% lower emissions",
    category: "Sustainability",
    date: "December 2024",
    summary:
      "A company-wide ESG roadmap introduces low-carbon material mixes, solar-powered site facilities, and digital tracking of emissions across live projects.",
  },
  {
    title: "Atlas™ command centre expands to 62 live projects",
    category: "Technology",
    date: "November 2024",
    summary:
      "BBD Infra's digital nerve centre now streams telemetry from IoT devices, SCADA systems, and Primavera ensuring real-time decision-making at every site.",
  },
];

export default function InsightsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 pb-24 pt-16 sm:px-10">
      <header className="space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--bbd-primary)]">
          Insights
        </p>
        <h1 className="text-4xl font-semibold text-[#0b1e3f] sm:text-5xl">News, updates, and thought leadership.</h1>
        <p className="text-base leading-relaxed text-[#405170]">
          Stay informed about the latest achievements, technology upgrades, sustainability commitments, and community initiatives from BBD Infra.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {insights.map((item) => (
          <article key={item.title} className="rounded-[24px] border border-[#dbe4f4] bg-white p-6 shadow-[0_16px_40px_-36px_rgba(11,61,145,0.25)]">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]/55">
              <span>{item.category}</span>
              <span className="h-[6px] w-[6px] rounded-full bg-[var(--bbd-accent)]" />
              <span>{item.date}</span>
            </p>
            <h2 className="mt-3 text-xl font-semibold text-[#0b1e3f]">{item.title}</h2>
            <p className="mt-4 text-sm text-[#405170]">{item.summary}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
