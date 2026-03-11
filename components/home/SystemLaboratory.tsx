"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { laboratoryExperiments, LaboratoryExperiment } from "@/data/laboratory";
import SectionDivider from "@/components/shared/SectionDivider";
import { cn } from "@/lib/utils";

// --- EXPERIMENT COMPONENTS ---
import DistributedSyncLab from "@/components/home/lab/DistributedSyncLab";
import PipelineBackpressureLab from "@/components/home/lab/PipelineBackpressureLab";
import AuthBoundaryLab from "@/components/home/lab/AuthBoundaryLab";

const LAB_COMPONENTS: Record<string, React.FC> = {
  "distributed-sync": DistributedSyncLab,
  "pipeline-backpressure": PipelineBackpressureLab,
  "rbac-collision": AuthBoundaryLab,
};

export default function SystemLaboratory() {
  const [activeLabId, setActiveLabId] = useState<string>(laboratoryExperiments[0].id);
  
  const activeLab = laboratoryExperiments.find(l => l.id === activeLabId);
  const ActiveComponent = activeLabId ? LAB_COMPONENTS[activeLabId] : null;

  return (
    <div className="w-full relative">
      <SectionDivider label="03_SYSTEM_LABORATORY" />

      <div className="grid-12 mb-sys-64">
        <div className="col-span-12 lg:col-span-8">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="type-metadata text-[0.45rem] tracking-[0.2em] text-accent">EXPERIMENTAL_ZONE</span>
           </div>
           <h2 className="type-h1 uppercase tracking-tighter mb-6">Engineering_Lab_</h2>
           <p className="type-body text-lg text-text-secondary max-w-2xl opacity-70">
             An interactive playground for exploring the internal mechanics of systems engineering. 
             These lightweight modules demonstrate technical concepts using real-time feedback and parameter manipulation.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-sys-48">
        {/* LAB SELECTION SIDEBAR */}
        <div className="lg:col-span-4 space-y-4">
          <div className="type-metadata text-[0.45rem] opacity-30 mb-6 tracking-widest uppercase">SELECT_EXPERIMENT</div>
          {laboratoryExperiments.map((lab) => (
            <button
              key={lab.id}
              onClick={() => setActiveLabId(lab.id)}
              className={cn(
                "module-frame w-full text-left transition-all relative group !p-6",
                activeLabId === lab.id 
                  ? "border-accent/40 bg-accent/5" 
                  : "hover:border-border-bright opacity-60 hover:opacity-100"
              )}
            >
              <div className="flex justify-between items-start mb-3">
                 <span className="type-metadata text-[0.4rem] opacity-40">{lab.concept.toUpperCase()}</span>
                 <div className={cn(
                   "arch-marker scale-[0.4] transition-all",
                   activeLabId === lab.id ? "opacity-100" : "opacity-20 group-hover:opacity-100"
                 )} />
              </div>
              <h3 className={cn(
                "type-emphasis text-base mb-2 transition-colors",
                activeLabId === lab.id ? "text-accent" : "text-text-primary"
              )}>
                {lab.title.toUpperCase()}
              </h3>
              <p className="type-body text-[0.7rem] opacity-50 line-clamp-2 leading-relaxed">
                {lab.description}
              </p>

              {activeLabId === lab.id && (
                <motion.div 
                  layoutId="lab-indicator"
                  className="absolute right-0 top-0 w-1 h-full bg-accent"
                />
              )}
            </button>
          ))}
        </div>

        {/* INTERACTIVE VIEWPORT */}
        <div className="lg:col-span-8 min-h-[500px] flex flex-col">
           <div className="module-frame flex-grow relative overflow-hidden bg-bg-secondary/20 !p-0 flex flex-col">
              {/* VIEWPORT HEADER */}
              <div className="p-6 border-b border-border-dim bg-bg-primary/40 backdrop-blur-md flex justify-between items-center z-20">
                 <div className="flex items-center gap-4">
                    <span className="type-metadata text-[0.45rem] opacity-40">EXPERIMENT_VIEWPORT</span>
                    <div className="w-[1px] h-3 bg-border-dim/50" />
                    <span className="type-metadata text-[0.45rem] text-accent font-mono uppercase">
                      {activeLab?.id.replace(/-/g, '_')}
                    </span>
                 </div>
                 <div className="flex gap-1.5 opacity-20">
                    <div className="w-1 h-3 bg-accent" />
                    <div className="w-1 h-3 bg-accent" />
                 </div>
              </div>

              {/* DEMO AREA */}
              <div className="flex-grow relative overflow-hidden flex items-center justify-center p-8 md:p-12">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeLabId}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {ActiveComponent ? <ActiveComponent /> : (
                        <div className="type-metadata opacity-20 tracking-widest text-[0.5rem]">
                          INITIALIZING_LAB_ENVIRONMENT_
                        </div>
                      )}
                    </motion.div>
                 </AnimatePresence>
              </div>

              {/* EXPLANATION DRAWER (Subtle footer) */}
              <div className="p-8 border-t border-border-dim bg-bg-primary/20">
                 <div className="flex flex-col md:flex-row gap-8 justify-between">
                    <div className="max-w-md">
                       <h4 className="type-metadata text-[0.5rem] text-accent mb-2 tracking-widest">TECHNICAL_CONTEXT</h4>
                       <p className="type-body text-[0.7rem] opacity-60 leading-relaxed">
                         {activeLab?.description}
                       </p>
                    </div>
                    <div className="flex gap-12 items-end">
                       <div>
                          <h4 className="type-metadata text-[0.5rem] opacity-30 mb-2">COMPLEXITY</h4>
                          <div className="flex gap-1">
                             {[...Array(3)].map((_, i) => (
                               <div 
                                 key={i} 
                                 className={cn(
                                   "w-4 h-1",
                                   i === 0 ? "bg-accent" : 
                                   i === 1 && (activeLab?.complexity === "MEDIUM" || activeLab?.complexity === "HIGH") ? "bg-accent/60" :
                                   i === 2 && activeLab?.complexity === "HIGH" ? "bg-accent/40" : "bg-border-dim"
                                 )} 
                               />
                             ))}
                          </div>
                       </div>
                       <div className="pb-1">
                          <span className="type-metadata text-[0.45rem] opacity-20 tracking-tighter">
                            LATENCY_SYNCED // AGENT_VERIFIED
                          </span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
