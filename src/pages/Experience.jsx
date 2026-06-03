import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import Timeline from "@/components/timeline/Timeline";

export default function ExperiencePage() {
  return (
    <PageShell>
      <div className="mb-10">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="section-label"
          aria-hidden="true"
        >
          Career & Education
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          My <span className="text-gradient">Journey</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground"
        >
          A timeline of my professional experience and academic background.
        </motion.p>
      </div>

      <div className="w-full">
        <Timeline />
      </div>
    </PageShell>
  );
}