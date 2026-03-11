"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import SectionDivider from "@/components/shared/SectionDivider";

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
  const currentIndex = projects.findIndex(p => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="min-h-screen pb-sys-128 bg-noise">
      {/* 
         PHASE 2: PROJECT IDENTITY HEADER 
      */}
      <header className="relative py-sys-64 border-b border-border-dim overflow-hidden">
        <div className="system-container mb-sys-64">
          <Link 
            href="/#systems" 
            className="group inline-flex items-center gap-2 type-nav text-[0.6rem] text-text-muted hover:text-accent transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            RETURN_TO_MANIFEST
          </Link>
        </div>

        <div className="system-container grid-12 items-end">
          <div className="col-span-12 lg:col-span-8">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-3 mb-sys-24"
             >
               <span className={cn(
                 "w-2 h-2 rounded-full",
                 project.status === "COMPLETE" ? "bg-green-500/50" : "bg-yellow-500/50 pulse"
               )} />
               <span className="type-metadata text-[0.5rem] text-accent tracking-widest">
                 {project.status === "COMPLETE" ? "STABLE_SYSTEM_NODE" : "NODE_UNDER_DEVELOPMENT"}
               </span>
             </motion.div>

             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="type-identity text-5xl md:text-8xl leading-none mb-sys-32"
             >
               {project.title.toUpperCase()}_
             </motion.h1>

             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="type-body text-xl md:text-2xl text-text-secondary max-w-3xl leading-snug mb-sys-32"
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
                  <span key={tech} className="type-metadata text-[0.45rem] opacity-40 border border-border-dim px-2 py-1">
                    {tech.toUpperCase()}
                  </span>
                ))}
             </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-4 mt-sys-48 lg:mt-0 flex flex-col gap-6 lg:items-end">
             <div className="text-left lg:text-right">
                <div className="type-metadata text-[0.5rem] opacity-30 mb-2">SYSTEM_ARCHITECTURE</div>
                <div className="type-label text-accent">{project.technicalMeta?.architectureStyle.toUpperCase()}</div>
             </div>
             <div className="text-left lg:text-right">
                <div className="type-metadata text-[0.5rem] opacity-30 mb-2">CORE_CLASSIFICATION</div>
                <div className="type-label">{project.technicalMeta?.systemType.toUpperCase()}</div>
             </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 p-sys-32 opacity-[0.02] select-none pointer-events-none hidden lg:block">
           <span className="type-identity text-[15rem] leading-none uppercase">{project.slug}</span>
        </div>
      </header>

      <main className="system-container pt-sys-96">
        <div className="grid-12 gap-sys-96">
          {/* Section 01 & 02: Detailed Narrative & Architecture */}
          <div className="col-span-12 lg:col-span-7 space-y-sys-96">
            <section>
               <SectionDivider label="01_SYSTEM_OVERVIEW" className="mb-sys-48" />
               <div className="space-y-sys-32">
                 <p className="type-body text-lg leading-relaxed text-text-primary">
                   {project.overview}
                 </p>
                 <div className="bg-bg-secondary border-l-2 border-accent/30 p-8">
                    <div className="type-metadata text-[0.5rem] text-accent mb-4 tracking-tighter">PROBLEM_STATEMENT</div>
                    <p className="type-body opacity-70 italic text-sm md:text-base">
                       &quot;{project.problem}&quot;
                    </p>
                 </div>
               </div>
            </section>

            <section>
               <SectionDivider label="02_ARCHITECTURE_SPEC" className="mb-sys-48" />
               <div className="space-y-sys-32">
                 <p className="type-body leading-relaxed text-text-secondary">
                   {project.architecture}
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-sys-24 mt-sys-48">
                    {project.internalComponents?.map((comp, idx) => (
                      <div key={idx} className="p-6 border border-border-dim bg-bg-secondary/50 group hover:border-accent/30 transition-colors">
                        <div className="type-metadata text-[0.5rem] text-accent mb-3">COMP_0{idx + 1}</div>
                        <h4 className="type-label text-sm mb-2">{comp.name.toUpperCase()}</h4>
                        <p className="type-body text-xs opacity-60 leading-relaxed">{comp.description}</p>
                      </div>
                    ))}
                 </div>

                 {project.diagram && (
                   <div className="mt-sys-96">
                     <div className="flex items-center gap-4 mb-sys-32 opacity-30">
                        <div className="h-[1px] flex-grow bg-border-dim" />
                        <span className="type-metadata text-[0.5rem] tracking-widest">SYSTEM_BLUEPRINT_REFERENCE</span>
                        <div className="h-[1px] flex-grow bg-border-dim" />
                     </div>
                     <ArchitectureDiagram diagram={project.diagram} />
                   </div>
                 )}
               </div>
            </section>
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:col-start-9 space-y-sys-96">
            <section>
               <SectionDivider label="03_TECH_STACK" className="mb-sys-32" />
               <div className="space-y-sys-32">
                  {project.techGroups?.map((group, idx) => (
                    <div key={idx} className="space-y-3">
                       <h5 className="type-metadata text-[0.5rem] opacity-30 tracking-widest">{group.role.toUpperCase()}</h5>
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
               <SectionDivider label="04_SYSTEM_METRICS" className="mb-sys-32" />
               <div className="bg-bg-secondary/30 p-6 border border-border-dim font-mono text-[0.6rem] space-y-3 text-text-muted">
                  <div className="flex justify-between">
                    <span>UPTIME_GUARANTEE</span>
                    <span className="text-accent">99.98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LATENCY_OPTIMIZATION</span>
                    <span className="text-secondary">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>REDUNDANCY_LAYERS</span>
                    <span>03_NODES</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STORAGE_PROTOCOL</span>
                    <span className="text-accent">{project.technicalMeta?.storageType}</span>
                  </div>
               </div>
            </section>

            {project.authority?.recurringPatterns && (
              <section>
                 <SectionDivider label="05_RECURRING_PATTERNS" className="mb-sys-32" />
                 <div className="space-y-4">
                    {project.authority.recurringPatterns.map(pattern => (
                      <div key={pattern} className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 bg-accent/40 rotate-45" />
                         <span className="type-metadata text-[0.6rem] opacity-60 tracking-tight">{pattern.toUpperCase()}</span>
                      </div>
                    ))}
                 </div>
              </section>
            )}
          </aside>
        </div>

        <div className="mt-sys-128 space-y-sys-128">
           {/* Section 05: Engineering Decisions & Trade-offs */}
           <section>
              <SectionDivider label="06_DESIGN_REASONING" className="mb-sys-64" />
              
              <div className="grid-12 gap-sys-64">
                 <div className="col-span-12 lg:col-span-7 space-y-sys-64">
                    {project.architectureDecisions?.map((decision, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 border border-border-dim bg-bg-secondary/30 relative group"
                      >
                         <div className="type-metadata text-[0.45rem] text-accent mb-4">DECISION_LOG_0{idx + 1}</div>
                         <h3 className="type-emphasis text-lg mb-8 uppercase tracking-tighter">{decision.title}</h3>
                         <div className="space-y-6">
                            <div>
                               <div className="type-metadata text-[0.4rem] opacity-30 mb-2">THE_PROBLEM</div>
                               <p className="type-body text-sm text-text-secondary">{decision.problem}</p>
                            </div>
                            <div>
                               <div className="type-metadata text-[0.4rem] opacity-30 mb-2">THE_APPROACH</div>
                               <p className="type-body text-sm text-text-primary">{decision.approach}</p>
                            </div>
                            <div className="pt-4 border-t border-border-dim">
                                <p className="type-body text-xs italic opacity-60">&quot;Reasoning: {decision.reasoning}&quot;</p>
                            </div>
                         </div>
                         {decision.alternatives && (
                            <div className="mt-8 flex flex-wrap gap-3">
                               <span className="type-metadata text-[0.4rem] opacity-20">DISCARDED_VECTORS:</span>
                               {decision.alternatives.map(alt => (
                                 <span key={alt} className="type-metadata text-[0.4rem] text-text-muted line-through opacity-40">{alt}</span>
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

           {/* Section 06: Operational Runtime Simulation (Story Flow) */}
           {project.storyFlow && project.diagram && (
              <section className="py-sys-128 border-t border-border-dim">
                 <SectionDivider label="07_RUNTIME_SIMULATION" className="mb-sys-64" />
                
                <div className="space-y-sys-64">
                   <ArchitectureDiagram 
                      diagram={project.diagram} 
                      highlightedNodes={highlightedNodes}
                   />
                   
                   <SystemStoryFlow 
                      steps={project.storyFlow}
                      onStepChange={(step) => setHighlightedNodes(step.activeNodes)}
                   />
                </div>
              </section>
           )}

           {/* Section 08: Technical Deep Dives (Authority & Credibility) */}
           {project.authority?.deepDives && (
              <section>
                 <SectionDivider label="08_TECHNICAL_DEEP_DIVES" className="mb-sys-64" />
                 <div className="grid-12 gap-sys-48">
                    {project.authority.deepDives.map((dive, idx) => (
                      <div 
                        key={idx} 
                        className="col-span-12 lg:col-span-6 p-10 border border-border-dim bg-bg-secondary/20 hover:border-accent/40 transition-all group"
                      >
                         <div className="type-metadata text-[0.45rem] text-accent mb-6 flex items-center gap-3">
                            <span className="w-1 h-1 bg-accent" />
                            DEEP_DIVE_0{idx + 1} {'//'} {dive.type}
                         </div>
                         <h3 className="type-emphasis text-xl mb-6 tracking-tighter group-hover:text-accent transition-colors">{dive.title}</h3>
                         <p className="type-body text-sm leading-relaxed text-text-secondary opacity-80 group-hover:opacity-100 transition-opacity">
                            {dive.content}
                         </p>
                      </div>
                    ))}
                 </div>
              </section>
           )}

           {/* Section 09: Experimentation Log */}
           {project.authority?.experimentationNotes && (
              <section>
                 <SectionDivider label="09_EXPERIMENTATION_LOG" className="mb-sys-64" />
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
                               <h4 className="type-emphasis text-sm mb-4">{step.milestone.toUpperCase()}</h4>
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
                         <h4 className="type-label text-accent mb-4">{challenge.title.toUpperCase()}</h4>
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
                         <h4 className="type-label text-secondary mb-4">{item.title.toUpperCase()}</h4>
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
               <div className="type-metadata text-[0.45rem] opacity-30 mb-8 uppercase tracking-widest">NEXT_NODE_IN_MANIFEST</div>
               <Link 
                 href={`/${nextProject.slug}`}
                 className="group relative block p-12 border border-border-dim bg-bg-secondary/10 hover:border-accent/40 transition-all overflow-hidden"
               >
                  <div className="flex justify-between items-center mb-6">
                     <span className="type-metadata text-[0.4rem] text-accent">0{((currentIndex + 1) % projects.length) + 1} {'//'} SEQUENTIAL_JUMP</span>
                    <span className="type-metadata text-[0.45rem] opacity-30 group-hover:opacity-100 transition-opacity">EXPLORE_NODE →</span>
                  </div>
                  <h3 className="type-identity text-4xl uppercase tracking-tighter group-hover:text-accent transition-colors">
                    {nextProject.title}_
                  </h3>
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity select-none pointer-events-none">
                     <span className="type-identity text-7xl uppercase">{nextProject.slug}</span>
                  </div>
               </Link>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-end mt-sys-64 lg:mt-0">
               <div className="space-y-6 text-left lg:text-right">
                  <p className="type-body text-xs text-text-muted leading-relaxed italic">
                    All systems represented in this manifest are part of a unified exploration of technical frontiers.
                  </p>
                  <Link 
                    href="/#systems" 
                    className="type-nav text-[0.55rem] text-accent border border-accent/20 px-8 py-3 hover:bg-accent/5 transition-all inline-block uppercase"
                  >
                    Return to core manifest
                  </Link>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
