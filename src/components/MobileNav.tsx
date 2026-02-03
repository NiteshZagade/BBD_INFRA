"use client";

import Link from "next/link";
import { useState } from "react";

export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

type MobileNavProps = {
  items: NavItem[];
};

export default function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/90 transition hover:border-white/60 hover:text-white"
      >
        Menu
      </button>
      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute right-0 top-full z-50 mt-3 w-[min(90vw,22rem)] rounded-2xl border border-[#22345b] bg-[#0f1d33]/95 p-4 text-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">Navigation</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <div key={item.label} className="space-y-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block text-sm font-semibold tracking-[0.12em] text-white hover:text-[#ffbe8a]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">{item.label}</p>
                )}
                {item.children ? (
                  <div className="space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-2 py-1 text-sm text-white/85 hover:bg-white/10 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
