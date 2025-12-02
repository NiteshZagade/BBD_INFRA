"use client";

import Link from "next/link";

const openings = [
  {
    title: "Deputy Project Manager – Water Supply",
    location: "Yavatmal, Maharashtra",
    experience: "8+ years",
    description:
      "Lead site execution for 24x7 water supply schemes including coordination with design, procurement, and command centre teams. Primavera proficiency preferred.",
  },
  {
    title: "Highway Planning Engineer",
    location: "Pune, Maharashtra",
    experience: "6+ years",
    description:
      "Prepare geometric designs, traffic management plans, and quantity take-offs for EPC Mode 32 corridors. Experience with BIM and Civil 3D an advantage.",
  },
  {
    title: "ESG & Sustainability Specialist",
    location: "Corporate Office – Mehkar",
    experience: "5+ years",
    description:
      "Develop and monitor ESG frameworks, low-carbon material strategies, and sustainability reporting across the project portfolio.",
  },
];

export default function CareersPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 pb-24 pt-16 sm:px-10">
      <header className="space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--bbd-primary)]">
          Careers
        </p>
        <h1 className="text-4xl font-semibold text-[#0b1e3f] sm:text-5xl">Grow with a purpose-driven infrastructure leader.</h1>
        <p className="text-base leading-relaxed text-[#405170]">
          BBD Infra is expanding across highways, water, and urban transformation projects. Join multidisciplinary teams, learn new
          technologies, and deliver infrastructure that changes lives.
        </p>
      </header>

      <section className="grid gap-8 rounded-[28px] border border-[#dbe4f4] bg-white p-8 text-sm text-[#405170] shadow-[0_16px_40px_-36px_rgba(11,61,145,0.3)] lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#0b1e3f]">Why work with BBD Infra?</h2>
          <ul className="space-y-2">
            <li>• Exposure to national programmes like Jal Jeevan Mission, PM Gati Shakti, and Smart Cities.</li>
            <li>• Continuous learning: Primavera, BIM 360, drone surveys, ESG practices, and IoT telemetry.</li>
            <li>• Leadership mentorship from seasoned project directors and strategists.</li>
            <li>• Safety-first culture with zero major incidents in five years.</li>
            <li>• CSR initiatives empowering local communities and talent.</li>
          </ul>
        </div>
        <div className="space-y-4 rounded-[24px] border border-[#dbe4f4] bg-[#f7f9ff] p-6">
          <h3 className="text-lg font-semibold text-[#0b1e3f]">Benefits at a glance</h3>
          <ul className="space-y-2">
            <li>• Performance-linked incentives and fast-track growth paths.</li>
            <li>• Comprehensive health cover for employees and dependents.</li>
            <li>• Relocation support for key project assignments.</li>
            <li>• Annual innovation challenges and recognition programmes.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#0b1e3f]">Current openings</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {openings.map((role) => (
            <article key={role.title} className="rounded-[24px] border border-[#dbe4f4] bg-white p-6 text-sm text-[#405170] shadow-[0_10px_28px_-24px_rgba(11,61,145,0.25)]">
              <h3 className="text-lg font-semibold text-[#0b1e3f]">{role.title}</h3>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]/60">{role.location}</p>
              <p className="text-xs font-medium text-[var(--bbd-accent)]">Experience: {role.experience}</p>
              <p className="mt-3">{role.description}</p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--bbd-primary)] hover:text-[var(--bbd-primary-soft)]">
                Apply via Contact
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
