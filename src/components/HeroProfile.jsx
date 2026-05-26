import { motion } from "framer-motion";
import { useState } from "react";
import profileImg from "@/data/images/profile.png";

export default function HeroProfile({ floatingTech = [], techIconsMap = {} }) {
  const [hoveredTech, setHoveredTech] = useState(null);

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

  // Helper to compute tech logo URL dynamically or fall back
  const getIconUrl = (name) => {
    if (techIconsMap && techIconsMap[name]) return techIconsMap[name];
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name.toLowerCase()}/${name.toLowerCase()}-original.svg`;
  };

  // Helper to position floating icons perfectly in a circle
  const getPosition = (index, total) => {
    const angle = (index / total) * 360;
    return {
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * clamp(140px, 35vw, 220px))) rotate(-${angle}deg)`
    };
  };

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center p-4 sm:p-8">
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
        <div className="absolute inset-8 rounded-full border border-primary/20 bg-primary/5 animate-[ping_3s_ease-in-out_infinite]" />
        <div className="absolute inset-14 rounded-full border border-primary/10 bg-primary/5 animate-[ping_4s_ease-in-out_infinite_reverse]" />
        
        {/* Profile Image Container */}
        <motion.div 
          variants={itemVariants}
          className="relative z-10 w-52 h-52 sm:w-72 sm:h-72 rounded-full p-2 glass-card glow-border overflow-hidden bg-background/50 backdrop-blur-xl shadow-glow-lg border border-primary/30"
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

        {/* Floating Icons dynamically rendered */}
        {floatingTech.map((techName, i) => {
          const posStyle = getPosition(i, floatingTech.length);
          return (
            <div
              key={techName}
              className="absolute z-20"
              style={posStyle}
            >
              <motion.div variants={itemVariants}>
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                >
                <div 
                  className="relative group w-12 h-12 sm:w-16 sm:h-16"
                  onMouseEnter={() => setHoveredTech(techName)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <div className="w-full h-full rounded-2xl glass-card flex items-center justify-center p-3 cursor-pointer hover:scale-110 hover:shadow-glow-lg hover:border-primary/50 transition-all duration-300 bg-background/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <img 
                      src={getIconUrl(techName)} 
                      alt={techName} 
                      className="w-full h-full object-contain" 
                      onError={(e) => { e.target.src = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" }}
                    />
                  </div>
                
                {/* Tooltip */}
                <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-bold whitespace-nowrap transition-all duration-200 pointer-events-none ${hoveredTech === techName ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"}`}>
                  {techName}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      );
        })}
      </motion.div>
    </div>
  );
}
