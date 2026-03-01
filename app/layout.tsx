"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import "./globals.css";
import SmoothScroll from "@/components/brutalist/SmoothScroll";
import BrutalistNavbar from "@/components/brutalist/BrutalistNavbar";
import { SceneProvider, useScene } from "@/context/SceneContext";

// MICRCO TELEMETRY (PHASE 9)
function Telemetry() {
  return (
    <div className="flex gap-1 items-end h-4 opacity-30">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="telemetry-bar"
          style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

// PROGRESS INTELLIGENCE BAR (PHASE 1)
function ProgressIntelligenceBar() {
  const { activeSection } = useScene();
  const sections = [
    { id: "hero", label: "01_START" },
    { id: "about", label: "02_PHILO" },
    { id: "projects", label: "03_ARCHIVE" },
    { id: "focus", label: "04_BENTO" },
    { id: "contact", label: "05_SYNC" }
  ];

  return (
    <div className="progress-intel hidden lg:flex">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`intel-marker ${activeSection === s.id ? "active" : ""}`}
        >
          <span className="intel-tooltip font-mono tracking-widest">{s.label}</span>
        </a>
      ))}
    </div>
  );
}

// HUD OVERLAY SYSTEM (PHASE 1 + 3 + 9)
function HUDOverlay() {
  const { activeSection, mode } = useScene();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setCoords({ x: e.clientX, y: e.clientY });
    const updateTime = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    window.addEventListener("mousemove", handleMove);
    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      clearInterval(interval);
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden opacity-10 md:opacity-20 font-mono text-[10px] tracking-widest text-white uppercase select-none fixed-hud">
      {/* CORNER BRACKETS */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white" />

      {/* SYSTEM LABELS & STATE AWARENESS (PHASE 3) */}
      <div className="absolute top-12 left-12 flex flex-col gap-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeSection}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            className="text-white font-bold"
          >
            STATE: {activeSection.toUpperCase()}
          </motion.span>
        </AnimatePresence>
        <span className="opacity-50">UNIT: {mode.toUpperCase()}</span>
      </div>

      <div className="absolute top-12 right-12 text-right flex flex-col items-end gap-2">
        <span>LOCAL_STAMP: {time}</span>
        <div className="flex justify-end gap-3 items-center">
          <Telemetry />
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-white animate-pulse" />
            <div className="w-1.5 h-1.5 bg-white opacity-20" />
          </div>
        </div>
      </div>

      {/* FLOATING UI DATA ELEMENTS (PHASE 6) */}
      <div className="absolute bottom-12 left-12 flex items-center gap-4">
        <div className="w-24 h-[1px] bg-white opacity-20 relative overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-white opacity-40"
          />
        </div>
        <span className="opacity-50">LAT: {coords.x} / {coords.y}</span>
      </div>
    </div>
  );
}

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { damping: 35, stiffness: 450 });
  const ringY = useSpring(mouseY, { damping: 35, stiffness: 450 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, .interactive-trigger, [role='button']"));
    };
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    }
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full z-[100000] pointer-events-none hidden md:block"
      />

      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovering ? 2.5 : 1, opacity: isHovering ? 0.3 : 1 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white mix-blend-difference z-[99999] pointer-events-none hidden md:block"
      />

      <motion.div
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{ rotate: isHovering ? 90 : 0, scale: isHovering ? 1.2 : 1 }}
        className="fixed top-0 left-0 w-10 h-10 z-[100001] pointer-events-none hidden md:block"
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />
      </motion.div>

      {/* GAMIFIED NAVIGATION PING (PHASE 4) */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
            className="fixed top-0 left-0 w-20 h-20 border border-white rounded-full z-[99998] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const gridShiftY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <body className="antialiased overflow-x-hidden selection:bg-white selection:text-black bg-background">
      <SmoothScroll />

      <div className="mesh-container">
        <div className="mesh-blob w-[50vw] h-[50vw] bg-white opacity-5 left-0 top-0" />
        <div className="mesh-blob w-[40vw] h-[40vw] bg-white opacity-3 right-0 bottom-0" />
        <div className="mesh-blob w-[30vw] h-[30vw] bg-white opacity-4 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" />
      </div>

      <motion.div
        style={{ y: gridShiftY }}
        className="fixed inset-[-10%] z-[-1] pointer-events-none opacity-[0.03]"
      >
        <div className="w-full h-full" style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      </motion.div>

      <BrutalistNavbar />
      <main className="relative z-10 w-full min-h-screen">
        {children}
      </main>

      <CustomCursor />
      <HUDOverlay />
      <ProgressIntelligenceBar />

      <div className="progress-bar hidden md:block">
        <motion.div className="progress-fill" style={{ height: "var(--scroll-percent, 0%)" }} />
      </div>
    </body>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SceneProvider>
        <LayoutContent>{children}</LayoutContent>
      </SceneProvider>
    </html>
  );
}
