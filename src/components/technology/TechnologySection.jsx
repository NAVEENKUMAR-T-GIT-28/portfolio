import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import technologies from "@/data/technologies.json";
import CategoryTabs from "./CategoryTabs";
import TechCard from "./TechCard";

export default function TechnologySection() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Extract unique categories and add 'All'
  const categories = useMemo(() => {
    const uniqueCats = new Set(technologies.map(t => t.category));
    return ["All", ...Array.from(uniqueCats)];
  }, []);

  const filteredTech = useMemo(() => {
    if (activeCategory === "All") return technologies;
    return technologies.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  // Duplicate enough times to fill the screen for seamless scrolling.
  const duplicatedTechs = useMemo(() => {
    let base = [...filteredTech];
    // Ensure we have enough items to fill a wide screen so the scroll loop is seamless
    while (base.length < 15) {
      base = [...base, ...filteredTech];
    }
    // Duplicate the final array to allow a seamless 50% translation loop
    return [...base, ...base];
  }, [filteredTech]);

  return (
    <section className="py-24 relative w-full overflow-hidden" aria-label="Featured Technologies">
      
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Tech <span className="text-gradient">Arsenal</span>
        </h2>
        <CategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
        />
      </div>

      <div className="relative w-full border-y border-border py-8 min-h-[160px]">
        {/* Frosted Edge Overlays */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />

        {/* Infinite scrolling track */}
        <div className="flex w-max overflow-visible group">
          <motion.div 
            layout
            className="flex gap-4 px-4 animate-scroll group-hover:[animation-play-state:paused]"
          >
            {duplicatedTechs.map((tech, index) => (
              <TechCard key={`${tech.name}-${index}`} tech={tech} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
