"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { laboratoryExplorations } from "@/data/laboratory";
import SectionDivider from "@/components/shared/SectionDivider";
import { identity } from "@/data/identity";
import { cn, unslugify, formatLabel, getProjectUrl } from "@/lib/utils";
import Link from "next/link";
import DiscoveryHint from "@/components/shared/DiscoveryHint";
import ExplorationArchive from "./ExplorationArchive";

export default function SystemLaboratory() {
  const ongoingExplorations = laboratoryExplorations.filter(
    l => l.status === "ongoing" || l.status === "investigating"
  );
  
  const [activeId, setActiveId] = useState<string>(
    ongoingExplorations.length > 0 ? ongoingExplorations[0].investigation_id : ""
  );
  
  const activeExploration = ongoingExplorations.find(l => l.investigation_id === activeId);

  return (
    <div className="w-full relative">
      <SectionDivider 
        label="06_LAB" 
        description={identity.section_transitions.toArchive}
      />

      <div className="grid-12 mb-sys-64">
        <div className="col-span-12 lg:col-span-8">
           <div className="flex items-center gap-3 mb-6 opacity-30">
              <div className="w-1 h-1 bg-accent/40 rounded-full" />
              <span className="type-metadata text-[0.4rem] tracking-[0.3em] font-mono">ACTIVE_EXPLORATION_BOARD</span>
           </div>
           <h2 className="type-h1 text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter mb-6 break-words hyphens-auto leading-[1.05]">Systems_Laboratory_</h2>
           <p className="type-body text-sm text-text-secondary max-w-2xl opacity-50">
             Current investigations into system behavior and low-level architectural mechanics. 
             These active research tracks represent the front-line of my technical learning process.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-sys-48">
        {/* EXPLORATION SELECTION SIDEBAR */}
        <div className="lg:col-span-4 space-y-4">
          <div className="type-metadata text-[0.45rem] opacity-30 mb-6 tracking-widest uppercase">SELECT_TRACK</div>
          {ongoingExplorations.map((item) => (
            <button
              key={item.investigation_id}
              onClick={() => setActiveId(item.investigation_id)}
              className={cn(
                "module-frame w-full text-left transition-[border-color,background-color,opacity] relative group !p-6",
                activeId === item.investigation_id 
                  ? "border-accent/40 bg-accent/5" 
                  : "hover:border-border-bright opacity-60 hover:opacity-100"
              )}
            >
              <div className="flex justify-between items-start mb-3">
                 <span className="type-metadata text-[0.35rem] opacity-40 uppercase tracking-widest">{item.investigation_id.split('-').join('_')}</span>
                 <div className={cn(
                   "arch-marker scale-[0.4] transition-all",
                   activeId === item.investigation_id ? "opacity-100" : "opacity-20 group-hover:opacity-100"
                 )} />
              </div>
              <h3 className={cn(
                "type-emphasis text-base mb-2 transition-colors",
                activeId === item.investigation_id ? "text-accent" : "text-text-primary"
              )}>
                {formatLabel(item.title)}
              </h3>
              

              {activeId === item.investigation_id && (
                <motion.div 
                  layoutId="lab-indicator"
                  className="absolute right-0 top-0 w-1 h-full bg-accent"
                />
              )}
            </button>
          ))}
          <div className="h-24 lg:hidden" /> {/* MOBILE_NAV_CLEARANCE */}
        </div>

        {/* EXPLORATION VIEWPORT */}
        <div className="lg:col-span-8 min-h-[500px] flex flex-col">
           <div className="module-frame flex-grow relative overflow-hidden bg-bg-secondary/20 !p-0 flex flex-col">
              {/* VIEWPORT HEADER */}
              <div className="p-6 border-b border-border-dim bg-bg-secondary flex justify-between items-center z-20">
                 <div className="flex items-center gap-4">
                    <span className="type-metadata text-[0.45rem] opacity-40">RESEARCH_LOG</span>
                    <div className="w-[1px] h-3 bg-border-dim/50" />
                    <span className="type-metadata text-[0.45rem] text-accent font-mono uppercase">
                      {formatLabel(activeExploration?.investigation_id || "")}
                    </span>
                 </div>
                 <div className="flex gap-1.5 opacity-20">
                    <div className="w-1 h-3 bg-accent animate-pulse" />
                    <div className="w-1 h-3 bg-accent" />
                 </div>
              </div>

              {/* CONTENT AREA */}
              <div className="flex-grow relative overflow-hidden flex flex-col p-12 md:p-16">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeId}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-xl will-change-[transform,opacity]"
                    >
                       <div className="type-metadata text-[0.35rem] text-accent/60 mb-8 border-l border-accent/20 pl-4 py-1">
                         INVESTIGATION_STATE // {activeExploration?.status.toUpperCase()}
                       </div>
                       
                       <h3 className="type-h2 text-3xl mb-8 uppercase tracking-tighter">
                         {activeExploration?.title}
                       </h3>
                       
                       <div className="space-y-12">
                         <div>
                            <h4 className="type-metadata text-[0.45rem] opacity-30 mb-4 tracking-widest uppercase font-mono">Research_Context</h4>
                            <p className="type-body text-base opacity-60 leading-relaxed">
                               {activeExploration?.context}
                            </p>
                         </div>

                          <div className="relative pl-8 border-l border-accent/30">
                             <div className="absolute -left-[3px] top-0 w-[5px] h-[5px] bg-accent" />
                             <h4 className="type-metadata text-[0.45rem] opacity-30 mb-4 tracking-widest uppercase italic">Preliminary_Insights</h4>
                             <p className="type-body text-lg text-text-primary leading-relaxed italic">
                                {activeExploration?.insight}
                             </p>
                          </div>

                          <div>
                             <h4 className="type-metadata text-[0.45rem] opacity-30 mb-4 tracking-widest uppercase font-mono">Linked_Domains</h4>
                             <div className="flex flex-wrap gap-3">
                                {activeExploration?.related_domains.map(domain => (
                                  <span key={domain} className="px-3 py-1.5 border border-border-dim type-metadata text-[0.4rem] opacity-40 bg-bg-primary/30 uppercase">
                                    {unslugify(domain)}
                                  </span>
                                ))}
                             </div>
                          </div>

                          {activeExploration?.related_projects && activeExploration.related_projects.length > 0 && (
                            <div>
                               <h4 className="type-metadata text-[0.45rem] opacity-30 mb-4 tracking-widest uppercase font-mono">Applied_Environment</h4>
                               <div className="flex flex-wrap gap-4">
                                 {activeExploration.related_projects.map(project => (
                                   <Link 
                                     key={project}
                                     href={getProjectUrl(project)}
                                     className="inline-flex items-center gap-4 group/link"
                                   >
                                      <div className="w-8 h-[1px] bg-accent/20 group-hover/link:w-12 transition-all" />
                                      <span className="type-metadata text-[0.45rem] text-accent/60 group-hover/link:text-accent transition-colors">
                                        {formatLabel(project)}
                                      </span>
                                   </Link>
                                ))}
                               </div>
                            </div>
                          )}
                       </div>
                    </motion.div>
                 </AnimatePresence>
              </div>

              {/* VIEWPORT FOOTER */}
              <div className="p-8 border-t border-border-dim bg-bg-primary/20 bg-grid-dim bg-[size:10px_10px]">
                 <div className="flex justify-between items-center opacity-20">
                    <div className="type-metadata text-[0.35rem]">TELEMETRY: ACTIVE</div>
                    <div className="type-metadata text-[0.35rem]">ID: {activeExploration?.investigation_id.toUpperCase()}</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-sys-128 pb-sys-96 lg:pb-0">
        <ExplorationArchive />
      </div>

      <div className="mt-sys-64 flex justify-end">
        <DiscoveryHint 
          label={identity.discovery_hints.toPhilosophy.label}
          href="#philosophy"
          description={identity.discovery_hints.toPhilosophy.description}
          orientation="right"
        />
      </div>
    </div>
  );
}
