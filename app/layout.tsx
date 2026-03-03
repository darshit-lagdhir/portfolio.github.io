"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import "./globals.css";
import SmoothScroll from "@/components/brutalist/SmoothScroll";
import BrutalistNavbar from "@/components/brutalist/BrutalistNavbar";
import { SceneProvider } from "@/context/SceneContext";

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { damping: 30, stiffness: 800 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 800 });
  const ringX = useSpring(mouseX, { damping: 40, stiffness: 400 });
  // PHASE 4 — REFINED CURSOR MOTION VALUES
  const mouse = {
    x: useMotionValue(-100),
    y: useMotionValue(-100),
  };
  const ring = {
    x: useSpring(mouse.x, { damping: 40, stiffness: 400 }),
    y: useSpring(mouse.y, { damping: 40, stiffness: 400 }),
  };

  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const moveMouse = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);

      // STATE DETECTION
      const target = e.target as HTMLElement;
      const isLink = target.closest("a, button, [role='button']");
      const isProject = target.closest("[data-project='true']");
      const isWhiteSection = target.closest(".bg-white");

      if (isProject) setCursorVariant("project");
      else if (isLink) setCursorVariant("link");
      else setCursorVariant("default");

      // INVERSION LOGIC
      if (isWhiteSection) document.body.classList.add("cursor-invert");
      else document.body.classList.remove("cursor-invert");
    };

    window.addEventListener("mousemove", moveMouse, { passive: true });
    return () => window.removeEventListener("mousemove", moveMouse);
  }, [mouse.x, mouse.y]);

  const variants = {
    default: {
      width: 40,
      height: 40,
      borderRadius: "100%",
      borderWidth: "1px",
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
    link: {
      width: 80,
      height: 80,
      borderRadius: "100%",
      borderWidth: "1px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    project: {
      width: 100,
      height: 100,
      borderRadius: "4px",
      borderWidth: "2px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
  };

  if (!isMounted) return null;

  return (
    <>
      {/* PHASE 4 — REFINED CURSOR */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: mouse.x, y: mouse.y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 border border-white pointer-events-none z-[9998] mix-blend-difference"
        animate={cursorVariant}
        variants={variants}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
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
        style={{ rotateX: scrollTiltX, lineHeight: layoutLineHeight, letterSpacing: layoutLetterSpacing }}
        className="relative z-10 w-full perspective-root"
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

      {/* PHASE 4 — ARCHITECTURAL GRID */}
      <div className={`grid-overlay ${showGrid ? "visible" : ""}`} />
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
