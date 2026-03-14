"use client";

import { useScene } from "@/context/SceneContext";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "hero", label: "HOME", code: "00", path: "/#hero" },
  { id: "about", label: "ABOUT", code: "01", path: "/#about" },
  { id: "domains", label: "DOMAINS", code: "02", path: "/#domains" },
  { id: "systems", label: "SYSTEMS", code: "03", path: "/#systems" },
  { id: "comparison", label: "COMPARE", code: "04", path: "/#comparison" },
  { id: "exploration", label: "EXPLORE", code: "05", path: "/#exploration" },
  { id: "archive", label: "ARCHIVE", code: "06", path: "/#archive" },
  { id: "philosophy", label: "PHILOSOPHY", code: "07", path: "/#philosophy" },
  { id: "reflections", label: "REFLECT", code: "08", path: "/#reflections" },
  { id: "contact", label: "CONNECT", code: "09", path: "/#contact" },
];

export default function NavigationDock() {
  const { activeSection, isMobile } = useScene();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleScroll = (id: string) => {
    if (!isHomePage) return;
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
      <>
        {/* MOBILE TOP STATUS BAR (Internal Pages) */}
        {!isHomePage && (
          <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 h-16 bg-bg-primary border-b border-border-dim flex items-center justify-between"
          >
            <div className="type-metadata text-[0.55rem] text-accent">SYSTEM_INTERNAL</div>
            <Link 
              href="/"
              className="type-nav text-[0.6rem] text-accent flex items-center gap-2 border border-accent/20 px-4 py-2 bg-accent/5 rounded-full"
            >
              <span>←</span> RETURN_BASE
            </Link>
          </motion.nav>
        )}

        {/* MOBILE BOTTOM NAVIGATION HUB (Homepage) */}
        {isHomePage && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-sm"
          >
            <div className="bg-bg-secondary border border-border-dim rounded-sm p-2 shadow-2xl flex items-center justify-between">
              {NAV_ITEMS.filter(item => ["hero", "systems", "domains", "contact"].includes(item.id)).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-1 py-3 transition-all rounded-xl",
                    activeSection === item.id ? "bg-accent/5 text-accent scale-95" : "text-text-muted"
                  )}
                >
                  <span className="type-metadata text-[0.35rem] opacity-40">{item.code}</span>
                  <span className="type-nav text-[0.5rem] tracking-tight">{item.label}</span>
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="mobile-nav-indicator"
                      className="w-1 h-1 bg-accent rounded-full mt-1" 
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </>
    );
  }

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-sys-32 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-sys-24"
    >
      {!isHomePage && (
         <Link 
           href="/"
           className="group flex flex-col gap-2 mb-8 focus:outline-none"
         >
           <span className="type-metadata text-[0.5rem] text-accent opacity-40 group-hover:opacity-100 transition-opacity">EXIT_NODE</span>
           <span className="type-nav text-[0.6rem] text-text-muted group-hover:text-accent transition-colors">← RETURN_BASE</span>
         </Link>
      )}

      {isHomePage && NAV_ITEMS.map((item) => (
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
          
          <div className={cn(
            "arch-marker scale-[0.3] transition-all duration-300",
            activeSection === item.id ? "opacity-100 scale-50" : "opacity-0 group-hover:opacity-40"
          )} />

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
                className="absolute -left-sys-12 w-[2px] h-sys-12 bg-accent"
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
      {isHomePage && (
        <div className="absolute -right-sys-8 top-0 bottom-0 w-[1px] bg-border-bright">
          <SceneScrollProgress />
        </div>
      )}
    </motion.nav>
  );
}

function SceneScrollProgress() {
  const { scrollProgress } = useScene();
  return (
    <motion.div
      className="w-full bg-accent origin-top"
      animate={{ height: `${scrollProgress * 100}%` }}
      transition={{ type: "spring", stiffness: 100, damping: 30, mass: 0.5 }}
    />
  );
}
