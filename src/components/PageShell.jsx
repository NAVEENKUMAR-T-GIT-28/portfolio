import { motion } from "framer-motion";

export function PageShell({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className={`page-shell px-6 ${className}`}
    >
      <div className="page-container">{children}</div>
    </motion.div>
  );
}