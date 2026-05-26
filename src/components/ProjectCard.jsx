import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, FolderKanban } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function ProjectCard({ project, index, onClick }) {
  const cardRef = useRef(null);
  const { theme } = useTheme();

  // Framer Motion values for minimal 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Extremely subtle tilt (max 2 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;
    
    x.set(mouseX - 0.5);
    y.set(mouseY - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const hasLive = Boolean(project.liveUrl);
  
  // Determine active theme for screenshots
  const isDark = 
    theme === "dark" || 
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
  // Fallback to legacy project.image if images object isn't present yet
  const projectImage = project.images 
    ? (isDark ? project.images.dark : project.images.light) 
    : project.image;
  
  // Tech tags logic
  const visibleTech = project.tech.slice(0, 3);
  const remainingTechCount = project.tech.length - 3;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{
        perspective: "1500px",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative group w-full z-10 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick && onClick(project)}
    >
      {/* Premium Horizontal Card Container */}
      <div 
        className="relative flex flex-col md:flex-row w-full rounded-4xl transition-all duration-500 group-hover:scale-[1.02] shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] overflow-hidden border border-white/5 group-hover:border-white/10"
      >
        {/* Separate Glassmorphism Background Layer to prevent text/image blur on scale/tilt */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-xl z-0 pointer-events-none" />

        {/* Left Side: Preview Area (55%) */}
        <div className="relative z-10 w-full md:w-[55%] p-4 sm:p-6 lg:p-8 shrink-0 flex items-center justify-center bg-white/2 border-b md:border-b-0 md:border-r border-white/5">
          {/* MacBook Frame */}
          <div className="relative w-full aspect-16/10 bg-[#050505] rounded-xl overflow-hidden border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col ring-1 ring-white/5">
            {/* macOS Title Bar */}
            <div className="w-full h-6 bg-[#1a1a1a] flex items-center px-3 gap-1.5 border-b border-white/5 shrink-0 relative">
              <div className="w-2 h-2 rounded-full bg-[#ff5f56] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
              <div className="w-2 h-2 rounded-full bg-[#ffbd2e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
              <div className="w-2 h-2 rounded-full bg-[#27c93f] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[10px] text-muted-foreground/40 font-medium tracking-wide truncate px-8">
                  {project.title.toLowerCase().replace(/\s+/g, '-')}.app
                </span>
              </div>
            </div>
            
            {/* Screenshot */}
            <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center">
              {projectImage ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={projectImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      src={projectImage} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </AnimatePresence>
                  {/* Soft Gradient Overlay for premium cinematic feel */}
                  <div className="absolute inset-0 z-10 bg-linear-to-t from-[#050505] via-transparent to-transparent opacity-50 mix-blend-multiply pointer-events-none" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] transition-transform duration-700 ease-out group-hover:scale-[1.03] transform-gpu">
                  <FolderKanban size={48} className="text-white/10 drop-shadow-md" strokeWidth={1} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Content (45%) */}
        <div className="relative z-10 w-full md:w-[45%] p-6 sm:p-8 lg:p-10 flex flex-col justify-center gap-6">
          
          <div className="flex flex-col gap-2 pointer-events-none">
            {/* Metadata / Category Badge */}
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-1 opacity-90">
              Featured Project
            </span>
            
            <h3 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground transition-colors" style={{ fontFamily: "var(--font-display)" }}>
              {project.title}
            </h3>
            
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed line-clamp-2 mt-2">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5 pointer-events-none">
            {visibleTech.map((t) => (
              <span key={t} className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground border border-white/5 transition-colors group-hover:bg-secondary/80">
                {t}
              </span>
            ))}
            {remainingTechCount > 0 && (
              <span className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground border border-white/5 transition-colors group-hover:bg-secondary/80">
                +{remainingTechCount}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2 mt-auto">
            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold rounded-xl bg-secondary/50 text-foreground border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                aria-label={`GitHub Repo`}
              >
                <Github size={16} />
                <span>Source</span>
              </a>
            )}
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}
