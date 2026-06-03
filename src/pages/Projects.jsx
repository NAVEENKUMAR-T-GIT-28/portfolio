import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { PageShell } from "@/components/layout/PageShell";
import projects from "@/data/projects.json";

import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

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
          Portfolio
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Featured <span className="text-gradient">Projects</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground max-w-xl"
        >
          Real-world applications built with modern stacks and deployed for production use.
        </motion.p>
      </div>

      <div className="flex flex-col gap-8 md:gap-12 max-w-5xl relative z-10">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onClick={setSelectedProject} />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </PageShell>
  );
}