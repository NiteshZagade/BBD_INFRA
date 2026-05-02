"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="relative lg:hidden">
      {/* Hamburger button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-[2px] border border-[rgba(212,164,55,0.26)] transition hover:border-[#D4A437]"
        aria-label="Toggle menu"
      >
        <span className={`block h-[1.5px] w-5 bg-white transition-all duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
        <span className={`block h-[1.5px] w-5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`block h-[1.5px] w-5 bg-white transition-all duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
      </button>

      {/* Panel */}
      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute right-0 top-full z-50 mt-2 w-[min(90vw,22rem)] border border-[#2a2f52] bg-[#171c3d] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.8)]"
        >
          {/* Gold top accent */}
          <div className="h-0.5 w-full bg-[#D4A437]" />

          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">Navigation</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 hover:text-[#D4A437] transition"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-1">
              {items.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block border-b border-white/[0.06] py-3 text-[12px] font-medium uppercase tracking-[0.1em] transition ${
                        isActive(item.href)
                          ? "text-[#D4A437]"
                          : "text-white hover:text-[#D4A437]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <p className="border-b border-white/[0.06] py-3 text-[12px] font-medium uppercase tracking-[0.1em] text-white/40">
                        {item.label}
                      </p>
                      {item.children && (
                        <div className="mb-1 ml-4 space-y-0.5 border-l border-[rgba(201,150,12,0.2)] pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className={`block py-2 text-[12px] font-medium transition ${
                                isActive(child.href)
                                  ? "text-[#D4A437]"
                                  : "text-white hover:text-[#D4A437]"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block w-full rounded-[2px] bg-[#D4A437] py-3 text-center text-[12px] font-semibold uppercase tracking-[0.1em] text-[#171c3d] transition hover:bg-[#DEAF47]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
