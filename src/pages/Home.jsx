import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, User, Briefcase, Code2, FolderKanban,
  Award, Mail, Github, Linkedin, Instagram, ChevronRight
} from "lucide-react";
import personal from "@/data/personal.json";
import projects from "@/data/projects.json";
import experience from "@/data/experience.json";
import technologies from "@/data/technologies.json";
import socialLinks from "@/data/socialLinks.json";
import { ScrollToTop } from "@/components/ScrollToTop";
import TechnologySection from "@/components/TechnologySection";
import HeroProfile from "@/components/HeroProfile";
import HeroSection from "@/components/HeroSection";
import ResumeCard from "@/components/ResumeCard";

/* ── Helpers ───────────────────────────────────────── */
const ICON_MAP = { Github, Linkedin, Instagram, Mail };

const SECTION_CARDS = [
  {
    to: "/overview",
    icon: User,
    label: "Overview",
    color: "var(--primary)",
    colorSoft: "var(--primary-glow)",
    description: "Who I am, my education background, and the core skills that drive my work as a full-stack developer.",
    stat: "B.E. CCE · 2028",
  },
  {
    to: "/experience",
    icon: Briefcase,
    label: "Experience",
    color: "var(--accent)",
    colorSoft: "var(--accent-soft)",
    description: "Internships at IIT Ropar (NPTEL MERN Stack) and Vectra Technosoft (RHEL + Docker containerization).",
    stat: `${experience.length} internships`,
  },
  {
    to: "/technologies",
    icon: Code2,
    label: "Technologies",
    color: "var(--teal)",
    colorSoft: "var(--teal-soft)",
    description: "A full snapshot of languages, frameworks, databases, DevOps tools, and design technologies I use.",
    stat: `${technologies.length} technologies`,
  },
  {
    to: "/projects",
    icon: FolderKanban,
    label: "Projects",
    color: "var(--amber)",
    colorSoft: "var(--amber-soft)",
    description: "Real-world applications built with modern stacks — from quiz platforms to containerised full-stack apps.",
    stat: `${projects.length} projects`,
  },
  {
    to: "/certifications",
    icon: Award,
    label: "Certifications",
    color: "var(--primary)",
    colorSoft: "var(--primary-glow)",
    description: "NPTEL, RHCSA, and other credentials that validate my technical expertise and continuous learning.",
    stat: "Verified credentials",
  },
  {
    to: "/contact",
    icon: Mail,
    label: "Contact",
    color: "var(--accent)",
    colorSoft: "var(--accent-soft)",
    description: "Have a project idea, collaboration proposal, or just want to say hi? Drop me a message anytime.",
    stat: "Open to opportunities",
  },
];

/* ── Section preview card ────────────────────────── */
function SectionCard({ card, index }) {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link to={card.to} className="block h-full" aria-label={`Go to ${card.label}`}>
        <div className="card card-hover section-preview-card h-full p-6 flex flex-col gap-4">
          {/* Icon + arrow */}
          <div className="flex items-start justify-between">
            <div
              className="w-11 h-11 rounded-xl grid place-items-center"
              style={{ background: card.colorSoft }}
            >
              <Icon size={20} style={{ color: card.color }} strokeWidth={2} />
            </div>
            <ChevronRight
              size={18}
              className="arrow-icon mt-0.5"
              style={{ color: card.color }}
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: card.color }}
            >
              {card.label}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {card.description}
            </p>
          </div>

          {/* Stat chip */}
          <div>
            <span
              className="badge"
              style={{
                background: card.colorSoft,
                color: card.color,
                border: `1px solid ${card.color}30`,
              }}
            >
              {card.stat}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Featured project mini-card ───────────────────── */
function ProjectMini({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card card-hover p-5 flex items-center gap-4"
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center shrink-0">
        <FolderKanban size={18} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{project.title}</p>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{project.description}</p>
      </div>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        className="btn btn-ghost p-2 rounded-lg shrink-0"
        aria-label={`View ${project.title} on GitHub`}
        onClick={(e) => e.stopPropagation()}
      >
        <Github size={16} />
      </a>
    </motion.div>
  );
}

/* ── Main Home Page ───────────────────────────────── */
export default function Home() {
  return (
    <>
      <div className="min-h-dvh relative overflow-hidden">
        {/* Background mesh */}
        <div className="hero-mesh" aria-hidden="true" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            opacity: 0.18,
          }}
          aria-hidden="true"
        />

        {/* ── HERO ── */}
        <HeroSection />
      </div>

      {/* ── TECHNOLOGY SECTION ── */}
      <TechnologySection />

      {/* ── SECTION GRID ── */}
      <section className="py-24 px-6" aria-labelledby="explore-heading">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="section-label" aria-hidden="true">Explore</span>
            <h2
              id="explore-heading"
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What I've been{" "}
              <span className="text-gradient">building</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg">
              Click any card to dive into that section of my portfolio.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTION_CARDS.map((card, i) => (
              <SectionCard key={card.to} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-20 px-6 bg-secondary/30" aria-labelledby="projects-heading">
        <div className="page-container">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="section-label" aria-hidden="true">Featured</span>
              <h2
                id="projects-heading"
                className="text-3xl md:text-4xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Recent Projects
              </h2>
            </div>
            <Link to="/projects" className="btn btn-outline text-sm">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-4 max-w-2xl">
            {projects.map((p, i) => (
              <ProjectMini key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RESUME DOWNLOAD ── */}
      <ResumeCard />

      {/* ── QUICK CONTACT CTA ── */}
      <section className="py-24 px-6" aria-labelledby="cta-heading">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="card text-center py-16 px-8 relative overflow-hidden"
          >
            {/* Decorative glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, var(--primary-glow) 0%, transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <span className="section-label justify-center" aria-hidden="true">Let's connect</span>
              <h2
                id="cta-heading"
                className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Got a project in mind?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                I'm actively looking for internships and collaboration opportunities. Let's build something great together.
              </p>
              <Link to="/contact" className="btn btn-primary text-base px-8 py-4">
                Get In Touch <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollToTop />
    </>
  );
}