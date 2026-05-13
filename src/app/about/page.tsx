"use client";

import { motion, type Transition } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { AnimatedStat } from "@/components/AnimatedStat";

const timeline = [
  { year: "2014",  title: "Founded in Dongaon",                    desc: "Started with small civil works in Dongaon village, laying the operational foundation with hands-on execution and local expertise." },
  { year: "2016",  title: "Entered Government Infrastructure",      desc: "First public sector contracts secured, a milestone that validated the team's execution capability and compliance standards." },
  { year: "2018",  title: "Expanded into Water & Road Projects",    desc: "Expanded into water supply and road infrastructure. Strengthened core engineering capabilities and project management systems." },
  { year: "2020",  title: "Scaled to Multi-Site Execution",         desc: "Operations expanded across multiple simultaneous locations, proving the company's capacity for parallel, large-scale project delivery." },
  { year: "2022",  title: "Strengthened Teams & Systems",           desc: "200+ skilled workforce. Structured operations with dedicated site management, equipment deployment, and quality control teams." },
  { year: "2024",  title: "Moved into High-Value Projects",         desc: "Achieved ₹800+ Crores work in hand, a major milestone reflecting the trust earned from government agencies across Maharashtra." },
  { year: "2025",  title: "Diversified Across Sectors & Geographies", desc: "Expanded portfolio into Renewable Energy and Urban Development. Crossed 60+ simultaneous active sites, with operations strengthening beyond Maharashtra into national programs." },
  { year: "2026",  title: "Transitioned to BBD Infra Pvt. Ltd.",   desc: "Balaji Builders and Developers formally transitioned to BBD Infra Pvt. Ltd., a strategic rebranding marking a new chapter of corporate-scale growth, EPC execution, and national infrastructure delivery." },
  { year: "Today", title: "Executing Across Maharashtra & Pan India", desc: "62 active sites across water supply, roads, and urban development sectors. ₹1000+ Cr projects in hand. Expanding operations beyond Maharashtra to national scale." },
];

const t: Transition = { duration: 0.55, ease: "easeOut" };

export default function AboutPage() {
  const [heroSrc, setHeroSrc] = useState("/images/about_us_image.jpg");

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-[#08102B]">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroSrc}
            alt="About BBD Infra"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center opacity-55"
            unoptimized
            onError={() => setHeroSrc("/images/about-hero.jpg")}
          />
        </div>
        {/* Dark gradient — stronger on left, fades right */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#08102B]/80 via-[#08102B]/55 to-[#08102B]/20" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 z-[2] h-32 bg-gradient-to-t from-[#08102B]/60 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-28 sm:px-10">
          <div className="border-l-4 border-[#C9960C] pl-10 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t, delay: 0.1 }}
              className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F59E0B]"
            >
              About BBD Infra
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t, delay: 0.2 }}
              className="mb-6 text-[clamp(36px,5.5vw,68px)] font-bold leading-[1.08] text-white"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
            >
              From Local Execution to<br />Large-Scale Infrastructure<br />Delivery.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t, delay: 0.32 }}
              className="mb-10 max-w-xl space-y-4"
            >
              <p className="text-[15px] font-light leading-[1.85] text-white/65">
                BBD Infra Pvt. Ltd. (formerly known as Balaji Builders and Developers) is a Maharashtra-based infrastructure company delivering public projects across water supply systems, road networks, and urban development. With multiple high-value projects underway, the company operates with a structured approach to planning, execution, and quality control enabling consistent delivery across diverse project environments.
              </p>
            </motion.div>

            {/* Inline stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t, delay: 0.4 }}
              className="flex flex-wrap gap-x-10 gap-y-5"
            >
              {([
                { prefix: "₹", value: 1000, suffix: "Cr+", decimals: 0, label: "Work in Hand" },
                { prefix: "",  value: 62,   suffix: "+",   decimals: 0, label: "Active Sites" },
                { prefix: "",  value: 2014, suffix: "",    decimals: 0, label: "Est. in Maharashtra" },
              ] as const).map((s, i) => (
                <div key={i} className="flex flex-col gap-1 border-t-2 border-[#C9960C] pt-3 pr-10">
                  <span
                    className="text-[clamp(22px,2.8vw,30px)] font-bold text-[#F59E0B]"
                    style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
                  >
                    <AnimatedStat prefix={s.prefix} value={s.value} suffix={s.suffix} decimals={s.decimals} delayMs={i * 150} />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline (Our Journey) ── */}
      <section className="bg-[#FAFBFD] py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={t}
            className="mb-14"
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Our Journey</p>
            <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] text-[#08102B]"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
              A Proven Track Record Across<br />High-Value Infrastructure Projects
            </h2>
          </motion.div>

          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: i * 0.05 }}
                className="grid grid-cols-[80px_28px_1fr] gap-x-6 sm:grid-cols-[100px_28px_1fr] lg:grid-cols-[140px_28px_1fr]"
              >
                {/* Year */}
                <div className="pt-0.5 pb-10 text-right"
                  style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
                  <span className={`font-bold text-[#C9960C] ${item.year === "Today" ? "text-[26px] sm:text-[32px]" : "text-[22px] sm:text-[28px] lg:text-[34px]"}`}>{item.year}</span>
                </div>
                {/* Line + dot */}
                <div className="flex flex-col items-center">
                  <div className="mt-[6px] h-4 w-4 shrink-0 rounded-full border-[3px] border-[#FAFBFD] bg-[#C9960C] ring-[2px] ring-[#C9960C]" />
                  {i < timeline.length - 1 && <div className="mt-1 flex-1 w-px bg-[rgba(201,150,12,0.25)]" />}
                </div>
                {/* Content */}
                <div className="pb-10 pt-0">
                  <h3 className="text-[16px] font-semibold leading-snug text-[#08102B] sm:text-[18px]">{item.title}</h3>
                  <p className="mt-2 text-[13px] font-light leading-[1.75] text-[#4A5C7A] sm:text-[14px]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={t}
            className="mt-8 border-l-4 border-[#C9960C] bg-[#F1F4FA] px-8 py-6"
            style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
          >
            <p className="text-[20px] font-semibold leading-[1.6] text-[#08102B]">
              A journey shaped by consistent delivery, growing responsibility, and the trust earned along the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="bg-[#F1F4FA] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={t}
            className="mb-14"
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Leadership</p>
            <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.2] text-[#08102B]"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
              Led by Experience.<br />Strengthened by a New Generation.
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Founder & Director */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }} transition={{ ...t, delay: 0.1 }}
              className="flex flex-col overflow-hidden shadow-[0_4px_32px_-8px_rgba(8,16,43,0.12)]"
            >
              {/* Image */}
              <div className="relative h-[340px] bg-[#0D1A40] lg:h-[380px]">
                <Image
                  src="/images/Mr.%20Abhijeet%20Saoji.jpg"
                  alt="Mr. Abhijit Saoji"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08102B]/50 via-transparent to-transparent" />
              </div>
              {/* Gold divider */}
              <div className="h-[3px] w-full bg-[#C9960C]" />
              {/* Content */}
              <div className="flex flex-1 flex-col gap-4 bg-white px-7 py-8">
                <div>
                  <h3 className="text-[clamp(22px,2.5vw,28px)] font-bold leading-tight text-[#08102B]"
                    style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
                    Mr. Abhijit (Jitu) Saoji
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Founder &amp; Director</p>
                </div>
                <p className="text-[13px] font-light leading-[1.9] text-[#4A5C7A]">
                  With 15+ years of hands-on experience, Mr. Saoji transformed a village-based start in Dongaon into a government-recognised infrastructure firm. He has personally led the delivery of 50+ projects and scaled operations to ₹800+ crores through disciplined execution, deep domain knowledge, and strong public sector relationships built over more than a decade of consistent delivery.
                </p>
                <a href="https://sdgeosolutions.com/" target="_blank" rel="noreferrer"
                  className="mt-auto pt-2 inline-flex items-center opacity-70 hover:opacity-100 transition">
                  <Image src="/images/sd-geo-logo.png" alt="SD Geotesting Solutions" width={130} height={44} className="h-8 w-auto object-contain" />
                </a>
              </div>
            </motion.div>

            {/* Director */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }} transition={{ ...t, delay: 0.2 }}
              className="flex flex-col overflow-hidden shadow-[0_4px_32px_-8px_rgba(8,16,43,0.12)]"
            >
              {/* Image */}
              <div className="relative h-[340px] bg-[#0D1A40] lg:h-[380px]">
                <Image
                  src="/images/director-atharva.png"
                  alt="Mr. Atharva Abhijit Saoji"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08102B]/50 via-transparent to-transparent" />
              </div>
              {/* Gold divider */}
              <div className="h-[3px] w-full bg-[#C9960C]" />
              {/* Content */}
              <div className="flex flex-1 flex-col gap-4 bg-white px-7 py-8">
                <div>
                  <h3 className="text-[clamp(22px,2.5vw,28px)] font-bold leading-tight text-[#08102B]"
                    style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
                    Mr. Atharva Abhijit Saoji
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Director</p>
                </div>
                <p className="text-[13px] font-light leading-[1.9] text-[#4A5C7A]">
                  A civil engineer with global exposure, Mr. Atharva Saoji is driving BBD Infra's digital transformation and modernisation of project systems. He brings a forward-thinking approach to sustainable infrastructure practices — positioning the company for larger, technology-led and national-scale growth. His focus on smart monitoring, advanced equipment, and modern EPC processes is shaping the company's next chapter.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="bg-[#08102B] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={t}
            className="mb-16"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Vision &amp; Mission</p>
            <h2 className="text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.15] text-white"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
              Built Around a Clear<br />Long-Term Purpose.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2">
            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ ...t, delay: 0.1 }}
              className="py-12 md:pr-16"
            >
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Our Vision</p>
              <p className="text-[15px] font-light leading-[1.9] text-white/65">
                To evolve into a nationally operating infrastructure company, executing complex public works across water, transportation, and urban systems — backed by advanced engineering capabilities and high-performance equipment.
              </p>
            </motion.div>

            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ ...t, delay: 0.2 }}
              className="py-12 md:border-l md:border-l-[rgba(201,150,12,0.15)] md:pl-16"
            >
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Our Mission</p>
              <p className="text-[15px] font-light leading-[1.9] text-white/65">
                To deliver infrastructure through disciplined execution, compliance-driven processes, and integrated engineering practices — supported by modern technologies, high-tech equipment, and robust project controls to ensure precision, efficiency, and long-term performance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Growth Strategy ── */}
      <section className="bg-[#FAFBFD] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={t}
            className="mb-14"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">Growth Strategy</p>
            <h2 className="text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.15] text-[#08102B]"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
              The Road Ahead
            </h2>
          </motion.div>

          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { metric: "₹1,500+ Cr", title: "Projected Project Pipeline", desc: "Targeted project pipeline in the next growth phase, driven by EPC-scale programs and national tenders." },
              { metric: "Pan-India",  title: "National Expansion",          desc: "Targeting execution beyond Maharashtra, establishing a presence in high-priority infrastructure corridors across India." },
              { metric: "30%+",       title: "Tech-Driven Execution",       desc: "Adoption of digital monitoring tools, automation, and smart project controls across all active sites." },
              { metric: "Green",      title: "Sustainable Infrastructure",  desc: "Expansion into solar, water conservation, and green construction methodologies for future-ready infrastructure." },
              { metric: "Rural+Urban",title: "Dual-Impact Focus",           desc: "Strengthening infrastructure across both developing rural communities and growing urban regions across India." },
            ].map((card, i) => (
              <motion.div
                key={card.metric}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex flex-col gap-3 border border-[#E8EDF5] bg-white p-8 hover:border-[rgba(201,150,12,0.35)] hover:shadow-[0_8px_32px_-12px_rgba(8,16,43,0.1)] transition-all duration-300"
              >
                <div className="mb-1 h-[2px] w-10 bg-[#C9960C]" />
                <p className="text-[clamp(22px,2.5vw,28px)] font-bold leading-tight text-[#C9960C]"
                  style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
                  {card.metric}
                </p>
                <p className="text-[13px] font-semibold text-[#08102B]">{card.title}</p>
                <p className="text-[13px] font-light leading-[1.8] text-[#4A5C7A]">{card.desc}</p>
              </motion.div>
            ))}

            {/* Partner CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5, delay: 5 * 0.07 }}
              className="flex flex-col justify-between gap-4 bg-[#0D1A40] p-8"
            >
              <div>
                <div className="mb-1 h-[2px] w-10 bg-[#C9960C]" />
                <p className="mt-4 text-[clamp(22px,2.5vw,28px)] font-bold leading-tight text-[#C9960C]"
                  style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
                  Partner
                </p>
                <p className="mt-1 text-[13px] font-semibold text-white">Work With Us</p>
                <p className="mt-3 text-[13px] font-light leading-[1.8] text-white/60">
                  Have a project that aligns with our capabilities? Connect with our team to explore collaboration.
                </p>
              </div>
              <a href="/contact"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-[2px] bg-[#C9960C] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#08102B] transition hover:bg-[#F59E0B]">
                Get in Touch
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden bg-[#C9960C] py-28">
        {/* Watermark */}
        <span
          className="pointer-events-none absolute left-[-2%] top-1/2 -translate-y-1/2 select-none text-[clamp(120px,18vw,220px)] font-bold leading-none text-[#B8860B]/30"
          style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
          aria-hidden="true"
        >
          BBD
        </span>

        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={t}
            className="mb-5 text-[clamp(18px,2.6vw,34px)] font-bold leading-[1.15] text-[#08102B] whitespace-nowrap"
            style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
          >
            Planning Your Next Infrastructure Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ ...t, delay: 0.1 }}
            className="mb-10 text-[15px] font-light leading-[1.8] text-[#08102B]/75"
          >
            Connect with a team focused on structured execution, compliance, and reliable delivery across every stage.
          </motion.p>
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ ...t, delay: 0.2 }}
            className="inline-flex items-center rounded-[2px] bg-[#08102B] px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#0D1A40] hover:-translate-y-px"
          >
            Start the Conversation
          </motion.a>
        </div>
      </section>
    </>
  );
}
