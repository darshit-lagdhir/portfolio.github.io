"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";
import SmoothScroll from "@/components/brutalist/SmoothScroll";
import BrutalistNavbar from "@/components/brutalist/BrutalistNavbar";
import { SceneProvider, useScene } from "@/context/SceneContext";

// PHASE 1: CENTRAL MOTION CONTROLLER
const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

function HUDOverlay() {
  const { activeSection, mode } = useScene();
  const [time, setTime] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    const updateTime = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    window.addEventListener("resize", handleResize);
    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    }
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000] overflow-hidden fixed-hud select-none">
      {/* PHASE 3 & 16: SCREEN IMPACT BRACKETS */}
      <div className="absolute top-10 left-10 w-2 h-2 border-t border-l border-white opacity-20" />
      <div className="absolute top-10 right-10 w-2 h-2 border-t border-r border-white opacity-20" />
      <div className="absolute bottom-10 left-10 w-2 h-2 border-b border-l border-white opacity-20" />
      <div className="absolute bottom-10 right-10 w-2 h-2 border-b border-r border-white opacity-20" />

      <div className="absolute top-1/2 left-4 -translate-y-1/2 -rotate-90 origin-left flex items-center gap-6">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeSection}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            transition={{ duration: 0.4, ease: GLOBAL_EASE }}
            className="text-white font-bold opacity-40 text-[10px] tracking-widest uppercase"
          >
            STATE: {activeSection}
          </motion.span>
        </AnimatePresence>
        <div className="w-8 h-[1px] bg-white opacity-20" />
        <span className="opacity-15 font-light text-[8px] tracking-[0.3em] uppercase">UNIT: {mode}</span>
      </div>

      <div className="absolute top-12 right-12 text-right flex flex-col items-end gap-2">
        <span className="opacity-25 text-[8px] tracking-[0.3em]">LOCAL_STAMP: {time}</span>
      </div>
    </div>
  );
}

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { damping: 40, stiffness: 500 });
  const ringY = useSpring(mouseY, { damping: 40, stiffness: 500 });

  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as Element;
      if (target?.closest) {
        setIsHovering(!!target.closest("a, button, [role='button']"));
        setIsHoveringProject(!!target.closest("[data-project='true']"));
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  if (!isMounted || isMobile) return null;

  return (
    <>
      <motion.div
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full z-[100000] pointer-events-none"
      />
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHoveringProject ? 3.5 : isHovering ? 2.5 : 1,
          opacity: isHovering || isHoveringProject ? 0.3 : 0.6,
          borderRadius: isHoveringProject ? "0px" : "50%",
          rotate: isHoveringProject ? 45 : 0
        }}
        transition={{ duration: 0.15, ease: "linear" }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white mix-blend-difference z-[99999] pointer-events-none"
      />
    </>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const gridShiftY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // PHASE 116.10: SUBTLE PERSPECTIVE SHIFT
  const sceneTiltX = useTransform(scrollYProgress, [0, 1], [0, 1.5]);
  const { setActiveSection, activeSection } = useScene();

  useEffect(() => {
    const sections = ["hero", "about", "projects", "focus", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(id);
      }, { threshold: 0.5 });
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [setActiveSection]);

  // PHASE 10: DYNAMIC AMBIENT TONE SHIFT
  const getEnvColor = (section: string) => {
    switch (section) {
      case "hero": return "#030303";
      case "projects": return "#020305"; // slightly cooler
      case "about": return "#040302"; // slightly warmer
      case "focus": return "#020303"; // subtle teal
      case "contact": return "#040202"; // subtle warm
      default: return "#030303";
    }
  };

  return (
    <>
      <SmoothScroll />

      {/* PHASE 1 & 10: BASE TONE SHIFT */}
      <motion.div
        animate={{ backgroundColor: getEnvColor(activeSection) }}
        transition={{ duration: 1.5, ease: GLOBAL_EASE }}
        className="fixed inset-0 z-[-5] pointer-events-none"
      />

      {/* PHASE 12: MESH REFINEMENT (SUBTLE DUST/MESH) */}
      <div className="fixed inset-0 z-[-4] pointer-events-none opacity-50 overflow-hidden mix-blend-screen">
        <div className="absolute w-[50vw] h-[50vw] bg-white opacity-5 left-0 top-0 rounded-full blur-[100px]" />
        <div className="absolute w-[40vw] h-[40vw] bg-white opacity-2 right-0 bottom-0 rounded-full blur-[100px]" />
      </div>

      {/* PHASE 8 & 117.3: SPATIAL GRID SYSTEM OVERLAY */}
      <motion.div
        style={{ y: gridShiftY }}
        className="fixed inset-[-10%] z-[-2] pointer-events-none opacity-[0.4]"
      >
        <div className="w-full h-full grid-blueprint transition-opacity duration-1000" />
      </motion.div>

      <BrutalistNavbar />

      {/* PHASE 118.4 & 120.13: ZERO-BUG ROUTE TRANSITION */}
      <main className="relative z-10 w-full min-h-screen origin-top pt-24">
        {children}
      </main>

      <CustomCursor />
      <HUDOverlay />

      <div className="env-grain" />

      {/* PHASE 12: PROGRESS REFINEMENT (STAY SHARP) */}
      <div className="progress-bar hidden md:block !right-[5vw] !h-[12vh] opacity-10 pointer-events-none">
        <motion.div className="progress-fill" style={{ height: "var(--scroll-percent, 0%)" }} />
      </div>
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-white selection:text-black bg-background relative">
        <SceneProvider>
          <LayoutContent>{children}</LayoutContent>
        </SceneProvider>
      </body>
    </html>
  );
}
