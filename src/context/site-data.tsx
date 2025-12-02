"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultSiteData, type FinancePoint, type SiteData, type SiteStats } from "@/data/siteContent";

type SiteDataContextType = {
  data: SiteData;
  updateStats: (stats: Partial<SiteStats>) => void;
  setFinances: (finances: FinancePoint[]) => void;
};

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);
const STORAGE_KEY = "bbd-infra-site-data";

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(() => {
    if (typeof window === "undefined") return defaultSiteData;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultSiteData;
    try {
      const parsed = JSON.parse(stored) as SiteData;
      return {
        stats: { ...defaultSiteData.stats, ...parsed.stats },
        finances: parsed.finances?.length ? parsed.finances : defaultSiteData.finances,
      };
    } catch {
      return defaultSiteData;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateStats = (stats: Partial<SiteStats>) => {
    setData((prev) => ({
      ...prev,
      stats: { ...prev.stats, ...stats },
    }));
  };

  const setFinances = (finances: FinancePoint[]) => {
    setData((prev) => ({
      ...prev,
      finances,
    }));
  };

  const value = useMemo(() => ({ data, updateStats, setFinances }), [data]);

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error("useSiteData must be used within SiteDataProvider");
  }
  return ctx;
}
