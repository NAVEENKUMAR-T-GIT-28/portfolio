import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import resumeData from "@/data/resume.json";

const iconMap = {
  download: Download
};

export default function ResumeCard() {
  const Icon = iconMap[resumeData.buttonIcon] || Download;

  return (
    <section className="py-12 px-6" aria-labelledby="resume-heading">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card card-hover relative overflow-hidden p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 group glass-card glow-border"
        >
          {/* Subtle background glow effect */}
          <div 
            className="absolute -inset-1 bg-linear-to-r from-primary/10 via-accent/10 to-teal/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" 
            aria-hidden="true" 
          />

          {/* Left Side */}
          <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left w-full">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 shadow-glow-sm">
              <FileText className="text-primary w-7 h-7" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h2 id="resume-heading" className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {resumeData.title}
              </h2>
              <p className="text-muted-foreground">
                {resumeData.subtitle}
              </p>
              
              <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-green-500/90 dark:text-green-400">
                  {resumeData.availability}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Button */}
          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <motion.a
              href={resumeData.resumePath}
              download
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary w-full md:w-auto px-8 py-4 flex items-center justify-center gap-3 text-lg group/btn relative overflow-hidden shadow-glow"
            >
              <motion.div
                 animate={{ y: [0, 3, 0] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                 <Icon className="w-5 h-5 transition-transform" />
              </motion.div>
              <span>{resumeData.buttonText}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
