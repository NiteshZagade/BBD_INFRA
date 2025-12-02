import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type NavItem = { label: string; href?: string; children?: { label: string; href: string }[] };

const navLinks: NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "COMPANY",
    children: [
      { label: "About", href: "/about" },
      { label: "Vision", href: "/about#vision-mission" },
      { label: "Board Members", href: "/leadership#board" },
      { label: "Leadership", href: "/leadership" },
      { label: "Finance", href: "/finance" },
      { label: "Client", href: "/clients" },
      { label: "Social Responsibility", href: "/social-responsibility" },
      { label: "Awards & Recognitions", href: "/awards" },
    ],
  },
  { label: "PLANT & MACHINERY", href: "/plant-machinery" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CAREER", href: "/careers" },
  { label: "MEDIA", href: "/insights" },
  { label: "CONTACT", href: "/contact" },
];

export const metadata: Metadata = {
  title: "BBD Infra | Building Quality Infrastructure",
  description:
    "BBD Infra delivers highways, water networks, bridges, and urban infrastructure with national-grade engineering and technology.",
  icons: {
    icon: "/logo-bbd.svg",
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
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] antialiased`}
      >
        <Providers>
          <header className="border-b border-[#083075] bg-[#0B3D91]">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-10">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/logo-bbd.svg" alt="BBD Infra logo" width={150} height={48} className="h-11 w-auto" />
              </Link>
              <nav className="relative hidden items-center gap-6 text-[12px] font-semibold tracking-[0.15em] text-white lg:flex">
                {navLinks.map((item) => (
                  <div key={item.label} className="group relative">
                    {item.href ? (
                      <Link href={item.href} className="transition hover:text-[#ffbe8a]">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="cursor-default select-none transition group-hover:text-[#ffbe8a]">{item.label}</span>
                    )}

                    {item.label === "COMPANY" && item.children && (
                      <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[min(92vw,72rem)] -translate-x-1/2 pt-4 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                        <div className="rounded-md border border-[#22345b] bg-[#0f1d33]/95 p-6 text-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
                          <div className="grid gap-6 sm:grid-cols-2">
                            <ul className="space-y-2">
                              {item.children.slice(0, 4).map((child) => (
                                <li key={child.href} className="border-b border-white/10 pb-2 last:border-0">
                                  <Link href={child.href} className="flex items-center justify-between px-3 py-2 hover:text-[#ffbe8a]">
                                    <span>{child.label}</span>
                                    <span aria-hidden>→</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <ul className="space-y-2">
                              {item.children.slice(4).map((child) => (
                                <li key={child.href} className="border-b border-white/10 pb-2 last:border-0">
                                  <Link href={child.href} className="flex items-center justify-between px-3 py-2 hover:text-[#ffbe8a]">
                                    <span>{child.label}</span>
                                    <span aria-hidden>→</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.label !== "COMPANY" && item.children && (
                      <div className="invisible absolute left-0 top-full z-50 w-72 rounded-md border border-[#e3e9fb] bg-white p-2 text-[#0b1e3f] opacity-0 shadow-[0_12px_28px_-18px_rgba(11,61,145,0.35)] transition group-hover:visible group-hover:opacity-100">
                        <ul className="text-[12px] font-medium tracking-normal">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link href={child.href} className="block rounded px-3 py-2 text-[#0b1e3f]/80 hover:bg-[#f6f8ff] hover:text-[var(--bbd-primary)]">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-[#083075] bg-[#0B3D91] text-white">
            {/* Contact strip */}
            {/* Full-bleed contact strip */}
            <div className="-mt-6 w-screen px-5 sm:px-10">
              <div className="mx-auto grid w-full max-w-6xl gap-4 rounded-2xl bg-white px-6 py-4 text-[#0b1e3f] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)] sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0B3D91] text-white">☎</span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0b1e3f]/70">Phone</p>
                    <Link href="tel:+919921342002" className="text-sm font-medium hover:text-[#0B3D91]">
                      +91 99213 42002
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0B3D91] text-white">✉</span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0b1e3f]/70">Email</p>
                    <Link href="mailto:balajiproj2017@gmail.com" className="text-sm font-medium hover:text-[#0B3D91]">
                      balajiproj2017@gmail.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 md:grid-cols-4 sm:px-10">
              {/* Brand and blurb */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image src="/logo-bbd.svg" alt="BBD Infra logo" width={140} height={44} className="h-10 w-auto" />
                </div>
                <p className="text-sm/6 text-white/85">
                  BBD Infra Pvt. Ltd. (formerly Balaji Builders & Developers) — delivering reliable water networks,
                  resilient roads, bridges and urban infrastructure with disciplined project controls and a people‑first approach.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <a aria-label="Facebook" href="#" className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20">f</a>
                  <a aria-label="Instagram" href="#" className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20">ig</a>
                  <a aria-label="LinkedIn" href="#" className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20">in</a>
                </div>
              </div>

              {/* Quick links */}
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/70">Quick Links</p>
                <ul className="space-y-2 text-sm/6 text-white/85">
                  <li><Link href="/about" className="hover:text-white">About</Link></li>
                  <li><Link href="/plant-machinery" className="hover:text-white">Plant &amp; Machinery</Link></li>
                  <li><Link href="/projects" className="hover:text-white">Projects</Link></li>
                  <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                  <li><Link href="/insights" className="hover:text-white">Media</Link></li>
                  <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                </ul>
              </div>

              {/* Our projects (domains) */}
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/70">Our Projects</p>
                <ul className="space-y-2 text-sm/6 text-white/85">
                  <li>Roads &amp; Highways</li>
                  <li>Water Infrastructure</li>
                  <li>Bridges &amp; Structures</li>
                  <li>Urban Development</li>
                  <li>Energy &amp; Sustainability</li>
                </ul>
              </div>

              {/* Addresses */}
              <div className="space-y-4 text-sm/6 text-white/85">
                <p className="mb-1 text-sm font-semibold uppercase tracking-[0.25em] text-white/70">Addresses</p>
                <div>
                  <p className="font-semibold">Corporate Office</p>
                  <p>MHADA Colony, DP Road, Mehkar</p>
                  <p>Buldhana – 443301, Maharashtra</p>
                </div>
                <div>
                  <p className="font-semibold">Registered Office</p>
                  <p>Ward No. 03, Saoji Galli, Dongaon</p>
                  <p>Tq. Mehkar, Dist. Buldhana, Maharashtra</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 bg-[#0A3681] py-6 text-center text-xs text-white/80">
              © {new Date().getFullYear()} BBD Infra Pvt. Ltd. (Formerly Balaji Builders &amp; Developers). All rights reserved.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
