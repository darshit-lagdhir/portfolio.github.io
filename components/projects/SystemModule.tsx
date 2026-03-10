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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="group relative border border-border-dim bg-bg-secondary p-sys-32 h-full flex flex-col transition-all duration-300 hover:border-accent/50 hover:bg-bg-secondary/80 md:hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5"
      >
        {/* Module Header Hook */}
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
          <span className="type-metadata text-[0.5rem] tracking-widest font-mono">
            SYS_REF_2026_{index + 1}
          </span>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 mb-sys-24">
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            project.status === "COMPLETE" ? "bg-green-500/50" : "bg-yellow-500/50 pulse"
          )} />
          <span className="type-label text-[0.6rem] opacity-50">
            {project.status === "COMPLETE" ? "STABLE_BUILD" : "ACTIVE_RESEARCH"}
          </span>
        </div>

        <div className="mb-sys-16">
          <div className="type-label text-accent mb-2">PROJECT_MODULE</div>
          <h3 className="type-h2 leading-none">{project.title.toUpperCase()}</h3>
        </div>

        <p className="type-body text-sm mb-sys-48 opacity-70 leading-relaxed flex-grow">
          {project.shortDescription}
        </p>

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
