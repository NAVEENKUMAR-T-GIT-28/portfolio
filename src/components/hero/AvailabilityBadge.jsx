import { motion } from "framer-motion";

export default function AvailabilityBadge({ availability }) {
  if (!availability || !availability.active) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-green-500/30 bg-green-500/10 hover:bg-green-500/15 hover:border-green-500/50 transition-all cursor-default shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] mb-8"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
      </span>
      <span className="text-xs sm:text-sm font-semibold text-green-400 tracking-wide">
        {availability.status}
      </span>
    </motion.div>
  );
}
