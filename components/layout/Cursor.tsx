"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScene } from "@/context/SceneContext";
import { useMousePosition } from "@/lib/interaction";

export default function Cursor() {
  const { isLowPerf, isMobile: sceneMobile } = useScene();
  const { x, y, isMobile: interactionMobile, hasMoved } = useMousePosition();
  const [cursorType, setCursorType] = useState<"default" | "hover" | "active">("default");
  const isPointer = !interactionMobile && !sceneMobile;
  
  const shouldReduceMotion = useReducedMotion();

  // Mouse positioning values with spring smoothing
  const springConfig = isLowPerf 
    ? { damping: 40, stiffness: 400, mass: 1 } 
    : { damping: 30, stiffness: 2000, mass: 0.01 };
    
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    if (!isPointer) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="hover"]');
      
      const nextType = isInteractive ? "hover" : "default";
      setCursorType(prev => prev === "active" ? "active" : nextType);
    };

    const handleMouseDown = () => setCursorType("active");
    const handleMouseUp = () => setCursorType("hover");

    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isPointer]);

  useEffect(() => {
    cursorX.set(x);
    cursorY.set(y);
  }, [x, y, cursorX, cursorY]);

  // Disable on mobile/touch or if pointer is not fine
  if (!isPointer || sceneMobile) return null;

  const variants = {
    default: {
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.3)",
      borderWidth: "1px",
    },
    hover: {
      scale: isLowPerf ? 1.5 : 2.5,
      backgroundColor: "var(--color-accent)",
      opacity: isLowPerf ? 0.3 : 0.15,
      borderColor: "transparent",
    },
    active: {
      scale: isLowPerf ? 1.2 : 1.8,
      backgroundColor: "var(--color-accent)",
      opacity: 0.3,
      borderColor: "transparent",
    }
  };

  return (
    <motion.div
      className={cn(
        "custom-cursor fixed top-0 left-0 w-6 h-6 rounded-full border pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-500",
        hasMoved ? "opacity-100" : "opacity-0"
      )}
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        translateZ: 0,
      }}
      variants={variants}
      animate={cursorType}
      transition={{
        type: "spring",
        stiffness: shouldReduceMotion ? 0 : 500,
        damping: 25,
        mass: 0.1
      }}
    >
      {/* Reticle Dot */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: cursorType === 'hover' ? 0 : 1 }}
      >
        <motion.div 
          className="w-1.5 h-1.5 rounded-full"
          animate={{ 
            backgroundColor: cursorType === 'active' ? "var(--color-accent)" : "rgba(255, 255, 255, 0.8)",
            scale: cursorType === 'active' ? 1.5 : 1
          }}
        />
      </motion.div>
    </motion.div>
  );
}
