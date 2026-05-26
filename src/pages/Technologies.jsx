import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { TechnologyCard } from "@/components/TechnologyCard";
import technologies from "@/data/technologies.json";

export default function TechPage() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(technologies.map((t) => t.category)))],
    []
  );
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? technologies : technologies.filter((t) => t.category === active);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const t of filtered) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category).push(t);
    }
    return map;
  }, [filtered]);

  return (
    <PageShell>
      <SectionHeading
        title="Technologies"
        highlight="& Skills"
        subtitle="A comprehensive overview of my technical expertise and proficiency levels"
      />
      <div className="flex flex-wrap justify-center gap-2 mb-14">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
              active === c
                ? "bg-primary text-primary-foreground shadow-[0_0_24px_oklch(0.78_0.16_220/0.5)]"
                : "glass-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-12">
        {Array.from(grouped.entries()).map(([category, items]) => (
          <div key={category}>
            {active === "All" && (
              <h3 className="text-2xl font-bold mb-6 text-foreground/90">{category}</h3>
            )}
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {items.map((t, i) => (
                <TechnologyCard key={t.name} tech={t} index={i} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
