import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card glow-hover rounded-3xl overflow-hidden flex flex-col"
    >
      <div className="aspect-16/10 relative overflow-hidden bg-linear-to-br from-primary/20 via-background to-blue-500/10 border-b border-border">
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-4xl font-bold text-gradient opacity-40">{project.title}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="px-3 py-1 text-xs rounded-full bg-secondary/60 text-muted-foreground border border-border">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <a href={project.liveUrl} target="_blank" rel="noreferrer"
             className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:shadow-[0_0_24px_oklch(0.78_0.16_220/0.5)] transition-all">
            <ExternalLink size={15} /> Live Demo
          </a>
          <a href={project.githubUrl} target="_blank" rel="noreferrer"
             className="w-11 h-11 flex items-center justify-center rounded-xl border border-border/80 bg-secondary/10 text-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 hover:shadow-glow transition-all duration-300">
            <Github size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
