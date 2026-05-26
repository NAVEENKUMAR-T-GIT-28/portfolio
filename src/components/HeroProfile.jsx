import { motion } from "framer-motion";
import { useState } from "react";
import profileImg from "@/data/images/profile.png";

const ORBIT_ICONS = [
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Vite", url: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" }];

export default function HeroProfile() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);

  // Entrance animations
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center p-8">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none animate-pulse-glow" />

      {/* Orbit Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Pulsing rings behind profile */}
        <div className="absolute inset-4 rounded-full border border-primary/20 bg-primary/5 animate-[ping_3s_ease-in-out_infinite]" />
        <div className="absolute inset-10 rounded-full border border-primary/10 bg-primary/5 animate-[ping_4s_ease-in-out_infinite_reverse]" />
        <div className="absolute inset-16 rounded-full border border-primary/30 shadow-[0_0_40px_oklch(0.52_0.24_264/0.3)] animate-spin-slow" style={{ animationDuration: '20s' }} />
        
        {/* Profile Image Container */}
        <motion.div 
          variants={itemVariants}
          className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full p-2 glass-card glow-border overflow-hidden bg-background/50 backdrop-blur-xl shadow-glow-lg"
          onMouseEnter={() => setIsOrbitPaused(true)}
          onMouseLeave={() => setIsOrbitPaused(false)}
        >
          <div className="w-full h-full rounded-full overflow-hidden border border-primary/30 relative bg-secondary">
             <img 
               src={profileImg} 
               alt="Profile" 
               className="w-full h-full object-cover" 
               onError={(e) => { e.target.src = '/fallback-profile.png' }} 
             />
          </div>
        </motion.div>

        {/* Orbiting Icons Track */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            animation: 'spin 40s linear infinite',
            animationPlayState: isOrbitPaused ? 'paused' : 'running'
          }}
        >
          {ORBIT_ICONS.map((tech, i) => {
            const angle = (i / ORBIT_ICONS.length) * 360;
            // responsive radius: smaller on mobile, larger on desktop
            return (
              <div 
                key={tech.name}
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-14 sm:h-14 -ml-6 -mt-6 sm:-ml-7 sm:-mt-7"
                style={{
                  transform: `rotate(${angle}deg) translateY(calc(-1 * clamp(130px, 30vw, 190px))) rotate(-${angle}deg)`,
                }}
              >
                <div 
                  className="w-full h-full pointer-events-auto"
                  style={{
                    animation: 'spin 40s linear infinite reverse',
                    animationPlayState: isOrbitPaused ? 'paused' : 'running'
                  }}
                >
                  <motion.div 
                    variants={itemVariants}
                    className="relative group w-full h-full"
                    onMouseEnter={() => {
                      setHoveredTech(tech.name);
                      setIsOrbitPaused(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredTech(null);
                      setIsOrbitPaused(false);
                    }}
                  >
                    <div 
                      className="w-full h-full rounded-2xl glass-card flex items-center justify-center p-2.5 cursor-pointer hover:scale-125 hover:shadow-glow-lg hover:border-primary/50 transition-all duration-300 bg-background/60 backdrop-blur-md animate-float" 
                      style={{ animationDelay: `${i * 0.3}s` }}
                    >
                      <img src={tech.url} alt={tech.name} className="w-full h-full object-contain" />
                    </div>
                    {/* Tooltip */}
                    <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-bold whitespace-nowrap transition-all duration-200 pointer-events-none z-50 ${hoveredTech === tech.name ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"}`}>
                      {tech.name}
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
