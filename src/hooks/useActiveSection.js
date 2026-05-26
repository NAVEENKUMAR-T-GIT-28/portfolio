import { useEffect, useState } from "react";

const SECTION_IDS = ["home", "overview", "experience", "technologies", "projects", "contact"];

export function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        }
        if (best?.target?.id) {
          setActive(best.target.id);
        }
      },
      {
        threshold: [0, 0.2, 0.4, 0.6],
        rootMargin: "-80px 0px -40% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
