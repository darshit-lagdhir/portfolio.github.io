"use client";

import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/lib/interaction";

interface SectionContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function SectionContainer({ id, children, className, noPadding = false }: SectionContainerProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const [containerRef, isIntersecting] = useIntersectionObserver({ rootMargin: "400px" });

  useEffect(() => {
    if (isIntersecting && !hasEntered) {
      setHasEntered(true);
    }
  }, [isIntersecting, hasEntered]);

  return (
    <motion.section
      ref={containerRef as React.RefObject<HTMLElement>}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "system-container relative",
        !noPadding && "py-sys-48 md:py-sys-64",
        className
      )}
    >
      <AnimatePresence>
        {hasEntered ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        ) : (
          <div className="w-full h-32" /> // Minimal reserve space
        )}
      </AnimatePresence>
    </motion.section>
  );
}
