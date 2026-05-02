"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const inputBase =
  "mt-1.5 w-full rounded-[2px] border border-[#DDE3EF] bg-white px-4 py-3 text-[14px] text-[#08102B] placeholder:text-[#9BA8BE] focus:border-[#C9960C] focus:outline-none focus:ring-2 focus:ring-[#C9960C]/20 transition";

const labelClass = "text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7C99]";

export default function ContactPage() {
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [email, setEmail]     = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError]     = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      setStatus("submitting");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, projectType, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("We couldn't submit your request. Please try again or email us directly.");
    }
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-[#08102B]">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/contact_us.jpg"
            alt="Contact hero"
            className="h-full w-full object-cover object-center opacity-40"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#08102B]/90 via-[#08102B]/70 to-[#08102B]/30" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-10">
          <div className="border-l-4 border-[#C9960C] pl-10 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F59E0B]"
            >
              Contact Us
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 text-[clamp(34px,5vw,60px)] font-bold leading-[1.1] text-white"
              style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
            >
              Let&apos;s Deliver the Next<br />Landmark Together.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[16px] font-light leading-[1.85] text-white/60 max-w-lg"
            >
              Share your project vision or request a capability presentation. Our team will respond within one business day.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── How We Help + Form ── */}
      <section className="bg-[#FAFBFD] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, ease: "easeOut" }}
            className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20"
          >
            {/* ── Left: How We Help ── */}
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9960C]">How We Help</p>
              <h2
                className="mb-8 text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.15] text-[#08102B]"
                style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
              >
                We Can Support<br />You With:
              </h2>

              <ul className="mb-10 space-y-6">
                {[
                  { title: "Infrastructure Execution",    desc: "Water, roads, and urban projects delivered with on-ground expertise across diverse site conditions." },
                  { title: "Project Planning",            desc: "Structured planning, cost control, and timely execution tailored to government and private sector programs." },
                  { title: "Technology-Led Delivery",     desc: "Real-time monitoring and advanced equipment deployment for better project control and accountability." },
                  { title: "Sustainable Solutions",       desc: "Efficient, future-ready infrastructure methodologies across rural and urban development needs." },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-[#C9960C]" />
                    <div>
                      <p className="text-[15px] font-semibold text-[#08102B]">{item.title}</p>
                      <p className="mt-1 text-[13px] font-light leading-[1.7] text-[#6B7C99]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Contact info table */}
              <div className="space-y-3 border-t border-[#DDE3EF] pt-8">
                {[
                  { label: "Email",  value: "info@bbdinfra.in" },
                  { label: "Phone",  value: "+91 98765 43210" },
                ].map((row) => (
                  <div key={row.label} className="flex gap-6">
                    <span className="w-14 shrink-0 text-[13px] font-semibold text-[#08102B]">{row.label}</span>
                    <span className="text-[13px] font-light text-[#6B7C99]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Enquiry Form ── */}
            <div className="rounded-[3px] border border-[#DDE3EF] bg-white p-8 shadow-[0_8px_40px_-16px_rgba(8,16,43,0.10)]">
              <h3
                className="mb-1 text-[24px] font-bold text-[#08102B]"
                style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
              >
                Send Us an Enquiry
              </h3>
              <p className="mb-7 text-[13px] font-light text-[#6B7C99]">
                Share a few details and our team will get back to you within 24 hours.
              </p>

              {status === "success" ? (
                <div className="rounded-[2px] border border-[#C9960C]/30 bg-[#FEF3C7] px-6 py-8 text-center">
                  <p className="text-[20px] font-bold text-[#08102B]"
                    style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}>
                    Thank You!
                  </p>
                  <p className="mt-2 text-[14px] font-light text-[#4A5C7A]">
                    Your enquiry has been submitted. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  {/* Row 1: Name + Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input type="text" placeholder="Your full name" value={name}
                        onChange={(e) => setName(e.target.value)} required className={inputBase} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input type="tel" placeholder="+91 00000 00000" value={phone}
                        onChange={(e) => setPhone(e.target.value)} required className={inputBase} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input type="email" placeholder="your@email.com" value={email}
                      onChange={(e) => setEmail(e.target.value)} required className={inputBase} />
                  </div>

                  {/* Project type */}
                  <div>
                    <label className={labelClass}>Project Type / Requirement *</label>
                    <select value={projectType} onChange={(e) => setProjectType(e.target.value)} required className={inputBase}>
                      <option value="" disabled>Select project type</option>
                      <option value="water">Water Supply Network</option>
                      <option value="roads">Roads &amp; Highways</option>
                      <option value="bridges">Bridges &amp; Structures</option>
                      <option value="urban">Urban Infrastructure</option>
                      <option value="solar">Renewable Energy / Solar</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelClass}>Message</label>
                    <textarea rows={4}
                      placeholder="Briefly describe your project, location, timeline, or any specific requirements…"
                      value={message} onChange={(e) => setMessage(e.target.value)} className={inputBase} />
                  </div>

                  {error && <p className="text-[13px] font-medium text-red-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-[2px] bg-[#08102B] py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#0D1A40] disabled:opacity-60"
                  >
                    {status === "submitting" ? "Submitting…" : "Submit Enquiry"}
                  </button>

                  <p className="text-[11px] font-light text-[#9BA8BE]">
                    * Required fields. By submitting, you agree to be contacted by BBD Infra Pvt. Ltd. regarding your enquiry.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Registered Office + Map ── */}
      <section className="bg-[#08102B] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, ease: "easeOut" }}
            className="grid gap-12 lg:grid-cols-2 lg:gap-20"
          >
            {/* Left: address details */}
            <div className="text-white">
              <h3
                className="mb-6 text-[clamp(24px,3vw,36px)] font-bold leading-tight"
                style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif" }}
              >
                Registered Office
              </h3>
              <div className="space-y-1 text-[15px] font-light text-white/75">
                <p className="font-semibold text-white">BBD Infrastructure Pvt. Ltd.</p>
                <p>104, Floor-1, Plot-214, Raheja Centre,</p>
                <p>Free Press Journal Marg, Nariman Point,</p>
                <p>Mumbai – 400021, Maharashtra, India</p>
              </div>
              <div className="mt-6 space-y-1 text-[14px] font-light text-white/60">
                <p>CIN: U45200MH2025PTC</p>
                <p>GST: 27AANCB1799H1Z6</p>
              </div>
              <p className="mt-6 text-[14px] font-light leading-[1.8] text-white/60">
                Operating across Maharashtra with<br />62 active sites statewide.
              </p>
            </div>

            {/* Right: Map */}
            <div className="overflow-hidden rounded-[3px] border border-white/10" style={{ minHeight: "300px" }}>
              <iframe
                title="BBD Infra Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.0!2d72.8257!3d18.9256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c06fffffff%3A0x0!2sNariman+Point%2C+Mumbai%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ minHeight: "300px", border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
