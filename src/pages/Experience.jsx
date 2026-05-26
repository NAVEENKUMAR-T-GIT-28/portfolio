import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import experience from "@/data/experience.json";

const COLORS = ["primary", "accent", "teal", "amber"];
const COLOR_MAP = {
  primary: { bg: "var(--primary-glow)", text: "var(--primary)" },
  accent:  { bg: "var(--accent-soft)",  text: "var(--accent)" },
  teal:    { bg: "var(--teal-soft)",    text: "var(--teal)" },
  amber:   { bg: "var(--amber-soft)",   text: "var(--amber)" },
};

function ExpCard({ item, index }) {
  const col = COLOR_MAP[COLORS[index % COLORS.length]];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="card card-hover p-7 flex flex-col gap-5 relative"
    >
      {/* Accent line */}
      <div
        className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full"
        style={{ background: col.text, opacity: 0.6 }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-start gap-4 pl-4">
        <div
          className="w-12 h-12 rounded-2xl grid place-items-center shrink-0"
          style={{ background: col.bg }}
        >
          <Briefcase size={20} style={{ color: col.text }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-lg leading-tight mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item.role}
          </h3>
          <p className="font-semibold text-sm" style={{ color: col.text }}>
            {item.company}
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={11} /> {item.location}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar size={11} /> {item.date}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed pl-4">
        {item.description}
      </p>

      {/* Responsibilities */}
      <div className="pl-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: col.text }}>
          Key Responsibilities
        </p>
        <ul className="space-y-2" role="list">
          {item.responsibilities.map((r) => (
            <li key={r} className="flex gap-2.5 text-sm text-muted-foreground">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: col.text }}
                aria-hidden="true"
              />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-2 pl-4">
        {item.technologies.map((t) => (
          <span
            key={t}
            className="badge"
            style={{
              background: col.bg,
              color: col.text,
              border: `1px solid ${col.text}25`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ExperiencePage() {
  return (
    <PageShell>
      <div className="mb-14">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="section-label"
          aria-hidden="true"
        >
          Career
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Work <span className="text-gradient">Experience</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground"
        >
          Internships and real-world projects that shaped my skills.
        </motion.p>
      </div>

      <div className="space-y-6 max-w-3xl">
        {experience.map((item, i) => (
          <ExpCard key={i} item={item} index={i} />
        ))}
      </div>
    </PageShell>
  );
}