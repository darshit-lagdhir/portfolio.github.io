"use client";

import { projects } from "@/data/projects";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectNetworkProps {
  currentSlug: string;
}

export default function ProjectNetwork({ currentSlug }: ProjectNetworkProps) {
  const otherProjects = projects.filter(p => p.slug !== currentSlug);
  
  return (
    <section className="mt-sys-128 pt-sys-96 border-t border-border-dim">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-sys-64">
        <div>
           <div className="type-metadata text-[0.5rem] text-accent mb-2">SYSTEM_NETWORKING</div>
           <h2 className="type-h1 text-4xl uppercase tracking-tighter break-words hyphens-auto">Engineering Exploration_</h2>
        </div>
        <p className="type-body text-sm text-text-muted max-w-md">
          Exploring the intersection of logistics, advisory intelligence, and formal memory safety through a network of specialized system nodes.
        </p>
      </div>

      <div className="grid-12 gap-y-sys-32">
        {otherProjects.map((project, idx) => (
          <Link key={project.slug} href={`/${project.slug}`} className="col-span-12 md:col-span-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="group p-8 border border-border-dim bg-bg-secondary/20 hover:border-accent/30 transition-all relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="type-metadata text-[0.4rem] opacity-30">SYSTEM_NODE_0{idx + 1}</span>
                <span className="type-metadata text-[0.4rem] text-accent px-2 py-0.5 border border-accent/20">
                  {project.technicalMeta?.systemType.toUpperCase()}
                </span>
              </div>
              
              <h3 className="type-emphasis text-xl mb-4 group-hover:text-accent transition-colors">
                {project.name.toUpperCase()}
              </h3>
              
              <p className="type-body text-sm text-text-muted leading-relaxed group-hover:text-text-secondary transition-colors">
                {project.shortDescription}
              </p>

              {/* Subtle System Relationship Indicator */}
              <div className="mt-8 flex items-center gap-4 opacity-[0.05] group-hover:opacity-20 transition-opacity">
                <div className="h-[1px] w-12 bg-white" />
                <div className="w-1.5 h-1.5 rounded-full bg-white transition-transform group-hover:scale-150 group-hover:bg-accent" />
                <div className="h-[2px] w-2 bg-white" />
                <div className="h-[1px] flex-grow bg-white" />
              </div>

              {/* Background Label */}
               <div className="absolute -bottom-4 -right-2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                 <span className="type-display text-6xl uppercase">{project.slug}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
