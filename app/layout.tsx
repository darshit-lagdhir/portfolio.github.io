"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import "./globals.css";
import SmoothScroll from "@/components/brutalist/SmoothScroll";
import BrutalistNavbar from "@/components/brutalist/BrutalistNavbar";
import AmbientParticles from "@/components/brutalist/AmbientParticles";
import { SceneProvider } from "@/context/SceneContext";
import { CommandPalette, ContinuityLine } from "@/components/brutalist/SystemComponents";

export function CustomCursor() {
  // PHASE 11 STEP 1: CURSOR PHYSICS ENGINE
  const mouse = {
    x: useMotionValue(-100),
    y: useMotionValue(-100),
  };

  // Core dot: FAST response (high stiffness, low damping)
  const dot = {
    x: useSpring(mouse.x, { damping: 25, stiffness: 900, mass: 0.2 }),
    y: useSpring(mouse.y, { damping: 25, stiffness: 900, mass: 0.2 }),
  };

  // Outer ring: DELAYED trailing response (lower stiffness)
  const ring = {
    x: useSpring(mouse.x, { damping: 35, stiffness: 250, mass: 0.5 }),
    y: useSpring(mouse.y, { damping: 35, stiffness: 250, mass: 0.5 }),
  };

  // STEP 6: Proximity light follows cursor (even slower for ambient feel)
  const glow = {
    x: useSpring(mouse.x, { damping: 50, stiffness: 150, mass: 0.8 }),
    y: useSpring(mouse.y, { damping: 50, stiffness: 150, mass: 0.8 }),
  };

  const [cursorVariant, setCursorVariant] = useState("default");
  const [isPressed, setIsPressed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOnDark, setIsOnDark] = useState(true);

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
      {/* STEP 6: CURSOR PROXIMITY LIGHT (dark sections only) */}
      {isOnDark && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9990]"
          style={{
            x: glow.x,
            y: glow.y,
            translateX: "-50%",
            translateY: "-50%",
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)",
          }}
        />
      )}

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

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [showGrid, setShowGrid] = useState(false);

  // PHASE 5 & 7: ADVANCED SCROLL PHYSICS
  const { useVelocity, useSpring, useTransform } = require("framer-motion");
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // STEP 6: Microscopic tilt
  const scrollTiltX = useTransform(smoothVelocity, [-2000, 2000], [-1.5, 1.5]);

  // STEP 10: Reactive Border Brightness
  const borderOpacity = useTransform(smoothVelocity, [-1000, 0, 1000], [0.3, 0.05, 0.3]);

  // STEP 11: Dynamic Spacing Adjustment (Density narrative)
  const layoutLineHeight = useTransform(scrollYProgress, [0, 1], [1.4, 1.3]);
  const layoutLetterSpacing = useTransform(scrollYProgress, [0, 1], ["0em", "-0.01em"]);

  // PHASE 8 STEP 7: DYNAMIC LINE DISPLACEMENT
  const spineDisplaceX = useTransform(smoothVelocity, [-2000, 0, 2000], [-3, 0, 3]);

  // PHASE 9 STEP 9: SCROLL VELOCITY STRETCH
  const velocityStretch = useTransform(smoothVelocity, [-2000, 0, 2000], [0.998, 1, 1.002]);

  // PHASE 9 STEP 11: GRID GUIDES VISIBLE ON SCROLL
  const gridScrollOpacity = useTransform(smoothVelocity, [-800, -200, 0, 200, 800], [0.08, 0.04, 0, 0.04, 0.08]);

  // PHASE 12 STEP 6: FLOATING SEPARATOR PARALLAX
  const sep1Y = useTransform(scrollYProgress, [0, 1], ["0vh", "-15vh"]);
  const sep2Y = useTransform(scrollYProgress, [0, 1], ["0vh", "-10vh"]);

  // PHASE 12 STEP 11: STRUCTURAL FLOATING GRID (SLOWER THAN SCROLL)
  const structuralGridY = useTransform(scrollYProgress, [0, 1], ["0vh", "30vh"]);

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
      <motion.main
        style={{ rotateX: scrollTiltX, lineHeight: layoutLineHeight, letterSpacing: layoutLetterSpacing, scaleY: velocityStretch }}
        className="relative z-10 w-full perspective-root glitch-safe"
      >
        {children}
      </motion.main>
      <CustomCursor />

      {/* PHASE 7: FRAME EDGE REACTIVE SYSTEM (STEP 10) */}
      <motion.div style={{ opacity: borderOpacity }} className="fixed inset-0 border-[1px] border-white pointer-events-none z-50" />

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

      {/* PHASE 4 — ARCHITECTURAL GRID + PHASE 9 SCROLL-VISIBLE GUIDES */}
      <div className={`grid-overlay ${showGrid ? "visible" : ""}`} />
      <motion.div
        style={{ opacity: gridScrollOpacity }}
        className="fixed inset-0 pointer-events-none z-[39]"
      >
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '20vw 20vh'
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
