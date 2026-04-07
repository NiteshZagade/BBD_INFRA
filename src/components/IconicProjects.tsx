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
  image: string;
  overview: string;
  impact: string;
};

const projects: ProjectCard[] = [
  {
    name: "Jalna–Nanded Expressway",
    value: "₹700 Cr",
    image: "/images/Jalna–Nanded Expressway.png",
    overview: "Large-scale EPC execution of a major expressway corridor.",
    impact: "Improved regional connectivity and reduced travel time.",
  },
  {
    name: "Indapur CC Road & Drainage Infrastructure",
    value: "₹104.90 Cr",
    image: "/images/Indapur CC Road & Drainage Infrastructure.png",
    overview: "High-durability CC roads and RCC drainage built for urban performance.",
    impact: "40+ km of enhanced connectivity.",
  },
  {
    name: "Painganga River Bridge",
    value: "₹25 Cr",
    image: "/images/Painganga River Bridge.png",
    overview: "Strategic bridge infrastructure improving inter-district mobility.",
    impact: "Reduced travel time and stronger regional access.",
  },
  {
    name: "Pandharkawda Water Supply Scheme",
    value: "₹68.44 Cr",
    image: "/images/Pandharkawda Water Supply Scheme.png",
    overview: "Water source augmentation, pumping systems, and multi-zone pipeline network.",
    impact: "Improved water accessibility and reduced distribution losses.",
  },
  {
    name: "SH-390 Road Improvement Project",
    value: "₹55 Cr",
    image: "/images/SH-390 Road Improvement Project.png",
    overview: "Road widening and strengthening with pavement, drainage, and safety works.",
    impact: "Safer travel and better inter-district connectivity.",
  },
  {
    name: "Jal Jeevan Mission – Wani",
    value: "₹140.62 Cr",
    image: "/images/Jal Jeevan Mission – Wani.png",
    overview: "Smart urban water infrastructure with precision distribution systems.",
    impact: "Stronger regional water security with 24x7-ready capability.",
  },
];

export default function IconicProjects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-[1420px]"
    >
      <div
        className="relative px-2 sm:px-10"
        style={{ "--swiper-theme-color": "#2d67b1" } as CSSProperties}
      >
        <button
          type="button"
          className="landmark-prev absolute left-0 top-[34%] z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9e0ea] bg-white text-[#4d5a75] shadow-[0_18px_32px_-24px_rgba(11,30,63,0.35)] transition hover:text-[#2d67b1] xl:inline-flex"
          aria-label="Previous project group"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          className="landmark-next absolute right-0 top-[34%] z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9e0ea] bg-white text-[#4d5a75] shadow-[0_18px_32px_-24px_rgba(11,30,63,0.35)] transition hover:text-[#2d67b1] xl:inline-flex"
          aria-label="Next project group"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <Swiper
          modules={[A11y, Autoplay, Navigation, Pagination]}
          navigation={{
            prevEl: ".landmark-prev",
            nextEl: ".landmark-next",
          }}
          pagination={{
            el: ".landmark-pagination",
            clickable: true,
          }}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={24}
          speed={650}
          watchOverflow
          observer
          observeParents
          breakpoints={{
            768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 22 },
            1280: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 },
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          aria-label="Flagship infrastructure projects carousel"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.name} className="!h-auto py-1">
              <article className="flex h-full flex-col rounded-[20px] border border-[#dde4ef] bg-white p-5 shadow-[0_22px_40px_-28px_rgba(11,30,63,0.25)]">
                <div className="relative h-[195px] overflow-hidden rounded-[10px] sm:h-[205px]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  <div className="absolute bottom-3 right-3 rounded-full bg-[#2d67b1] px-4 py-2 text-[15px] font-semibold text-white shadow-[0_14px_24px_-18px_rgba(45,103,177,0.9)]">
                    {project.value}
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-1 pt-6">
                  <h3 className="min-h-[82px] text-center text-[23px] font-semibold leading-[1.25] text-black">
                    {project.name}
                  </h3>
                  <div className="mx-auto mt-4 h-px w-full bg-[#e3e8f1]" />
                  <p className="mt-4 min-h-[104px] text-center text-[17px] leading-8 text-[#55627c]">
                    {project.overview}
                  </p>
                  <div className="mt-auto rounded-[6px] bg-[#edf4ff] px-4 py-4">
                    <p className="text-[16px] leading-8 text-[#2d67b1]">
                      <span className="font-semibold">Impact:</span> {project.impact}
                    </p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-7 flex items-center justify-center gap-4 xl:hidden">
          <button
            type="button"
            className="landmark-prev inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9e0ea] bg-white text-[#4d5a75] transition hover:text-[#2d67b1]"
            aria-label="Previous project group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="landmark-next inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9e0ea] bg-white text-[#4d5a75] transition hover:text-[#2d67b1]"
            aria-label="Next project group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="landmark-pagination !static !mt-8 text-center" />
      </div>
    </motion.section>
  );
}
