import { motion } from "framer-motion";
import { Sparkles, Code2, GraduationCap } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import personal from "@/data/personal.json";
import skills from "@/data/skills.json";
import education from "@/data/education.json";

export default function Overview() {
  return (
    <PageShell>
      <SectionHeading title="About" highlight="Me" />

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-card glow-hover rounded-3xl p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl grid place-items-center bg-gradient-to-br from-primary to-blue-500 text-primary-foreground">
              <Sparkles size={22} />
            </div>
            <h2 className="text-2xl font-bold">Professional Bio</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">{personal.bio}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="glass-card glow-hover rounded-3xl p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl grid place-items-center bg-gradient-to-br from-orange-500 to-amber-400 text-background">
              <Code2 size={22} />
            </div>
            <h2 className="text-2xl font-bold">Core Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="px-3.5 py-1.5 text-sm rounded-full bg-secondary/60 border border-border text-foreground">{s}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl grid place-items-center bg-gradient-to-br from-cyan-400 to-blue-500 text-background">
          <GraduationCap size={22} />
        </div>
        <h2 className="text-3xl font-bold">Education</h2>
      </div>
      <div className="space-y-4">
        {education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-6 border-l-4 border-l-primary glow-hover"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">{edu.degree}</h3>
                <p className="text-primary font-medium mt-1">{edu.institution}</p>
                <p className="text-sm text-muted-foreground mt-2">{edu.score}</p>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-full bg-secondary/60 border border-border text-muted-foreground">{edu.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
