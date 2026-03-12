"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { laboratoryExplorations } from "@/data/laboratory";
import SectionDivider from "@/components/shared/SectionDivider";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SystemLaboratory() {
  const [activeId, setActiveId] = useState<string>(laboratoryExplorations[0].id);
  
  const activeExploration = laboratoryExplorations.find(l => l.id === activeId);

  return (
    <div className="w-full relative">
      <SectionDivider label="05_SYSTEMS_EXPLORATION" />

      <div className="grid-12 mb-sys-64">
        <div className="col-span-12 lg:col-span-8">
           <div className="flex items-center gap-3 mb-6 opacity-30">
              <div className="w-1 h-1 bg-accent/40 rounded-full" />
              <span className="type-metadata text-[0.4rem] tracking-[0.3em] font-mono">ACTIVE_EXPLORATION_BOARD</span>
           </div>
           <h2 className="type-h1 uppercase tracking-tighter mb-6">Systems_Exploration_</h2>
           <p className="type-body text-sm text-text-secondary max-w-2xl opacity-50">
             A record of technical curiosity and ongoing learning. These cards represent specific domains 
             being investigated to understand high-level system behavior and low-level architectural mechanics.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-sys-48">
        {/* EXPLORATION SELECTION SIDEBAR */}
        <div className="lg:col-span-4 space-y-4">
          <div className="type-metadata text-[0.45rem] opacity-30 mb-6 tracking-widest uppercase">SELECT_DOMAIN</div>
          {laboratoryExplorations.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "module-frame w-full text-left transition-all relative group !p-6",
                activeId === item.id 
                  ? "border-accent/40 bg-accent/5" 
                  : "hover:border-border-bright opacity-60 hover:opacity-100"
              )}
            >
              <div className="flex justify-between items-start mb-3">
                 <span className="type-metadata text-[0.35rem] opacity-40">{item.field.toUpperCase()}</span>
                 <div className={cn(
                   "arch-marker scale-[0.4] transition-all",
                   activeId === item.id ? "opacity-100" : "opacity-20 group-hover:opacity-100"
                 )} />
              </div>
              <h3 className={cn(
                "type-emphasis text-base mb-2 transition-colors",
                activeId === item.id ? "text-accent" : "text-text-primary"
              )}>
                {item.title.toUpperCase()}
              </h3>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tech.slice(0, 3).map(t => (
                  <span key={t} className="type-metadata text-[0.3rem] opacity-30 uppercase">{t}</span>
                ))}
              </div>

              {activeId === item.id && (
                <motion.div 
                  layoutId="lab-indicator"
                  className="absolute right-0 top-0 w-1 h-full bg-accent"
                />
              )}
            </button>
          ))}
        </div>

        {/* EXPLORATION VIEWPORT */}
        <div className="lg:col-span-8 min-h-[500px] flex flex-col">
           <div className="module-frame flex-grow relative overflow-hidden bg-bg-secondary/20 !p-0 flex flex-col">
              {/* VIEWPORT HEADER */}
              <div className="p-6 border-b border-border-dim bg-bg-secondary flex justify-between items-center z-20">
                 <div className="flex items-center gap-4">
                    <span className="type-metadata text-[0.45rem] opacity-40">EXPLORATION_BOARD</span>
                    <div className="w-[1px] h-3 bg-border-dim/50" />
                    <span className="type-metadata text-[0.45rem] text-accent font-mono uppercase">
                      {activeExploration?.id.replace(/-/g, '_')}
                    </span>
                 </div>
                 <div className="flex gap-1.5 opacity-20">
                    <div className="w-1 h-3 bg-accent" />
                    <div className="w-1 h-3 bg-accent" />
                 </div>
              </div>

              {/* CONTENT AREA */}
              <div className="flex-grow relative overflow-hidden flex flex-col p-12 md:p-16">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-xl"
                    >
                       <div className="type-metadata text-[0.35rem] text-accent/60 mb-8 border-l border-accent/20 pl-4 py-1">
                         DOMAIN_ANALYSIS // {activeExploration?.field.toUpperCase()}
                       </div>
                       
                       <h3 className="type-h2 text-3xl mb-8 uppercase tracking-tighter">
                         {activeExploration?.title}
                       </h3>
                       
                       <p className="type-body text-base opacity-40 leading-relaxed mb-12">
                         {activeExploration?.context}
                       </p>

                       <div className="space-y-12">
                          <div className="relative pl-8 border-l border-accent/30">
                             <div className="absolute -left-[3px] top-0 w-[5px] h-[5px] bg-accent" />
                             <h4 className="type-metadata text-[0.45rem] opacity-30 mb-4 tracking-widest uppercase italic">Key_Discovery_insight</h4>
                             <p className="type-body text-lg text-text-primary leading-relaxed italic">
                                "{activeExploration?.insight}"
                             </p>
                          </div>

                          <div>
                             <h4 className="type-metadata text-[0.45rem] opacity-30 mb-4 tracking-widest uppercase font-mono">Involved_Primitives</h4>
                             <div className="flex flex-wrap gap-3">
                                {activeExploration?.tech.map(t => (
                                  <span key={t} className="px-3 py-1.5 border border-border-dim type-metadata text-[0.4rem] opacity-40 bg-bg-primary/30">
                                    {t.toUpperCase()}
                                  </span>
                                ))}
                             </div>
                          </div>

                          {activeExploration?.relatedProject && (
                            <div>
                               <h4 className="type-metadata text-[0.45rem] opacity-30 mb-4 tracking-widest uppercase font-mono">System_Implementation</h4>
                               <Link 
                                 href={`/${activeExploration.relatedProject}`}
                                 className="inline-flex items-center gap-4 group/link"
                               >
                                  <div className="w-8 h-[1px] bg-accent/20 group-hover/link:w-12 transition-all" />
                                  <span className="type-metadata text-[0.45rem] text-accent/60 group-hover/link:text-accent transition-colors">
                                    APPLIED_IN: {activeExploration.relatedProject.toUpperCase()}
                                  </span>
                               </Link>
                            </div>
                          )}
                       </div>
                    </motion.div>
                 </AnimatePresence>
              </div>

              {/* VIEWPORT FOOTER */}
              <div className="p-8 border-t border-border-dim bg-bg-primary/20 bg-grid-dim bg-[size:10px_10px]">
                 <div className="flex justify-between items-center opacity-20">
                    <div className="type-metadata text-[0.35rem]">STATE: ACTIVE_INVESTIGATION</div>
                    <div className="type-metadata text-[0.35rem]">ID: {activeExploration?.id.toUpperCase()}</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
