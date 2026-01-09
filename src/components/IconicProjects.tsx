"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Card = {
  slug: string;
  tag: string;
  name: string;
  location: string;
  value?: string;
  image?: string;
  status?: string;
};

const projects: Card[] = [
  {
    slug: "wani-water-supply",
    tag: "MEGA WATER INFRASTRUCTURE",
    name: "Wani Water Supply Scheme",
    location: "Wani, Yavatmal District, Maharashtra",
    value: "₹140.62 Cr",
    image: "/images/wani-water-supply.png",
    status: "Ongoing",
  },
  {
    slug: "indapur-cc-road",
    tag: "URBAN ROAD INFRASTRUCTURE",
    name: "Indapur CC Road Project",
    location: "Indapur Municipal Council, Pune District",
    value: "₹104.90 Cr",
    image: "/images/roads-highway.jpg",
    status: "Ongoing",
  },
  {
    slug: "pandharkawda-water-supply",
    tag: "REGIONAL WATER SUPPLY",
    name: "Pandharkawda Water Supply Scheme",
    location: "Pandharkawda, Yavatmal District",
    value: "₹68.44 Cr",
    image: "/images/Pandharkawda-Water-Supply -Scheme.png",
    status: "Ongoing",
  },
  {
    slug: "sh-390-road-improvement",
    tag: "MAJOR HIGHWAY INFRASTRUCTURE",
    name: "SH-390 Road Improvement Project (New NH-753)",
    location: "Chikhali & Mehkar Taluka, Buldhana District",
    value: "₹55 Cr",
    image: "/images/sh-390-road-improvement.jpg",
    status: "Ongoing",
  },
  {
    slug: "painganga-river-bridge",
    tag: "MAJOR BRIDGE INFRASTRUCTURE",
    name: "Painganga River Bridge Project (350 m)",
    location: "Painganga River, Buldhana Region",
    value: "₹25 Cr",
    image: "/images/painganga-river-bridge.jpg",
    status: "Ongoing",
  },
  {
    slug: "wani-modern-auditorium",
    tag: "URBAN CULTURAL INFRASTRUCTURE",
    name: "Wani Modern Auditorium",
    location: "Wani, Yavatmal District, Maharashtra",
    value: "₹12 Cr",
    image: "/images/wani-modern-auditorium.jpg",
    status: "Ongoing",
  },
];

export default function IconicProjects() {
  const VISIBLE = 3;
  const items = useMemo(() => projects, []);

  return (
    <section className="pt-0 pb-8">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-white px-6 py-6 shadow-[0_30px_60px_-35px_rgba(0,0,0,0.35)]">
        <div className="relative pb-10" style={{ ['--swiper-theme-color' as any]: 'var(--bbd-accent)' }}>
          <Swiper
          modules={[Autoplay, Navigation, Pagination, A11y]}
          loop
          spaceBetween={24}
          slidesPerView={1}
          slidesPerGroup={1}
          breakpoints={{ 768: { slidesPerView: 2, slidesPerGroup: 2 }, 1024: { slidesPerView: VISIBLE, slidesPerGroup: VISIBLE } }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          aria-label="Iconic projects carousel"
        >
          {items.map((p) => (
            <SwiperSlide key={p.slug}>
              <article className="group flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-[#e6eaf4] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md md:min-h-[540px]">
                <div className="relative h-64 w-full overflow-hidden">
                  {p.image ? (
                    <>
                      <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
                      <span className="absolute bottom-3 left-3 inline-block rounded-full bg-[#FF6B00] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white shadow">{p.tag}</span>
                    </>
                  ) : (
                    <div className="h-full w-full bg-gray-100" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="min-h-[92px] md:min-h-[100px]">
                    <h3 className="text-[18px] font-semibold text-[#0F2A44]">{p.name}</h3>
                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0F2A44]"><path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg>
                      {p.location}
                    </p>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-[#0F2A44]">{p.value ?? "—"}</p>
                  {/* Status text (no color chip) */}
                  <div className="mt-2 text-[12px] font-semibold text-[#0F2A44]">On-Going</div>
                  <div className="flex-1" />
                  <Link href={`/projects/${p.slug}`} className="mt-2 mb-[38px] inline-flex items-center rounded-full bg-[#FF6B00] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#ff8f3d]">View Project <span aria-hidden className="ml-1">›</span></Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
          </Swiper>

          {/* Using default Swiper navigation; styled in globals.css */}
        </div>
      </div>
    </section>
  );
}
