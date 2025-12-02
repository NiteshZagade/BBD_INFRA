"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-5 pb-24 pt-16 sm:px-10">
      <header className="space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--bbd-primary)]">
          Contact
        </p>
        <h1 className="text-4xl font-semibold text-[#0b1e3f] sm:text-5xl">Let’s deliver the next landmark together.</h1>
        <p className="text-base leading-relaxed text-[#405170]">
          Share your project vision or request a capability presentation. Our bid and partnerships team will respond within one business day.
        </p>
      </header>

      <section className="grid gap-8 rounded-[28px] border border-[#dbe4f4] bg-white p-8 shadow-[0_16px_40px_-32px_rgba(11,61,145,0.3)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 text-sm text-[#405170]">
          <div>
            <h2 className="text-lg font-semibold text-[#0b1e3f]">Corporate Office</h2>
            <p>BBD Infra Office Building, MHADA Colony, DP Road, Mehkar, Buldhana – 443301, Maharashtra, India</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#0b1e3f]">Registered Office</h2>
            <p>Ward No. 03, Saoji Galli, Dongaon, Tq. Mehkar, Dist. Buldhana, Maharashtra</p>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              Phone:{" "}
              <Link href="tel:+919921342002" className="font-semibold text-[var(--bbd-primary)]">
                +91 99213 42002
              </Link>
            </p>
            <p>
              Email:{" "}
              <Link href="mailto:balajiproj2017@gmail.com" className="font-semibold text-[var(--bbd-primary)]">
                balajiproj2017@gmail.com
              </Link>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#0b1e3f]">Office Hours</h2>
            <p>Mon – Sat · 9:00 AM to 7:00 PM IST</p>
          </div>
        </div>
        <form className="grid gap-4 rounded-[24px] border border-[#dbe4f4] bg-[#f7f9ff] p-6 text-sm text-[#405170]">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]/70">Name</label>
            <input
              type="text"
              placeholder="Your full name"
              className="mt-2 w-full rounded-xl border border-[#c8d5ee] bg-white px-4 py-3 text-sm text-[#0b1e3f] placeholder:text-[#405170]/50 focus:border-[var(--bbd-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-primary)]/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]/70">Work email</label>
            <input
              type="email"
              placeholder="you@organisation.com"
              className="mt-2 w-full rounded-xl border border-[#c8d5ee] bg-white px-4 py-3 text-sm text-[#0b1e3f] placeholder:text-[#405170]/50 focus:border-[var(--bbd-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-accent)]/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]/70">Phone</label>
            <input
              type="tel"
              placeholder="+91"
              className="mt-2 w-full rounded-xl border border-[#c8d5ee] bg-white px-4 py-3 text-sm text-[#0b1e3f] placeholder:text-[#405170]/50 focus:border-[var(--bbd-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-primary)]/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]/70">Project focus</label>
            <select className="mt-2 w-full rounded-xl border border-[#c8d5ee] bg-white px-4 py-3 text-sm text-[#0b1e3f] focus:border-[var(--bbd-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-primary)]/20">
              <option value="highways">Highways & Mobility</option>
              <option value="water">Water Infrastructure</option>
              <option value="bridges">Bridges & Structures</option>
              <option value="urban">Urban Upgrades</option>
              <option value="energy">Energy & Sustainability</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]/70">How can we assist?</label>
            <textarea
              rows={4}
              placeholder="Share scope, timelines, or specific queries..."
              className="mt-2 w-full rounded-xl border border-[#c8d5ee] bg-white px-4 py-3 text-sm text-[#0b1e3f] placeholder:text-[#405170]/50 focus:border-[var(--bbd-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-primary)]/20"
            />
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--bbd-primary)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_-16px_rgba(11,61,145,0.45)] transition hover:bg-[var(--bbd-primary-soft)]"
          >
            Submit Request
          </button>
        </form>
      </section>
    </div>
  );
}
