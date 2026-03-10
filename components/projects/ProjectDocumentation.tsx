"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectDocumentationProps {
  project: Project;
}

export default function ProjectDocumentation({ project }: ProjectDocumentationProps) {
  return (
    <div className="min-h-screen pb-sys-128">
      {/* 
         PHASE 2: PROJECT IDENTITY HEADER 
         Industrial, documentation-style header with primary metadata.
      */}
      <header className="relative py-sys-64 border-b border-border-dim overflow-hidden">
        {/* Navigation Back */}
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

        {/* Decorative Background Text */}
        <div className="absolute top-0 right-0 p-sys-32 opacity-[0.02] select-none pointer-events-none hidden lg:block">
           <span className="type-identity text-[15rem] leading-none uppercase">{project.slug}</span>
        </div>
      </header>

      {/* 
         PHASE 3 & 4: OVERVIEW & ARCHITECTURE 
         The intellectual core of the documentation.
      */}
      <main className="system-container pt-sys-96">
        <div className="grid-12 gap-sys-96">
          {/* Detailed Narrative */}
          <div className="col-span-12 lg:col-span-7 space-y-sys-96">
            <section>
               <div className="section-divider mb-sys-48" data-label="01_SYSTEM_OVERVIEW">
                 <span className="divider-label">01_SYSTEM_OVERVIEW</span>
               </div>
               <div className="space-y-sys-32">
                 <p className="type-body text-lg leading-relaxed text-text-primary">
                   {project.overview}
                 </p>
                 <div className="bg-bg-secondary border-l-2 border-accent/30 p-8">
                    <div className="type-metadata text-[0.5rem] text-accent mb-4 tracking-tighter">PROBLEM_STATEMENT</div>
                    <p className="type-body opacity-70 italic text-sm md:text-base">
                       "{project.problem}"
                    </p>
                 </div>
               </div>
            </section>

            <section>
               <div className="section-divider mb-sys-48" data-label="02_ARCHITECTURE_SPEC">
                 <span className="divider-label">02_ARCHITECTURE_SPEC</span>
               </div>
               <div className="space-y-sys-32">
                 <p className="type-body leading-relaxed text-text-secondary">
                   {project.architecture}
                 </p>
                 
                 {/* Internal Components Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-sys-24 mt-sys-48">
                    {project.internalComponents?.map((comp, idx) => (
                      <div key={idx} className="p-6 border border-border-dim bg-bg-secondary/50 group hover:border-accent/30 transition-colors">
                        <div className="type-metadata text-[0.5rem] text-accent mb-3">COMP_0{idx + 1}</div>
                        <h4 className="type-label text-sm mb-2">{comp.name.toUpperCase()}</h4>
                        <p className="type-body text-xs opacity-60 leading-relaxed">{comp.description}</p>
                      </div>
                    ))}
                 </div>
               </div>
            </section>
          </div>

          {/* Sidepanel: Stack & Meta */}
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9 space-y-sys-96">
            {/* Tech Stack Grouping */}
            <section>
               <div className="section-divider mb-sys-32" data-label="03_TECH_STACK">
                 <span className="divider-label">03_TECH_STACK</span>
               </div>
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

            {/* Diagnostic Metrics */}
            <section>
               <div className="section-divider mb-sys-32" data-label="04_SYSTEM_METRICS">
                 <span className="divider-label">04_SYSTEM_METRICS</span>
               </div>
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
          </aside>
        </div>

        {/* 
           PHASE 7 & 8: CHALLENGES & FUTURE 
           Footer analysis sections.
        */}
        <div className="grid-12 mt-sys-96 pt-sys-96 border-t border-border-dim">
           <section className="col-span-12 lg:col-span-6 space-y-sys-48">
              <div className="section-divider" data-label="05_DESIGN_CHALLENGES">
                <span className="divider-label">05_DESIGN_CHALLENGES</span>
              </div>
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
              <div className="section-divider" data-label="06_FUTURE_ROADMAP">
                <span className="divider-label">06_FUTURE_ROADMAP</span>
              </div>
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
      </main>

      {/* 
         PHASE 9: NAVIGATION BACK 
      */}
      <footer className="system-container mt-sys-128 pt-sys-64 border-t border-border-dim text-center">
         <Link 
           href="/#systems" 
           className="btn-primary inline-flex py-4 px-12"
         >
           BACK_TO_SYSTEM_LOCATOR
         </Link>
      </footer>
    </div>
  );
}
