"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SectionDivider from "@/components/shared/SectionDivider";
import { identity } from "@/data/identity";
import DiscoveryHint from "@/components/shared/DiscoveryHint";
import { Project } from "@/types/project";
import { formatLabel, unslugify, getProjectUrl } from "@/lib/utils";

interface ComparisonAttribute {
  id: string;
  label: string;
  description: string;
  getValue: (project: Project) => string | number | string[];
}

const COMPARISON_ATTRIBUTES: ComparisonAttribute[] = [
  {
    id: "purpose",
    label: "PRIMARY_PURPOSE",
    description: "Core objective and functional target.",
    getValue: (p) => p.shortDescription || "N/A"
  },
  {
    id: "category",
    label: "SYSTEM_CATEGORY",
    description: "Architectural classification of the build.",
    getValue: (p) => p.category || "N/A"
  },
  {
    id: "focus",
    label: "TECHNICAL_FOCUS",
    description: "Primary engineering area emphasized.",
    getValue: (p) => p.engineeringFocus || "N/A"
  },
  {
    id: "tech",
    label: "TECH_STACK",
    description: "Core languages and frameworks used.",
    getValue: (p) => p.techStack || []
  },
  {
    id: "status",
    label: "PROJECT_STATUS",
    description: "Current state of development/deployment.",
    getValue: (p) => p.status || "N/A"
  },
  {
    id: "scale",
    label: "SYSTEM_SCALE",
    description: "Scope and magnitude of the system implementation.",
    getValue: (p) => p.technicalMeta?.scale || "N/A"
  },
  {
    id: "outcomes",
    label: "LEARNING_OUTCOMES",
    description: "Key architectural insights gained.",
    getValue: (p) => p.learningOutcomes || []
  }
];

export default function SystemComparison() {
  const [activeAttr, setActiveAttr] = useState<string | null>(null);

  return (
    <div id="comparison" className="w-full relative py-sys-32">
      <SectionDivider 
        label="04_COMPARISON" 
        description={identity.section_transitions.toComparison}
      />

      <div className="mb-sys-64">
        <h2 className="type-h1 uppercase tracking-tighter mb-4 break-words hyphens-auto">Architectural_Themes_</h2>
        <p className="type-body text-text-secondary max-w-2xl opacity-70">
          A comparative analysis of built systems, identifying the recurring engineering patterns and divergent architectural goals across different domains.
        </p>
      </div>

      {/* DESKTOP COMPARISON GRID */}
      <div className="hidden lg:block overflow-x-auto pb-8 mask-fade-right">
        <div className="min-w-[1100px] border-t border-r border-border-dim">
          {/* Header Row: Systems */}
          <div className="grid-12">
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
                  {formatLabel(project.name)}
                </h3>
                <Link 
                  href={getProjectUrl(project.slug)}
                  className="type-nav text-[0.5rem] text-text-muted hover:text-accent border border-border-dim px-3 py-1.5 transition-all inline-block uppercase"
                >
                  View full spec →
                </Link>
                {/* Visual Background Accent */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                  <span className="type-display text-5xl">{idx + 1}</span>
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
                "grid-12 cursor-pointer transition-colors duration-300 group",
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
                <p className="type-body text-[0.6rem] opacity-20 italic font-medium">
                  {attr.description}
                </p>
              </div>

              {/* System Values */}
              {projects.filter(p => p.tier === 1).map((project) => {
                const value = attr.getValue(project);
                const isArray = Array.isArray(value);

                return (
                  <div key={`${project.slug}-${attr.id}`} className="col-span-3 p-8 border-l border-b border-border-dim flex items-center min-w-0">
                    {isArray ? (
                      <div className="flex flex-wrap gap-1.5 grayscale opacity-40 group-hover:opacity-80 transition-all overflow-hidden">
                        {(value as string[]).map(item => (
                          <span key={item} className="type-metadata text-[0.35rem] px-2 py-0.5 border border-border-dim uppercase break-words hyphens-auto max-w-full">
                            {formatLabel(item)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className={cn(
                        "type-emphasis text-[0.6rem] leading-snug tracking-tight uppercase transition-all break-words hyphens-auto",
                        activeAttr === attr.id ? "text-text-primary/70" : "text-text-secondary opacity-30"
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
          <div key={project.name} className="border border-border-dim bg-bg-secondary/20 overflow-hidden">
            <div className="bg-bg-primary p-6 border-b border-border-dim flex justify-between items-center">
               <div>
                <div className="type-metadata text-[0.4rem] text-accent mb-1">SYSTEM_0{pIdx + 1}</div>
                <h3 className="type-emphasis text-sm">{formatLabel(project.name)}</h3>
              </div>
              <Link href={getProjectUrl(project.slug)} className="type-nav text-[0.5rem] border border-border-dim px-3 py-1">
                SPEC →
              </Link>
            </div>
            
            <div className="p-6 space-y-8 bg-noise">
              {COMPARISON_ATTRIBUTES.map((attr) => {
                const value = attr.getValue(project);
                const isArray = Array.isArray(value);
                return (
                  <div key={attr.id} className="space-y-3">
                    <div className="type-metadata text-[0.45rem] opacity-30 uppercase tracking-[0.2em]">{attr.label}</div>
                    <div className="type-emphasis text-[0.7rem] text-text-secondary leading-tight uppercase">
                      {isArray ? (value as string[]).map(v => formatLabel(v)).join(" // ") : formatLabel(String(value))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-sys-64 module-frame !p-5 md:!p-8 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
        <div className="type-metadata text-[0.45rem] tracking-[0.3em]">CROSS_SYSTEM_THEMES</div>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-accent" />
            <span className="type-metadata text-[0.5rem]">ROLE_BASED_ISOLATION</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-accent" />
            <span className="type-metadata text-[0.5rem]">CONTRACT_DRIVEN_SAFETY</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-accent" />
            <span className="type-metadata text-[0.5rem]">ADVISORY_INTELLIGENCE</span>
          </div>
        </div>
        <div className="type-metadata text-[0.4rem] font-mono">HASH: 77_ARCH_DISCOVERY_2026</div>
      </div>

      <div className="mt-sys-64 flex justify-end">
        <DiscoveryHint 
          label={identity.discovery_hints.toExploration.label} 
          href="#exploration"
          description={identity.discovery_hints.toExploration.description}
          orientation="right"
        />
      </div>
    </div>
  );
}
