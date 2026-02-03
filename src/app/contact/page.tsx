"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

type Focus = "highways" | "water" | "bridges" | "urban" | "energy";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [focus, setFocus] = useState<Focus>("highways");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Please provide your name and a valid email.");
      return;
    }
    try {
      setStatus("submitting");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, focus, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("We couldn’t submit your request. Please try again or email us directly.");
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-5 pb-24 pt-16 sm:px-10">
      <motion.header {...fadeUp} className="space-y-6">
        <div className="flex items-center gap-3 text-[#0b1e3f]">
          <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
          <span className="text-base font-semibold uppercase tracking-[0.21em] sm:text-lg">Contact</span>
        </div>
        <h1 className="font-semibold text-[30px] leading-tight text-[#0b1e3f]">
          Let’s deliver the next landmark together.
        </h1>
        <p className="text-base leading-relaxed text-[#405170]">
          Share your project vision or request a capability presentation. Our bid and partnerships team will respond within one business day.
        </p>
      </motion.header>

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
              <Link href="mailto:atharvasaoji99@bbdinfra.in" className="font-semibold text-[var(--bbd-primary)]">
                atharvasaoji99@bbdinfra.in
              </Link>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#0b1e3f]">Office Hours</h2>
            <p>Mon – Sat · 9:00 AM to 7:00 PM IST</p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4 rounded-[24px] border border-[#dbe4f4] bg-[#f7f9ff] p-6 text-sm text-[#405170]">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]/70">Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-[#c8d5ee] bg-white px-4 py-3 text-sm text-[#0b1e3f] placeholder:text-[#405170]/50 focus:border-[var(--bbd-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-primary)]/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]/70">Work email</label>
            <input
              type="email"
              placeholder="you@organisation.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-[#c8d5ee] bg-white px-4 py-3 text-sm text-[#0b1e3f] placeholder:text-[#405170]/50 focus:border-[var(--bbd-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-accent)]/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]/70">Phone</label>
            <input
              type="tel"
              placeholder="+91"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#c8d5ee] bg-white px-4 py-3 text-sm text-[#0b1e3f] placeholder:text-[#405170]/50 focus:border-[var(--bbd-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-primary)]/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]/70">Project focus</label>
            <select
              value={focus}
              onChange={(e) => setFocus(e.target.value as Focus)}
              className="mt-2 w-full rounded-xl border border-[#c8d5ee] bg-white px-4 py-3 text-sm text-[#0b1e3f] focus:border-[var(--bbd-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-primary)]/20"
            >
              <option value="highways">Highways & Mobility</option>
              <option value="water">Water Supply Network</option>
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#c8d5ee] bg-white px-4 py-3 text-sm text-[#0b1e3f] placeholder:text-[#405170]/50 focus:border-[var(--bbd-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--bbd-primary)]/20"
            />
          </div>
          {error ? (
            <p className="text-[13px] font-medium text-red-600">{error}</p>
          ) : null}
          {status === "success" ? (
            <p className="text-[13px] font-medium text-green-700">
              Thank you. Your request has been recorded. You may also email us at
              {" "}
              <a href="mailto:atharvasaoji99@bbdinfra.in" className="underline">atharvasaoji99@bbdinfra.in</a>.
            </p>
          ) : null}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center rounded-full bg-[var(--bbd-primary)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_-16px_rgba(11,61,145,0.45)] transition hover:bg-[var(--bbd-primary-soft)] disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting…" : "Submit Request"}
            </button>
            <a
              href={`mailto:atharvasaoji99@bbdinfra.in?subject=${encodeURIComponent("Contact via website")}&body=${encodeURIComponent(`${name}\n${email}\n${phone}\nFocus: ${focus}\n\n${message}`)}`}
              className="inline-flex items-center justify-center rounded-full border border-[var(--bbd-primary)] px-6 py-3 text-sm font-semibold text-[var(--bbd-primary)] hover:border-[var(--bbd-primary-soft)] hover:text-[var(--bbd-primary-soft)]"
            >
              Email Us
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}
