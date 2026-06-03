import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function TimelineCard({ item, index }) {
  const isLeft = index % 2 === 0;
  return (
    <div className="relative grid md:grid-cols-2 gap-8 items-center">
      {/* line dot */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_oklch(0.78_0.16_220/0.8)] z-10" />

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className={`glass-card glow-hover rounded-3xl p-7 ${isLeft ? "md:col-start-1" : "md:col-start-2"}`}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold">{item.role}</h3>
          <Briefcase className="text-primary" size={22} />
        </div>
        <p className="text-primary font-semibold">{item.company}</p>
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><MapPin size={13} />{item.location}</span>
          <span className="inline-flex items-center gap-1.5"><Calendar size={13} />{item.date}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{item.description}</p>
        <div className="mt-5">
          <p className="font-semibold text-sm mb-2">Key Responsibilities:</p>
          <ul className="space-y-1.5">
            {item.responsibilities.map((r) => (
              <li key={r} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary mt-1">•</span>{r}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
          {item.technologies.map((t) => (
            <span key={t} className="px-3 py-1 text-xs rounded-full bg-primary/10 border border-primary/30 text-primary">{t}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
