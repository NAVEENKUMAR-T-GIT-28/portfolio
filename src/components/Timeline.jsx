import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TimelineItem from "@/components/TimelineItem";
import timelineData from "@/data/timeline.json";

export default function Timeline() {
  const containerRef = useRef(null);
  
  // Track scroll progress relative to the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Scale the center line height from 0 to 1 based on scroll progress
  // We go slightly past 1 to ensure it fills fully
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1.1]);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-10">
      {/* Central Line Background */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-[4px] bg-zinc-200 dark:bg-white/5 rounded-full overflow-hidden">
        {/* Animated Fill Line */}
        <motion.div 
          style={{ scaleY, transformOrigin: "top" }} 
          className="w-full h-full bg-linear-to-b from-primary via-accent to-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
        />
      </div>

      <div className="relative z-10 flex flex-col">
        {timelineData.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
