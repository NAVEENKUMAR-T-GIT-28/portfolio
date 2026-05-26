import { motion } from "framer-motion";
import { Sparkles, Code2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import personal from "@/data/personal.json";
import skills from "@/data/skills.json";

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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center mt-8"
      >
        <Link 
          to="/experience" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
        >
          View Full Timeline <ArrowRight size={16} />
        </Link>
      </motion.div>
    </PageShell>
  );
}