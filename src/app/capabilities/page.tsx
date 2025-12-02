"use client";

const items = [
  {
    title: "Water Supply Networks",
    description:
      "Pioneering 24×7 smart water distribution schemes and laying thousands of kilometres of pipelines to ensure clean water access.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3C9 7 6 10 6 13.5a6 6 0 0 0 12 0C18 10 15 7 12 3z" />
      </svg>
    ),
  },
  {
    title: "Roads & Connectivity",
    description:
      "Constructing durable cement concrete roads and vital bridges that improve connectivity and drive economic growth.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M8 22l1-3m6 3-1-3M4 22h16" />
      </svg>
    ),
  },
  {
    title: "Urban Infrastructure",
    description:
      "Delivering iconic structures like auditoriums and executing urban beautification projects for modern cities.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20V10l4-2 4 2v10H3zm10 0h8v-7l-4-1-4 1v7z" />
      </svg>
    ),
  },
  {
    title: "Renewable Energy",
    description:
      "Specializing in solar infrastructure including high‑mast lights—delivering up to 80% energy savings for municipalities.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </svg>
    ),
  },
];

export default function CapabilitiesPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-10">
      <header className="text-center">
        <h1 className="text-4xl font-semibold text-[#0b1e3f] sm:text-5xl">Our Expertise</h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-[#405170]">
          We deliver cutting‑edge engineering solutions across a diverse range of infrastructure sectors.
        </p>
      </header>

      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#6D48E5] text-white shadow-[0_10px_24px_-12px_rgba(109,72,229,0.6)]">
              {it.icon}
            </div>
            <h3 className="mt-5 text-sm font-extrabold uppercase tracking-[0.12em] text-[#0b1e3f]">{it.title}</h3>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[#405170]">{it.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
