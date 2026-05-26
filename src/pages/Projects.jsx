import { motion } from "framer-motion";
import { ExternalLink, Github, FolderKanban } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import projects from "@/data/projects.json";

function ProjectCard({ project, index }) {
  const hasLive = Boolean(project.liveUrl);
  const ACCENT = ["var(--primary)", "var(--accent)", "var(--teal)", "var(--amber)"];
  const color = ACCENT[index % ACCENT.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="card card-hover p-7 flex flex-col gap-5"
    >
      {/* Thumbnail placeholder */}
      <div
        className="rounded-xl h-36 flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, oklch(from ${color} l c h / 10%) 0%, oklch(from ${color} l c h / 4%) 100%)`,
          border: `1px solid oklch(from ${color} l c h / 20%)`,
        }}
        aria-hidden="true"
      >
        <FolderKanban size={40} style={{ color, opacity: 0.4 }} strokeWidth={1.5} />
        <span
          className="absolute bottom-3 right-4 text-5xl font-extrabold opacity-[0.06] select-none"
          style={{ fontFamily: "var(--font-display)", color }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Meta */}
      <div className="flex-1">
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="badge badge-neutral">{t}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        {hasLive && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary text-sm flex-1 py-2.5"
            aria-label={`View live demo of ${project.title}`}
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-center rounded-xl border transition-all duration-300 ${
              hasLive
                ? "w-11 h-11 border-border/80 bg-secondary/10 text-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 hover:shadow-glow"
                : "btn btn-outline flex-1 py-2.5 hover:shadow-glow"
            }`}
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <Github size={16} />
            {!hasLive && <span className="ml-2">View Source</span>}
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </PageShell>
  );
}