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
  const ringY = useSpring(mouseY, { damping: 40, stiffness: 400 });

  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as Element;
      setIsHovering(!!target?.closest("a, button, [role='button'], [data-project='true']"));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <>
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovering ? 0 : 1 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full z-[100000] pointer-events-none cursor-invert"
      />
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovering ? 2 : 1 }}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full z-[100000] pointer-events-none cursor-invert"
      />
    </>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <SmoothScroll />
      <BrutalistNavbar />
      <main className="relative z-10 w-full">
        {children}
      </main>
      <CustomCursor />

      {/* SHARP SCROLL INDICATOR — PHASE 3 */}
      <div className="fixed right-0 top-0 h-full w-[1px] bg-white/10 z-50">
        <motion.div
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
          className="w-full h-full bg-white"
        />
      </div>
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-white selection:text-black bg-[#000000] text-white overflow-x-hidden uppercase">
        <SceneProvider>
          <LayoutContent>{children}</LayoutContent>
        </SceneProvider>
      </body>
    </html>
  );
}
