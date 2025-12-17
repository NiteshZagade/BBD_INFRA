"use client";

import Image from "next/image";
import Link from "next/link";

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
    title: "WATER SUPPLY",
    description: "We have successfully delivered a range of water supply projects.",
    href: "/projects/categories/water-supply",
    image: "/images/home-water.jpg",
  },
  {
    key: "roads-highways",
    title: "ROAD & HIGHWAYS",
    description: "We have successfully delivered a range of roads & highways projects.",
    href: "/projects/categories/roads-highways",
    image: "/images/project-1.jpg",
  },
  {
    key: "urban-infrastructure",
    title: "URBAN INFRASTRUCTURE",
    description: "We have successfully delivered a range of urban infrastructure projects.",
    href: "/projects/categories/urban-infrastructure",
    image: "/images/home-urban.jpg",
  },
  {
    key: "renewable-energy",
    title: "RENEWABLE ENERGY / SOLAR",
    description: "We have successfully delivered solar and renewable energy projects.",
    href: "/projects/categories/renewable-energy",
    image: "/images/project-3.jpg",
  },
];

function CategoryCard({ item }: { item: CategoryCard }) {
  return (
    <article className="overflow-hidden rounded-xl border border-[#e6eaf4] bg-white shadow-[0_18px_44px_-36px_rgba(11,61,145,0.35)] transition duration-300 hover:-translate-y-1">
      <div className="relative h-56 w-full">
        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(min-width:1024px) 30vw, 90vw" />
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
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-10">
      <header className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b1e3f]">All Projects</p>
      </header>
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <CategoryCard key={c.key} item={c} />
        ))}
      </section>
    </div>
  );
}
