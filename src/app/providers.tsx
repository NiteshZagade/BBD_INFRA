"use client";

import { SiteDataProvider } from "@/context/site-data";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SiteDataProvider>{children}</SiteDataProvider>;
}
