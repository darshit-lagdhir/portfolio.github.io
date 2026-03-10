"use client";

import { useScene } from "@/context/SceneContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { id: "hero", label: "HOME", code: "00" },
  { id: "philosophy", label: "SYSTEMS", code: "01" },
  { id: "systems", label: "MODULES", code: "02" },
  { id: "capabilities", label: "SKILLS", code: "03" },
  { id: "about", label: "ABOUT", code: "04" },
  { id: "contact", label: "CONNECT", code: "05" },
];

export default function NavigationDock() {
  const { activeSection, isMobile, isScrolled } = useScene();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for mobile header if needed
      const offset = isMobile ? 64 : 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (isMobile) {
    return (
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-sys-24 h-sys-64 flex justify-between items-center transition-all duration-500",
          isScrolled ? "bg-bg-primary/90 backdrop-blur-md border-b border-border-dim" : "bg-transparent"
        )}
      >
        <div className="type-metadata text-[0.6rem] text-accent tracking-[0.2em]">DAR_LAG_SYS</div>
        <div className="flex gap-sys-16">
          {NAV_ITEMS.filter(item => ["hero", "systems", "contact"].includes(item.id)).map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={cn(
                "type-nav text-[0.6rem] transition-colors p-2 focus:text-accent focus:outline-none",
                activeSection === item.id ? "text-accent" : "text-text-muted"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-sys-32 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-sys-24"
    >
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => handleScroll(item.id)}
          className="group flex items-center gap-sys-16 text-left relative focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 p-1"
        >
          {/* Diagnostic Code */}
          <span className={cn(
            "type-metadata text-[0.6rem] transition-all duration-300 w-sys-24",
            activeSection === item.id 
              ? "text-accent" 
              : "text-text-muted opacity-40 group-hover:opacity-100 group-hover:text-text-primary group-focus-visible:opacity-100"
          )}>
            {item.code}
          </span>

          {/* Label Engine */}
          <div className="overflow-hidden">
            <motion.span 
              className={cn(
                "type-nav text-[0.7rem] block transition-all duration-300",
                activeSection === item.id 
                  ? "text-text-primary translate-x-0" 
                  : "text-text-muted -translate-x-full group-hover:translate-x-0 group-hover:text-text-primary group-focus-visible:translate-x-0"
              )}
            >
              {item.label}
            </motion.span>
          </div>

          {/* Active Status Line */}
          <AnimatePresence>
            {activeSection === item.id && (
              <motion.div 
                layoutId="nav-active"
                className="absolute -left-sys-12 w-1 h-sys-12 bg-accent"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </button>
      ))}
      
      {/* Scroll Metric Telemetry */}
      <div className="absolute -right-sys-8 top-0 bottom-0 w-[1px] bg-border-dim/20">
        <SceneScrollProgress />
      </div>
    </motion.nav>
  );
}

function SceneScrollProgress() {
  const { scrollProgress } = useScene();
  return (
    <motion.div 
      className="w-full bg-accent origin-top shadow-[0_0_8px_rgba(255,255,255,0.2)]"
      animate={{ height: `${scrollProgress * 100}%` }}
      transition={{ type: "spring", stiffness: 100, damping: 30, mass: 0.5 }}
    />
  );
}
