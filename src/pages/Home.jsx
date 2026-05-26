import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, GraduationCap, Mail, Phone, MapPin, Send } from "lucide-react";
import * as Icons from "lucide-react";
import React from "react";

import personal from "@/data/personal.json";
import skills from "@/data/skills.json";
import education from "@/data/education.json";
import experience from "@/data/experience.json";
import technologies from "@/data/technologies.json";
import projects from "@/data/projects.json";
import contact from "@/data/contact.json";
import socialLinks from "@/data/socialLinks.json";

import { AnimatedButton } from "@/components/AnimatedButton";
import { SocialLinks } from "@/components/SocialLinks";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionDivider } from "@/components/SectionDivider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TimelineCard } from "@/components/TimelineCard";
import { TechnologyCard } from "@/components/TechnologyCard";
import { ProjectCard } from "@/components/ProjectCard";

/* ─────────────── HERO ─────────────── */
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="text-center max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm uppercase tracking-[0.3em] text-primary mb-6"
        >
          Welcome to my portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          {personal.firstName}{" "}
          <span className="text-gradient">{personal.highlightName}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {personal.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <AnimatedButton to="/projects" variant="primary" icon={<ArrowRight size={17} />}>
            {personal.ctaPrimary}
          </AnimatedButton>
          <AnimatedButton to="/contact" variant="outline">
            {personal.ctaSecondary}
          </AnimatedButton>
        </motion.div>
        <SocialLinks className="justify-center mt-12" />
      </div>
    </section>
  );
}

/* ─────────────── OVERVIEW ─────────────── */
function OverviewSection() {
  return (
    <section id="overview" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
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
              <h3 className="text-2xl font-bold">Professional Bio</h3>
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
              <h3 className="text-2xl font-bold">Core Skills</h3>
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
          <h3 className="text-3xl font-bold">Education</h3>
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
                  <h4 className="text-lg font-bold">{edu.degree}</h4>
                  <p className="text-primary font-medium mt-1">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground mt-2">{edu.score}</p>
                </div>
                <span className="text-xs px-3 py-1.5 rounded-full bg-secondary/60 border border-border text-muted-foreground">{edu.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── EXPERIENCE ─────────────── */
function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Work" highlight="Experience" subtitle="A journey through the roles that shaped my craft." />
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0" />
          <div className="space-y-16">
            {experience.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── TECHNOLOGIES ─────────────── */
function TechnologiesSection() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(technologies.map((t) => t.category)))],
    []
  );
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? technologies : technologies.filter((t) => t.category === active);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const t of filtered) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category).push(t);
    }
    return map;
  }, [filtered]);

  return (
    <section id="technologies" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Technologies"
          highlight="& Skills"
          subtitle="A comprehensive overview of my technical expertise and proficiency levels"
        />
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                active === c
                  ? "bg-primary text-primary-foreground shadow-[0_0_24px_oklch(0.78_0.16_220/0.5)]"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="space-y-12">
          {Array.from(grouped.entries()).map(([category, items]) => (
            <div key={category}>
              {active === "All" && (
                <h3 className="text-2xl font-bold mb-6 text-foreground/90">{category}</h3>
              )}
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {items.map((t, i) => (
                  <TechnologyCard key={t.name} tech={t} index={i} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── PROJECTS ─────────────── */
function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Featured"
          highlight="Projects"
          subtitle="A showcase of recent work and side projects demonstrating various technical skills and creative solutions"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CONTACT ─────────────── */
const infoItems = [
  { label: "Email", value: contact.email, icon: Mail },
  { label: "Phone", value: contact.phone, icon: Phone },
  { label: "Location", value: contact.location, icon: MapPin },
];

const Field = React.forwardRef(({ label, type = "text", placeholder }, ref) => {
  return (
    <div>
      <label className="text-sm font-semibold mb-2 block">{label} *</label>
      <input
        ref={ref}
        required
        type={type}
        placeholder={placeholder}
        className="w-full bg-input/40 border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
      />
    </div>
  );
});
Field.displayName = "Field";

function ContactSection() {
  const [sent, setSent] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    const name = nameRef.current?.value ?? "";
    const senderEmail = emailRef.current?.value ?? "";
    const subject = subjectRef.current?.value ?? "";
    const message = messageRef.current?.value ?? "";

    const mailtoSubject = encodeURIComponent(subject || `Message from ${name}`);
    const mailtoBody = encodeURIComponent(
      `Hi Naveenkumar,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${senderEmail}`
    );

    const mailtoUrl = `mailto:${contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    const anchor = document.createElement("a");
    anchor.href = mailtoUrl;
    anchor.click();

    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <section id="contact" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={contact.heading.split(" ")[0]}
          highlight={contact.heading.split(" ").slice(1).join(" ")}
          subtitle={contact.subheading}
        />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field ref={nameRef} label="Name" placeholder="Your name" />
              <Field ref={emailRef} label="Email" type="email" placeholder="your@email.com" />
            </div>
            <Field ref={subjectRef} label="Subject" placeholder="What's this about?" />
            <div>
              <label className="text-sm font-semibold mb-2 block">Message *</label>
              <textarea
                ref={messageRef}
                required
                rows={6}
                placeholder="Tell me more about your project..."
                className="w-full bg-input/40 border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              />
            </div>
            <AnimatedButton type="submit" variant="primary" icon={<Send size={16} />} className="w-full">
              {sent ? "Opening Mail App..." : "Send Message"}
            </AnimatedButton>
          </motion.form>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-7"
            >
              <h3 className="text-xl font-bold mb-5">Contact Information</h3>
              <div className="space-y-5">
                {infoItems.map((it) => (
                  <div key={it.label} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl grid place-items-center bg-linear-to-br from-primary to-blue-500 text-primary-foreground shrink-0">
                      <it.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{it.label}</p>
                      <p className="text-sm font-medium">{it.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-3xl p-7"
            >
              <h3 className="text-xl font-bold mb-5">Connect With Me</h3>
              <div className="space-y-2">
                {socialLinks.map((s) => {
                  const Icon =
                    Icons[s.icon] ?? Icons.Link;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/40 border border-border hover:border-primary/60 hover:text-primary transition-all"
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{s.name}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── HOME (FULL PAGE) ─────────────── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <OverviewSection />
      <SectionDivider />
      <ExperienceSection />
      <SectionDivider />
      <TechnologiesSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <ContactSection />
      <ScrollToTop />
    </>
  );
}
