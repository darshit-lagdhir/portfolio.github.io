"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { engineeringDomains } from "@/data/domains";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useScene } from "@/context/SceneContext";
import SectionDivider from "@/components/shared/SectionDivider";
import DomainMap from "./DomainMap";
import DiscoveryHint from "@/components/shared/DiscoveryHint";

export default function EngineeringDomains() {
  const { isMobile } = useScene();
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);

  const activeDomain = engineeringDomains.find(d => d.id === activeDomainId);
  const relatedProjects = activeDomainId 
    ? projects.filter(p => p.domains?.includes(activeDomainId))
    : [];

  return (
    <div className="w-full relative">
      <SectionDivider label="02_ENGINEERING_DOMAINS" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-sys-24 mb-sys-64">
         <div className="space-y-4">
           <div className="type-metadata text-[0.45rem] text-accent opacity-50">EXPLORATION_MAP</div>
           <h2 className="type-identity text-3xl md:text-4xl uppercase tracking-tighter">Learning_Domains</h2>
         </div>
         <div className="max-w-md">
            <p className="type-body text-xs opacity-40 italic">
              A map of technical areas I am currently exploring, learning, and building projects in. These domains represent active learning paths rather than established expertise.
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-sys-48 items-start">
        {/* Domain Selection Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {engineeringDomains.map((domain) => (
            <button
              key={domain.id}
              onClick={() => setActiveDomainId(activeDomainId === domain.id ? null : domain.id)}
              className={cn(
                "module-frame w-full text-left relative group !p-8",
                activeDomainId === domain.id 
                  ? "border-accent/30 bg-accent/5" 
                  : "hover:border-border-bright"
              )}
            >
              <div className="flex justify-between items-center mb-3">
                 <span className="type-metadata text-[0.4rem] opacity-20 tracking-widest">{domain.id.split('_')[0].toUpperCase()}</span>
                 {activeDomainId === domain.id && (
                   <motion.div 
                     layoutId="active-indicator"
                     className="w-1 h-1 bg-accent/60"
                   />
                 )}
              </div>
              <h3 className={cn(
                "type-emphasis text-xs md:text-sm transition-colors tracking-tight",
                activeDomainId === domain.id ? "text-accent/80" : "text-text-primary/70"
              )}>
                {domain.name.toUpperCase()}
              </h3>
            </button>
          ))}
        </div>

        {/* Domain Detail & Map Area */}
        <div className="module-frame lg:col-span-8 min-h-[500px] relative !p-8 md:!p-12 overflow-hidden flex flex-col justify-center">
          {/* Visual Domain Map Layer */}
          {!isMobile && (
            <DomainMap 
              activeDomainId={activeDomainId} 
              onDomainClick={(id) => setActiveDomainId(id)} 
            />
          )}

          <AnimatePresence mode="wait">
            {activeDomain ? (
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-sys-64 relative z-10"
              >
                <div className="space-y-4">
                   <div className="type-metadata text-[0.45rem] text-accent/60">DOMAIN_SPECIFICATION // {activeDomain.id}</div>
                   <p className="type-body text-lg md:text-xl text-text-primary leading-relaxed max-w-2xl">
                     {activeDomain.description}
                   </p>
                </div>

                <div className="space-y-6">
                   <div className="type-metadata text-[0.45rem] opacity-30 uppercase tracking-widest">Involved_Technologies</div>
                   <div className="flex flex-wrap gap-2">
                      {activeDomain.relatedTech?.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-bg-secondary border border-border-dim type-metadata text-[0.6rem] hover:border-accent transition-colors">
                          {tech}
                        </span>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="type-metadata text-[0.45rem] opacity-30 uppercase tracking-widest">Connected_Systems</div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {relatedProjects.map(project => (
                        <Link 
                          key={project.slug}
                          href={`/${project.slug}`}
                          className="module-frame group !p-6 relative transition-all"
                        >
                           <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="arch-marker scale-50" />
                           </div>
                           <h4 className="type-emphasis text-sm group-hover:text-accent transition-colors">{project.title}</h4>
                           <p className="type-body text-[0.7rem] opacity-50 mt-2 line-clamp-2 italic">{project.shortDescription}</p>
                        </Link>
                      ))}
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-sys-48 relative z-10"
              >
                <div className="w-16 h-[1px] bg-accent/30" />
                <div className="space-y-2">
                  <div className="type-metadata text-[0.45rem] opacity-30">SYSTEM_IDLE</div>
                  <h3 className="type-emphasis text-lg opacity-40">SELECT_DOMAIN_FOR_EXPLORATION</h3>
                </div>
                <div className="w-16 h-[1px] bg-accent/30" />
                
                {/* Background Visualization Hint */}
                {!isMobile && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none -z-10">
                     <span className="type-identity text-[15rem]">DOMAIN_MAP</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Subtle Domain Grid Background */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
             <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(var(--color-border-dim) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-dim) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
        </div>
        <div className="mt-sys-64 flex flex-col md:flex-row justify-between items-start md:items-end gap-sys-32">
        <DiscoveryHint 
          label="COMPARE_TECHNICAL_ARCHITECTURES" 
          href="#comparison"
          description="Identify technical themes and divergent architectural goals across the system portfolio."
          orientation="left"
        />
        <DiscoveryHint 
          label="ANALYZE_ENGINEERING_PHILOSOPHY" 
          href="#philosophy"
          description="Explore the intellectual framework and core principles that guide the construction of these systems."
          orientation="right"
        />
      </div>
    </div>
    </div>
  );
}
