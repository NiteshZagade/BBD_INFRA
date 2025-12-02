"use client";

import { motion } from "framer-motion";

export default function FinanceChart({ data }: { data: { year: number; revenue: number; profit: number }[] }) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const path = data
    .map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (point.revenue / maxRevenue) * 80 - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="h-48 w-full text-[var(--bbd-primary)]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8 }}
    >
      <polyline points={path} fill="none" stroke="url(#grad)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0b3d91" />
          <stop offset="100%" stopColor="#ff6b00" />
        </linearGradient>
      </defs>
      {data.map((point, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - (point.revenue / maxRevenue) * 80 - 10;
        return <circle key={point.year} cx={x} cy={y} r={1.5} fill="#ff6b00" />;
      })}
    </motion.svg>
  );
}

