"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./MobileNav";

export default function NavDesktop({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="hidden items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.1em] lg:flex">
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <div key={item.label} className="group relative">
            {item.href ? (
              <Link
                href={item.href}
                className={`inline-block pb-1 transition-colors duration-200 ${
                  active
                    ? "border-b-2 border-[#D4A437] text-[#D4A437]"
                    : "border-b-2 border-transparent text-white hover:border-[#D4A437] hover:text-[#D4A437]"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`inline-block cursor-default select-none pb-1 transition-colors duration-200 ${
                  item.children?.some((c) => isActive(c.href))
                    ? "border-b-2 border-[#D4A437] text-[#D4A437]"
                    : "border-b-2 border-transparent text-[#B9BEC9] group-hover:border-[#D4A437] group-hover:text-[#D4A437]"
                }`}
              >
                {item.label}
              </span>
            )}

            {/* Dropdown */}
            {item.children && (
              <div className="pointer-events-none absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-4 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="border border-[rgba(201,150,12,0.2)] bg-[rgba(8,16,43,0.98)] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.7)] backdrop-blur-[10px]">
                  {/* Gold top accent line */}
                  <div className="h-0.5 w-full bg-[#C9960C]" />
                  <ul className="py-2">
                    {item.children.map((child) => {
                      const childActive = isActive(child.href);
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`flex items-center justify-between px-5 py-2.5 text-[12px] font-medium transition-colors duration-150 ${
                              childActive
                                ? "bg-[rgba(201,150,12,0.08)] text-[#F59E0B]"
                                : "text-white/70 hover:bg-[rgba(255,255,255,0.04)] hover:text-[#F59E0B]"
                            }`}
                          >
                            <span>{child.label}</span>
                            <span className="text-[#C9960C]/60" aria-hidden>→</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
