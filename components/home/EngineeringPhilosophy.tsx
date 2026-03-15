"use client";

import { motion } from "framer-motion";
import SectionDivider from "@/components/shared/SectionDivider";
import DiscoveryHint from "@/components/shared/DiscoveryHint";
import { identity } from "@/data/identity";

export default function EngineeringPhilosophy() {
  return (
    <div className="w-full">
      <SectionDivider 
        label="07_PHILOSOPHY" 
        description={identity.section_transitions.toPhilosophy}
      />

      <div className="grid-12 items-start gap-y-sys-64 md:gap-y-0">
        <div className="col-span-12 lg:col-span-12 mb-sys-96 text-center lg:text-left">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="max-w-5xl"
           >
              <h3 className="type-h1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-sys-48 uppercase leading-[1.1] tracking-tighter break-words hyphens-auto">
                Architecture is a <span className="text-accent underline decoration-accent/20 decoration-1 underline-offset-[12px]">Diagnostic Discipline</span>, not just a constructive one.
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6 max-w-prose mx-auto lg:mx-0">
                  <p className="type-body text-xl md:text-2xl text-text-primary/70 leading-relaxed">
                    {identity.about.about_learning_context.split('. ')[0]}.
                  </p>
                  <p className="type-body text-base md:text-lg text-text-secondary leading-relaxed opacity-60">
                    I treat debugging not as a frustrating task, but as a primary learning tool. Many of my architectural insights—from memory behavior to session security—come from investigating why a system behaved in an unexpected way.
                  </p>
                </div>
                <div className="space-y-6 border-l border-border-dim pl-12 hidden md:block">
                  <p className="type-metadata text-[0.45rem] text-accent/40 mb-4 opacity-100 flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent/40" />
                    APPLIED_PROJECT_INSIGHTS
                  </p>
                  <div className="space-y-4">
                    <div className="group/insight">
                      <span className="type-metadata text-[0.35rem] text-text-muted block mb-1">MOVEX</span>
                      <p className="type-body text-[0.65rem] opacity-40 group-hover/insight:opacity-80 transition-opacity">Debugging session boundaries taught me the hidden complexity of role isolation.</p>
                    </div>
                    <div className="group/insight">
                      <span className="type-metadata text-[0.35rem] text-text-muted block mb-1">PFCV</span>
                      <p className="type-body text-[0.65rem] opacity-40 group-hover/insight:opacity-80 transition-opacity">Exploring cross-language FFI revealed subtle memory safety violations at the ABI level.</p>
                    </div>
                    <div className="group/insight">
                      <span className="type-metadata text-[0.35rem] text-text-muted block mb-1">UIDAI</span>
                      <p className="type-body text-[0.65rem] opacity-40 group-hover/insight:opacity-80 transition-opacity">Designing advisory-only boundaries taught me the importance of ethical system constraints.</p>
                    </div>
                  </div>
                </div>
              </div>
           </motion.div>
        </div>

        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {identity.learning_workflow.map((principle, index) => (
             <motion.div
               key={principle.title}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1, duration: 0.8 }}
               className="module-frame group relative overflow-hidden h-full flex flex-col hover:shadow-lg transition-[border-color,background-color,box-shadow] duration-300"
             >
                {/* Visual Signature Marker */}
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-60 transition-opacity">
                   <div className="arch-marker scale-75" />
                </div>

                <div className="flex flex-col h-full">
                   <div className="type-metadata text-[0.45rem] text-accent/40 mb-10 flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent/40" />
                      PRINC_0{index + 1}
                   </div>
                   
                   <h3 className="type-emphasis text-sm mb-8 tracking-tight group-hover:text-accent/80 transition-colors">
                     {principle.title}
                   </h3>
                                      <p className="type-body text-xs text-text-secondary/80 leading-relaxed group-hover:text-text-primary transition-colors max-w-[90%] font-medium">
                      {principle.description}
                    </p>
                </div>

                {/* Bottom interactive hint */}
                <div className="mt-12 pt-6 border-t border-border-dim opacity-0 group-hover:opacity-40 transition-opacity flex justify-between items-center">
                   <span className="type-metadata text-[0.35rem]">ALIGN_VERIFIED</span>
                   <div className="w-1 h-1 bg-accent" />
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      <div className="mt-sys-128 flex flex-col items-center text-center pb-sys-96 lg:pb-0">
        <DiscoveryHint 
          label={identity.discovery_hints.toReflection.label} 
          href="#reflections"
          description={identity.discovery_hints.toReflection.description}
          orientation="center"
        />
      </div>
    </div>
  );
}
