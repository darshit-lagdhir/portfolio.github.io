"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { identity } from "@/data/identity";
import { Project } from "@/types/project";
import { cn, getNextProject, getStatusMetadata, formatLabel, getProjectIndex } from "@/lib/utils";
import { projects } from "@/data/projects";
import SectionDivider from "@/components/shared/SectionDivider";
import DiscoveryHint from "@/components/shared/DiscoveryHint";

const ArchitectureDiagram = dynamic(() => import("@/components/visualization/ArchitectureDiagram"), {
  loading: () => <div className="h-96 w-full animate-pulse bg-bg-secondary border border-border-dim" />,
  ssr: false
});

const ProjectNetwork = dynamic(() => import("./ProjectNetwork"), {
  ssr: false
});

const SystemStoryFlow = dynamic(() => import("./SystemStoryFlow"), {
  ssr: false
});

interface ProjectDocumentationProps {
  project: Project;
}

export default function ProjectDocumentation({ project }: ProjectDocumentationProps) {
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const nextProject = getNextProject(project.slug);
  const statusMeta = getStatusMetadata(project.status);

  return (
    <div className="min-h-screen pb-sys-128 bg-noise">
      {/* 
         PHASE 2: PROJECT IDENTITY HEADER 
      */}
      <header className="relative pt-sys-64 pb-sys-128 border-b border-border-dim min-h-[400px] lg:min-h-0 flex flex-col justify-center lg:block">
        <div className="system-container mb-sys-64">
          <Link 
            href="/#systems" 
            className="group inline-flex items-center gap-2 type-nav text-text-muted hover:text-accent transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            RETURN_TO_MANIFEST
          </Link>
        </div>

        <div className="system-container grid-12 items-start lg:items-end gap-y-sys-48">
          <div className="col-span-12 lg:col-span-8">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-3 mb-sys-24"
             >
               <span className={cn(
                 "w-1.5 h-1.5 rounded-full shrink-0",
                 statusMeta.color
               )} />
               <span className="type-metadata text-accent tracking-widest">
                 {statusMeta.label}
               </span>
             </motion.div>

             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="type-h1 mb-sys-32 break-words hyphens-auto"
             >
               {formatLabel(project.name)}_
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="type-body text-balance text-base md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-sys-64 font-medium"
             >
               {project.shortDescription}
             </motion.p>

             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="flex flex-wrap gap-4"
             >
                {project.techStack.map(tech => (
                  <span key={tech} className="type-metadata text-text-muted border border-border-dim px-2 py-1">
                    {formatLabel(tech)}
                  </span>
                ))}
             </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-sys-64 lg:mt-0 flex flex-col gap-6 items-start lg:items-end justify-start lg:justify-end z-10">
             <div className="text-left lg:text-right">
                <div className="type-metadata text-[0.45rem] text-text-muted mb-2 opacity-40">SYSTEM_ARCHITECTURE</div>
                <div className="type-label text-accent text-xs">{formatLabel(project.technicalMeta?.architectureStyle || "")}</div>
             </div>
              <div className="text-left lg:text-right">
                 <div className="type-metadata text-[0.45rem] text-text-muted mb-2 opacity-40">CORE_CLASSIFICATION</div>
                 <div className="type-label text-text-primary text-xs">{formatLabel(project.technicalMeta?.systemType || "")}</div>
              </div>
              {project.technicalMeta?.scale && (
                <div className="text-left lg:text-right">
                   <div className="type-metadata text-[0.45rem] text-text-muted mb-2 opacity-40">SYSTEM_SCALE</div>
                   <div className="type-label text-accent-dim text-xs">{formatLabel(project.technicalMeta.scale)}</div>
                </div>
              )}
          </div>
        </div>

        <div className="absolute inset-0 p-sys-32 opacity-[0.02] select-none pointer-events-none hidden lg:block -z-10">
           <span className="type-display text-[15rem] text-text-muted leading-none uppercase">{project.slug}</span>
        </div>
      </header>

      <main className="system-container pt-sys-96">
        <div className="grid-12 gap-sys-96">
          {/* Section 01 & 02: Detailed Narrative & Architecture */}
          <div className="col-span-12 lg:col-span-7 space-y-sys-96">
            <section>
                <SectionDivider label="01_SYSTEM_OVERVIEW" className="mb-sys-48" />
                <div className="space-y-sys-48">
                  <p className="type-body text-base md:text-lg leading-relaxed text-text-primary font-medium">
                    {project.longDescription}
                  </p>
                  <div className="module-frame !p-6 md:!p-10 border-dashed opacity-60">
                     <div className="type-metadata text-[0.4rem] text-accent-dim mb-6 tracking-[0.3em] font-mono uppercase">PROBLEM_DEFINITION</div>
                     <p className="type-body text-text-secondary italic text-base md:text-lg font-medium leading-relaxed">
                        &quot;{project.problem}&quot;
                     </p>
                  </div>
                </div>
            </section>

            <section>
                <SectionDivider label="02_ARCHITECTURE_OVERVIEW" className="mb-sys-48" />
                <div className="space-y-sys-32">
                  <p className="type-body leading-relaxed text-text-secondary">
                    {project.engineeringFocus}
                  </p>
                  
                  <div className="pt-sys-48">
                    <div className="type-metadata text-accent mb-6">CORE_SYSTEM_MODULES</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-sys-24">
                       {project.internalComponents?.map((comp, idx) => (
                          <div key={idx} className="p-sys-24 border border-border-dim bg-bg-secondary group hover:border-accent transition-colors">
                            <div className="type-metadata text-accent mb-sys-12">MODULE_0{idx + 1}</div>
                            <h4 className="type-label text-sm text-text-primary mb-2">{formatLabel(comp.name)}</h4>
                            <div className="type-metadata text-[0.4rem] opacity-30 mb-2 font-mono">CORE_RESPONSIBILITY:</div>
                            <p className="type-body text-xs text-text-muted leading-relaxed">{comp.description}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                 <div className="mt-sys-96 overflow-hidden">
                   <div className="flex items-center gap-4 mb-sys-32 opacity-30">
                      <div className="h-[1px] flex-grow bg-border-dim" />
                      <span className="type-metadata text-[0.5rem] text-text-muted tracking-widest">SYSTEM_BLUEPRINT_REFERENCE</span>
                      <div className="h-[1px] flex-grow bg-border-dim" />
                   </div>
                   <ArchitectureDiagram 
                     layout={project.layout}
                     nodes={project.architecture_nodes}
                     connections={project.architecture_connections}
                   />
                 </div>
               </div>
            </section>
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:col-start-9 space-y-sys-96">
            <section>
               <SectionDivider label="03_TECH_STACK" className="mb-sys-32" />
                <div className="space-y-sys-32">
                   {project.techGroups?.map((group, idx) => (
                     <div key={idx} className="space-y-sys-12">
                        <h5 className="type-metadata text-[0.5rem] opacity-30 tracking-widest">{formatLabel(group.role)}</h5>
                        <div className="flex flex-wrap gap-2">
                          {group.items.map(item => (
                            <span key={item} className="px-2 py-1 bg-bg-secondary border border-border-dim type-metadata text-[0.6rem] hover:border-accent transition-colors">
                              {item}
                            </span>
                          ))}
                        </div>
                     </div>
                   ))}
                </div>
            </section>

            <section>
               <SectionDivider label="04_SYSTEM_OVERVIEW" className="mb-sys-32" />
                <div className="bg-bg-secondary/30 p-sys-24 border border-border-dim font-mono text-[0.6rem] space-y-sys-12 text-text-muted">
                   <div className="flex justify-between">
                     <span>SYSTEM_TYPE</span>
                     <span className="text-accent">{formatLabel(project.technicalMeta?.systemType || "")}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>ARCHITECTURE</span>
                     <span className="text-secondary">{formatLabel(project.technicalMeta?.architectureStyle || "")}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>STORAGE</span>
                     <span>{formatLabel(project.technicalMeta?.storageType || "")}</span>
                   </div>
                    <div className="flex justify-between">
                      <span>FOCUS</span>
                      <span className="text-accent">{formatLabel(project.engineeringFocus || "")}</span>
                    </div>
                    {project.technicalMeta?.scale && (
                      <div className="flex justify-between pt-2 border-t border-border-dim/20">
                        <span>SCALE</span>
                        <span className="text-text-primary">{formatLabel(project.technicalMeta.scale)}</span>
                      </div>
                    )}
                </div>
            </section>

             {project.authority?.recurringPatterns && (
               <section>
                  <SectionDivider label="05_RECURRING_PATTERNS" className="mb-sys-32" />
                  <div className="space-y-sys-16">
                     {project.authority.recurringPatterns.map(pattern => (
                       <div key={pattern} className="flex items-center gap-sys-12">
                          <div className="w-1.5 h-1.5 bg-accent/40 rotate-45" />
                          <span className="type-metadata text-[0.6rem] opacity-60 tracking-tight">{formatLabel(pattern)}</span>
                       </div>
                     ))}
                  </div>
               </section>
            )}

            <section className="pt-sys-48 border-t border-border-dim/20">
                <DiscoveryHint 
                   label={identity.discovery_hints.toProjectComparison.label} 
                   href="/#comparison"
                   description={identity.discovery_hints.toProjectComparison.description}
                   orientation="left"
                />
            </section>
          </aside>
        </div>

        <div className="mt-sys-128 space-y-sys-128">
           {/* Section 05: Engineering Decisions & Trade-offs */}
           <section>
              <SectionDivider label="06_ENGINEERING_DECISIONS" className="mb-sys-64" />
              
              <div className="grid-12 gap-sys-64">
                 <div className="col-span-12 lg:col-span-7 space-y-sys-64">
                    {project.architectureDecisions?.map((decision, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="module-frame group relative"
                      >
                         <div className="type-metadata text-[0.4rem] text-accent/30 mb-8 tracking-[0.3em] font-mono">DECISION_LOG_0{idx + 1}</div>
                         <h3 className="type-emphasis text-sm mb-10 uppercase tracking-tight opacity-70 group-hover:opacity-100 transition-opacity break-words hyphens-auto">{decision.title}</h3>
                         <div className="space-y-8">
                            <div>
                               <div className="type-metadata text-[0.35rem] opacity-20 mb-3 tracking-widest font-mono">CORE_PROBLEM</div>
                                <p className="type-body text-xs md:text-sm text-text-secondary opacity-60 font-medium leading-relaxed break-words">{decision.problem}</p>
                            </div>
                            <div>
                               <div className="type-metadata text-[0.35rem] opacity-20 mb-3 tracking-widest font-mono">TECHNICAL_PATH</div>
                                <p className="type-body text-xs md:text-sm text-text-primary opacity-80 font-medium leading-relaxed break-words">{decision.approach}</p>
                            </div>
                            <div className="pt-6 border-t border-border-dim/20">
                                <p className="type-body text-[0.65rem] italic opacity-40 font-medium leading-relaxed">&quot;{decision.reasoning}&quot;</p>
                            </div>
                         </div>
                         {decision.alternatives && (
                            <div className="mt-8 flex flex-wrap gap-4 opacity-20">
                               <span className="type-metadata text-[0.35rem] tracking-widest font-mono">DISCARD_NODES:</span>
                               {decision.alternatives.map(alt => (
                                 <span key={alt} className="type-metadata text-[0.35rem] text-text-muted line-through">{alt}</span>
                               ))}
                            </div>
                         )}
                      </motion.div>
                    ))}
                 </div>

                 <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
                    <div className="sticky top-sys-64 space-y-sys-64">
                       <div>
                          <div className="type-metadata text-[0.5rem] text-secondary mb-6 tracking-widest">SYSTEM_TRADE_OFFS</div>
                          <div className="space-y-8">
                             {project.tradeoffs?.map((tradeoff, idx) => (
                               <div key={idx} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                     <h4 className="type-label text-[0.6rem] text-text-primary">{tradeoff.title}</h4>
                                     <span className="type-metadata text-[0.4rem] text-accent border border-accent/20 px-1">{tradeoff.impact}</span>
                                  </div>
                                  <p className="type-body text-xs opacity-50 italic">{tradeoff.description}</p>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </aside>
              </div>
           </section>
           {/* Section 06: System Evolution Journey (Story Flow) */}
            {project.development_story && (
               <section className="py-sys-128 border-t border-border-dim">
                  <SectionDivider label="07_SYSTEM_WORKFLOW" className="mb-sys-64" />
                 
                  <div className="space-y-sys-64">
                   <ArchitectureDiagram 
                      layout={project.layout} 
                      nodes={project.architecture_nodes}
                      connections={project.architecture_connections}
                      highlightedNodes={highlightedNodes}
                   />
                   
                   <SystemStoryFlow 
                      steps={project.development_story}
                      title={project.storyTitle || "Development_Journey"}
                      onStepChange={(step) => setHighlightedNodes(step.activeNodes)}
                   />
                 </div>
              </section>
           )}

           {/* Section 08: Technical Deep Dives (Authority & Credibility) */}
           {project.authority?.deepDives && (
              <section>
                 <SectionDivider label="08_TECHNICAL_DEEP_DIVES" className="mb-sys-64" />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-sys-48">
                    {project.authority.deepDives.map((dive, idx) => (
                      <div 
                        key={idx} 
                        className="module-frame group"
                      >
                         <div className="type-metadata text-[0.4rem] text-accent/40 mb-8 flex items-center gap-3 font-mono tracking-[0.2em] uppercase">
                            <span className="w-1 h-1 bg-accent/30 rounded-full" />
                            DEEP_DIVE_0{idx + 1}
                         </div>
                         <h3 className="type-emphasis text-sm mb-6 tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">{dive.title}</h3>
                         <p className="type-body text-xs leading-relaxed text-text-secondary opacity-50 font-medium">
                            {dive.content}
                         </p>
                      </div>
                    ))}
                 </div>
              </section>
           )}

           {/* Section 09: Technical Lessons Learned */}
           {project.authority?.experimentationNotes && (
              <section>
                 <SectionDivider label="09_TECHNICAL_LESSONS_LEARNED" className="mb-sys-64" />
                 <div className="bg-bg-secondary/40 border border-border-dim p-12">
                    <div className="grid-12 gap-sys-64">
                       <div className="col-span-12 lg:col-span-4">
                          <div className="type-metadata text-[0.5rem] opacity-30 mb-4 uppercase tracking-widest">Iterative_Learning</div>
                          <h3 className="type-emphasis text-lg mb-6">Signals of curiosity and system evolution through failure.</h3>
                          <div className="w-12 h-0.5 bg-accent/30" />
                       </div>
                       <div className="col-span-12 lg:col-span-8 space-y-12">
                          {project.authority.experimentationNotes.map((note, idx) => (
                            <div key={idx} className="space-y-4">
                               <div className="type-label text-accent opacity-60">NOTE_LOG_0{idx + 1}: {note.title}</div>
                               <p className="type-body text-sm text-text-secondary leading-relaxed border-l border-border-dim pl-6 italic">
                                  &quot;{note.content}&quot;
                               </p>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </section>
           )}

           {/* Section 10: Evolution Timeline */}
           {project.evolution && (
              <section className="pb-sys-128">
                 <SectionDivider label="10_SYSTEM_EVOLUTION" className="mb-sys-96" />
                 <div className="relative max-w-4xl mx-auto pl-8 lg:pl-0">
                    <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[1px] bg-border-dim hidden lg:block" />
                    <div className="space-y-sys-64">
                       {project.evolution.map((step, idx) => (
                         <motion.div key={idx} className={cn("relative flex flex-col lg:flex-row items-center gap-sys-32 lg:gap-0", idx % 2 === 0 ? "lg:flex-row-reverse" : "")}>
                            <div className="absolute left-0 lg:left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full border-4 border-bg-primary z-10" />
                            <div className={cn("w-full lg:w-1/2", idx % 2 === 0 ? "lg:pl-sys-64" : "lg:pr-sys-64 lg:text-right")}>
                               <div className="type-metadata text-[0.5rem] text-accent mb-2 uppercase tracking-[0.3em] font-bold">{step.date || `STEP_0${idx + 1}`}</div>
                               <h4 className="type-emphasis text-sm mb-4">{formatLabel(step.milestone)}</h4>
                               <p className="type-body text-sm text-text-muted leading-relaxed max-w-sm lg:ml-auto lg:mr-0 inline-block">{step.description}</p>
                            </div>
                            <div className="hidden lg:block lg:w-1/2" />
                         </motion.div>
                       ))}
                    </div>
                 </div>
              </section>
           )}

           {/* Section 11 & 12: Challenges & Future */}
           <div className="grid-12 pt-sys-96 border-t border-border-dim">
              <section className="col-span-12 lg:col-span-6 space-y-sys-48">
                 <SectionDivider label="11_ENGINEERING_CHALLENGES" />
                 <div className="space-y-sys-40">
                    {project.challenges?.map((challenge, idx) => (
                      <div key={idx} className="max-w-xl">
                         <h4 className="type-label text-accent mb-4">{formatLabel(challenge.title)}</h4>
                         <p className="type-body text-sm opacity-70 leading-relaxed">{challenge.description}</p>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="col-span-12 lg:col-span-6 space-y-sys-48 mt-sys-96 lg:mt-0 lg:col-start-8">
                 <SectionDivider label="12_SYSTEM_EVOLUTION_BEYOND" />
                 <div className="space-y-sys-40">
                    {project.future?.map((item, idx) => (
                      <div key={idx} className="max-w-xl">
                         <h4 className="type-label text-secondary mb-4">{formatLabel(item.title)}</h4>
                         <p className="type-body text-sm opacity-70 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                 </div>
              </section>
           </div>

           <ProjectNetwork currentSlug={project.slug} />
        </div>
      </main>

      <footer className="system-container mt-sys-128">
         <div className="pt-sys-96 border-t border-border-dim grid-12">
            <div className="col-span-12 lg:col-span-6">
               <div className="type-metadata text-[0.45rem] text-text-muted mb-8 uppercase tracking-widest">NEXT_NODE_IN_MANIFEST</div>
               <Link 
                 href={`/${nextProject.slug}`}
                 className="group relative block p-12 border border-border-dim bg-bg-secondary/10 hover:border-accent transition-all overflow-hidden"
               >
                  <div className="flex justify-between items-center mb-6">
                     <span className="type-metadata text-[0.4rem] text-accent">0{((getProjectIndex(project.slug) + 1) % projects.length) + 1} {'//'} SEQUENTIAL_JUMP</span>
                    <span className="type-metadata text-[0.45rem] text-text-muted group-hover:text-text-primary transition-colors">EXPLORE_NODE →</span>
                  </div>
                  <h3 className="type-display text-4xl uppercase tracking-tighter group-hover:text-accent transition-colors">
                    {nextProject.name}_
                  </h3>
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity select-none pointer-events-none text-text-muted">
                     <span className="type-display text-7xl uppercase">{nextProject.slug}</span>
                  </div>
               </Link>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-end mt-sys-64 lg:mt-0 items-start lg:items-end">
               <div className="space-y-12 text-left lg:text-right w-full">
                  <DiscoveryHint 
                    label={identity.discovery_hints.toProjectComparisonMatrix.label} 
                    href="/#comparison"
                    description={identity.discovery_hints.toProjectComparisonMatrix.description}
                    orientation="right"
                  />
                  <div className="space-y-6">
                    <p className="type-body text-xs text-text-muted leading-relaxed italic">
                      All systems represented in this manifest are part of a unified exploration of technical frontiers.
                    </p>
                    <Link 
                      href="/#systems" 
                      className="btn-primary"
                    >
                      Return to core manifest
                    </Link>
                  </div>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
