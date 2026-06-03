import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import socialLinks from "@/data/socialLinks.json";

export function SocialLinks({ size = 20, className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map((link, i) => {
        const Icon = Icons[link.icon] || Icons.Link;
        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.07 }}
            whileHover={{ scale: 1.15, y: -3 }}
            className="w-11 h-11 grid place-items-center rounded-full glass-card text-muted-foreground hover:text-primary hover:glow-border transition-colors"
            aria-label={link.name}
          >
            <Icon size={size} />
          </motion.a>
        );
      })}
    </div>
  );
}
