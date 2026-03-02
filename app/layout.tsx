"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "./globals.css";
import SmoothScroll from "@/components/brutalist/SmoothScroll";
import BrutalistNavbar from "@/components/brutalist/BrutalistNavbar";
import { SceneProvider, useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // PHASE 2 — PRECISION CALIBRATION
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 450 }); // Higher stiffness for zero-lag feeling
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 450 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as Element;
      setIsHovering(!!target?.closest("a, button, [role='button'], [data-project='true']"));
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

  if (!isMounted) return null;

  return (
    <motion.div
      style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        scale: isClicking ? 0.7 : isHovering ? 2.2 : 1,
        borderWidth: isHovering ? "1px" : "1px",
        opacity: isHovering ? 0.4 : 0.2
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white mix-blend-difference z-[99999] pointer-events-none flex items-center justify-center"
    >
      <motion.div
        animate={{ scale: isHovering ? 0 : 1 }}
        className="w-[2px] h-[2px] bg-white rounded-full opacity-60"
      />
    </motion.div>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const { activeSection } = useScene();

  // PHASE 2 — SCROLL VELOCITY ENGINE (FOR SMART MOTION)
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    let lastY = 0;
    const updateVelocity = () => {
      const currentY = scrollY.get();
      const diff = Math.abs(currentY - lastY);
      setVelocity(Math.min(diff / 50, 1)); // Normalized 0-1
      lastY = currentY;
    };
    const unsubscribe = scrollY.onChange(updateVelocity);
    return () => unsubscribe();
  }, [scrollY]);

  // COMPRESSED PARALLAX — PHASE 2
  const bgTranslateY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const mainOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]); // Smooth entry for everything

  return (
    <>
      <SmoothScroll />

      {/* GLOBAL DARKNESS */}
      <div className="fixed inset-0 z-[-5] bg-[#030303]" />

      {/* PHASE 2: SUBTLE ARCHITECTURAL GRID */}
      <motion.div
        style={{ y: bgTranslateY, opacity: useTransform(scrollYProgress, [0, 1], [0.06, 0.02]) }}
        className="fixed inset-[-5%] z-[-4] pointer-events-none grid-blueprint"
      />

      <BrutalistNavbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={activeSection}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.6, ease: GLOBAL_EASE }}
          className="relative z-10 w-full min-h-screen" // Removed top padding for Hero centering
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <CustomCursor />

      <div className="env-grain" />

      {/* PRECISION SCROLL PROGRESS — PHASE 2 */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 h-[12vh] w-[1px] bg-white/5 z-50">
        <motion.div
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
          className="w-full h-full bg-white/20"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-px bg-white/10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px bg-white/10" />
      </div>
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-white selection:text-black bg-[#030303] text-white overflow-x-hidden">
        <SceneProvider>
          <LayoutContent>{children}</LayoutContent>
        </SceneProvider>
      </body>
    </html>
  );
}
