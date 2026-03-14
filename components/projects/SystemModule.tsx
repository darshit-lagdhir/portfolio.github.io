"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import Link from "next/link";
import { cn, getProjectUrl, getStatusMetadata, formatLabel } from "@/lib/utils";

interface SystemModuleProps {
  project: Project;
  index: number;
}

export default function SystemModule({ project, index }: SystemModuleProps) {
  const statusMeta = getStatusMetadata(project.status);

  return (
    <Link href={getProjectUrl(project.slug)} className="focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/40 block h-full">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 1,
          delay: index * 0.05,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="module-frame group relative h-full flex flex-col"
      >
        {/* Module Header Hook */}
        <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-20 transition-opacity">
          <span className="type-metadata text-[0.4rem] tracking-[0.4em] font-mono">
            REF_0{index + 1}
          </span>
        </div>

        {/* Status & Credibility Indicators */}
        <div className="flex items-center justify-between mb-sys-48">
          <div className="flex items-center gap-3">
            <span className={cn("w-1 h-1 rounded-full", statusMeta.color.split(" ").filter(c => c.startsWith("bg-"))[0])} />
            <span className="type-metadata text-[0.4rem] opacity-30 tracking-widest font-mono">
              {statusMeta.label === "COMPLETE" ? "STABLE" : statusMeta.label}
            </span>
          </div>
          
          {project.authority && (
            <div className="flex items-center gap-4">
              <div className="flex gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-1 h-1", 
                      i < Math.round((project.authority?.complexityScore || 0) / 2) ? "bg-accent" : "bg-border-dim"
                    )} 
                  />
                ))}
              </div>
              <div className="type-metadata text-[0.35rem] px-2 py-0.5 border border-border-dim text-text-muted/60 uppercase tracking-widest">
                {project.authority.architectureDepth}
              </div>
            </div>
          )}
        </div>

        <div className="mb-sys-32">
          <div className="type-metadata text-[0.35rem] text-accent/20 mb-3 tracking-[0.3em] font-mono">NODE_{index + 1} {'//'} {formatLabel(project.authority?.primaryDomain || "CORE")}</div>
          <h3 className="type-h2 leading-tight text-xl md:text-2xl tracking-tighter">{project.name.toLowerCase()}</h3>
        </div>

        <p className="type-body text-xs mb-sys-64 opacity-40 leading-relaxed font-medium">
          {project.shortDescription}
        </p>

        {/* Technical Depth Metadata Area */}
        {project.authority && (
          <div className="mb-sys-64 space-y-4 pt-8 border-t border-border-dim/20">
             <div>
                <div className="type-metadata text-[0.35rem] opacity-20 mb-3 uppercase tracking-widest font-mono">Inquiry_Vector</div>
                <div className="type-body text-[0.6rem] opacity-40 italic text-text-secondary font-medium">&quot;{project.authority.researchFocus}&quot;</div>
             </div>
          </div>
        )}

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-sys-48">
            {project.techStack.slice(0, 4).map(tech => (
              <span key={tech} className="type-metadata text-[0.4rem] opacity-20 group-hover:opacity-40 transition-opacity font-mono tracking-widest uppercase">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-sys-24 border-t border-border-dim/20">
            <span className="type-nav text-[0.45rem] tracking-[0.4em] opacity-20 group-hover:opacity-60 transition-opacity">DIAGNOSTIC_SPEC</span>
            <span className="text-xs opacity-10 group-hover:opacity-60 transition-all font-mono tracking-widest uppercase">READ_NODE &rarr;</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
