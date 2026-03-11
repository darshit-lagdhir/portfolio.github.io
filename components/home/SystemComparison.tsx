"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SectionDivider from "@/components/shared/SectionDivider";
import DiscoveryHint from "@/components/shared/DiscoveryHint";

interface ComparisonAttribute {
  id: string;
  label: string;
  description: string;
  getValue: (project: any) => string | number | string[];
}

const COMPARISON_ATTRIBUTES: ComparisonAttribute[] = [
  {
    id: "domain",
    label: "PRIMARY_DOMAIN",
    description: "Core technical territory of operation.",
    getValue: (p) => p.authority?.primaryDomain || "N/A"
  },
  {
    id: "architecture",
    label: "ARCH_STYLE",
    description: "Structural pattern governing system logic.",
    getValue: (p) => p.technicalMeta?.architectureStyle || "N/A"
  },
  {
    id: "complexity",
    label: "COMPLEXITY",
    description: "Logic density and boundary isolation score.",
    getValue: (p) => p.authority?.complexityScore || 0
  },
  {
    id: "reliability",
    label: "RELIABILITY",
    description: "Primary technical stability challenge.",
    getValue: (p) => p.challenges?.[0]?.title || "N/A"
  },
  {
    id: "experimentation",
    label: "EXP_VECTORS",
    description: "Areas of active research and iteration.",
    getValue: (p) => p.authority?.experimentationAreas || []
  }
];

export default function SystemComparison() {
  const [activeAttr, setActiveAttr] = useState<string | null>(null);

  return (
    <div id="comparison" className="w-full relative py-sys-32">
      <SectionDivider label="06_COMPARATIVE_ANALYSIS" />

      <div className="mb-sys-64">
        <h2 className="type-h1 uppercase tracking-tighter mb-4">Architectural_Themes_</h2>
        <p className="type-body text-text-secondary max-w-2xl opacity-70">
          A comparative analysis of built systems, identifying the recurring engineering patterns and divergent architectural goals across different domains.
        </p>
      </div>

      {/* DESKTOP COMPARISON GRID */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="min-w-[1000px] border-t border-r border-border-dim">
          {/* Header Row: Systems */}
          <div className="grid grid-cols-12">
            <div className="col-span-3 p-8 border-l border-b border-border-dim bg-bg-secondary/20 flex items-center">
              <div className="type-metadata text-[0.45rem] opacity-30 tracking-[0.2em]">TECHNICAL_DIMENSIONS</div>
            </div>
            {projects.filter(p => p.tier === 1).map((project, idx) => (
              <div key={project.slug} className="module-frame col-span-3 h-full group relative overflow-hidden !rounded-none border-t-0 border-r-0">
                <div className="absolute top-2 right-2">
                   <div className="arch-marker scale-50 opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="type-metadata text-[0.4rem] text-accent mb-4">SYSTEM_NODE_0{idx + 1}</div>
                <h3 className="type-emphasis text-lg mb-6 group-hover:text-accent transition-colors">
                  {project.title.toUpperCase()}
                </h3>
                <Link 
                  href={`/${project.slug}`}
                  className="type-nav text-[0.5rem] text-text-muted hover:text-accent border border-border-dim px-3 py-1.5 transition-all inline-block uppercase"
                >
                  View full spec →
                </Link>
                {/* Visual Background Accent */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                  <span className="type-identity text-5xl">{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Data Rows: Attributes */}
          {COMPARISON_ATTRIBUTES.map((attr) => (
            <div 
              key={attr.id}
              onClick={() => setActiveAttr(activeAttr === attr.id ? null : attr.id)}
              className={cn(
                "grid grid-cols-12 cursor-pointer transition-all duration-300 group",
                activeAttr === attr.id ? "bg-accent/5" : "hover:bg-bg-secondary/40"
              )}
            >
              {/* Attribute Label */}
              <div className="col-span-3 p-8 border-l border-b border-border-dim relative">
                {activeAttr === attr.id && (
                  <motion.div layoutId="comparison-active-indicator" className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
                )}
                <h4 className={cn(
                  "type-metadata text-[0.55rem] tracking-widest mb-2 transition-colors",
                  activeAttr === attr.id ? "text-accent" : "opacity-60"
                )}>
                  {attr.label}
                </h4>
                <p className="type-body text-[0.65rem] opacity-30 italic leading-relaxed">
                  {attr.description}
                </p>
              </div>

              {/* System Values */}
              {projects.filter(p => p.tier === 1).map((project) => {
                const value = attr.getValue(project);
                return (
                  <div key={`${project.slug}-${attr.id}`} className="col-span-3 p-8 border-l border-b border-border-dim flex items-center">
                    {attr.id === "complexity" ? (
                      <div className="flex gap-1.5 w-full">
                        {[...Array(10)].map((_, i) => (
                          <div 
                            key={i} 
                            className={cn(
                              "flex-1 h-3 transition-all duration-500", 
                              i < Number(value) 
                                ? (activeAttr === attr.id ? "bg-accent" : "bg-accent/40") 
                                : "bg-border-dim"
                            )} 
                          />
                        ))}
                      </div>
                    ) : attr.id === "experimentation" ? (
                      <div className="flex flex-col gap-1.5">
                        {(value as string[]).slice(0, 2).map(area => (
                          <span key={area} className="type-metadata text-[0.45rem] opacity-50 px-2 py-0.5 border border-border-dim bg-bg-primary/30 uppercase truncate">
                            {area}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className={cn(
                        "type-emphasis text-[0.65rem] leading-snug tracking-tight uppercase transition-all",
                        activeAttr === attr.id ? "text-text-primary" : "text-text-secondary opacity-60"
                      )}>
                        {value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE COMPARISON STACK */}
      <div className="lg:hidden space-y-6">
        {projects.filter(p => p.tier === 1).map((project, pIdx) => (
          <div key={project.title} className="border border-border-dim bg-bg-secondary/20 overflow-hidden">
            <div className="bg-bg-primary p-6 border-b border-border-dim flex justify-between items-center">
              <div>
                <div className="type-metadata text-[0.4rem] text-accent mb-1">SYSTEM_0{pIdx + 1}</div>
                <h3 className="type-emphasis text-sm">{project.title.toUpperCase()}</h3>
              </div>
              <Link href={`/${project.slug}`} className="type-nav text-[0.5rem] border border-border-dim px-3 py-1">
                SPEC →
              </Link>
            </div>
            
            <div className="p-6 space-y-6 bg-noise">
              {COMPARISON_ATTRIBUTES.map((attr) => {
                const value = attr.getValue(project);
                return (
                  <div key={attr.id} className="space-y-2">
                    <div className="type-metadata text-[0.45rem] opacity-30 uppercase tracking-[0.2em]">{attr.label}</div>
                    {attr.id === "complexity" ? (
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <div 
                            key={i} 
                            className={cn(
                              "flex-1 h-2", 
                              i < Number(value) ? "bg-accent/60" : "bg-border-dim"
                            )} 
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="type-emphasis text-[0.7rem] text-text-secondary leading-tight uppercase">
                        {Array.isArray(value) ? value.join(" // ") : value}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-sys-64 module-frame !p-8 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
        <div className="type-metadata text-[0.45rem] tracking-[0.3em]">CROSS_SYSTEM_THEMES</div>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-accent" />
            <span className="type-metadata text-[0.5rem]">MODULAR_ISOLATION</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-accent" />
            <span className="type-metadata text-[0.5rem]">STATE_VERIFICATION</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-accent" />
            <span className="type-metadata text-[0.5rem]">ASYNC_DATA_PIPELINES</span>
          </div>
        </div>
        <div className="type-metadata text-[0.4rem] font-mono">HASH: 77_ARCH_DISCOVERY_2026</div>
      </div>

      <div className="mt-sys-64 flex justify-end">
        <DiscoveryHint 
          label="EXPLORE_HUMAN_NARRATIVE" 
          href="#about"
          description="Move from system architectures to the conceptual framework of the engineer's career evolution."
          orientation="right"
        />
      </div>
    </div>
  );
}
