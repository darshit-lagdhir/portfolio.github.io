"use client";

import { motion } from "framer-motion";

import { identity } from "@/data/identity";
import SectionDivider from "@/components/shared/SectionDivider";
import DiscoveryHint from "@/components/shared/DiscoveryHint";

const capabilityClusters = identity.capabilities.map((cap, idx) => ({
  ...cap,
  id: `cap-${idx}`
}));

export default function Capabilities() {
  return (
    <div className="w-full relative">
      {/* 
         PHASE 4 — KNOWLEDGE MAPPING VISUALIZATION 
         Subtle background lines and nodes connecting conceptual domains.
      */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden -z-10">
        <svg width="100%" height="100%" viewBox="0 0 1000 800" fill="none" preserveAspectRatio="none">
          <circle cx="200" cy="200" r="2" fill="currentColor" />
          <circle cx="800" cy="150" r="2" fill="currentColor" />
          <circle cx="500" cy="400" r="2" fill="currentColor" />
          <circle cx="150" cy="650" r="2" fill="currentColor" />
          <circle cx="850" cy="700" r="2" fill="currentColor" />
          <path d="M200 200 L800 150 L500 400 L150 650 L850 700 L200 200" stroke="currentColor" strokeWidth="0.5" />
          <path d="M500 400 L200 200 M500 400 L850 700" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <SectionDivider 
        label="05_EXPLORATION" 
        description={identity.section_transitions.toExploration}
      />

      <div className="grid-12 mb-sys-64">
        <div className="col-span-full lg:col-span-8">
          <h2 className="type-h1 break-words hyphens-auto">Knowledge_Mapping_</h2>
          <p className="type-body text-lg max-w-2xl text-text-secondary">
            Modular categorization of technical domains and ongoing intellectual explorations. These areas represent investigative paths rather than static mastery.
          </p>
        </div>
      </div>

      {/* PHASE 3 & 6 — CAPABILITY MODULE GRID */}
      <div className="grid-12 gap-y-sys-48 auto-rows-fr">
        {capabilityClusters.map((cluster, index) => (
          <motion.div
            key={cluster.id}
            tabIndex={0}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="module-frame group relative bg-bg-secondary/10 p-sys-40 hover:border-accent/20 transition-[border-color,background-color,box-shadow,ring] duration-300 flex flex-col h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/30 col-span-full md:col-span-6 lg:col-span-4"
          >
            <div className="type-metadata mb-sys-32 text-accent/40 flex items-center relative">
              <span className="absolute -left-6 w-1 h-1 bg-accent/30 rounded-full" />
              DOMAIN_0{index + 1}
            </div>

            <h3 className="type-emphasis text-sm mb-sys-24 group-hover:text-accent/60 transition-colors tracking-tight">
              {cluster.category}
            </h3>

            <p className="type-body text-xs mb-sys-32 opacity-40 leading-relaxed flex-grow font-medium">
              {cluster.description}
            </p>

            {/* ASSOCIATED PROJECTS */}
            {cluster.projects && cluster.projects.length > 0 && (
              <div className="mb-sys-32 flex flex-wrap gap-2">
                {cluster.projects.map(proj => (
                  <span key={proj} className="type-metadata text-[0.35rem] text-accent/60 px-1.5 py-0.5 border border-accent/10 bg-accent/5">
                    {proj}
                  </span>
                ))}
              </div>
            )}

            {/* TECHNICAL PRIMITIVES LIST */}
            <div className="mt-auto pt-sys-32 border-t border-border-dim/20">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {cluster.items.map(item => (
                  <span key={item} className="type-metadata text-[0.4rem] opacity-20 group-hover:opacity-60 transition-opacity uppercase font-mono tracking-widest">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-sys-64 flex justify-end">
        <DiscoveryHint 
          label={identity.discovery_hints.toArchive.label}
          href="#archive"
          description={identity.discovery_hints.toArchive.description}
          orientation="right"
        />
      </div>
    </div>
  );
}
