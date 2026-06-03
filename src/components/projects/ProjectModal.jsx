import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ExternalLink, Github, Zap, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function ProjectModal({ project, onClose }) {
  const { theme } = useTheme();

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  const isDark = 
    theme === "dark" || 
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
  const projectImage = project.images 
    ? (isDark ? project.images.dark : project.images.light) 
    : project.image;

  const hasLive = Boolean(project.liveUrl);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-xl z-0"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-2xl md:rounded-4xlborder border-zinc-200 dark:border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-10 flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-none]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/10 dark:bg-black/50 text-zinc-800 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/20 dark:hover:bg-black/80 transition-colors backdrop-blur-md border border-black/10 dark:border-white/10"
        >
          <X size={20} />
        </button>

        {/* Top Section: Banner */}
        <div className="relative w-full aspect-video md:aspect-21/9 bg-linear-to-b from-zinc-100 via-white to-zinc-50 dark:from-zinc-950 dark:via-black dark:to-zinc-900 overflow-hidden border-b border-zinc-200 dark:border-white/5 shrink-0">
          {projectImage && (
            <img 
              src={projectImage} 
              alt={project.title} 
              className="w-full h-full object-cover object-top"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-white via-white/60 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/60 dark:to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col justify-end">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </motion.h2>
            {project.tagline && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-zinc-600 dark:text-white/80 font-medium"
              >
                {project.tagline}
              </motion.p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-10 flex flex-col gap-10">
          
          {/* Overview */}
          {project.overview && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Overview</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                {project.overview}
              </p>
            </motion.div>
          )}

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-default border shadow-sm hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)] bg-zinc-100 border-zinc-200 text-zinc-800 hover:bg-violet-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-violet-900/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col gap-3"
              >
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Challenges Faced</h3>
                {project.challenges.map((challenge, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl transition-colors border bg-orange-50 border-orange-200 text-zinc-800 dark:bg-orange-950/30 dark:border-orange-500/20 dark:text-zinc-300">
                    <Zap className="text-amber-500 shrink-0 mt-0.5" size={18} />
                    <span className="text-sm leading-relaxed">{challenge}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* What I Learned */}
            {project.learned && project.learned.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-3"
              >
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">What I Learned</h3>
                {project.learned.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl transition-colors border bg-emerald-50 border-emerald-200 text-zinc-800 dark:bg-green-950/30 dark:border-green-500/20 dark:text-zinc-300">
                    <CheckCircle2 className="text-emerald-500 dark:text-green-500 shrink-0 mt-0.5" size={18} />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-200 dark:border-white/10 mt-2"
          >
            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm md:text-base font-bold rounded-xl transition-all hover:-translate-y-1 shadow-sm bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200"
              >
                <ExternalLink size={20} />
                View Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm md:text-base font-bold rounded-xl transition-all hover:-translate-y-1 shadow-sm border bg-zinc-100 border-zinc-200 text-zinc-900 hover:bg-zinc-200 dark:bg-secondary/50 dark:border-white/10 dark:text-foreground dark:hover:bg-white/10"
              >
                <Github size={20} />
                GitHub Repository
              </a>
            )}
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
