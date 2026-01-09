"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Opening = {
  title: string;
  location: string;
  experience: string;
  description: string;
};

const openings: Opening[] = [];
const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function CareersPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 pb-24 pt-16 sm:px-10">
      <motion.header {...fadeUp} className="space-y-6">
        <div className="flex items-center gap-3 text-[#0b1e3f]">
          <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
          <span className="text-base font-semibold uppercase tracking-[0.21em] sm:text-lg">Careers</span>
        </div>
        <h1 className="font-semibold text-[30px] leading-tight text-[#0b1e3f]">
          Grow with a purpose driven infrastructure leader.
        </h1>
        <p className="text-base leading-relaxed text-[#405170]">
          BBD Infra is expanding across highways, water, and urban transformation projects. Join multidisciplinary teams, learn new
          technologies, and deliver infrastructure that changes lives.
        </p>
      </motion.header>

      <motion.section
        {...fadeUp}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="grid gap-8 rounded-[28px] border border-[#dbe4f4] bg-white p-8 text-sm text-[#405170] shadow-[0_16px_40px_-36px_rgba(11,61,145,0.3)] lg:grid-cols-2"
      >
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
      </motion.section>

      <motion.section
        {...fadeUp}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-[#0b1e3f]">Current openings</h2>
        {openings.length > 0 ? (
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
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-[24px] border border-[#dbe4f4] bg-white p-8 text-center text-sm text-[#405170] shadow-[0_10px_28px_-24px_rgba(11,61,145,0.25)]"
          >
            <p className="text-base font-semibold text-[#0b1e3f]">Sorry currently we have no opening.</p>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
}
