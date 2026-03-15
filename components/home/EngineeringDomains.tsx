"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { engineeringDomains } from "@/data/domains";
import { projects } from "@/data/projects";
import { cn, unslugify, formatLabel, getProjectUrl } from "@/lib/utils";
import { useScene } from "@/context/SceneContext";
import SectionDivider from "@/components/shared/SectionDivider";
import { identity } from "@/data/identity";
import DomainMap from "./DomainMap";
import DiscoveryHint from "@/components/shared/DiscoveryHint";
import { useCallback, useMemo } from "react";

export default function EngineeringDomains() {
  const { isMobile } = useScene();
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);

  const activeDomain = useMemo(() => 
    engineeringDomains.find(d => d.domain_id === activeDomainId),
    [activeDomainId]
  );

  const relatedProjects = useMemo(() => 
    activeDomainId 
      ? projects.filter(p => p.domains?.includes(activeDomainId))
      : [],
    [activeDomainId]
  );

  const handleDomainClick = useCallback((id: string) => {
    setActiveDomainId(prev => prev === id ? null : id);
  }, []);

  return (
    <div className="w-full relative">
      <SectionDivider 
        label="02_DOMAINS" 
        description={identity.section_transitions.toDomains}
      />

      <div className="grid-12 gap-y-sys-48 items-end mb-sys-64">
        <div className="col-span-full lg:col-span-7">
          <div className="type-metadata text-accent opacity-60 mb-sys-16">EXPLORATION_MAP</div>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="type-h1 break-words hyphens-auto mb-0"
          >
            Research_Nodes
          </motion.h3>
        </div>
        <div className="col-span-full lg:col-span-4 lg:col-start-9">
          <p className="type-body text-xs text-text-muted italic">
            A map of technical areas I am currently exploring, learning, and building projects in. These domains represent active learning paths rather than established expertise.
          </p>
        </div>
      </div>

      <div className="grid-12 items-start mt-sys-64">
        {/* Domain Selection Sidebar */}
        <div className="col-span-full lg:col-span-4 space-y-sys-24">
          {engineeringDomains.map((domain) => (
            <button
              key={domain.domain_id}
              onClick={() => handleDomainClick(domain.domain_id)}
              aria-label={`Explore ${domain.name} domain`}
              className={cn(
                "module-frame w-full text-left relative group",
                activeDomainId === domain.domain_id 
                  ? "border-accent bg-accent/5 shadow-[var(--shadow-sys-accent)]" 
                  : "hover:border-border-bright"
              )}
            >
               <div className="flex justify-between items-center mb-sys-12">
                 <span className="type-metadata text-[0.4rem] text-text-muted tracking-widest">{formatLabel(domain.domain_id.split('_')[0])}</span>
                 {activeDomainId === domain.domain_id && (
                   <motion.div 
                     layoutId="active-indicator"
                     className="w-1 h-1 bg-accent"
                   />
                 )}
              </div>
              <h3 className={cn(
                "type-emphasis text-xs md:text-sm transition-colors tracking-tight",
                activeDomainId === domain.domain_id ? "text-accent" : "text-text-secondary"
              )}>
                {formatLabel(domain.name)}
              </h3>
            </button>
          ))}
        </div>

        {/* Domain Detail & Map Area */}
        <div className="module-frame col-span-full lg:col-span-8 min-h-[500px] relative !p-sys-24 md:!p-sys-64 overflow-hidden flex flex-col justify-center">
          {/* Visual DomainMap Layer */}
          <DomainMap 
            activeDomainId={activeDomainId} 
            onDomainClick={handleDomainClick} 
            simplified={isMobile}
          />

          <AnimatePresence mode="wait">
            {activeDomain ? (
              <motion.div
                key={activeDomain.domain_id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-sys-64 relative z-10"
              >
                <div className="space-y-sys-24">
                   <div className="type-metadata text-[0.45rem] text-accent">DOMAIN_SPECIFICATION // {activeDomain.domain_id}</div>
                   <p className="type-body text-xl md:text-2xl text-text-primary leading-tight max-w-2xl font-bold tracking-tighter">
                     {activeDomain.description}
                   </p>
                </div>

                <div className="space-y-sys-24">
                   <div className="type-metadata text-[0.45rem] text-text-muted uppercase tracking-widest">Involved_Technologies</div>
                   <div className="flex flex-wrap gap-2">
                      {activeDomain.technologies?.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-bg-secondary border border-border-dim type-metadata text-[0.6rem] hover:border-accent transition-colors">
                          {tech}
                        </span>
                      ))}
                   </div>
                </div>

                <div className="space-y-sys-24">
                   <div className="type-metadata text-[0.45rem] text-text-muted uppercase tracking-widest">Connected_Systems</div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-sys-16 items-stretch">
                      {relatedProjects.map(project => (
                        <Link 
                          key={project.slug}
                          href={getProjectUrl(project.slug)}
                          className="module-frame group !p-sys-24 relative transition-all h-full"
                        >
                           <div className="absolute top-sys-8 right-sys-8 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out">
                              <div className="arch-marker scale-50" />
                           </div>
                            <h4 className="type-emphasis text-sm group-hover:text-accent transition-colors">{project.name}</h4>
                            <p className="type-body text-[0.7rem] text-text-secondary opacity-50 mt-sys-8 line-clamp-2 italic">{project.shortDescription}</p>
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
                className="h-full flex flex-col items-center justify-center text-center space-y-sys-24 py-sys-48 relative z-10"
              >
                <div className="w-16 h-[1px] bg-accent-dim" />
                <div className="space-y-sys-8">
                  <div className="type-metadata text-[0.45rem] text-text-muted">SYSTEM_IDLE</div>
                  <h3 className="type-emphasis text-lg text-text-muted uppercase tracking-widest">SELECT_DOMAIN_FOR_EXPLORATION</h3>
                </div>
                <div className="w-16 h-[1px] bg-accent-dim" />
                
                {/* Background Visualization Hint - Optimized for mobile logic */}
                {isMobile ? (
                  <div className="flex flex-col items-center gap-sys-16 py-sys-32">
                     <div className="type-metadata text-[0.4rem] opacity-30 text-center uppercase tracking-[0.2em]">
                       Select_Node_from_List_Above <br />
                       to_Initialize_Mapping
                     </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none -z-10">
                     <span className="type-display text-[15rem]">DOMAIN_MAP</span>
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
      </div>
      
      <div className="mt-sys-64 pb-sys-160 lg:pb-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-sys-32">
        <DiscoveryHint 
          label={identity.discovery_hints.toSystems.label}
          href="#systems"
          description={identity.discovery_hints.toSystems.description}
          orientation="right"
        />
      </div>
    </div>
  );
}
