import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroProfile from "./HeroProfile";
import TypewriterRoles from "./TypewriterRoles";
import HeroStats from "./HeroStats";
import AvailabilityBadge from "./AvailabilityBadge";
import heroData from "@/data/hero.json";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-dvh px-6 pt-24 pb-16">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-8 sm:pt-16">
        
        {/* Left Column: Text Content */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1 z-10 w-full">
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl mb-3 font-extrabold"
          >
            Hi, I'm <br className="hidden sm:block" />
            <span className="text-gradient leading-tight">{heroData.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground font-medium mb-5"
          >
            {heroData.title}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-5"
          >
            <TypewriterRoles roles={heroData.roles} />
          </motion.div>
          
          <AvailabilityBadge availability={heroData.availability} />

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4 w-full"
          >
            <Link 
              to="/projects" 
              className="btn btn-primary relative group overflow-hidden border border-primary/50 shadow-glow-sm hover:shadow-glow-md transition-all duration-300" 
              aria-label="View my projects"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Link>
            
            <Link 
              to="/contact" 
              className="btn btn-outline hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 group glass-card" 
              aria-label="Contact me"
            >
              <span className="group-hover:text-primary transition-colors">Get In Touch</span>
            </Link>
          </motion.div>

          <HeroStats stats={heroData.stats} />
        </div>

        {/* Right Column: Hero Profile */}
        <div className="order-1 lg:order-2 flex justify-center w-full relative z-10">
          <HeroProfile floatingTech={heroData.floatingTech} techIconsMap={heroData.techIconsMap} />
        </div>

      </div>
    </section>
  );
}
