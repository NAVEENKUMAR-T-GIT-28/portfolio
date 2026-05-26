import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Code2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import personal from "@/data/personal.json";
import skills from "@/data/skills.json";
import education from "@/data/education.json";

function EduCard({ edu, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card card-hover p-6 flex gap-5"
    >
      <div className="flex flex-col items-center gap-2 shrink-0">
        <div className="timeline-dot" />
        {index < education.length - 1 && (
          <div className="w-px flex-1 bg-linear-to-b from-primary/40 to-transparent" />
        )}
      </div>
      <div className="pb-4 flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <h3
            className="font-bold text-base leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {edu.degree}
          </h3>
          <span className="badge badge-neutral shrink-0">{edu.date}</span>
        </div>
        <p className="text-primary font-semibold text-sm mb-1">{edu.institution}</p>
        <p className="text-xs text-muted-foreground font-medium">{edu.score}</p>
      </div>
    </motion.div>
  );
}

export default function Overview() {
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
          About me
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          A quick <span className="text-gradient">overview</span>
        </motion.h1>
      </div>

      {/* Bio + Skills */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="card p-7 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl grid place-items-center bg-primary/10">
              <Sparkles size={18} className="text-primary" />
            </div>
            <h2
              className="font-bold text-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Professional Bio
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{personal.bio}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="card p-7 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl grid place-items-center"
              style={{ background: "var(--amber-soft)" }}>
              <Code2 size={18} style={{ color: "var(--amber)" }} />
            </div>
            <h2
              className="font-bold text-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Core Skills
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="tech-pill">{s}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl grid place-items-center"
            style={{ background: "var(--teal-soft)" }}>
            <GraduationCap size={18} style={{ color: "var(--teal)" }} />
          </div>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Education
          </h2>
        </div>
      </motion.div>

      <div className="space-y-4">
        {education.map((edu, i) => (
          <EduCard key={edu.degree} edu={edu} index={i} />
        ))}
      </div>
    </PageShell>
  );
}