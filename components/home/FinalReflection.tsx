"use client";

import { motion } from "framer-motion";
import SectionDivider from "@/components/shared/SectionDivider";

export default function FinalReflection() {
  return (
    <div className="w-full relative">
      <SectionDivider label="07_SYSTEM_REFLECTIONS" />
      
      <div className="py-sys-64 mb-sys-64">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-2 border border-accent/20 bg-accent/5 rounded-full mb-8"
          >
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="type-identity text-3xl md:text-5xl uppercase tracking-tighter"
          >
            End_of_Manifest.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <p className="type-body text-lg md:text-xl text-text-secondary opacity-70 leading-relaxed italic">
              "This portfolio is not just a collection of projects, but a continuous investigation into the internal mechanics of building software. It represents a commitment to architectural rigor, technical curiosity, and the belief that understanding how a system fails is the first step toward making it resilient."
            </p>
            <div className="flex flex-col items-center gap-4">
               <div className="w-12 h-[1px] bg-border-dim" />
               <span className="type-metadata text-[0.45rem] opacity-30 tracking-[0.3em] uppercase">Architecture // Curiosity // Resilience</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
