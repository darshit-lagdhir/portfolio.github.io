"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StoryStep } from "@/types/project";
import { cn, formatLabel } from "@/lib/utils";
import { useScene } from "@/context/SceneContext";

interface SystemStoryFlowProps {
  steps: StoryStep[];
  onStepChange: (step: StoryStep) => void;
  title?: string;
}

export default function SystemStoryFlow({ steps, onStepChange, title = "System_Story" }: SystemStoryFlowProps) {
  const { isMobile } = useScene();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  

  const activeStep = steps[activeStepIndex];

  useEffect(() => {
    onStepChange(steps[activeStepIndex]);
  }, [activeStepIndex, steps, onStepChange]);

  const handleNext = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-sys-32">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="type-metadata text-[0.45rem] text-accent">SYSTEM_LIFECYCLE</div>
          <h2 className="type-identity text-3xl md:text-4xl uppercase tracking-tighter">{formatLabel(title)}</h2>
        </div>
        
        <div className="flex items-center gap-4">
           <button 
             onClick={handlePrev}
             disabled={activeStepIndex === 0}
             className="p-3 border border-border-dim hover:border-accent disabled:opacity-20 disabled:hover:border-border-dim transition-colors group"
             aria-label="Previous Step"
           >
              <span className="type-metadata text-[0.5rem] group-hover:text-accent group-disabled:text-inherit transition-colors">← PREV_PHASE</span>
           </button>
           <button 
             onClick={handleNext}
             disabled={activeStepIndex === steps.length - 1}
             className="p-3 border border-border-dim hover:border-accent disabled:opacity-20 disabled:hover:border-border-dim transition-colors group"
             aria-label="Next Step"
           >
              <span className="type-metadata text-[0.5rem] group-hover:text-accent group-disabled:text-inherit transition-colors">NEXT_PHASE →</span>
           </button>
        </div>
      </div>

      <div className="relative border border-border-dim bg-bg-secondary/20 overflow-hidden min-h-[250px] md:min-h-[200px]">
        <div className="absolute top-0 right-0 p-4 border-l border-b border-border-dim">
           <div className="type-metadata text-[0.4rem] opacity-30">EVOLUTION_STEP // 0{activeStepIndex + 1}_OF_0{steps.length}</div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "p-8 md:p-12 h-full flex flex-col justify-center",
              isMobile ? "space-y-6" : "space-y-4"
            )}
          >
            <div className="space-y-2">
               <div className="type-metadata text-[0.45rem] text-accent/60 uppercase tracking-widest">{formatLabel(activeStep.id)}</div>
               <h3 className="type-emphasis text-xl md:text-2xl">{activeStep.title}</h3>
            </div>
            
            <p className="type-body text-sm md:text-base text-text-secondary max-w-2xl leading-relaxed">
              {activeStep.description}
            </p>

            {activeStep.activeNodes.length > 0 && (
               <div className="pt-4 flex items-center gap-3">
                  <div className="type-metadata text-[0.4rem] opacity-30 uppercase">Related_Components:</div>
                  <div className="flex gap-2">
                    {activeStep.activeNodes.map(nodeId => (
                      <span key={nodeId} className="type-metadata text-[0.4rem] px-2 py-0.5 border border-accent/20 text-accent/80 bg-accent/5">
                        {formatLabel(nodeId)}
                      </span>
                    ))}
                  </div>
               </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-border-dim/20">
           <motion.div 
             className="h-full bg-accent"
             initial={{ width: "0%" }}
             animate={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }}
             transition={{ duration: 0.4 }}
           />
        </div>
      </div>

      {/* Step Grid Indicators */}
      <div className="grid grid-cols-4 gap-4">
         {steps.map((step, idx) => (
           <button
             key={step.id}
             onClick={() => setActiveStepIndex(idx)}
             className={cn(
               "h-1.5 transition-all duration-300",
               idx === activeStepIndex ? "bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]" : "bg-border-dim hover:bg-border-dim/60",
               idx < activeStepIndex && "bg-accent/40"
             )}
             aria-label={`Go to step ${idx + 1}`}
           />
         ))}
      </div>
    </div>
  );
}
