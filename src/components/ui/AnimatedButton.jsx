import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function AnimatedButton({ to, href, children, variant = "primary", icon, type, onClick, className = "" }) {
  const base = "group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:shadow-[0_0_40px_oklch(0.78_0.16_220/0.6)] hover:scale-[1.03]"
      : "border border-border text-foreground hover:border-primary/60 hover:text-primary glass-card";

  const content = (
    <motion.span whileTap={{ scale: 0.96 }} className={`${base} ${styles} ${className}`}>
      {children}
      {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
    </motion.span>
  );

  if (to) return <Link to={to}>{content}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer">{content}</a>;
  return <button type={type} onClick={onClick} className="inline-block">{content}</button>;
}
