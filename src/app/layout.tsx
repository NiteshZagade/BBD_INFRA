import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist_Mono, DM_Sans, Cormorant_Garamond } from "next/font/google";
import MobileNav from "../components/MobileNav";
import NavDesktop from "../components/NavDesktop";
import type { NavItem } from "../components/MobileNav";
import Providers from "./providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Plants & Machinery", href: "/plant-machinery" },
  { label: "Contact Us", href: "/contact" },
  { label: "Financials", href: "/financials" },
];

export const metadata: Metadata = {
  title: "BBD Infra | Building Quality Infrastructure",
  description:
    "BBD Infra delivers highways, water networks, bridges, and urban infrastructure with national-grade engineering and technology.",
  icons: {
    icon: "/images/bbd infra final version horizontal.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${cormorant.variable} ${geistMono.variable} min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] antialiased`}
      >
        <Providers>
          {/* ── Navbar ── */}
          <header className="sticky top-0 z-50 border-b border-white/10" style={{ backgroundColor: "rgba(8,16,43,0.98)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", transition: "all .3s" }}>
            <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 sm:px-10 lg:px-[60px]">

              {/* Logo */}
              <Link href="/" className="flex shrink-0 items-center no-underline">
                <Image
                  src="/images/bbd infra final version horizontal.png"
                  alt="BBD Infra logo"
                  width={160}
                  height={160}
                  className="h-[110px] w-auto object-contain"
                  style={{ filter: "brightness(1.6) saturate(1.2) drop-shadow(0 0 12px rgba(80,140,255,0.6))" }}
                />
              </Link>

              {/* Desktop nav — client component for active state */}
              <NavDesktop items={navLinks} />

              {/* CTA + Mobile hamburger */}
              <div className="flex items-center gap-4">
                <Link
                  href="/contact"
                  className="hidden rounded-[2px] bg-[#D4A437] px-6 py-[10px] text-[12px] font-semibold uppercase tracking-[0.1em] text-[#171c3d] transition hover:bg-[#DEAF47] hover:-translate-y-px lg:inline-flex"
                >
                  Start a Project
                </Link>
                <MobileNav items={navLinks} />
              </div>

            </div>
          </header>

          {/* Scroll reveal observer */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}});},{threshold:0.15});document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(function(el){io.observe(el);});document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(function(el){io.observe(el);});});})();`,
            }}
          />

          <main>{children}</main>

          {/* ── Footer ── */}
          <footer className="bg-[#05091E] text-white">
<div className="mx-auto max-w-7xl px-5 pt-14 pb-10 sm:px-10">
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

                {/* Col 1 — Brand */}
                <div className="space-y-3 lg:col-span-1">
                  <Image
                    src="/images/bbd infra final version horizontal.png"
                    alt="BBD Infra logo"
                    width={320}
                    height={320}
                    className="h-36 w-auto object-contain"
                    style={{ filter: "brightness(1.5) saturate(1.1)" }}
                  />
                  <p className="text-[13px] leading-[1.8] text-white/65" style={{ marginTop: "-32px" }}>
                    BBD Infra Pvt. Ltd. (formerly Balaji Builders &amp; Developers), delivering water networks,
                    roads, bridges, and urban infrastructure across Maharashtra.
                  </p>
                  <p className="text-[11px] font-semibold tracking-wide text-white/50">
                    GSTIN: <span className="text-white/70">27AANCB1799H1Z6</span>
                  </p>
                  <div className="flex items-center gap-2.5 pt-1">
                    <a aria-label="Facebook" href="#"
                      className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-[13px] font-semibold hover:border-[#C9960C]/50 hover:bg-[#C9960C]/10 hover:text-[#F59E0B] transition">
                      f
                    </a>
                    <a aria-label="Instagram" href="#"
                      className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold hover:border-[#C9960C]/50 hover:bg-[#C9960C]/10 hover:text-[#F59E0B] transition">
                      ig
                    </a>
                    <a aria-label="LinkedIn" href="#"
                      className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold hover:border-[#C9960C]/50 hover:bg-[#C9960C]/10 hover:text-[#F59E0B] transition">
                      in
                    </a>
                  </div>
                </div>

                {/* Col 2 — Quick Links */}
                <div>
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9960C]">Quick Links</p>
                  <ul className="space-y-3">
                    {[
                      { label: "Home",              href: "/" },
                      { label: "About Us",           href: "/about" },
                      { label: "Projects",           href: "/projects" },
                      { label: "Plant & Machinery",  href: "/plant-machinery" },
                      { label: "Financials",         href: "/financials" },
                      { label: "Contact Us",         href: "/contact" },
                    ].map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="group flex items-center gap-2 text-[13px] text-white/65 transition hover:text-[#F59E0B]"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 3 — Our Projects */}
                <div>
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9960C]">Our Projects</p>
                  <ul className="space-y-3">
                    {[
                      { label: "Water Supply Network",  href: "/projects?filter=Water+Supply" },
                      { label: "Roads & Highways",      href: "/projects?filter=Roads+%26+Bridges" },
                      { label: "Urban Infrastructure",  href: "/projects?filter=Urban+Development" },
                      { label: "Renewable Energy",      href: "/projects?filter=Renewable+Energy" },
                    ].map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="group flex items-center gap-2 text-[13px] text-white/65 transition hover:text-[#F59E0B]"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-white/5 pt-6">
                    <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9960C]">Reach Us</p>
                    <a
                      href="mailto:info@bbdinfra.in"
                      className="flex items-center gap-2 text-[13px] text-white/65 hover:text-[#F59E0B] transition"
                    >
                      <svg width="14" height="11" viewBox="0 0 14 11" fill="none" className="shrink-0 opacity-60">
                        <path d="M1 1h12v9H1V1Zm0 0 6 5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                      </svg>
                      info@bbdinfra.in
                    </a>
                  </div>
                </div>

                {/* Col 4 — Certifications */}
                <div>
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9960C]">Certifications</p>

                  <div className="rounded-[4px] border border-white/8 bg-white/[0.03] p-5">
                    <div className="flex items-start gap-4">
                      <Image
                        src="/images/iso-9001-2015-certification.png"
                        alt="ISO 9001:2015 Certification"
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 object-contain"
                      />
                      <div>
                        <p className="text-[13px] font-semibold text-white">ISO 9001:2015</p>
                        <p className="mt-0.5 text-[11px] text-white/55">Quality Management System</p>
                        <p className="mt-2 text-[11px] leading-[1.6] text-white/40">
                          Certified for design, construction &amp; management of infrastructure projects.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[4px] border border-[#C9960C]/15 bg-[#C9960C]/5 px-5 py-4">
                    <p className="text-[12px] font-semibold text-white/80">Start a Project</p>
                    <p className="mt-1 text-[11px] text-white/45">Infrastructure programs, large or small.</p>
                    <Link
                      href="/contact"
                      className="mt-3 inline-block rounded-[2px] bg-[#C9960C] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#08102B] transition hover:bg-[#F59E0B]"
                    >
                      Get in Touch →
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/[0.06] bg-[#05091E]">
              <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-[11px] text-white/40 sm:flex-row sm:px-10">
                <span>© {new Date().getFullYear()} BBD Infra Pvt. Ltd. (Formerly Balaji Builders &amp; Developers). All rights reserved.</span>
                <span className="text-white/30">Designed &amp; Developed by Nitesh Zagade</span>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
