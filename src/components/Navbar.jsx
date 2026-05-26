import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import navigation from "@/data/navigation.json";
import personal from "@/data/personal.json";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const activeSection = useActiveSection();

  const scrollToSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <nav className="flex items-center justify-between rounded-2xl glass-card px-6 py-3">
          <Link to="/" className="text-lg font-bold text-gradient font-[var(--font-display)]">
            {personal.brand}
          </Link>
          <ul className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const active = isHome
                ? activeSection === item.sectionId
                : pathname === item.to;

              return (
                <li key={item.sectionId}>
                  {isHome ? (
                    <button
                      onClick={() => scrollToSection(item.sectionId)}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-lg bg-primary/15 border border-primary/40"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      to={item.to}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-lg bg-primary/15 border border-primary/40"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden text-foreground p-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass-card rounded-2xl p-4"
            >
              {navigation.map((item) =>
                isHome ? (
                  <button
                    key={item.sectionId}
                    onClick={() => scrollToSection(item.sectionId)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                      activeSection === item.sectionId
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
