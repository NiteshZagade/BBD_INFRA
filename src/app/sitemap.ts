import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bbdinfra.in";

  return [
    { url: base,                      lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projects`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/financials`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/plant-machinery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
