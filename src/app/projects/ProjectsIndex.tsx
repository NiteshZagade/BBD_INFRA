"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

type CategoryCard = {
  key: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

const categories: CategoryCard[] = [
  {
    key: "water-supply",
    title: "WATER SUPPLY NETWORK",
    description: "We have successfully delivered a range of water supply projects.",
    href: "/projects/categories/water-supply",
    image: "/images/water-supply-network.jpg",
  },
  {
    key: "roads-highways",
    title: "ROAD & HIGHWAYS",
    description: "We have successfully delivered a range of roads & highways projects.",
    href: "/projects/categories/roads-highways",
    image: "/images/roads-highway.jpg",
  },
  {
    key: "urban-infrastructure",
    title: "URBAN INFRASTRUCTURE",
    description: "We have successfully delivered a range of urban infrastructure projects.",
    href: "/projects/categories/urban-infrastructure",
    image: "/images/urban-infrastructure.jpg",
  },
  {
    key: "renewable-energy",
    title: "RENEWABLE ENERGY",
    description: "We have successfully delivered solar and renewable energy projects.",
    href: "/projects/categories/renewable-energy",
    image: "/images/RENEWABLE-ENERGY.jpg",
  },
];

function CategoryCard({ item }: { item: CategoryCard }) {
  const [src, setSrc] = useState(item.image);
  const fallback =
    item.key === "water-supply"
      ? "/images/home-water.jpg"
      : item.key === "urban-infrastructure"
      ? "/images/home-urban.jpg"
      : item.key === "renewable-energy"
      ? "/images/project-3.jpg"
      : "/images/project-1.jpg";
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="overflow-hidden rounded-xl border border-[#e6eaf4] bg-white shadow-[0_18px_44px_-36px_rgba(11,61,145,0.35)]"
    >
      <div className="relative h-56 w-full">
        <Image
          src={src}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 30vw, 90vw"
          onError={() => setSrc(fallback)}
          unoptimized
        />
      </div>
      <div className="space-y-3 p-6">
        <div className="flex items-center gap-2 text-[#0b1e3f]">
          <span className="h-[12px] w-[12px] rounded-sm border border-[#0b1e3f]" aria-hidden></span>
          <h3 className="text-[15px] font-semibold uppercase tracking-wide">{item.title}</h3>
        </div>
        <p className="text-sm text-[#405170]">{item.description}</p>
        <Link href={item.href} className="text-[var(--bbd-primary)] text-sm font-semibold hover:text-[var(--bbd-accent)]">
          View All
        </Link>
      </div>
    </motion.article>
  );
}

export default function ProjectsIndex() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-10">
      <header className="mb-8">
        <div className="flex items-center gap-3 text-[#0b1e3f]">
          <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
          <h1 className="text-xl font-semibold uppercase tracking-[0.21em] sm:text-2xl">All Projects</h1>
        </div>
        <h3 className="mt-7 font-semibold text-[#0b1e3f] text-[28px]">
          Delivering quality infrastructure projects that drive sustainable development.
        </h3>
        <div className="mt-5 w-full text-[15px] leading-7 text-[#405170] lg:text-base">
          <p className="w-full max-w-none">
            Our portfolio represents a proven track record of delivering large-scale and community-focused infrastructure projects across Maharashtra. We have successfully executed works in road development, water supply systems, urban infrastructure, and renewable energy, adhering to the highest standards of quality, safety, and regulatory compliance.
          </p>
          <p className="mt-0 w-full max-w-none">
            Each project reflects our commitment to engineering excellence, sustainable development, and timely execution, contributing to improved public amenities and long-term regional growth.
          </p>
        </div>
      </header>
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <CategoryCard key={c.key} item={c} />
        ))}
      </section>
    </div>
  );
}
