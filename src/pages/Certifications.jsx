import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award, Calendar, ExternalLink, CheckCircle2,
  BadgeCheck, Clock, X, ZoomIn
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import certifications from "@/data/certifications.json";

const industry = certifications.filter(c => c.tier === "industry");
const nptel    = certifications.filter(c => c.tier === "nptel");
const other    = certifications.filter(c => c.tier === "other");

/* ── Image lightbox ─────────────────────────────── */
function Lightbox({ src, alt, onClose }) {
  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="relative max-w-3xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <img src={src} alt={alt} className="w-full rounded-2xl shadow-2xl" />
      </motion.div>
    </div>
  );
}

/* ── Certificate image thumbnail ─────────────────── */
function CertImage({ cert, className = "" }) {
  const [lightbox, setLightbox] = useState(false);

  if (!cert.image) return null;

  return (
    <>
      <div
        className={`relative group cursor-zoom-in overflow-hidden rounded-xl border border-border ${className}`}
        onClick={() => setLightbox(true)}
      >
        <img
          src={cert.image}
          alt={`${cert.title} certificate`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={e => { e.target.parentElement.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <AnimatePresence>
        {lightbox && (
          <Lightbox src={cert.image} alt={cert.title} onClose={() => setLightbox(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Industry hero card ─────────────────────────── */
function IndustryCard({ cert }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl border border-border bg-card overflow-hidden"
    >
      {/* Red left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-3xl" />

      <div className="flex flex-col md:flex-row gap-0">
        {/* Left: details */}
        <div className="flex-1 p-7 md:p-10 pl-9 md:pl-12">
          {/* Issuer + status */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
              <img src={cert.badge} alt={cert.issuerShort} className="w-7 h-7 object-contain" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-red-500">
                {cert.issuer}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 size={12} className="text-green-500" />
                <span className="text-xs text-green-500 font-semibold">Certified</span>
              </div>
            </div>
            {/* Perfect score badge */}
            {cert.score && cert.score === cert.total && (
              <span className="ml-auto px-3 py-1.5 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                ★ {cert.score} / {cert.total} Perfect Score
              </span>
            )}
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3" style={{ fontFamily: "var(--font-display)" }}>
            {cert.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-lg">
            {cert.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
            <Calendar size={13} />
            <span>{cert.date}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {cert.skills.map(s => (
              <span key={s} className="px-3 py-1.5 text-xs font-semibold rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
                {s}
              </span>
            ))}
          </div>

          {cert.credential && (
            <a
              href={cert.credential}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-xl border border-border text-sm font-semibold hover:border-red-500/50 hover:text-red-500 transition-colors"
            >
              <ExternalLink size={14} /> View Credential
            </a>
          )}
        </div>

        {/* Right: certificate image */}
        {cert.image && (
          <div className="md:w-72 shrink-0 p-4 md:p-6 flex items-center">
            <CertImage cert={cert} className="w-full aspect-4/3" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── NPTEL card ──────────────────────────────────── */
function NptelCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="relative rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
    >
      {/* Blue left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-2xl" />

      <div className="p-6 pl-8 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <img src={cert.badge} alt={cert.issuerShort} className="w-6 h-6 object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-0.5">
              {cert.issuer}
            </p>
            <h4 className="font-bold text-sm leading-snug" style={{ fontFamily: "var(--font-display)" }}>
              {cert.title}
            </h4>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar size={11} />{cert.date}</span>
          {cert.duration && <span className="flex items-center gap-1"><Clock size={11} />{cert.duration}</span>}
          {cert.score
            ? <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 font-semibold">
                {cert.score} / {cert.total}
              </span>
            : <span className="flex items-center gap-1 text-green-500 font-semibold">
                <CheckCircle2 size={11} /> Completed
              </span>
          }
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">{cert.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {cert.skills.map(s => (
            <span key={s} className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-secondary text-muted-foreground border border-border">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Certificate image at bottom */}
      {cert.image && (
        <div className="px-6 pb-5 pl-8">
          <CertImage cert={cert} className="w-full aspect-video" />
        </div>
      )}
    </motion.div>
  );
}

/* ── Other / compact card ────────────────────────── */
function OtherCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg overflow-hidden bg-secondary border border-border flex items-center justify-center shrink-0">
          {cert.badge
            ? <img src={cert.badge} alt={cert.issuerShort} className="w-5 h-5 object-contain" />
            : <Award size={16} className="text-muted-foreground" />
          }
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{cert.issuerShort}</p>
          <h4 className="text-xs font-bold leading-snug">{cert.title}</h4>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <Calendar size={10} />
        <span>{cert.date}</span>
        {cert.score && (
          <span className="ml-auto font-semibold">{cert.score}/{cert.total}</span>
        )}
      </div>

      {cert.image && <CertImage cert={cert} className="w-full aspect-video" />}
    </motion.div>
  );
}

/* ── Stats bar ───────────────────────────────────── */
function StatsBar() {
  const stats = [
    { value: certifications.length, label: "Total certifications" },
    { value: industry.length, label: "Industry certified" },
    { value: nptel.length, label: "NPTEL courses" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="grid grid-cols-3 gap-4 max-w-sm mb-14"
    >
      {stats.map(s => (
        <div key={s.label} className="bg-secondary/50 rounded-2xl p-4 text-center border border-border">
          <p className="text-3xl font-extrabold text-gradient" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
          <p className="text-[10px] text-muted-foreground mt-1 font-medium">{s.label}</p>
        </div>
      ))}
    </motion.div>
  );
}

/* ── Section heading ─────────────────────────────── */
function SectionHead({ label, title, subtitle }) {
  return (
    <div className="mb-6">
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-2">
        <span className="inline-block w-4 h-px bg-current" />
        {label}
      </span>
      <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}

/* ── Page ────────────────────────────────────────── */
export default function CertificationsPage() {
  return (
    <PageShell>
      <div className="mb-14">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="section-label"
        >
          Credentials
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Certifications &{" "}
          <span className="text-gradient">Achievements</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-xl"
        >
          Verified credentials from recognised institutions — industry certifications, academic courses, and specialised training.
        </motion.p>
      </div>

      <StatsBar />

      {/* INDUSTRY SECTION */}
      {industry.length > 0 && (
        <section className="mb-16">
          <SectionHead
            label="Industry certification"
            title="Red Hat · RHCSA"
            subtitle="Vendor-certified, exam-validated credentials from industry organisations."
          />
          <div className="flex flex-col gap-5">
            {industry.map(cert => <IndustryCard key={cert.id} cert={cert} />)}
          </div>
        </section>
      )}

      {/* NPTEL SECTION */}
      {nptel.length > 0 && (
        <section className="mb-16">
          <SectionHead
            label="Academic · NPTEL"
            title="IIT Courses"
            subtitle="Courses completed through NPTEL, the National Programme on Technology Enhanced Learning by IITs."
          />
          <div className="grid sm:grid-cols-2 gap-5">
            {nptel.map((cert, i) => <NptelCard key={cert.id} cert={cert} index={i} />)}
          </div>
        </section>
      )}

      {/* OTHER SECTION — only renders if data exists */}
      {other.length > 0 && (
        <section className="mb-16">
          <SectionHead
            label="Other certifications"
            title="Additional credentials"
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {other.map((cert, i) => <OtherCard key={cert.id} cert={cert} index={i} />)}
          </div>
        </section>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs text-muted-foreground text-center mt-4"
      >
        Credentials are continuously updated as new certifications are completed.
      </motion.p>
    </PageShell>
  );
}