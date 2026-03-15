"use client";

import { motion } from "framer-motion";
import SectionDivider from "@/components/shared/SectionDivider";
import { identity } from "@/data/identity";
import DiscoveryHint from "@/components/shared/DiscoveryHint";

export default function FinalReflection() {
  return (
    <div className="w-full relative">
      <SectionDivider 
        label="08_REFLECTION" 
        description={identity.section_transitions.toReflection}
      />
      
      <div className="py-sys-96 lg:py-sys-128 mb-sys-64 pb-sys-128 lg:pb-0">
        <div className="max-w-4xl mx-auto text-center space-y-sys-48">
          {/* Visual Anchor - Minimal Interaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-1 border border-accent/10 bg-accent/5 rounded-full mb-sys-48"
          >
            <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-40" />
          </motion.div>
          
          {/* Reflective Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="type-h1 opacity-80 break-words hyphens-auto"
          >
            End_of_Manifest_
          </motion.h2>

          {/* Final Reflection Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-sys-40"
          >
            <p className="type-body text-base md:text-lg text-text-secondary opacity-60 leading-relaxed font-medium px-6 max-w-2xl mx-auto">
              {identity.final_reflection}
            </p>
            
            <div className="flex flex-col items-center gap-sys-24">
               <div className="w-[1px] h-16 bg-gradient-to-b from-border-dim to-transparent opacity-50" />
               <div className="flex gap-sys-32">
                  <span className="type-metadata text-[0.4rem] opacity-20 tracking-[0.4em] uppercase hover:opacity-100 transition-opacity duration-700 cursor-default">BUILD</span>
                  <span className="type-metadata text-[0.4rem] opacity-20 tracking-[0.4em] uppercase hover:opacity-100 transition-opacity duration-700 cursor-default">BREAK</span>
                  <span className="type-metadata text-[0.4rem] opacity-20 tracking-[0.4em] uppercase hover:opacity-100 transition-opacity duration-700 cursor-default">UNDERSTAND</span>
               </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-sys-96 flex justify-center">
           <DiscoveryHint 
             label={identity.discovery_hints.toContact.label}
             href="#contact"
             description={identity.discovery_hints.toContact.description}
             orientation="center"
           />
        </div>
      </div>
    </div>
  );
}
