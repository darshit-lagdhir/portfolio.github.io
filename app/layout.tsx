"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useVelocity, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";
import SmoothScroll from "@/components/brutalist/SmoothScroll";
import BrutalistNavbar from "@/components/brutalist/BrutalistNavbar";
import AmbientParticles from "@/components/brutalist/AmbientParticles";
import EnvironmentalSystem from "@/components/brutalist/EnvironmentalSystem";
import { SceneProvider, useScene } from "@/context/SceneContext";
import { CommandPalette, ContinuityLine, SystemStateIndicator } from "@/components/brutalist/SystemComponents";

const MICRO_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function CustomCursor() {
  // PHASE 11 STEP 1: CURSOR PHYSICS ENGINE
  const mouse = {
    x: useMotionValue(-100),
    y: useMotionValue(-100),
  };

  // Core dot: FAST response (EXTREME precision)
  const dot = {
    x: useSpring(mouse.x, { damping: 20, stiffness: 1200, mass: 0.1 }),
    y: useSpring(mouse.y, { damping: 20, stiffness: 1200, mass: 0.1 }),
  };

  // Outer ring: SMOOTH trailing response (SILKY lag)
  const ring = {
    x: useSpring(mouse.x, { damping: 50, stiffness: 200, mass: 0.4 }),
    y: useSpring(mouse.y, { damping: 50, stiffness: 200, mass: 0.4 }),
  };

  // STEP 6: Proximity light follows cursor (Ultra-smooth ambient)
  const glow = {
    x: useSpring(mouse.x, { damping: 60, stiffness: 100, mass: 1 }),
    y: useSpring(mouse.y, { damping: 60, stiffness: 100, mass: 1 }),
  };

  const [cursorVariant, setCursorVariant] = useState("default");
  const [isPressed, setIsPressed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOnDark, setIsOnDark] = useState(true);

  // PHASE 16 STEP 9: CURSOR SIGNAL RESPONSE
  const [targetCenter, setTargetCenter] = useState<{ x: number, y: number } | null>(null);

  // Define hook at the top level to avoid Rules of Hooks violation
  const signalRotation = useTransform(() => {
    if (!targetCenter) return "0rad";
    const dx = targetCenter.x - dot.x.get();
    const dy = targetCenter.y - dot.y.get();
    return Math.atan2(dy, dx) + "rad";
  });

  useEffect(() => {
    setIsMounted(true);
    const moveMouse = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);

      // STATE DETECTION
      const target = e.target as HTMLElement;
      const isLink = target.closest("a, button, [role='button']");
      const isProject = target.closest("[data-project='true']");
      const isLargeText = target.closest("h1, h2, h3, .text-massive, .text-large");
      const isWhiteSection = target.closest(".bg-white");

      if (isProject) setCursorVariant("project");
      else if (isLargeText) setCursorVariant("text");
      else if (isLink) setCursorVariant("link");
      else setCursorVariant("default");

      // PHASE 16 STEP 9: CURSOR SIGNAL TARGET RESOLUTION
      const isInteractable = isLink || isProject || target.closest("button");
      if (isInteractable) {
        const rect = isInteractable.getBoundingClientRect();
        setTargetCenter({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      } else {
        setTargetCenter(null);
      }

      // SECTION DETECTION
      setIsOnDark(!isWhiteSection);
      if (isWhiteSection) document.body.classList.add("cursor-invert");
      else document.body.classList.remove("cursor-invert");
    };

    // STEP 10: PRESSURE FEEDBACK
    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);

    window.addEventListener("mousemove", moveMouse, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mouse.x, mouse.y]);

  // STEP 4: CURSOR SCALE RESPONSE VARIANTS
  const variants = {
    default: {
      width: 40,
      height: 40,
      borderRadius: "100%",
      borderWidth: "1px",
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
    link: {
      width: 70,
      height: 70,
      borderRadius: "100%",
      borderWidth: "1px",
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
    project: {
      width: 100,
      height: 100,
      borderRadius: "4px",
      borderWidth: "2px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    text: {
      width: 60,
      height: 60,
      borderRadius: "100%",
      borderWidth: "1px",
      backgroundColor: "rgba(255, 255, 255, 0.03)",
    },
  };

  if (!isMounted) return null;

  return (
    <>
      {/* CORE DOT — fast physics */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ scale: isPressed ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        style={{
          x: dot.x,
          y: dot.y,
          translateX: "-50%",
          translateY: "-50%",
          width: 16,
          height: 16,
        }}
      />

      {/* PHASE 16 STEP 9: CURSOR SIGNAL RESPONSE (Line drawing to target center) */}
      {targetCenter && (
        <motion.div
          className="fixed top-0 left-0 bg-white pointer-events-none z-[9999] mix-blend-difference origin-left"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.8 }}
          exit={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            height: 1.5,
            width: 30, // Micro short line pointing directly towards object center
            x: dot.x,
            y: dot.y,
            rotate: signalRotation
          }}
        />
      )}

      {/* OUTER RING — trailing physics */}
      <motion.div
        className="fixed top-0 left-0 border border-white pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          ...variants[cursorVariant as keyof typeof variants],
          scale: isPressed ? 0.85 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1], scale: { type: "spring", stiffness: 400, damping: 12 } }}
        style={{ x: ring.x, y: ring.y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}

// PHASE 20 STEP 5: INTERACTION FEEDBACK DOT
function DiscoveryFeedbackDot() {
  const { lastDiscoveryTime } = useScene();
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!lastDiscoveryTime || Date.now() - lastDiscoveryTime > 2000) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 4, 0], opacity: [0, 0.8, 0] }}
      transition={{ duration: 1.2, ease: "circOut" }}
      className="fixed pointer-events-none z-[300] w-2 h-2 rounded-full bg-white blur-[2px]"
      style={{ left: mousePos.x, top: mousePos.y, x: "-50%", y: "-50%" }}
    />
  );
}

// PHASE 20 STEP 9: CURSOR DISCOVERY TRAIL
function CursorDiscoveryTrail() {
  const { scrollTempo } = useScene();
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([]);

  useEffect(() => {
    let id = 0;
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      // Only leave trail if moving slowly (high tempo MotionValue)
      if (scrollTempo.get() > 0.6) {
        setTrail(prev => [...prev.slice(-10), { x: e.clientX, y: e.clientY, id: id++ }]);
      }
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [scrollTempo]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[35]">
      {trail.map(t => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: t.x, top: t.y }}
        />
      ))}
    </div>
  );
}

// PHASE 21 STEP 7: CURSOR SIGNAL LINES
function CursorSignals() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.kinetic-letter'))) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[40]">
      <AnimatePresence>
        {active && (
          <motion.svg className="absolute inset-0 w-full h-full">
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: MICRO_EASE }}
              x1={mousePos.x}
              y1={mousePos.y}
              x2={mousePos.x + 40}
              y2={mousePos.y - 40}
              stroke="white"
              strokeWidth="0.5"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
}

// PHASE 21 STEP 9: CROSS-PAGE CONNECTION
function CrossPageContinuity() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: MICRO_EASE }}
          className="fixed top-0 left-[50%] w-px h-full bg-white/10 z-[50] origin-top pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}

// PHASE 21 STEP 1: GLOBAL STRUCTURAL NETWORK
function GlobalStructuralNetwork() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  const path1Length = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const path2X = useTransform(scrollYProgress, [0, 1], [0, -20]);

  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[5]">
      <svg width="100%" height="100%">
        {/* Connection Hero -> Projects */}
        <motion.path
          d="M 50 100 L 50 400 L 150 400"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.1 }}
          style={{ pathLength: path1Length }}
        />
        {/* Secondary Structural Grid Lines */}
        <motion.path
          d="M 90vw 20vh L 90vw 80vh L 80vw 80vh"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.05 }}
          style={{ x: path2X }}
        />
      </svg>
    </div>
  );
}




function LayoutContent({ children }: { children: React.ReactNode }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [showGrid, setShowGrid] = useState(false);
  const { interactionCount, attentionScore, focusZone, lastDiscoveryTime, scrollTempo } = useScene();

  // PHASE 5 & 7: ADVANCED SCROLL PHYSICS
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // STEP 6: Microscopic tilt
  const scrollTiltX = useTransform(smoothVelocity, [-2000, 2000], [-1.5, 1.5]);

  // STEP 10: Reactive Border Brightness + PHASE 20 STEP 10: SLOW SCROLL DISCOVERY
  const baseBorderOpacity = useTransform(smoothVelocity, [-1000, 0, 1000], [0.3, 0.05, 0.3]);
  const slowScrollPulse = useTransform(smoothVelocity, [-50, 0, 50], [0.4, 0, 0.4]);
  const borderOpacity = useTransform([baseBorderOpacity, slowScrollPulse], ([base, pulse]: any[]) => Math.max(base, pulse));

  // STEP 11: Dynamic Spacing Adjustment (Density narrative)
  const layoutLineHeight = useTransform(scrollYProgress, [0, 1], [1.4, 1.3]);
  const layoutLetterSpacing = useTransform(scrollYProgress, [0, 1], ["0em", "-0.01em"]);

  // PHASE 8 STEP 7: DYNAMIC LINE DISPLACEMENT
  const spineDisplaceX = useTransform(smoothVelocity, [-2000, 0, 2000], [-3, 0, 3]);

  // PHASE 9 STEP 9: SCROLL VELOCITY STRETCH
  const velocityStretch = useTransform(smoothVelocity, [-2000, 0, 2000], [0.998, 1, 1.002]);

  // PHASE 9 STEP 11: GRID GUIDES VISIBLE ON SCROLL
  const gridScrollOpacity = useTransform(smoothVelocity, [-800, -200, 0, 200, 800], [0.08, 0.04, 0, 0.04, 0.08]);

  // PHASE 17 STEP 4 & 10: VIEWPORT FRAME SHIFT & GRID ADJUST
  const frameInset = useTransform(scrollYProgress, [0, 0.5, 1], ["10px", "0px", "10px"]);
  const frameScale = useTransform(smoothVelocity, [-2000, 0, 2000], [1.02, 1, 1.02]);
  const gridSpacing = useTransform(scrollYProgress, [0, 1], ["20vw", "18vw"]);

  // PHASE 12 STEP 6: FLOATING SEPARATOR PARALLAX
  const sep1Y = useTransform(scrollYProgress, [0, 1], ["0vh", "-15vh"]);
  const sep2Y = useTransform(scrollYProgress, [0, 1], ["0vh", "-10vh"]);

  // PHASE 19 STEP 12: VISUAL ATTENTION GRADIENT
  const centerContrast = useTransform(attentionScore, [0, 1], [1, 1.05]);
  const edgeDim = useTransform(attentionScore, [0, 1], [1, 0.98]);

  // PHASE 12 STEP 11: STRUCTURAL FLOATING GRID (SLOWER THAN SCROLL)
  const structuralGridY = useTransform(scrollYProgress, [0, 1], ["0vh", "30vh"]);

  // PHASE 22: TRANSFORM CACHING (FIX HOOK VIOLATION)
  const mainFilter = useTransform(centerContrast, (c: number) => `contrast(${c})`);
  const gridDynamicSpacing = useTransform(gridSpacing, (s: string) => `${s} 20vh`);
  const gridBackgroundSize = useTransform(gridSpacing, (s: string) => s ? `${s} ${s}` : '20vw 20vw');

  // PHASE 19 STEP 11: SYSTEM STATE INDICATOR LOGIC
  const [systemActive, setSystemActive] = useState(false);
  useEffect(() => {
    if (interactionCount > 0 && interactionCount % 15 === 0) {
      setSystemActive(true);
      const timer = setTimeout(() => setSystemActive(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [interactionCount]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "g") setShowGrid((prev) => !prev);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <SmoothScroll />
      <BrutalistNavbar />
      <SystemStateIndicator active={systemActive} />

      {/* PHASE 20 & 21: INTERFACE NETWORK LAYERS */}
      <DiscoveryFeedbackDot key={lastDiscoveryTime} />
      <CursorDiscoveryTrail />
      <CursorSignals />
      <CrossPageContinuity />
      <GlobalStructuralNetwork />

      <motion.main
        style={{
          rotateX: scrollTiltX,
          lineHeight: layoutLineHeight,
          letterSpacing: layoutLetterSpacing,
          scaleY: velocityStretch,
          filter: mainFilter,
        }}
        className={`relative z-10 w-full perspective-root glitch-safe transition-all duration-500`}
      >
        {children}
      </motion.main>
      <CustomCursor />

      {/* PHASE 21 STEP 8: REINFORCED STRUCTURAL GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] transition-opacity duration-1000">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px), 
              linear-gradient(90deg, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)
            `,
            backgroundSize: gridBackgroundSize
          }}
        />
      </div>

      {/* PHASE 7: FRAME EDGE REACTIVE SYSTEM (STEP 10) + PHASE 17 STEP 4 */}
      <motion.div
        style={{
          opacity: borderOpacity,
          inset: frameInset,
          scale: frameScale,
          borderWidth: "1.5px"
        }}
        className="fixed border-white pointer-events-none z-50 transition-colors duration-500"
      />

      {/* PHASE 7: ARCHITECTURAL SPINE (STEP 3 & 6) + PHASE 8 DISPLACEMENT (STEP 7) */}
      <motion.div
        style={{ x: spineDisplaceX }}
        className="fixed left-[4.8vw] top-0 h-full w-[1px] bg-white/5 z-[40] pointer-events-none mix-blend-difference hidden md:block glitch-safe"
      >
        <motion.div
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
          className="w-full h-full bg-white/30"
        />
      </motion.div>

      {/* SHARP SCROLL INDICATOR — PHASE 3 */}
      <div className="fixed right-0 top-0 h-full w-[1px] bg-white/5 z-50">
        <motion.div
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
          className="w-full h-full bg-white"
        />
      </div>

      {/* PHASE 16 STEP 3: EXPLORATION PROGRESS LINE */}
      <div className="fixed left-0 bottom-0 w-full h-[1px] bg-white/5 z-50">
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          className="w-full h-full bg-white/60"
        />
      </div>

      {/* PHASE 4 — ARCHITECTURAL GRID + PHASE 9 SCROLL-VISIBLE GUIDES */}
      <div className={`grid-overlay ${showGrid ? "visible" : ""}`} />
      <motion.div
        style={{ opacity: gridScrollOpacity }}
        className="fixed inset-0 pointer-events-none z-[39]"
      >
        <motion.div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: gridDynamicSpacing
        }} />
      </motion.div>

      {/* PHASE 12 STEP 11: STRUCTURAL FLOATING GRID */}
      <motion.div
        style={{ y: structuralGridY }}
        className="fixed -inset-[100%] pointer-events-none z-[38]"
      >
        <div className="w-full h-full opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '10vw 10vh'
        }} />
      </motion.div>

      {/* PHASE 18 STEP 1: GLOBAL LIGHT FIELD SYSTEM */}
      <EnvironmentalSystem />

      {/* PHASE 12 STEP 1: AMBIENT PARTICLE FIELD */}
      <AmbientParticles />

      {/* PHASE 12 STEP 6: SECTION FLOATING SEPARATORS */}
      <motion.div
        style={{ y: sep1Y }}
        className="fixed top-[33vh] left-0 w-full h-px bg-white/[0.03] pointer-events-none z-[38]"
      />
      <motion.div
        style={{ y: sep2Y }}
        className="fixed top-[66vh] left-0 w-full h-px bg-white/[0.03] pointer-events-none z-[38]"
      />

      {/* PHASE 14 STEP 9: COMMAND PALETTE NATIVE BINDING */}
      <CommandPalette />

      {/* PHASE 15 STEP 7: CROSS-SECTION CONTINUITY LINE */}
      <ContinuityLine />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Use suppressHydrationWarning effectively allowing runtime script DOM extensions like class injection
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-white selection:text-black bg-[#000000] text-white overflow-x-hidden uppercase">
        <SceneProvider>
          <LayoutContent>{children}</LayoutContent>
        </SceneProvider>
      </body>
    </html>
  );
}
