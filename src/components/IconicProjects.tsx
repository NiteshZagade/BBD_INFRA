"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ProjectCard = {
  name: string;
  value: string;
  category: string;
  categoryColor: string;
  region: string;
  status: "Active" | "Completed";
  overview: string;
  impact: string;
  image: string;
  overlayColor: string;
};

const projects: ProjectCard[] = [
  {
    name: "Jalna–Nanded Expressway",
    value: "₹700 Cr",
    category: "Roads & Expressway",
    categoryColor: "#16a34a",
    region: "Marathwada Region",
    status: "Active",
    overview: "Large-scale EPC execution of a major expressway corridor connecting two key Marathwada districts.",
    impact: "Improved regional connectivity and significantly reduced travel time across Marathwada.",
    image: "/images/Jalna–Nanded Expressway.png",
    overlayColor: "rgba(10,40,20,0.52)",
  },
  {
    name: "Indapur CC Road & Drainage",
    value: "₹104.90 Cr",
    category: "Urban Roads",
    categoryColor: "#2563eb",
    region: "Pune District",
    status: "Completed",
    overview: "High-durability CC roads and RCC drainage infrastructure built for long-term urban performance.",
    impact: "40+ km of enhanced urban connectivity with improved stormwater management systems.",
    image: "/images/Indapur CC Road & Drainage Infrastructure.png",
    overlayColor: "rgba(10,20,60,0.52)",
  },
  {
    name: "Painganga River Bridge",
    value: "₹25 Cr",
    category: "Bridge & Structure",
    categoryColor: "#c2410c",
    region: "Vidarbha Region",
    status: "Completed",
    overview: "Strategic bridge infrastructure improving inter-district mobility across the Painganga river corridor.",
    impact: "Reduced travel time and stronger regional access for communities on both riverbanks.",
    image: "/images/Painganga River Bridge.png",
    overlayColor: "rgba(60,25,5,0.52)",
  },
  {
    name: "Pandharkawda Water Supply Scheme",
    value: "₹68.44 Cr",
    category: "Water Supply",
    categoryColor: "#0284c7",
    region: "Yavatmal District",
    status: "Completed",
    overview: "Water source augmentation, pumping systems, and multi-zone pipeline network for urban supply.",
    impact: "Improved water accessibility for 50,000+ households with reduced distribution losses.",
    image: "/images/Pandharkawda Water Supply Scheme.png",
    overlayColor: "rgba(5,30,55,0.52)",
  },
  {
    name: "SH-390 Road Improvement Project",
    value: "₹55 Cr",
    category: "Road Improvement",
    categoryColor: "#65a30d",
    region: "Maharashtra",
    status: "Completed",
    overview: "Road widening and strengthening with pavement, drainage, and safety infrastructure works.",
    impact: "Safer travel corridors and improved inter-district connectivity along SH-390.",
    image: "/images/SH-390 Road Improvement Project.png",
    overlayColor: "rgba(20,40,10,0.52)",
  },
  {
    name: "Jal Jeevan Mission – Wani",
    value: "₹140.62 Cr",
    category: "Water Supply",
    categoryColor: "#0284c7",
    region: "Yavatmal District",
    status: "Active",
    overview: "Smart urban water infrastructure with precision distribution systems for 24×7 water supply.",
    impact: "Stronger regional water security with 24×7-ready delivery capability for urban Wani.",
    image: "/images/Jal Jeevan Mission – Wani.png",
    overlayColor: "rgba(5,20,45,0.52)",
  },
];

export default function IconicProjects() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      {/* Desktop prev/next arrows */}
      <button
        type="button"
        className="landmark-prev absolute left-[-32px] top-[38%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg transition-all duration-200 hover:scale-[1.08] hover:border-[#C9960C] hover:bg-[#C9960C]/20 hover:text-[#C9960C] xl:inline-flex"
        aria-label="Previous project"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        className="landmark-next absolute right-[-32px] top-[38%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg transition-all duration-200 hover:scale-[1.08] hover:border-[#C9960C] hover:bg-[#C9960C]/20 hover:text-[#C9960C] xl:inline-flex"
        aria-label="Next project"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <Swiper
        modules={[A11y, Autoplay, Navigation, Pagination]}
        navigation={{ prevEl: ".landmark-prev", nextEl: ".landmark-next" }}
        pagination={{ el: ".landmark-pagination", clickable: true }}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={20}
        speed={650}
        watchOverflow
        observer
        observeParents
        breakpoints={{
          768:  { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 20 },
          1280: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 20 },
        }}
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        aria-label="Landmark infrastructure projects carousel"
        style={{ "--swiper-theme-color": "#C9960C" } as CSSProperties}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.name} className="!h-auto">
            <article className="landmark-card group flex h-full cursor-default flex-col overflow-hidden rounded-[4px] border border-white/10 transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(201,150,12,0.5)] hover:shadow-[0_20px_48px_-16px_rgba(201,150,12,0.25)]">

              {/* ── Category colour bar (4px top) ── */}
              <div className="h-1 w-full transition-all duration-300 bg-[#C9960C]" />

              {/* ── Image area ── */}
              <div className="relative overflow-hidden" style={{ height: "210px" }}>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  unoptimized
                />
                {/* Tinted overlay */}
                <div className="absolute inset-0" style={{ background: project.overlayColor }} />
                {/* Bottom fade for readability */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D1A40] to-transparent" />

                {/* Category badge — top right */}
                <div className="absolute right-3 top-3">
                  <span
                    className="rounded-[2px] bg-[#08102B]/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm"
                  >
                    {project.category}
                  </span>
                </div>

                {/* Price badge — bottom left */}
                <div className="absolute bottom-3 left-3">
                  <span className="inline-block rounded-[2px] bg-[#08102B]/85 px-3.5 py-1.5 text-[13px] font-bold text-white backdrop-blur-sm">
                    {project.value}
                  </span>
                </div>
              </div>

              {/* ── Content area ── */}
              <div className="flex flex-1 flex-col bg-[#0D1A40] p-6">
                <h3
                  className="mb-3 text-[20px] font-bold leading-[1.2] text-white transition-colors duration-200 group-hover:text-[#F59E0B]"
                  style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                >
                  {project.name}
                </h3>

                <p className="mb-4 text-[13px] font-light leading-[1.75] text-white/60">
                  {project.overview}
                </p>

                {/* Tags */}
                <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                    {project.region}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-white/50">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: project.status === "Active" ? "#4ade80" : "#C9960C" }}
                    />
                    {project.status}
                  </span>
                </div>

                {/* Impact */}
                <div className="mt-auto border-t border-white/[0.08] pt-4">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9960C]">Impact</p>
                  <p className="text-[12px] font-light leading-[1.7] text-white/55">
                    {project.impact}
                  </p>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dot indicators */}
      <div className="landmark-pagination !static mt-8 text-center [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-white/30 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:scale-125 [&_.swiper-pagination-bullet-active]:bg-[#C9960C]" />

      {/* Mobile arrows */}
      <div className="mt-4 flex items-center justify-center gap-3 xl:hidden">
        <button
          type="button"
          className="landmark-prev inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:scale-[1.08] hover:border-[#C9960C] hover:text-[#C9960C]"
          aria-label="Previous project"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="landmark-next inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:scale-[1.08] hover:border-[#C9960C] hover:text-[#C9960C]"
          aria-label="Next project"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
