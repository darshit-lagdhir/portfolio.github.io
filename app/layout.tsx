"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useVelocity, AnimatePresence, useMotionTemplate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";
import SmoothScroll from "@/components/brutalist/SmoothScroll";
import BrutalistNavbar from "@/components/brutalist/BrutalistNavbar";
import AmbientParticles from "@/components/brutalist/AmbientParticles";
import EnvironmentalSystem from "@/components/brutalist/EnvironmentalSystem";
import { SceneProvider, useScene } from "@/context/SceneContext";
import { CommandPalette, ContinuityLine, SystemStateIndicator, ScrollProgressIndicator, SectionGridShift } from "@/components/brutalist/SystemComponents";

const MICRO_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function CustomCursor() {
  // PHASE 11 STEP 1: CURSOR PHYSICS ENGINE
  const mouse = {
    x: useMotionValue(-100),
    y: useMotionValue(-100),
  };

  // Core dot: FAST response (EXTREME precision)
  const dot = {
    x: useSpring(mouse.x, { damping: 20, stiffness: 1000, mass: 0.1 }),
    y: useSpring(mouse.y, { damping: 20, stiffness: 1000, mass: 0.1 }),
  };

  // Outer ring: SMOOTH trailing response (PHASE 25 STEP 2: SILKY lag)
  const ring = {
    x: useSpring(mouse.x, { damping: 45, stiffness: 120, mass: 0.8 }),
    y: useSpring(mouse.y, { damping: 45, stiffness: 120, mass: 0.8 }),
  };

  // STEP 6: Proximity light follows cursor (Ultra-smooth ambient)
  const glow = {
    x: useSpring(mouse.x, { damping: 60, stiffness: 80, mass: 1 }),
    y: useSpring(mouse.y, { damping: 60, stiffness: 80, mass: 1 }),
  };

  const { lastDiscoveryTime } = useScene();
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isPressed, setIsPressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOnDark, setIsOnDark] = useState(true);

  // PHASE 25 STEP 4 & 5: MAGNETIC REACTION ARBITER
  const [targetCenter, setTargetCenter] = useState<{ x: number, y: number } | null>(null);

  const signalRotation = useTransform(() => {
    if (!targetCenter) return "0rad";
    const dx = targetCenter.x - dot.x.get();
    const dy = targetCenter.y - dot.y.get();
    return Math.atan2(dy, dx) + "rad";
  });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches || window.innerWidth < 768) {
      setIsMounted(true);
      return;
    }

    setIsMounted(true);

    const moveMouse = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);

      // STEP 4 & 5: MAGNETIC RESPONSE ENGINE
      const interactables = document.querySelectorAll(".magnetic-btn, [data-project='true']");
      interactables.forEach(el => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2));

        const htmlEl = el as HTMLElement;
        const isProject = htmlEl.getAttribute('data-project') === 'true';
        const radius = isProject ? 300 : 150;

        if (dist < radius) {
          const pull = isProject ? 0.05 : 0.15; // Panels are heavier
          const dx = (e.clientX - cx) * pull;
          const dy = (e.clientY - cy) * pull;
          htmlEl.style.setProperty('--magnet-x', `${dx}px`);
          htmlEl.style.setProperty('--magnet-y', `${dy}px`);

          // STEP 5: Perspective shift for panels
          if (isProject) {
            const rotX = -(e.clientY - cy) / radius * 5;
            const rotY = (e.clientX - cx) / radius * 5;
            htmlEl.style.setProperty('--tilt-x', `${rotX}deg`);
            htmlEl.style.setProperty('--tilt-y', `${rotY}deg`);
          }
        } else {
          htmlEl.style.setProperty('--magnet-x', `0px`);
          htmlEl.style.setProperty('--magnet-y', `0px`);
          if (isProject) {
            htmlEl.style.setProperty('--tilt-x', `0deg`);
            htmlEl.style.setProperty('--tilt-y', `0deg`);
          }
        }
      });

      // STATE DETECTION REFINEMENT
      const target = e.target as HTMLElement;
      const isLink = target.closest("a, button, [role='button'], .nav-item");
      const isProject = target.closest("[data-project='true']");
      const isLargeText = target.closest("h1, h2, h3, .text-massive, .text-large");
      const isWhiteSection = target.closest(".bg-white");

      if (isDragging) setCursorVariant("drag");
      else if (isProject) setCursorVariant("project");
      else if (isLargeText) setCursorVariant("text");
      else if (isLink) setCursorVariant("nav");
      else setCursorVariant("default");

      const isInteractable = isLink || isProject || target.closest("button");
      if (isInteractable) {
        const rect = isInteractable.getBoundingClientRect();
        setTargetCenter({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      } else {
        setTargetCenter(null);
      }

      setIsOnDark(!isWhiteSection);
      if (isWhiteSection) document.body.classList.add("cursor-invert");
      else document.body.classList.remove("cursor-invert");
    };

    const onDown = () => { setIsPressed(true); setIsDragging(true); };
    const onUp = () => { setIsPressed(false); setIsDragging(false); };

    window.addEventListener("mousemove", moveMouse, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mouse.x, mouse.y, isDragging]);

  // PHASE 25 STEP 1, 7, 9: CURSOR SCALE REACTION & STATES
  const variants = {
    default: {
      width: 32,
      height: 32,
      borderRadius: "100%",
      borderWidth: "1px",
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderColor: "rgba(255, 255, 255, 1)",
    },
    nav: {
      width: 48,
      height: 48,
      borderRadius: "100%",
      borderWidth: "1px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 1)",
    },
    project: {
      width: 80,
      height: 80,
      borderRadius: "100%",
      borderWidth: "1px",
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderColor: "rgba(255, 255, 255, 0.4)",
    },
    text: {
      width: 4,
      height: 40,
      borderRadius: "2px",
      borderWidth: "0px",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderColor: "rgba(255, 255, 255, 0)",
    },
    drag: {
      width: 60,
      height: 60,
      borderRadius: "100%",
      borderWidth: "1px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderColor: "rgba(255, 255, 255, 1)",
    }
  };

  if (!isMounted) return null;
  // Bypass completely on mobile
  if (typeof window !== 'undefined' && (window.matchMedia("(hover: none)").matches || window.innerWidth < 768)) return null;

  return (
    <>
      {/* CORE DOT — fast physics */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          scale: isPressed ? 0.6 : 1,
          opacity: cursorVariant === "text" ? 0 : 1 // Hide dot on text
        }}
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

      {/* OUTER RING — trailing physics (PHASE 27 STEP 4 & 10: CURSOR CONFIRMATION & DISCOVERY) */}
      <motion.div
        className="fixed top-0 left-0 border pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center"
        key={lastDiscoveryTime}
        animate={{
          ...variants[cursorVariant as keyof typeof variants],
          scale: isPressed
            ? (cursorVariant === "project" || cursorVariant === "nav" ? 1.25 : 0.8)
            : (Date.now() - (lastDiscoveryTime || 0) < 1000 ? 1.4 : 1),
          borderWidth: isPressed ? "2px" : variants[cursorVariant as keyof typeof variants].borderWidth,
          opacity: isPressed ? 1 : 0.8,
          borderColor: (Date.now() - (lastDiscoveryTime || 0) < 1000) ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)"
        }}
        transition={{
          duration: 0.2,
          ease: [0.16, 1, 0.3, 1],
          scale: { type: "spring", stiffness: 800, damping: 25, mass: 0.5 }
        }}
        style={{ x: ring.x, y: ring.y, translateX: "-50%", translateY: "-50%" }}
      >
        {/* PHASE 25 STEP 9: PROJECT ARROW INDICATOR */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 opacity-0"
          animate={{ opacity: cursorVariant === "project" ? 1 : 0, x: cursorVariant === "project" ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </motion.svg>
      </motion.div>

      {/* PHASE 25 STEP 6 & PHASE 28 STEP 9: CURSOR HOVER LIGHT (Atmospheric Spotlight) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9000] mix-blend-screen rounded-full"
        animate={{
          opacity: (cursorVariant === "project" || cursorVariant === "text" || cursorVariant === "nav") ? 0.25 : 0.05,
          scale: cursorVariant === "project" ? 1.8 : 1.2,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          width: 400,
          height: 400,
          x: glow.x,
          y: glow.y,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)"
        }}
      />
    </>
  );
}

// PHASE 25 STEP 13: MOBILE TOUCH FEEDBACK (Tap Ripple)
function TapRipple() {
  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);
  let id = useRef(0);

  useEffect(() => {
    const handleTap = (e: MouseEvent | TouchEvent) => {
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      const newRipple = { x, y, id: id.current++ };
      setRipples(prev => [...prev, newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener("mousedown", handleTap);
    window.addEventListener("touchstart", handleTap, { passive: true });
    return () => {
      window.removeEventListener("mousedown", handleTap);
      window.removeEventListener("touchstart", handleTap);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-12 h-12 border border-white/30 rounded-full"
            style={{ left: r.x - 24, top: r.y - 24 }}
          />
        ))}
      </AnimatePresence>
    </div>
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
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 4, 0], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1.2, ease: "circOut" }}
        className="fixed pointer-events-none z-[300] w-2 h-2 rounded-full bg-white blur-[2px]"
        style={{ left: mousePos.x, top: mousePos.y, x: "-50%", y: "-50%" }}
      />
      {/* PHASE 27 STEP 10: RAPID TACTILE SENSOR BURST */}
      <motion.div
        initial={{ scale: 0, opacity: 1, borderWidth: "2px" }}
        animate={{ scale: 6, opacity: 0, borderWidth: "0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed pointer-events-none z-[299] w-4 h-4 rounded-full border-white"
        style={{ left: mousePos.x, top: mousePos.y, x: "-50%", y: "-50%" }}
      />
    </>
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
        // PHASE 25 STEP 11: CURSOR TRAIL REDUCTION (Reduced to 5 very subtle dots)
        setTrail(prev => [...prev.slice(-3), { x: e.clientX, y: e.clientY, id: id++ }]);
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
          initial={{ opacity: 0.15, scale: 0.8 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.4 }}
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

// PHASE 21 STEP 1 & PHASE 28 STEP 8: GLOBAL STRUCTURAL NETWORK & GLOW
function GlobalStructuralNetwork() {
  return null;
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

  // PHASE 27 STEP 9 & PHASE 28 STEP 5: GRID TEXTURE CALIBRATION
  const gridFocusOpacity = useTransform(attentionScore, [0, 1], [0.015, 0.04]);

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

      {/* PHASE 28 STEP 1 & 2: GLOBAL ATMOSPHERIC LAYERS */}
      <div className="film-grain-overlay" />
      <div className="cinematic-light-layer" />

      {/* PHASE 20 & 21: INTERFACE NETWORK LAYERS */}
      <TapRipple />
      <SectionGridShift />
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

      {/* PHASE 21 STEP 8 & PHASE 27 STEP 9: REINFORCED STRUCTURAL GRID (Reactive Texture) */}
      <motion.div
        style={{ opacity: gridFocusOpacity }}
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
      >
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
      </motion.div>

      {/* ALL EDGE LINES REMOVED — CLEAN VIEWPORT */}

      {/* PHASE 12 STEP 11: STRUCTURAL FLOATING GRID (FIXED: removed -inset-[100%] overflow) */}
      <motion.div
        style={{ y: structuralGridY }}
        className="fixed inset-0 pointer-events-none z-[38] overflow-hidden"
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
