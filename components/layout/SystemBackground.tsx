"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScene } from "@/context/SceneContext";
import { cn } from "@/lib/utils";

export default function SystemBackground() {
  const { isMobile, isLowPerf, isIdle } = useScene();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isLowPerf || isMobile ? 0.1 : (isIdle ? 0.15 : 0.4) 
      }}
      transition={{ duration: 2, ease: "easeOut" }}
      className={cn(
        "system-bg-grid fixed inset-0 pointer-events-none z-[-10] transition-opacity duration-1000",
        (isLowPerf || isMobile) && "bg-attachment-scroll mask-none"
      )}
      aria-hidden="true"
    />
  );
}
