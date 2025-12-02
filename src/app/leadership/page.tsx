"use client";

import Image from "next/image";

const leaders = [
  {
    name: "Mr. Abhijit (Jitu) Saoji",
    title: "Founder & Director",
    summary:
      "15+ years delivering highways, water schemes, and civic infrastructure with an unwavering focus on quality, transparency, and timely delivery.",
    biography:
      "Mr. Abhijit Saoji transformed Balaji Builders & Developers into BBD Infra Pvt. Ltd. by blending grassroots execution with institutional-grade governance. He oversees tender strategy, stakeholder alignment, site reviews, and financial discipline across a ₹800+ Cr portfolio.",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=640&q=80",
  },
  {
    name: "Mr. Atharva Abhijit Saoji",
    title: "Director",
    summary:
      "Civil Engineer & MBA (University of Strathclyde) leading digital transformation, ESG integration, and national expansion initiatives.",
    biography:
      "Mr. Atharva Saoji champions Primavera P6, BIM 360, GIS, and AI-enabled risk models across BBD Infra projects. His focus on smart infrastructure, sustainability, and technology partnerships positions the organisation for pan-India growth under programmes like PM Gati Shakti and Smart Cities.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80",
  },
];

export default function LeadershipPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 pb-24 pt-16 sm:px-10">
      <header className="space-y-6 text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--bbd-primary)]">
          Leadership
        </p>
        <h1 className="text-4xl font-semibold text-[#0b1e3f] sm:text-5xl">Leadership that Elevates and Empowers</h1>
        <p className="mx-auto max-w-3xl text-base text-[#405170]">
          Guided by decades of execution experience and a forward-looking digital strategy, our leadership ensures every project delivers
          lasting value for communities, partners, and stakeholders.
        </p>
      </header>

      <section id="board" className="grid gap-8 md:grid-cols-2">
        {leaders.map((leader) => (
          <article key={leader.name} className="flex flex-col overflow-hidden rounded-[28px] border border-[#dbe4f4] bg-white shadow-[0_18px_48px_-32px_rgba(11,61,145,0.3)]">
            <div className="relative h-72 overflow-hidden">
              <Image src={leader.image} alt={leader.name} width={640} height={720} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6 text-sm text-[#405170]">
              <div>
                <h2 className="text-xl font-semibold text-[#0b1e3f]">{leader.name}</h2>
                <p className="text-sm font-medium text-[var(--bbd-accent)]">{leader.title}</p>
              </div>
              <p>{leader.summary}</p>
              <p>{leader.biography}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
