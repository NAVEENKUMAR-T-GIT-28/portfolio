import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import technologies from "@/data/technologies.json";
import { useState as useImgState } from "react";
import * as Icons from "lucide-react";

function TechChip({ tech }) {
  const [imgErr, setImgErr] = useState(false);
  const Icon = Icons[tech.icon] || Icons.Code;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card card-hover p-4 flex flex-col items-center gap-3 aspect-square justify-center cursor-default"
      role="listitem"
    >
      {/* Icon */}
      <div className="w-14 h-14 grid place-items-center">
        {tech.imageUrl && !imgErr ? (
          <img
            src={tech.imageUrl}
            alt={tech.name}
            className={`w-full h-full object-contain ${tech.invert ? "dark:invert" : ""}`}
            onError={() => setImgErr(true)}
            loading="lazy"
          />
        ) : (
          <Icon size={40} color={tech.color} strokeWidth={1.5} />
        )}
      </div>
      <span className="text-xs font-semibold text-center text-foreground/80 leading-tight">
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function TechPage() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(technologies.map((t) => t.category)))],
    []
  );
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? technologies
    : technologies.filter((t) => t.category === active);

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
      {/* Header */}
      <div className="mb-14">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="section-label"
          aria-hidden="true"
        >
          Stack
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Technologies <span className="text-gradient">&amp; Skills</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground"
        >
          {technologies.length} technologies across {categories.length - 1} categories.
        </motion.p>
      </div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25 }}
        className="flex flex-wrap gap-2 mb-12"
        role="tablist"
        aria-label="Filter by category"
      >
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            role="tab"
            aria-selected={active === c}
            className={`btn text-sm py-2 px-5 ${
              active === c ? "btn-primary" : "btn-outline"
            }`}
          >
            {c}
          </button>
        ))}
      </motion.div>

      {/* Grid by category */}
      <div className="space-y-12">
        <AnimatePresence mode="wait">
          {Array.from(grouped.entries()).map(([category, items]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {active === "All" && (
                <div className="flex items-center gap-3 mb-6">
                  <h2
                    className="text-lg font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {category}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                  <span className="badge badge-neutral">{items.length}</span>
                </div>
              )}
              <div
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
                role="list"
                aria-label={category}
              >
                {items.map((t, i) => (
                  <TechChip key={t.name} tech={t} />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}