"use client";

import Image from "next/image";

export default function LeadershipPage() {
  return (
    <>
      {/* Full-bleed hero (outside container) */}
      <section className="relative mb-6 sm:mb-8 h-[40vh] min-h-[260px] w-full overflow-hidden bg-black sm:h-[50vh] sm:min-h-[360px]">
        <Image src="/images/Leadership.png" alt="Our Leadership" fill priority sizes="100vw" className="object-cover scale-[1.06]" unoptimized />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-10">
          <div>
            <p className="text-2xl font-semibold text-white sm:text-3xl">Our <span className="text-[var(--bbd-accent)] font-semibold">Leadership</span></p>
            <p className="mt-3 max-w-xl text-base text-white/85 sm:text-lg">Leadership is the capacity to translate vision into reality.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col px-5 pb-24 sm:px-10">
        <div className="flex flex-col gap-12">
          {/* Founder & Director */}
          <section className="w-full overflow-hidden rounded-[28px] bg-white shadow-[0_26px_60px_-42px_rgba(15,24,36,0.45)]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[240px] sm:min-h-[320px] lg:min-h-[520px] bg-[#e8e8e8]">
                <Image
                  src="/images/Mr.%20Abhijeet%20Saoji.jpg"
                  alt="Mr. Abhijit (Jitu) Saoji"
                  fill
                  className="object-cover grayscale"
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-center gap-4 px-6 py-8 text-[#405170] sm:px-10 lg:px-12">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--bbd-primary)]">Founder &amp; Director</p>
                <h1 className="text-3xl font-semibold text-[#0b1e3f] sm:text-3xl">Mr. Abhijit Saoji</h1>
                <p className="text-sm leading-relaxed text-[#405170] text-pretty">
                  Founded and guided by Mr. Abhijit Saoji, BBD Infra Pvt. Ltd. has been built on a foundation of vision, resilience and an unwavering commitment to building
                  quality infrastructure that lasts generations. With over 15 years of hands on experience in project execution, cost management and stakeholder coordination, he
                  transformed a modest village-based contracting initiative into a prominent, government recognised infrastructure firm active across multiple districts in
                  Maharashtra, including Buldhana, Yavatmal and Amravati. He also serves as Director of SD Geotesting Solutions.
                </p>
                <p className="text-sm leading-relaxed text-[#405170] text-pretty">
                  Under his stewardship, the company has completed 50+ government backed projects and secured contracts worth ₹800+ crores, with notable capabilities in 24x7
                  water supply, roads, urban development and solar high mast installations. His leadership emphasises ethical business, direct involvement in critical phases and
                  empowering local talent through modern construction practices and safety standards.
                </p>
                <a
                  href="https://sdgeosolutions.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center"
                  aria-label="SD Geotesting Solutions"
                >
                  <Image src="/images/sd-geo-logo.png" alt="SD Geotesting Solutions" width={160} height={52} className="h-10 w-auto object-contain" />
                </a>
              </div>
            </div>
          </section>

          {/* Director */}
          <section className="w-full overflow-hidden rounded-[28px] bg-white shadow-[0_26px_60px_-42px_rgba(15,24,36,0.45)]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[240px] sm:min-h-[320px] lg:min-h-[520px] bg-[#e8e8e8]">
                <Image src="/images/director-atharva.png" alt="Mr. Atharva Abhijit Saoji" fill className="object-cover grayscale" unoptimized />
              </div>
              <div className="flex flex-col justify-start gap-4 px-6 pt-6 pb-10 text-[#405170] sm:px-10 lg:px-12">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--bbd-primary)]">Director</p>
                <h2 className="text-3xl font-semibold text-[#0b1e3f] sm:text-3xl">Mr. Atharva Abhijit Saoji</h2>
                <p className="text-sm leading-relaxed text-[#405170] text-pretty">
                  Building upon BBD Infra Pvt. Ltd.’s rich legacy of excellence, Mr. Atharva Abhijit Saoji has joined the organization as Director, bringing a forward-looking
                  mindset, global exposure, and advanced technical expertise.
                </p>
                <p className="text-sm leading-relaxed text-[#405170] text-pretty">
                  A Civil Engineer (B.Tech) with an MBA from the University of Strathclyde, Scotland, Mr. Atharva represents the next generation of leadership dynamic,
                  ambitious, technologically adept, and future-focused. His strong academic foundation, combined with international exposure to modern infrastructure practices,
                  positions him to lead the company into its next phase of growth.
                </p>
                <p className="text-sm leading-relaxed text-[#405170] text-pretty">
                  Trained in global project management methodologies and exposed to international best practices in sustainable infrastructure, Mr. Atharva is spearheading BBD
                  Infra’s transformation into a smart, digitally enabled infrastructure organization.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
