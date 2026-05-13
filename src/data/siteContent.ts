export type SiteStats = {
  projectsDelivered: number;
  kmsHighway: number;
  workforce: number;
  yearsExperience: number;
};

export type FinancePoint = {
  year: number;
  revenue: number;
  profit: number;
};

export type SiteData = {
  stats: SiteStats;
  finances: FinancePoint[];
};

export const defaultSiteData: SiteData = {
  stats: {
    projectsDelivered: 25,
    kmsHighway: 512,
    workforce: 200,
    yearsExperience: 11,
  },
  finances: [
    { year: 2021, revenue: 210, profit: 28 },
    { year: 2022, revenue: 265, profit: 34 },
    { year: 2023, revenue: 320, profit: 41 },
    { year: 2024, revenue: 380, profit: 52 },
    { year: 2025, revenue: 440, profit: 65 },
    { year: 2026, revenue: 520, profit: 82 },
  ],
};
