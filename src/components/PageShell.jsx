import { motion } from "framer-motion";

export function PageShell({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative min-h-screen pt-32 pb-20 px-6"
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </motion.main>
  );
}
