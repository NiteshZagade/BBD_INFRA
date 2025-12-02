"use client";

export default function SocialResponsibilityPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 pb-24 pt-16 sm:px-10">
      <header className="space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--bbd-primary)]">
          Social Responsibility
        </p>
        <h1 className="text-4xl font-semibold text-[#0b1e3f] sm:text-5xl">Building with communities in mind.</h1>
        <p className="text-base leading-relaxed text-[#405170]">
          We invest in local hiring, safety education, and environmental stewardship. Programmes include on-site skill development,
          tree plantation drives, water conservation, and education support in our project regions.
        </p>
      </header>

      <section className="grid gap-6 rounded-[28px] border border-[#dbe4f4] bg-white p-8 text-sm text-[#405170]">
        <ul className="grid gap-3 sm:grid-cols-2">
          <li className="rounded-[16px] bg-[#f7f9ff] px-4 py-3">• 80% local hiring with structured apprenticeships</li>
          <li className="rounded-[16px] bg-[#f7f9ff] px-4 py-3">• Quarterly safety workshops and drills</li>
          <li className="rounded-[16px] bg-[#f7f9ff] px-4 py-3">• Tree plantation and waterbody rejuvenation support</li>
          <li className="rounded-[16px] bg-[#f7f9ff] px-4 py-3">• Scholarships and classroom infrastructure in project towns</li>
        </ul>
      </section>
    </div>
  );
}

