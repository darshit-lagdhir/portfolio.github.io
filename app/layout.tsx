"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useVelocity, AnimatePresence, MotionValue } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";
import SmoothScroll from "@/components/brutalist/SmoothScroll";
import BrutalistNavbar from "@/components/brutalist/BrutalistNavbar";
import EnvironmentalSystem from "@/components/brutalist/EnvironmentalSystem";
import { SceneProvider, useScene } from "@/context/SceneContext";
import { CommandPalette, ContinuityLine, SystemStateIndicator, SectionGridShift } from "@/components/brutalist/SystemComponents";
import AmbientParticles from "@/components/brutalist/AmbientParticles";

const MICRO_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function CustomCursor() {
  const mouse = {
    x: useMotionValue(-100),
    y: useMotionValue(-100),
  };

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY as MotionValue<number>);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // PHASE 35: KINETIC STRETCH (Step 11)
  const stretchY = useTransform(smoothVelocity, [-2000, 0, 2000], [0.6, 1, 0.6]);
  const stretchX = useTransform(smoothVelocity, [-2000, 0, 2000], [1.4, 1, 1.4]);

  const { lastDiscoveryTime } = useScene();
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isRecentDiscovery, setIsRecentDiscovery] = useState(false);
  const [depthScale, setDepthScale] = useState(1);
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorOpacity, setCursorOpacity] = useState(1);

  // PHASE 35: INACTIVITY FADE (Step 12)
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMove = () => {
      setCursorOpacity(1);
      clearTimeout(timeout);
      timeout = setTimeout(() => setCursorOpacity(0.35), 3000);
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!lastDiscoveryTime) {
        setIsRecentDiscovery(false);
        return;
      }
      setIsRecentDiscovery(true);
    });

    const timer = setTimeout(() => {
      requestAnimationFrame(() => setIsRecentDiscovery(false));
    }, 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [lastDiscoveryTime]);

  // PHASE 34: INTERACTION RESISTANCE ARBITER
  const isResistant = cursorVariant === "nav" || cursorVariant === "project";
  const resistanceSpring = useMemo(() => ({ 
    damping: isResistant ? 80 : 35, 
    stiffness: isResistant ? 80 : 250 
  }), [isResistant]);

  // Core dot: FAST response
  const dot = {
    x: useSpring(mouse.x, { damping: 20, stiffness: 1000, mass: 0.1 }),
    y: useSpring(mouse.y, { damping: 20, stiffness: 1000, mass: 0.1 }),
  };

  // Outer ring: SMOOTH trailing response
  const ring = {
    x: useSpring(mouse.x, resistanceSpring),
    y: useSpring(mouse.y, resistanceSpring),
  };

  const [isPressed, setIsPressed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // PHASE 35: TRAIL PARTICLES (Step 9)
  const [trails, setTrails] = useState<{ x: number, y: number, id: number }[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    requestAnimationFrame(() => setIsMounted(true));
    if (window.matchMedia("(hover: none)").matches || window.innerWidth < 768) return;

    const moveMouse = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      // STATE DETECTION REFINEMENT
      const target = e.target as HTMLElement;
      const isNav = !!target.closest("a, button, [role='button'], .nav-item, .magnetic-btn");
      const isProject = !!target.closest("[data-project='true']");
      const isText = !!target.closest("h1, h2, h3, p, .text-massive, .text-large, .kinetic-letter");
      const isWhite = !!target.closest(".bg-white");

      // Magnetic Convergence (Step 7)
      const interactables = document.querySelectorAll(".magnetic-btn, [data-project='true']");
      interactables.forEach(el => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2));
        const radius = htmlEl.getAttribute('data-project') === 'true' ? 400 : 150;

        if (dist < radius) {
          // GENTLE DRIFT (Step 7)
          const cursorPull = htmlEl.classList.contains('magnetic-btn') ? 0.15 : 0.03;
          targetX += (cx - e.clientX) * cursorPull;
          targetY += (cy - e.clientY) * cursorPull;

          const elPull = htmlEl.classList.contains('magnetic-btn') ? 0.35 : 0.08;
          htmlEl.style.setProperty('--magnet-x', `${(e.clientX - cx) * elPull}px`);
          htmlEl.style.setProperty('--magnet-y', `${(e.clientY - cy) * elPull}px`);
          if (isProject) {
            htmlEl.style.setProperty('--tilt-x', `${-(e.clientY - cy) / radius * 8}deg`);
            htmlEl.style.setProperty('--tilt-y', `${(e.clientX - cx) / radius * 8}deg`);
          }
        } else {
          htmlEl.style.setProperty('--magnet-x', '0px');
          htmlEl.style.setProperty('--magnet-y', '0px');
          if (isProject) {
            htmlEl.style.setProperty('--tilt-x', '0deg');
            htmlEl.style.setProperty('--tilt-y', '0deg');
          }
        }
      });

      mouse.x.set(targetX);
      mouse.y.set(targetY);

      // Trail generation on fast movement
      if (Math.abs(scrollVelocity.get()) > 100) {
        setTrails(prev => [{ x: e.clientX, y: e.clientY, id: Date.now() }, ...prev].slice(0, 8));
      }

      // Depth Mapping (Step 10)
      if (target.closest(".z-depth-front")) setDepthScale(1.4);
      else if (target.closest(".z-depth-far")) setDepthScale(0.7);
      else setDepthScale(1);

      if (isProject) {
        setCursorVariant("project");
        setCursorLabel("VIEW_ARCHIVE");
      } else if (isNav) {
        setCursorVariant("nav");
        setCursorLabel("");
      } else if (isText) {
        setCursorVariant("text");
        setCursorLabel("");
      } else {
        setCursorVariant("default");
        setCursorLabel("");
      }

      if (isWhite) document.body.classList.add("cursor-invert");
      else document.body.classList.remove("cursor-invert");
    };

    window.addEventListener("mousemove", moveMouse, { passive: true });
    window.addEventListener("mousedown", () => setIsPressed(true));
    window.addEventListener("mouseup", () => setIsPressed(false));
    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", () => setIsPressed(true));
      window.removeEventListener("mouseup", () => setIsPressed(false));
    };
  }, [mouse.x, mouse.y, scrollVelocity]);

  // Trail cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setTrails(prev => prev.slice(0, -1));
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    default: { width: 32, height: 32, borderWidth: "1px", backgroundColor: "transparent", borderColor: "white" },
    nav: { width: 64, height: 64, borderWidth: "2px", backgroundColor: "rgba(255,255,255,0.08)", borderColor: "white" },
    project: { width: 120, height: 120, borderWidth: "1px", backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.4)" },
    text: { width: 2, height: 40, borderWidth: "0px", backgroundColor: "white", borderColor: "transparent" },
  };

  if (!isMounted) return null;
  if (typeof window !== 'undefined' && (window.matchMedia("(hover: none)").matches || window.innerWidth < 768)) return null;

  return (
    <>
      <AnimatePresence>
        {trails.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0.2, scale: 0.5 }}
            animate={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[9997]"
            style={{ x: t.x, y: t.y, translateX: "-50%", translateY: "-50%" }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          scale: (isPressed ? 0.6 : 1) * depthScale,
          opacity: (cursorVariant === "text" || cursorVariant === "project") ? 0 : cursorOpacity
        }}
        style={{ x: dot.x, y: dot.y, translateX: "-50%", translateY: "-50%", width: 14, height: 14 }}
      />

      <motion.div
        className="fixed top-0 left-0 border pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center overflow-hidden"
        animate={{
          ...variants[cursorVariant as keyof typeof variants],
          scale: (isPressed ? 0.85 : (isRecentDiscovery ? 1.4 : 1)) * depthScale,
          opacity: cursorOpacity,
        }}
        style={{ 
          x: ring.x, 
          y: ring.y, 
          translateX: "-50%", 
          translateY: "-50%",
          scaleX: cursorVariant === "default" ? stretchX : 1,
          scaleY: cursorVariant === "default" ? stretchY : 1
        }}
      >
        <AnimatePresence>
          {cursorLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="text-[10px] font-ui font-black tracking-[0.4em] text-white pt-1"
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

// PHASE 25 STEP 13: MOBILE TOUCH FEEDBACK (Tap Ripple)
function TapRipple() {
  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleTap = (e: MouseEvent | TouchEvent) => {
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      const newRipple = { x, y, id: idRef.current++ };
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
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!lastDiscoveryTime) {
        setIsActive(false);
        return;
      }
    });

    const check = () => {
        if (!lastDiscoveryTime) return;
        const diff = Date.now() - lastDiscoveryTime;
        requestAnimationFrame(() => {
            if (diff < 2000) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        });
    };
    check();
    const interval = setInterval(check, 100);
    return () => {
        cancelAnimationFrame(frame);
        clearInterval(interval);
    };
  }, [lastDiscoveryTime]);

  if (!isActive) return null;

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

// PHASE 21 STEP 9: CROSS-PAGE CONNECTION
function CrossPageContinuity() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Satisfy set-state-in-effect lint by using an animation frame or effect
    const frame = requestAnimationFrame(() => setIsVisible(true));
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => {
        cancelAnimationFrame(frame);
        clearTimeout(timer);
    };
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

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { scrollY, scrollYProgress } = useScroll();
  const { interactionCount, lastDiscoveryTime } = useScene();

  // PHASE 5 & 7: ADVANCED SCROLL PHYSICS
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // STEP 6: Microscopic tilt
  const scrollTiltX = useTransform(smoothVelocity, [-2000, 2000], [-1.5, 1.5]);

  // STEP 10: Reactive Border Brightness
  const baseBorderOpacity = useTransform(smoothVelocity, [-1000, 0, 1000], [0.3, 0.05, 0.3]);
  const slowScrollPulse = useTransform(smoothVelocity, [-50, 0, 50], [0.4, 0, 0.4]);
  const borderOpacity = useTransform([baseBorderOpacity, slowScrollPulse], ([base, pulse]) => Math.max(base as number, pulse as number));

  // STEP 11: Dynamic Spacing Adjustment (Density narrative)
  const layoutLineHeight = useTransform(scrollYProgress, [0, 1], [1.4, 1.3]);
  const layoutLetterSpacing = useTransform(scrollYProgress, [0, 1], ["0em", "-0.01em"]);

  // PHASE 9 STEP 9: SCROLL VELOCITY STRETCH
  const velocityStretch = useTransform(smoothVelocity, [-2000, 0, 2000], [0.998, 1, 1.002]);

  // PHASE 17 STEP 4 & 10: VIEWPORT FRAME SHIFT & GRID ADJUST
  const gridSpacing = useTransform(scrollYProgress, [0, 1], ["20vw", "18vw"]);

  // PHASE 12 STEP 6: FLOATING SEPARATOR PARALLAX
  const sep1Y = useTransform(scrollYProgress, [0, 1], ["0vh", "-15vh"]);
  const sep2Y = useTransform(scrollYProgress, [0, 1], ["0vh", "-10vh"]);

  // PHASE 12 STEP 11: STRUCTURAL FLOATING GRID (SLOWER THAN SCROLL)
  const structuralGridY = useTransform(scrollYProgress, [0, 1], ["0vh", "30vh"]);

  // PHASE 22: TRANSFORM CACHING
  const gridBackgroundSize = useTransform(gridSpacing, (s: string) => s ? `${s} ${s}` : '20vw 20vw');

  // PHASE 19 STEP 11: SYSTEM STATE INDICATOR LOGIC
  const [systemActive, setSystemActive] = useState(false);
  useEffect(() => {
    if (interactionCount > 0 && interactionCount % 15 === 0) {
      const frame = requestAnimationFrame(() => setSystemActive(true));
      const timer = setTimeout(() => setSystemActive(false), 2000);
      return () => {
          cancelAnimationFrame(frame);
          clearTimeout(timer);
      };
    }
  }, [interactionCount]);

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

      <CrossPageContinuity />

      <motion.main
        style={{
          rotateX: scrollTiltX,
          lineHeight: layoutLineHeight,
          letterSpacing: layoutLetterSpacing,
          scaleY: velocityStretch,
          borderColor: `rgba(255,255,255,${borderOpacity.get()})`
        }}
        className={`relative z-10 w-full perspective-root glitch-safe transition-all duration-500`}
      >
        {children}
      </motion.main>
      <CustomCursor />

      {/* REINFORCED STRUCTURAL GRID */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
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

      {/* PHASE 12 STEP 11: STRUCTURAL FLOATING GRID */}
      <motion.div
        style={{ y: structuralGridY }}
        className="fixed inset-0 pointer-events-none z-[38] overflow-hidden"
      >
        <div className="w-full h-full opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '10vw 10vh'
        }} />
      </motion.div>

      <EnvironmentalSystem />
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

      <CommandPalette />
      <ContinuityLine />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
