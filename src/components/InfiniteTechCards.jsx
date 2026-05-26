import React, { useState } from "react";
import * as Icons from "lucide-react";
import technologies from "@/data/technologies.json";

function TechCard({ tech }) {
  const [imgError, setImgError] = useState(false);
  const Icon = Icons[tech.icon] || Icons.Code;

  return (
    <div className="flex items-center gap-3 py-3 px-5 glass-card rounded-2xl shrink-0 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
      <div className="w-8 h-8 flex items-center justify-center shrink-0 overflow-hidden">
        {tech.imageUrl && !imgError ? (
          <img
            src={tech.imageUrl}
            alt={tech.name}
            className={`w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(255,255,255,0.15)] ${tech.invert ? 'dark:invert' : ''}`}
            onError={() => setImgError(true)}
          />
        ) : (
          <Icon size={20} color={tech.color} />
        )}
      </div>
      <span className="font-bold text-sm tracking-wide text-foreground/90 whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
}

export default function InfiniteTechCards() {
  // Duplicate the list of technologies to ensure seamless infinite scrolling
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <section className="relative w-full py-8 border-y border-border overflow-hidden" aria-label="Featured Technologies">
      {/* Frosted Edge Overlays for smooth entry and exit */}
      <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling track */}
      <div className="flex w-max overflow-hidden">
        <div className="flex gap-4 px-2 animate-scroll">
          {duplicatedTechs.map((tech, index) => (
            <TechCard key={`${tech.name}-${index}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
