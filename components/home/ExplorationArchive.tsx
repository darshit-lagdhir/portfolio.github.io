"use client";

import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import SectionDivider from "@/components/shared/SectionDivider";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ExplorationArchive() {
  const experimentalProjects = projects.filter(p => p.tier === 2 || p.tier === 3);

  if (experimentalProjects.length === 0) return null;

  return (
    <div className="w-full relative">
      <SectionDivider label="ARC_EXPLORATION_ARCHIVE" />
      
      <div className="mb-sys-48">
        <h2 className="type-h2">TECHNICAL_EXPLORATIONS_</h2>
        <p className="type-body text-sm opacity-60 max-w-2xl leading-relaxed">
          While the primary manifest focuses on core system builds, this archive contains specialized research, low-level prototypes, and technical investigations into specific architectural mechanics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experimentalProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Link 
              href={`/${project.slug}`}
              className="module-frame group block h-full flex flex-col relative !p-6 hover:border-accent/40 transition-all border-dashed"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                 {project.tier === 3 && (
                   <span className="type-metadata text-[0.4rem] px-1.5 py-0.5 border border-text-muted/30 text-text-muted bg-bg-primary/50">
                     ARCHIVED
                   </span>
                 )}
                 <div className="arch-marker scale-50 opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex items-center gap-2 mb-4">
                 <span className={cn(
                   "w-1 h-3",
                   project.tier === 2 ? "bg-accent" : "bg-text-muted"
                 )} />
                 <span className="type-metadata text-[0.45rem] tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                   SYS_EP_{project.slug.toUpperCase().substring(0, 8)}
                 </span>
              </div>

              <h3 className="type-emphasis text-sm mb-2 group-hover:text-accent transition-colors">
                {project.title.toUpperCase()}
              </h3>
              
              <p className="type-body text-[0.7rem] opacity-50 mb-6 flex-grow leading-relaxed">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border-dim/30">
                {project.techStack.map(tech => (
                  <span key={tech} className="type-metadata text-[0.4rem] opacity-30 group-hover:opacity-60 transition-opacity">
                    {tech.toUpperCase()}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-sys-64 flex justify-center">
         <div className="flex items-center gap-4 py-3 px-8 border border-border-dim/20 bg-bg-secondary/10">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse" />
            <span className="type-metadata text-[0.45rem] tracking-[0.2em] opacity-30">SCALABLE ARCHIVE SYSTEM // TIER_2_RESEARCH_ACTIVE</span>
         </div>
      </div>
    </div>
  );
}
