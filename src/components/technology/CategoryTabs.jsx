import { motion } from "framer-motion";

export default function CategoryTabs({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 rounded-full border border-primary/50 bg-primary/10"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
}
