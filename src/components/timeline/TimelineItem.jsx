import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, Rocket, Calendar } from "lucide-react";

const iconMap = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  award: Award,
  rocket: Rocket,
};

export default function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0;
  const Icon = iconMap[item.icon] || Briefcase;

  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-12 ${isLeft ? "md:flex-row-reverse" : ""}`}>
      {/* Empty space for the other side on desktop */}
      <div className="hidden md:block w-5/12" />

      {/* Center timeline dot */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10 mt-6 md:mt-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="w-12 h-12 rounded-full bg-background border-[3px] border-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] relative group"
        >
          {/* Glowing pulse ring */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-50" />
          <Icon size={18} className="text-primary relative z-10" />
        </motion.div>
      </div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, y: 30, x: isLeft ? 20 : -20 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        className="w-full pl-16 md:pl-0 md:w-5/12 relative group"
      >
        <div className="p-6 md:p-8 rounded-2xl md:rounded-4xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(var(--primary-rgb),0.15)] overflow-hidden">
          
          {/* Subtle background gradient on hover */}
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-primary/10 text-primary uppercase tracking-wider w-fit shadow-sm">
                {item.type}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/5 shadow-sm">
                <Calendar size={13} />
                {item.date}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-extrabold text-foreground mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
              {item.title}
            </h3>
            <h4 className="text-sm md:text-base font-semibold text-primary/90 mb-4 tracking-wide">
              {item.subtitle}
            </h4>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
              {item.description}
            </p>

            {item.points && item.points.length > 0 && (
              <ul className="space-y-3 mb-6 bg-black/5 dark:bg-black/20 p-4 rounded-xl border border-zinc-200 dark:border-white/5">
                {item.points.map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2 opacity-70" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {item.technologies && item.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-200 dark:border-white/10">
                {item.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 text-[11px] font-bold tracking-wide rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors hover:bg-violet-100 dark:hover:bg-violet-900/40 cursor-default shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
