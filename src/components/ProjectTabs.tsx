"use client";

import { useState } from "react";
import ProjectListCard from "@/components/ProjectListCard";

export type DisplayProject = { title: string; district: string };

export default function ProjectTabs({
  ongoing,
  delivered,
}: {
  ongoing: DisplayProject[];
  delivered: DisplayProject[];
}) {
  const [tab, setTab] = useState<"ongoing" | "delivered">("ongoing");

  const tabs: { key: "ongoing" | "delivered"; label: string; count: number }[] = [
    { key: "ongoing", label: "Ongoing", count: ongoing.length },
    { key: "delivered", label: "Delivered", count: delivered.length },
  ];

  const list = tab === "ongoing" ? ongoing : delivered;

  return (
    <div>
      <div role="tablist" aria-label="Project status" className="mb-4 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              tab === t.key
                ? "border-[var(--bbd-primary)] bg-white text-[var(--bbd-primary)] shadow-sm"
                : "border-[#dbe4f4] bg-transparent text-[#0b1e3f] hover:border-[var(--bbd-primary)]/60"
            }`}
          >
            {t.label} {t.count ? `(${t.count})` : ""}
          </button>
        ))}
      </div>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.length ? (
          list.map((p, idx) => <ProjectListCard key={`${tab}-${idx}`} title={p.title} district={p.district} />)
        ) : (
          <p className="text-xs text-[#405170]">No items listed.</p>)
        }
      </section>
    </div>
  );
}

