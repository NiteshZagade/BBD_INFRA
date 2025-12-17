"use client";

import Image from "next/image";

export default function LeadershipPage() {
  return (
    <>
      {/* Full-bleed hero (outside container) */}
      <section className="relative mb-6 sm:mb-8 h-[50vh] min-h-[360px] w-screen overflow-hidden bg-black">
        <Image src="/images/Leadership.png" alt="Our Leadership" fill priority sizes="100vw" className="object-contain" unoptimized />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-10">
          <div>
            <p className="text-lg font-medium text-white">Our <span className="text-[var(--bbd-accent)] font-semibold">Leadership</span></p>
            <p className="mt-2 max-w-xl text-sm text-white/85">Leadership is the capacity to translate vision into reality.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col px-5 pb-24 sm:px-10">
        {/* Founder & Director — image left, text right; aligned top; single paragraph */}
        <section className="mx-auto grid w-full max-w-7xl items-start gap-4 grid-cols-[0.8fr_1.2fr] md:gap-8">
          <div className="relative w-full h-[240px] sm:h-[280px] md:h-[300px] overflow-hidden rounded-xl bg-white shadow-[0_18px_48px_-32px_rgba(11,61,145,0.3)]">
            <Image src="/images/Mr.%20Abhijeet%20Saoji.jpg" alt="Mr. Abhijit (Jitu) Saoji" fill className="object-cover" unoptimized />
          </div>
          <div className="flex flex-col justify-start gap-2 sm:gap-3 text-[#405170]">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--bbd-primary)]">Founder & Director</p>
            <h1 className="text-2xl font-semibold text-[#0b1e3f] sm:text-3xl">Mr. Abhijit Saoji</h1>
            <p className="text-sm leading-relaxed">
              Founded and guided by Mr. Abhijit Saoji, BBD Infra Pvt. Ltd. has been built on a foundation of vision, resilience and an unwavering commitment to building
              quality infrastructure that lasts generations. With over 15 years of hands on experience in project execution, cost management and stakeholder coordination, he
              transformed a modest village based contracting initiative into a prominent, government recognised infrastructure firm active across multiple districts in
              Maharashtra, including Buldhana, Yavatmal and Amravati. Under his stewardship, the company has completed 50+ government‑backed projects and secured contracts
              worth ₹800+ crores, with notable capabilities in 24x7 water supply, roads, urban development and solar high‑mast installations. His leadership emphasises ethical
              business, direct involvement in critical phases and empowering local talent through modern construction practices and safety standards.
            </p>
          </div>
        </section>

        {/* Director — match Founder layout: image left, text right, same sizing */}
        <section className="mx-auto mt-16 grid w-full max-w-7xl items-start gap-4 grid-cols-[0.8fr_1.2fr] md:gap-8">
          <div className="relative w-full h-[240px] sm:h-[280px] md:h-[300px] overflow-hidden rounded-xl bg-white shadow-[0_18px_48px_-32px_rgba(11,61,145,0.3)]">
            <Image src="/images/leader-atharva.svg" alt="Mr. Atharva Abhijit Saoji" fill className="object-contain p-4" />
          </div>
          <div className="flex flex-col justify-start gap-2 sm:gap-3 text-[#405170]">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--bbd-primary)]">Director</p>
            <h2 className="text-2xl font-semibold text-[#0b1e3f] sm:text-3xl">Mr. Atharva Abhijit Saoji</h2>
            <p className="text-sm leading-relaxed">
              A Civil Engineer (B.Tech) and MBA (University of Strathclyde, Scotland), Mr. Atharva Saoji represents the new generation of leadership — driving Primavera P6, BIM, GIS, drone surveys, and IoT‑based monitoring across BBD Infra projects.
            </p>
            <p className="text-sm leading-relaxed">
              He is advancing the company towards smart, sustainable infrastructure with AI‑eUnknown category.nabled risk models, ESG integration, and digital dashboards, enabling predictable delivery and national‑scale readiness under programmes like PM Gati Shakti, Jal Jeevan Mission, Amrut 2.0, and Smart Cities.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
