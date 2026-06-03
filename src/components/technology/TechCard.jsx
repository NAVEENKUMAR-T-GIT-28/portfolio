import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";

export default function TechCard({ tech }) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = Icons[tech.icon] || Icons.Code;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col p-5 glass-card rounded-2xl shrink-0 w-64 overflow-hidden transition-colors duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] group"
    >
      <motion.div layout className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center shrink-0">
          {tech.imageUrl && !imgError ? (
            <img
              src={tech.imageUrl}
              alt={tech.name}
              className={`w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(255,255,255,0.15)] ${tech.invert ? 'dark:invert' : ''}`}
              onError={() => setImgError(true)}
            />
          ) : (
            <Icon size={24} color={tech.color} />
          )}
        </div>
        <span className="font-bold text-base tracking-wide text-foreground/90 group-hover:text-primary transition-colors">
          {tech.name}
        </span>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-4 overflow-hidden"
          >
            <div className="text-sm font-medium mb-1 flex justify-between">
              <span className="text-muted-foreground">{tech.proficiency || "Advanced"}</span>
              <span className="text-primary">{tech.level}%</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${tech.level}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-linear-to-r from-primary to-purple-500 rounded-full"
              />
            </div>
            
            {tech.usedIn && tech.usedIn.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider">Used in:</p>
                <ul className="text-sm space-y-1">
                  {tech.usedIn.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground/80 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/70">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
