import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useState } from "react";

export function TechnologyCard({ tech, index }) {
  const [imgError, setImgError] = useState(false);
  const Icon = Icons[tech.icon] || Icons.Code;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -6 }}
      className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center gap-3 glow-hover aspect-square"
    >
      <div className="w-24 h-24 grid place-items-center overflow-hidden">
        {tech.imageUrl && !imgError ? (
          <img
            src={tech.imageUrl}
            alt={tech.name}
            className={`w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] ${tech.invert ? 'dark:invert' : ''}`}
            onError={() => setImgError(true)}
          />
        ) : (
          <Icon size={56} color={tech.color} />
        )}
      </div>
      <span className="font-bold text-sm text-center tracking-wide text-foreground/90">{tech.name}</span>
    </motion.div>
  );
}
