import Link from "next/link";
import { projectsByCategory } from "../../data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const mapSlugToKey = (slug: string) => {
  const s = (slug || "").toLowerCase();
  const direct: Record<string, "roads_highways"|"water_supply"|"urban_infra"|"renewable_solar"> = {
    "roads-highways": "roads_highways",
    "water-supply": "water_supply",
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
  water_supply: "Water Supply",
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

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
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

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p, idx) => {
          const title = makeShortTitle(p.title);
          const displayType = p.type ?? labelMap[key];
          return (
            <article key={`${key}-${idx}`} className="rounded-xl border border-[#e6eaf4] bg-white p-5 shadow-[0_12px_36px_-28px_rgba(11,61,145,0.35)]">
              <div className="space-y-2">
                <p className="text-xs text-[#405170]"><span className="font-semibold text-[#0b1e3f]">Title:</span> {title}</p>
                <p className="text-xs text-[#405170]"><span className="font-semibold text-[#0b1e3f]">Type:</span> {displayType}</p>
                <p className="text-xs text-[#405170]"><span className="font-semibold text-[#0b1e3f]">District:</span> {p.district}</p>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
