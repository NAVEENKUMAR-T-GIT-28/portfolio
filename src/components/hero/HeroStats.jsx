import { motion } from "framer-motion";

export default function HeroStats({ stats = [] }) {
  if (stats.length === 0) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 w-full"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={item}
          whileHover={{ scale: 1.05, y: -4 }}
          className="glass-card p-3 sm:p-4 rounded-2xl flex flex-col items-center text-center gap-1.5 border border-primary/20 hover:border-primary/50 hover:shadow-glow-sm transition-all"
        >
          <span className="text-2xl sm:text-3xl drop-shadow-md">{stat.icon}</span>
          <div className="mt-1">
            <h4 className="font-bold text-foreground text-xs sm:text-sm tracking-wide">{stat.value}</h4>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
