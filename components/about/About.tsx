"use client";

import { motion } from "framer-motion";
import { identity } from "@/data/identity";
import SectionDivider from "@/components/shared/SectionDivider";
import DiscoveryHint from "@/components/shared/DiscoveryHint";
import { formatLabel } from "@/lib/utils";

const NARRATIVE_BLOCKS = [
  {
    id: "curiosity",
    label: "INTERNAL_MECHANICS",
    title: "UNDERSTANDING_SYSTEMS",
    content: identity.about.about_intro
  },
  {
    id: "learning",
    label: "LEARNING_PROCESS",
    title: "CONSTRUCT_AND_DEBUG",
    content: identity.about.about_learning_context
  }
];

export default function About() {
  return (
    <div className="w-full relative pb-sys-128 lg:pb-0 overflow-x-hidden">
      <SectionDivider 
        label="01_ABOUT" 
        description={identity.section_transitions.toAbout}
      />

      <div className="grid-12 items-start">
        <div className="col-span-12 lg:col-span-7 mb-sys-64 lg:mb-0">
          <div className="mb-sys-96">
            <h3 className="type-h1 mb-sys-32 break-words text-text-primary">SYSTEM_INVESTIGATOR_</h3>
            <p className="type-body text-lg text-text-secondary prose-readable leading-relaxed">
              An ongoing exploration into internal system mechanics, high-performance architecture, and technical resilience. My focus lies at the intersection of systems engineering and specialized verification pipelines.
            </p>
          </div>

          <div className="space-y-sys-96">
            {/* BIO DETAILS */}
            <div className="pt-sys-48 border-t border-border-dim/20">
              <div className="type-metadata mb-4 opacity-30">EDUCATION_MANIFEST</div>
              <div className="type-emphasis text-base text-text-primary">
                {formatLabel(identity.degree || "")} @ {formatLabel(identity.university || "")}
              </div>
            </div>

            {/* EXPLORATION DOMAINS */}
            <div className="pt-sys-48 border-t border-border-dim/20">
              <div className="type-label text-accent mb-8 tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full opacity-50" />
                  ACTIVE_EXPLORATION_DOMAINS
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-sys-32">
                  {identity.exploration_focus.map((domain, idx) => (
                      <motion.div 
                        key={domain.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="module-frame opacity-80 hover:opacity-100 transition-opacity !p-6"
                      >
                          <h4 className="type-emphasis text-sm mb-3 text-text-primary tracking-tight">{domain.title}</h4>
                          <p className="type-body text-xs text-text-secondary opacity-60 leading-relaxed font-medium">{domain.description}</p>
                      </motion.div>
                  ))}
              </div>
            </div>

            {/* TECHNOLOGY STACK */}
            <div className="pt-sys-48 border-t border-border-dim/20">
              <div className="type-label text-accent mb-8 tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full opacity-50" />
                  SYSTEM_TOOLS_&_CAPABILITIES
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-sys-48">
                  {identity.capabilities.slice(0, 4).map((cap, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="type-metadata opacity-30 uppercase">{formatLabel(cap.category.replace(/ /g, "_"))}</h4>
                      <p className="type-body text-sm font-medium text-text-secondary leading-relaxed max-w-xs">{cap.items.join(" • ")}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8 space-y-sys-64">
          <div className="module-frame space-y-sys-64 relative overflow-hidden">
             {/* Architectural Background Trace */}
             <div className="absolute top-0 left-0 w-[1px] h-full bg-border-dim opacity-20" />
             
             {NARRATIVE_BLOCKS.map((block, idx) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="type-label text-accent mb-4 tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full opacity-50" />
                  {block.label}
                </div>
                <h3 className="type-emphasis text-xl mb-6 tracking-tighter group-hover:text-accent transition-colors">{block.title}</h3>
                <p className="type-body text-text-secondary leading-relaxed text-sm md:text-base prose-readable">
                  {block.content}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:block sticky top-sys-128">
            <AboutVisualElement />

            <div className="mt-sys-64 space-y-sys-32 opacity-20">
              <div className="type-metadata text-[0.5rem] tracking-[0.3em]">STUDENT_INVESTIGATION_STATUS</div>
              <div className="space-y-2 font-mono text-[0.45rem] leading-tight">
                MINDSET: CURIOUS <br />
                LEARNING_LOG: ACTIVE <br />
                FAILURE_TOLERANCE: NOMINAL <br />
                SYSTEM_ACCESS: READ_WRITE <br />
                CURRENT_VERSION: 1.0.0
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-sys-96 flex justify-end">
        <DiscoveryHint 
          label={identity.discovery_hints.toDomains.label}
          href="#domains"
          description={identity.discovery_hints.toDomains.description}
          orientation="right"
        />
      </div>
    </div>
  );
}

function AboutVisualElement() {
  return (
    <div className="relative w-full aspect-square border border-border-dim/50 p-sys-32 flex items-center justify-center overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      {/* Central Diagram Elements */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full text-accent opacity-[0.15]">
          <motion.rect
            x="50" y="50" width="100" height="100"
            stroke="currentColor" strokeWidth="0.5" fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3 }}
          />
          <motion.circle
            cx="100" cy="100" r="40"
            stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="6 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 10 100 H 190 M 100 10 V 190"
            stroke="currentColor" strokeWidth="0.5" opacity="0.3"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          />

          {/* Conceptual Layers */}
          <g className="type-metadata text-[4px] fill-current">
            <text x="105" y="45">HARDWARE_LAYER</text>
            <text x="105" y="95">LOGIC_LAYER</text>
            <text x="105" y="145">INTERFACE_LAYER</text>
          </g>
        </svg>
      </div>

      <div className="mt-sys-128 pt-sys-64 border-t border-border-dim/20 relative">
        <DiscoveryHint 
          label={identity.discovery_hints.toContact.label} 
          href="#contact"
          description={identity.discovery_hints.toContact.description}
          orientation="left"
        />
        <div className="absolute bottom-0 right-0 type-metadata text-[0.4rem] opacity-20 hidden md:block">
          SYS_MINDSET_v1.0
        </div>
      </div>
    </div>
  );
}
