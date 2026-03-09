"use client";

import { motion, useSpring, useTransform, useScroll, useVelocity, useMotionTemplate } from "framer-motion";
import { useEffect, useState, memo } from "react";
import "./globals.css";
import SmoothScroll from "@/components/brutalist/SmoothScroll";
import BrutalistNavbar from "@/components/brutalist/BrutalistNavbar";
import EnvironmentalSystem from "@/components/brutalist/EnvironmentalSystem";
import { SceneProvider, useScene } from "@/context/SceneContext";
import { CommandPalette, ContinuityLine, SystemStateIndicator, SectionGridShift } from "@/components/brutalist/SystemComponents";
import { clashDisplay, panchang, hkGroteskWide, spaceGrotesk } from "@/lib/fonts";
import AmbientParticles from "@/components/brutalist/AmbientParticles";
import CustomCursor from "@/components/brutalist/CustomCursor";
import { TapRipple, DiscoveryFeedbackDot, CrossPageContinuity, ScrollProgressIndicator } from "@/components/brutalist/InteractionLayers";


// PHASE 40 STEP 7: COMPONENT RENDER DISCIPLINE
const OptimizedNavbar = memo(BrutalistNavbar);
const OptimizedEnvironmental = memo(EnvironmentalSystem);
const OptimizedParticles = memo(AmbientParticles);

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { scrollY, scrollYProgress } = useScroll();
  const { interactionCount, lastDiscoveryTime, isLowPerf, isMobile } = useScene();

  // PHASE 40 STEP 4 & 6: THROTTLED SCROLL CALCULATIONS
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // STEP 6: GPU-Accelerated Micro-tilt
  const scrollTiltX = useTransform(smoothVelocity, [-2000, 2000], [-1.5, 1.5]);

  // STEP 10: Performance-optimized Border Brightness
  const baseBorderOpacity = useTransform(smoothVelocity, [-1000, 0, 1000], [0.3, 0.05, 0.3]);
  const slowScrollPulse = useTransform(smoothVelocity, [-50, 0, 50], [0.4, 0, 0.4]);
  const borderOpacityValue = useTransform([baseBorderOpacity, slowScrollPulse], ([base, pulse]) => Math.max(base as number, pulse as number));
  const borderOpacity = useMotionTemplate`rgba(255,255,255,${borderOpacityValue})`;

  // PHASE 40 STEP 3: TRANSFORM-BASED DENSITY EFFECTS
  const layoutLineHeight = useTransform(scrollYProgress, [0, 1], [1.4, 1.3]);
  const layoutLetterSpacing = useTransform(scrollYProgress, [0, 1], ["0em", "-0.01em"]);
  const velocityStretch = useTransform(smoothVelocity, [-2000, 0, 2000], [0.998, 1, 1.002]);

  // PHASE 40 STEP 2: CONSOLIDATED GRID SYSTEM
  const gridSpacing = useTransform(scrollYProgress, [0, 1], ["20vw", "18vw"]);
  const gridBackgroundSize = useTransform(gridSpacing, (s: string) => s ? `${s} ${s}` : '20vw 20vw');
  const structuralGridY = useTransform(scrollYProgress, [0, 1], ["0vh", "30vh"]);

  // PHASE 40 STEP 16: SYSTEM STATE INDICATOR THROTTLING
  const [systemActive, setSystemActive] = useState(false);
  useEffect(() => {
    if (interactionCount > 0 && interactionCount % 15 === 0) {
      setSystemActive(true);
      const timer = setTimeout(() => setSystemActive(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [interactionCount]);

  return (
    <>
      <SmoothScroll />
      <OptimizedNavbar />
      <SystemStateIndicator active={systemActive} />

      {/* PHASE 40 STEP 2: MINIMIZED OVERLAY LAYERS */}
      <div className="film-grain-overlay pointer-events-none" />
      <div className="cinematic-light-layer pointer-events-none" />

      <TapRipple />
      <DiscoveryFeedbackDot key={lastDiscoveryTime} />
      <CrossPageContinuity />

      <motion.main
        style={{
          rotateX: scrollTiltX,
          scaleY: velocityStretch,
          borderColor: borderOpacity
        }}
        className="relative z-10 w-full perspective-root glitch-safe"
      >
        {children}
      </motion.main>

      <CustomCursor />

      {/* PHASE 40 STEP 10: OPTIMIZED STRUCTURAL GRIDS */}
      {!isLowPerf && (
        <motion.div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]">
          <motion.div
             className="w-full h-full"
             style={{
               backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)`,
               backgroundSize: gridBackgroundSize,
               y: structuralGridY
             }}
          />
        </motion.div>
      )}

      {/* PHASE 47: PERFORMANCE-BASED CONDITIONALS */}
      {!isLowPerf && <OptimizedEnvironmental />}
      {!isMobile && !isLowPerf && <OptimizedParticles />}

      <CommandPalette />
      <ContinuityLine />
      <ScrollProgressIndicator />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${clashDisplay.variable} ${panchang.variable} ${hkGroteskWide.variable} ${spaceGrotesk.variable}`}>
      <body className={`antialiased selection:bg-white selection:text-black bg-[#000000] text-white overflow-x-hidden uppercase ${spaceGrotesk.className}`}>
        <SceneProvider>
          <LayoutContent>{children}</LayoutContent>
        </SceneProvider>
      </body>
    </html>
  );
}
