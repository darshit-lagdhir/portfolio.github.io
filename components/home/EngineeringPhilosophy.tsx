"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SectionDivider from "@/components/shared/SectionDivider";
import DiscoveryHint from "@/components/shared/DiscoveryHint";

const PRINCIPLES = [
  {
    id: "experimentation",
    title: "ITERATIVE_EXPERIMENTATION",
    description: "I learn primarily by building systems directly and observing how they behave under synthetic stress. True mastery comes from the feedback loop between construction and controlled failure.",
    icon: "01"
  },
  {
    id: "debugging",
    title: "MECHANICAL_DEBUGGING",
    description: "Understanding problems starts with investigating internal system states rather than guessing symptoms. I prioritize deep instrumentation and observability to eliminate technical ambiguity.",
    icon: "02"
  },
  {
    id: "architecture",
    title: "ARCHITECTURAL_THINKING",
    description: "Designing systems that remain understandable beyond their initial implementation. I value predictable data flows and strict boundary separation over clever but opaque optimizations.",
    icon: "03"
  },
  {
    id: "curiosity",
    title: "RADICAL_CURIOSITY",
    description: "Continually exploring unfamiliar technical domains to expand my mental model of system behavior. Every new architecture is a diagnostic study in how logic and memory interact.",
    icon: "04"
  }
];

export default function EngineeringPhilosophy() {
  return (
    <div className="w-full">
      <SectionDivider label="03_TECHNICAL_MINDSET" />

      <div className="grid-12 items-start gap-y-sys-64 md:gap-y-0">
        <div className="col-span-12 lg:col-span-12 mb-sys-96 text-center lg:text-left">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="max-w-5xl"
           >
              <h2 className="type-h1 text-4xl md:text-5xl mb-sys-48 uppercase leading-[1.05] tracking-tighter">
                Architecture is a <span className="text-accent underline decoration-accent/20 decoration-1 underline-offset-[12px]">Diagnostic Discipline</span>, not just a constructive one.
              </h2>
              <div className="space-y-6">
                <p className="type-body text-xl md:text-2xl text-text-primary/70 leading-relaxed max-w-3xl">
                  I believe that building robust systems requires a commitment to understanding their internal mechanics. 
                </p>
                <p className="type-body text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl opacity-60">
                  My goal is to build software that isn't just functional, but architectural—stable, predictable, and resilient by design.
                </p>
              </div>
           </motion.div>
        </div>

        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {PRINCIPLES.map((principle, index) => (
             <motion.div
               key={principle.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1, duration: 0.5 }}
               whileHover={{ y: -5 }}
                className="module-frame group relative overflow-hidden h-full flex flex-col hover:shadow-xl hover:shadow-accent/5"
             >
                {/* Visual Signature Marker */}
                <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform">
                   <div className="arch-marker" />
                </div>

                <div className="flex flex-col h-full">
                   <div className="type-metadata text-[0.45rem] text-accent mb-6 flex items-center gap-3">
                      <span className="w-1 h-1 bg-accent" />
                      PRINCIPLE_0{principle.icon}
                   </div>
                   
                   <h3 className="type-emphasis text-base mb-6 tracking-tight group-hover:text-accent transition-colors">
                     {principle.title}
                   </h3>
                   
                   <p className="type-body text-sm opacity-60 leading-relaxed group-hover:opacity-80 transition-opacity">
                     {principle.description}
                   </p>
                </div>

                {/* Bottom interactive hint */}
                <div className="mt-8 pt-4 border-t border-border-dim/50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center">
                   <span className="type-metadata text-[0.35rem] opacity-30">SYSTEM_ALIGNMENT: OK</span>
                   <div className="w-1.5 h-1.5 bg-accent" />
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      <div className="mt-sys-128 flex flex-col items-center text-center">
        <DiscoveryHint 
          label="COMPARE_SYSTEM_ARCHITECTURES" 
          href="#comparison"
          description="See how these engineering principles are applied across different technical domains."
          orientation="center"
        />
      </div>
    </div>
  );
}
