"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import Link from "next/link";
import { cn } from "../../lib/utils";

interface SystemModuleProps {
  project: Project;
  index: number;
}

export default function SystemModule({ project, index }: SystemModuleProps) {
  return (
    <Link href={`/${project.slug}`} className="focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 0.6,
          delay: index * 0.05,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="group relative border border-border-dim bg-bg-secondary p-sys-32 h-full flex flex-col transition-all duration-[250ms] ease-out hover:border-accent/50 hover:bg-bg-secondary/80 md:hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5"
      >
        {/* Module Header Hook */}
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
          <span className="type-metadata text-[0.5rem] tracking-widest font-mono">
            SYS_REF_2026_{index + 1}
          </span>
        </div>

        {/* Status & Credibility Indicators */}
        <div className="flex items-center justify-between mb-sys-24">
          <div className="flex items-center gap-2">
            <span className={cn(
              "w-1.5 h-1.5 rounded-full",
              project.status === "COMPLETE" ? "bg-green-500/50" : "bg-yellow-500/50 pulse"
            )} />
            <span className="type-label text-[0.6rem] opacity-50">
              {project.status === "COMPLETE" ? "STABLE_BUILD" : "ACTIVE_RESEARCH"}
            </span>
          </div>
          
          {project.authority && (
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                   <div className="type-metadata text-[0.4rem] opacity-30">COMPLEXITY</div>
                   <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "w-1.5 h-1", 
                            i < Math.round((project.authority?.complexityScore || 0) / 2) ? "bg-accent" : "bg-border-dim"
                          )} 
                        />
                      ))}
                   </div>
                </div>
                <div className="type-metadata text-[0.45rem] px-2 py-0.5 border border-accent/20 text-accent bg-accent/5">
                   {project.authority.architectureDepth}
                </div>
             </div>
          )}
        </div>

        <div className="mb-sys-16">
          <div className="type-label text-accent mb-2">PROJECT_MODULE // {project.authority?.primaryDomain.toUpperCase() || "CORE"}</div>
          <h3 className="type-h2 leading-none">{project.title.toUpperCase()}</h3>
        </div>

        <p className="type-body text-sm mb-sys-32 opacity-70 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Technical Depth Metadata Area */}
        {project.authority && (
          <div className="mb-sys-48 space-y-4 pt-4 border-t border-border-dim/30">
             <div>
                <div className="type-metadata text-[0.4rem] opacity-30 mb-1.5 uppercase tracking-widest">Research_Focus</div>
                <div className="type-body text-[0.65rem] opacity-80 italic">&quot;{project.authority.researchFocus}&quot;</div>
             </div>
             <div className="flex flex-wrap gap-2">
                {project.authority.experimentationAreas.map(area => (
                  <span key={area} className="type-metadata text-[0.4rem] opacity-40 bg-bg-primary/50 px-1.5 py-0.5">
                    #{area.toUpperCase().replace(/\s+/g, '_')}
                  </span>
                ))}
             </div>
          </div>
        )}

        <div className="mt-auto">
          <div className="type-metadata text-[0.5rem] mb-sys-12 opacity-30">TECHNICAL_STACK</div>
          <div className="flex flex-wrap gap-2 mb-sys-32">
            {project.techStack.map(tech => (
              <span key={tech} className="px-2 py-0.5 border border-border-dim bg-bg-primary type-metadata text-[0.6rem] opacity-60">
                {tech.toUpperCase()}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between group-hover:text-accent transition-colors pt-sys-16 border-t border-border-dim/30">
            <span className="type-nav text-[0.6rem]">VIEW_ARCHITECTURAL_SPEC</span>
            <span className="text-xl translate-y-[-2px] group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
        </div>

        {/* Diagnostic Corner Accent */}
        <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border border-accent/20 rotate-45" />
        </div>
      </motion.div>
    </Link>
  );
}
