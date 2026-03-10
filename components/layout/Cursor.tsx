"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Cursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "active">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  
  const shouldReduceMotion = useReducedMotion();

  // Mouse positioning values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ultra-responsive spring physics to match mouse speed precisely
  const springConfig = { damping: 40, stiffness: 800, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device uses a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsPointer(mediaQuery.matches);

    const updatePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="hover"]');
      
      if (isInteractive) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseDown = () => setCursorType("active");
    const handleMouseUp = () => setCursorType("hover");

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", updatePosition);
      window.addEventListener("mouseover", handleMouseOver);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      
      // Add class to body to hide native cursor
      document.body.classList.add("custom-cursor-active");
    }

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY, isVisible]);

  // Disable on mobile/touch
  if (!isPointer) return null;

  const variants = {
    default: {
      scale: 1,
      backgroundColor: "transparent",
      borderColor: "var(--color-border-bright)",
      borderWidth: "1px",
    },
    hover: {
      scale: 2.5,
      backgroundColor: "var(--color-accent)",
      opacity: 0.15,
      borderColor: "transparent",
    },
    active: {
      scale: 1.8,
      backgroundColor: "var(--color-accent)",
      opacity: 0.3,
      borderColor: "transparent",
    }
  };

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 w-6 h-6 rounded-full border pointer-events-none z-[9999] mix-blend-difference",
        !isVisible && "opacity-0"
      )}
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      variants={variants}
      animate={cursorType}
      transition={{
        type: "spring",
        stiffness: shouldReduceMotion ? 0 : 400,
        damping: 30,
        mass: 0.8
      }}
    >
      {/* Reticle Dot */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: cursorType === 'hover' ? 0 : 1 }}
      >
        <motion.div 
          className="w-1 h-1 rounded-full"
          animate={{ backgroundColor: cursorType === 'active' ? "var(--color-accent)" : "var(--color-text-secondary)" }}
        />
      </motion.div>
    </motion.div>
  );
}
