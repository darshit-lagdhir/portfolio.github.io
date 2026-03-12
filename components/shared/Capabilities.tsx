"use client";

import { motion } from "framer-motion";

import { identity } from "@/data/identity";

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

      {/* PHASE 1 — SECTION CONTAINER & HEADERS */}
      <div className="section-divider" data-label="03_ENGINEERING_CAPABILITIES">
        <span className="divider-label">03_ENGINEERING_CAPABILITIES</span>
      </div>

      <div className="grid-12 mb-sys-64">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="type-h1">KNOWLEDGE_MAPPING_</h2>
          <p className="type-body text-lg max-w-2xl text-text-secondary">
            Modular categorization of technical domains and ongoing intellectual explorations. These areas represent investigative paths rather than static mastery.
          </p>
        </div>
      </div>

      {/* PHASE 3 & 6 — CAPABILITY MODULE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {capabilityClusters.map((cluster, index) => (
          <motion.div
            key={cluster.id}
            tabIndex={0}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 1 }}
            className="module-frame group relative bg-bg-secondary/10 p-10 hover:border-accent/20 transition-all duration-[400ms] flex flex-col h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/30"
          >
            <div className="type-metadata mb-8 text-accent/40 flex items-center gap-3">
              <span className="w-1 h-1 bg-accent/30 rounded-full" />
              DOMAIN_0{index + 1}
            </div>

            <h3 className="type-emphasis text-sm mb-6 group-hover:text-accent/60 transition-colors tracking-tight">
              {cluster.category}
            </h3>

            <p className="type-body text-xs mb-8 opacity-40 leading-relaxed flex-grow font-medium">
              {cluster.description}
            </p>

            {/* ASSOCIATED PROJECTS */}
            {cluster.projects && cluster.projects.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {cluster.projects.map(proj => (
                  <span key={proj} className="type-metadata text-[0.35rem] text-accent/60 px-1.5 py-0.5 border border-accent/10 bg-accent/5">
                    {proj}
                  </span>
                ))}
              </div>
            )}

            {/* TECHNICAL PRIMITIVES LIST */}
            <div className="mt-auto pt-8 border-t border-border-dim/20">
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
    </div>
  );
}
