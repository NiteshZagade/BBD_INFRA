"use client";

import { motion } from "framer-motion";

export default function ProjectListCard({
  title,
  district,
}: {
  title: string;
  district: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-xl border border-[#e6eaf4] bg-white p-5 shadow-[0_12px_36px_-28px_rgba(11,61,145,0.35)]"
    >
      <div className="space-y-2">
        <p className="text-xs text-[#405170]">
          <span className="font-semibold text-[#0b1e3f]">Project Name:</span> {title}
        </p>
        <p className="text-xs text-[#405170]">
          <span className="font-semibold text-[#0b1e3f]">District:</span> {district}
        </p>
      </div>
    </motion.article>
  );
}
