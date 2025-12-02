"use client";

const clients = [
  "Public Works Department (PWD), Maharashtra",
  "Maharashtra Jeevan Pradhikaran (MJP)",
  "Urban Development Department",
  "Municipal Councils: Mehkar, Lonar, Wani, Indapur, Pandharkawada",
  "Zilla Parishads: Buldhana, Yavatmal, Amravati",
  "Jal Jeevan Mission & AMRUT 2.0 Authorities",
];

export default function ClientsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 pb-24 pt-16 sm:px-10">
      <header className="space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--bbd-primary)]">
          Clients
        </p>
        <h1 className="text-4xl font-semibold text-[#0b1e3f] sm:text-5xl">Trusted by leading public agencies</h1>
        <p className="text-base leading-relaxed text-[#405170]">
          Repeat engagements and long-term relationships built on reliability, transparency, and measurable outcomes.
        </p>
      </header>

      <section className="rounded-[28px] border border-[#dbe4f4] bg-white p-8 text-sm text-[#405170]">
        <ul className="grid gap-3 sm:grid-cols-2">
          {clients.map((c) => (
            <li key={c} className="rounded-[16px] bg-[#f7f9ff] px-4 py-3">• {c}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

