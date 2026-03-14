"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  label: string;
  description?: string;
  className?: string;
}

export default function SectionDivider({ label, description, className }: SectionDividerProps) {
  return (
    <div className={`section-divider-container ${className || "mb-sys-64"}`}>
      <div className="section-divider" data-label={label}>
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="divider-label"
        >
          {label}
        </motion.span>
      </div>
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.4, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="type-body text-[0.65rem] mt-4 max-w-xl font-medium italic"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
