import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, CheckCircle2, BadgeCheck } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import certifications from "@/data/certifications.json";

/* ── Color map ─────────────────────────────────────── */
const COLOR = {
  primary: {
    icon: "var(--primary)",
    soft: "var(--primary-glow)",
    border: "oklch(from var(--color-primary) l c h / 20%)",
    badge: "badge-primary",
  },
  accent: {
    icon: "var(--accent)",
    soft: "var(--accent-soft)",
    border: "oklch(from var(--color-accent) l c h / 20%)",
    badge: "badge-accent",
  },
  teal: {
    icon: "var(--teal)",
    soft: "var(--teal-soft)",
    border: "oklch(from var(--teal) l c h / 20%)",
    badge: "badge-teal",
  },
  amber: {
    icon: "var(--amber)",
    soft: "var(--amber-soft)",
    border: "oklch(from var(--amber) l c h / 20%)",
    badge: "badge-amber",
  },
};

function CertCard({ cert, index }) {
  const colors = COLOR[cert.color] || COLOR.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="card card-hover cert-card p-7 flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl grid place-items-center shrink-0 overflow-hidden"
          style={{ background: colors.soft }}
        >
          {cert.badge ? (
            <img
              src={cert.badge}
              alt={cert.issuerShort}
              className="w-8 h-8 object-contain"
              loading="lazy"
            />
          ) : (
            <Award size={24} style={{ color: colors.icon }} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Status */}
          <div className="flex items-center gap-2 mb-1.5">
            <CheckCircle2 size={13} style={{ color: colors.icon }} />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: colors.icon }}
            >
              {cert.status === "completed" ? "Certified" : "In Progress"}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-bold text-base leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {cert.title}
          </h3>

          {/* Issuer + Date */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <BadgeCheck size={12} style={{ color: colors.icon }} />
              {cert.issuer}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar size={12} />
              {cert.date}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {cert.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {cert.skills.map((s) => (
          <span key={s} className="badge badge-neutral text-xs">
            {s}
          </span>
        ))}
      </div>

      {/* CTA */}
      {cert.credential && (
        <div className="pt-1">
          <a
            href={cert.credential}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline text-xs py-2 px-4"
            aria-label={`View credential for ${cert.title}`}
          >
            View Credential
            <ExternalLink size={13} />
          </a>
        </div>
      )}
    </motion.div>
  );
}

export default function CertificationsPage() {
  return (
    <PageShell>
      {/* Header */}
      <div className="mb-16">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="section-label"
          aria-hidden="true"
        >
          Credentials
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Certifications &{" "}
          <span className="text-gradient">Achievements</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground max-w-xl"
        >
          Verified credentials from recognised institutions that reflect my commitment to
          continuous learning and technical excellence.
        </motion.p>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="grid grid-cols-3 gap-4 mb-14 max-w-lg"
      >
        {[
          { label: "Certificates", value: certifications.length },
          { label: "NPTEL Courses", value: certifications.filter(c => c.issuerShort === "NPTEL").length },
          { label: "Industry Certs", value: certifications.filter(c => c.issuerShort !== "NPTEL").length },
        ].map((stat) => (
          <div key={stat.label} className="card p-4 text-center">
            <p className="text-3xl font-extrabold text-gradient" style={{ fontFamily: "var(--font-display)" }}>
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {certifications.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} index={i} />
        ))}
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xs text-muted-foreground text-center mt-14"
      >
        Credentials are continuously updated as new certifications are completed.
      </motion.p>
    </PageShell>
  );
}