"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import Link from "next/link";
import { cn, getProjectUrl, getStatusMetadata, formatLabel } from "@/lib/utils";
import { useScene } from "@/context/SceneContext";

interface SystemModuleProps {
  project: Project;
  index: number;
}

export default function SystemModule({ project, index }: SystemModuleProps) {
  const { isLowPerf } = useScene();
  const statusMeta = getStatusMetadata(project.status);

  return (
    <Link href={getProjectUrl(project.slug)} className="focus:outline-none focus-visible:ring-1 focus-visible:ring-accent flex flex-col h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={!useScene().isMobile ? { 
          scale: 1.015,
          y: -8, // Increased offset for better feedback
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
        } : {}}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: isLowPerf ? 0.3 : 1,
          delay: isLowPerf ? 0 : index * 0.1,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="module-frame group relative flex-1 flex flex-col min-h-[420px] h-full hover:bg-bg-secondary/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Module Header Hook */}
        <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity text-accent">
          <span className="type-metadata text-[0.4rem] tracking-[0.4em] font-mono">
            REF_0{index + 1}
          </span>
        </div>

        {/* Status & Credibility Indicators */}
        <div className="flex items-center justify-between mb-sys-32">
          <div className="flex items-center gap-3 max-w-[65%]">
            <span className={cn("w-1 h-1 rounded-full shrink-0", statusMeta.color)} />
            <span className="type-metadata text-[0.325rem] text-text-muted tracking-wider font-mono leading-tight uppercase">
              {statusMeta.label}
            </span>
          </div>
          
          {project.authority && (
            <div className="flex items-center gap-4">
              <div className="flex gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
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
              <div className="type-metadata text-[0.35rem] px-2 py-0.5 border border-border-dim text-text-muted uppercase tracking-widest bg-bg-primary/30">
                {project.authority.architectureDepth}
              </div>
            </div>
          )}
        </div>

        <div className="mb-sys-32">
          <div className="type-metadata text-[0.35rem] text-accent/60 mb-3 tracking-[0.3em] font-mono whitespace-nowrap overflow-hidden text-ellipsis">NODE_{index + 1} {'//'} {formatLabel(project.authority?.primaryDomain || "CORE")}</div>
          <h3 className="type-h2 leading-tight text-lg sm:text-xl md:text-2xl tracking-tighter text-text-primary group-hover:text-accent transition-colors break-words [text-wrap:balance]">
            {project.name.toLowerCase()}
          </h3>
        </div>

        <p className="type-body text-xs mb-sys-64 text-text-secondary opacity-60 leading-relaxed font-medium">
          {project.shortDescription}
        </p>

        {/* Technical Depth Metadata Area */}
        {project.authority && (
          <div className="mb-sys-64 space-y-4 pt-8 border-t border-border-dim">
             <div>
                <div className="type-metadata text-[0.35rem] text-text-muted mb-3 uppercase tracking-widest font-mono">Inquiry_Vector</div>
                <div className="type-body text-[0.6rem] text-text-secondary/60 italic font-medium">&quot;{project.authority.researchFocus}&quot;</div>
             </div>
          </div>
        )}

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-sys-48">
            {project.techStack.slice(0, 4).map(tech => (
              <span key={tech} className="type-metadata text-[0.4rem] text-text-muted group-hover:text-accent transition-colors font-mono tracking-widest uppercase">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-sys-24 border-t border-border-dim">
            <span className="type-nav text-[0.45rem] tracking-[0.4em] text-text-muted group-hover:text-text-primary transition-colors">DIAGNOSTIC_SPEC</span>
            <span className="text-xs text-text-muted group-hover:text-accent transition-all font-mono tracking-widest uppercase">READ_NODE &rarr;</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
