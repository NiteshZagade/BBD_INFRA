import Link from "next/link";
import { projectsByCategory } from "../../data";
import { use } from "react";
import ProjectTabs, { type DisplayProject } from "@/components/ProjectTabs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const mapSlugToKey = (slug: string) => {
  const s = (slug || "").toLowerCase();
  const direct: Record<string, "roads_highways"|"water_supply"|"urban_infra"|"renewable_solar"> = {
    "roads-highways": "roads_highways",
    "water-supply": "water_supply",
    "water-supply-network": "water_supply",
    "urban-infrastructure": "urban_infra",
    "renewable-energy": "renewable_solar",
  };
  if (s in direct) return direct[s];
  if (s.includes("road")) return "roads_highways";
  if (s.includes("water")) return "water_supply";
  if (s.includes("urban")) return "urban_infra";
  if (s.includes("renewable") || s.includes("solar")) return "renewable_solar";
  return null;
};

const labelMap: Record<string, string> = {
  roads_highways: "Road & Highways",
  water_supply: "Water Supply Network",
  urban_infra: "Urban Infrastructure",
  renewable_solar: "Renewable Energy / Solar",
};

function makeShortTitle(title: string) {
  let s = title.trim();
  // Specific highway improvement pattern → "SH-390 Highway Improvement"
  s = s.replace(/^Improvement of\s+State\s+Highway\s*(SH[-\s]?\d+)/i, (_m, g1: string) => `${g1.replace(/\s+/g, "")} Highway Improvement`);
  s = s.replace(/Construction of\s+/i, "");
  s = s.replace(/Cement Concrete/gi, "CC");
  s = s.replace(/Internal\s+CC\s+Roads?/gi, "Internal CC Roads");
  // Common long phrases → compact
  s = s.replace(/,?\s*RCC\s+Drain\s+with\s+Footpath\s*&\s*Culverts?/gi, " & RCC Drain");
  s = s.replace(/Providing\s+RCC\s+Drain\s+Construction\s+of\s+Paver\s+Block\s+road\s+and\s+Development\s+of\s+Open\s+Space/gi, "+ Drain + Open Space");
  s = s.replace(/(Construction\s+of\s+)?Internal\s+Cement\s+concrete\s+road(s)?\s+at\s+/gi, "Internal CC Roads – ");
  // Keep explicit titles like "Cement Road – ..." as provided
  s = s.replace(/\s*–\s*/g, " – ");
  s = s.replace(/\s+and\s+/gi, " & ");
  if (s.length > 68) s = s.slice(0, 65).trimEnd() + "…";
  return s;
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const key = mapSlugToKey(category);
  if (!key) return <div className="mx-auto max-w-7xl px-5 py-16">Unknown category.</div>;
  const list = projectsByCategory[key];

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-10">
      <header className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-[#0b1e3f]">
            <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
            <h1 className="text-xl font-semibold uppercase tracking-[0.21em] sm:text-2xl">{labelMap[key]}</h1>
          </div>
          <p className="text-xs text-[#405170]">Representative list of projects delivered by BBD Infra.</p>
        </div>
        <Link href="/projects" className="text-sm font-semibold text-[var(--bbd-primary)] hover:text-[var(--bbd-accent)]">← All Projects</Link>
      </header>

      {(() => {
        const norm = (s: string) =>
          s
            .toLowerCase()
            .replace(/[–—]/g, "-")
            .replace(/[^a-z0-9\-\s&()]/g, "")
            .replace(/\s+/g, " ")
            .trim();
        const simple = (s: string) =>
          s
            .toLowerCase()
            .replace(/[–—-]/g, "")
            .replace(/[^a-z0-9]/g, "");

        const deliveredPatterns: Record<string, string[]> = {
          roads_highways: [
            "internal cc roads - bagulkhed area",
            "cement road - sarkari godown",
            "cc roads - forest & village areas",
            "cc road - minority colony",
            "internal cc roads - dongaon area",
          ],
          water_supply: [
            "churni water supply scheme",
            "wani amrut 2.0 water supply scheme",
            "daund water supply scheme - part 1 (amrut 2.0)",
            "daund water supply scheme - part 2 (amrut 2.0)",
          ],
          urban_infra: [
            "informatory sign boards - lonar city",
            "open space development - gomukh dhar lonar",
            "furniture & electrification - study center lonar",
            "sabha mandap - datta mandir",
            "nagri soyi suvidha yojna - mehkar",
          ],
        };

        const patterns = deliveredPatterns[key] ?? null;
        let deliveredRaw = list;
        let ongoingRaw: typeof list = [];
        if (patterns) {
          deliveredRaw = list.filter((p) => {
            const t = norm(makeShortTitle(p.title));
            const ts = simple(t);
            return patterns.some((pat) => ts.includes(simple(pat)) || t.includes(pat));
          });
          ongoingRaw = list.filter((p) => {
            const t = norm(makeShortTitle(p.title));
            const ts = simple(t);
            return !patterns.some((pat) => ts.includes(simple(pat)) || t.includes(pat));
          });
        } else {
          // Default: show all under Ongoing if no explicit patterns
          ongoingRaw = list;
          deliveredRaw = [];
        }

        const toDisplay = (arr: typeof list) =>
          arr.map<DisplayProject>((p) => ({ title: makeShortTitle(p.title).toUpperCase(), district: p.district }));

        return <ProjectTabs ongoing={toDisplay(ongoingRaw)} delivered={toDisplay(deliveredRaw)} />;
      })()}
    </div>
  );
}
