"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DiscoveryHintProps {
  label: string;
  href: string;
  description?: string;
  className?: string;
  orientation?: "left" | "right" | "center";
}

export default function DiscoveryHint({ 
  label, 
  href, 
  description, 
  className,
  orientation = "left"
}: DiscoveryHintProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "group flex flex-col gap-sys-12",
        orientation === "right" && "items-end text-right",
        orientation === "center" && "items-center text-center",
        className
      )}
    >
      <Link href={href} className="inline-flex items-center gap-sys-16 focus:outline-none active:opacity-70 transition-opacity">
        <motion.div 
          whileTap={{ scale: 0.96 }}
          className="flex flex-col"
        >
          <span className="type-metadata text-[0.4rem] text-accent/40 tracking-[0.3em] font-mono mb-sys-4 uppercase group-hover:text-accent group-hover:opacity-100 transition-all duration-200">
            PATH:RESOLVE
          </span>
          <span className="type-nav text-[0.6rem] border-b border-border-dim group-hover:border-accent transition-all duration-200 pb-1 uppercase tracking-widest text-text-muted group-hover:text-accent">
            {label} &rarr;
          </span>
        </motion.div>
      </Link>
      {description && (
        <p className="type-body text-[0.65rem] text-text-muted opacity-40 italic max-w-xs leading-relaxed group-hover:opacity-60 transition-opacity">
          {description}
        </p>
      )}
    </motion.div>
  );
}
