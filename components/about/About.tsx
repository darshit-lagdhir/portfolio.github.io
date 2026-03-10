"use client";

import { motion } from "framer-motion";
import { identity } from "@/data/identity";

const NARRATIVE_BLOCKS = [
  {
    id: "curiosity",
    label: "CURIOSITY",
    title: "INTERNAL_MECHANICS",
    content: `My approach to engineering is driven by a fundamental need to understand the 'how' behind the 'what'. I don't just use tools; I investigate their internal mechanics. Whether it's tracing a packet through a network layer or analyzing the memory layout of a low-level language, my curiosity is always focused on the structural integrity of the system.`
  },
  {
    id: "learning",
    label: "LEARNING_PROCESS",
    title: "CONSTRUCT_AND_DEBUG",
    content: "I believe in a high-fidelity learning loop: Build, break, debug, and redesign. It's a cycle of perpetual optimization. I value the lessons learned from a broken state as much as the success of a stable build. This persistence is what allows me to navigate complex, polyglot environments with confidence."
  },
  {
    id: "interests",
    label: "TECHNICAL_INTERESTS",
    title: "DOMAIN_EXPLORATION",
    content: `Currently, I am deep-diving into systems programming with Rust and C++, exploring formal FFI contract verification, and building high-performance backend architectures. I'm fascinated by the intersection of security, distributed logic, and the raw performance of near-metal code.`
  },
  {
    id: "perspective",
    label: "PERSPECTIVE",
    title: "HUMILITY_IN_SYSTEMS",
    content: "Building real-world systems requires a balanced blend of architectural ambition and engineering humility. I've learned that systems are living entities—they evolve, they fail, and they require continuous attention. My goal is to build software that isn't just functional, but enduring."
  }
];

export default function About() {
  return (
    <div className="w-full relative">
      {/* PHASE 1: SECTION CONTAINER & HEADERS */}
      <div className="section-divider" data-label="04_HUMAN_NARRATIVE">
        <span className="divider-label">04_HUMAN_NARRATIVE</span>
      </div>

      <div className="grid-12 items-start">
        {/* PHASE 3 & 8: NARRATIVE COLUMN (Primary Edge Alignment) */}
        <div className="col-span-12 lg:col-span-7 mb-sys-64">
          <div className="mb-sys-64">
            <h2 className="type-h1 mb-sys-24">SYSTEM_THINKER_</h2>
            <p className="type-body text-lg opacity-60 leading-relaxed max-w-xl">
              A detailed look into the investigative mindset and philosophical framework that drives my engineering process.
            </p>
          </div>

          <div className="space-y-sys-64">
            {NARRATIVE_BLOCKS.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="type-label text-accent mb-4 tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full opacity-50" />
                  {block.label}
                </div>
                <h3 className="type-emphasis text-xl mb-6 tracking-tighter">{block.title}</h3>
                <p className="type-body text-text-secondary leading-relaxed text-sm md:text-base">
                  {block.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* BIO DETAILS (Mobile only or integrated) */}
          <div className="lg:hidden mt-sys-64 pt-sys-64 border-t border-border-dim">
            <div className="type-metadata text-[0.6rem] mb-2 opacity-30 tracking-widest">EDUCATION_REF</div>
            <div className="type-emphasis text-sm">{identity.degree.toUpperCase()} @ {identity.university.toUpperCase()}</div>
          </div>
        </div>

        {/* PHASE 4: SUPPORTING VISUAL ELEMENT */}
        <div className="hidden lg:block lg:col-span-4 lg:col-start-9 sticky top-sys-128 mt-sys-128">
          <AboutVisualElement />

          <div className="mt-sys-64 space-y-sys-32 opacity-20">
            <div className="type-metadata text-[0.5rem] tracking-[0.3em]">DIAGNOSTIC_TELEMETRY</div>
            <div className="space-y-2 font-mono text-[0.45rem] leading-tight">
              OBJ_CURIOSITY: ACTIVE <br />
              STATE_LEARNING: ITERATIVE <br />
              BUFFER_STAMINA: 1024GB <br />
              LATENCY_THOUGHT: 0.04MS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutVisualElement() {
  return (
    <div className="relative w-full aspect-square border border-border-dim p-sys-32 flex items-center justify-center overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
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
        <svg viewBox="0 0 200 200" className="w-full h-full text-accent opacity-30">
          <motion.rect
            x="50" y="50" width="100" height="100"
            stroke="currentColor" strokeWidth="1" fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          />
          <motion.circle
            cx="100" cy="100" r="40"
            stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 10 100 H 190 M 100 10 V 190"
            stroke="currentColor" strokeWidth="0.5" opacity="0.5"
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

      <div className="absolute bottom-4 right-4 type-metadata text-[0.5rem] opacity-20">
        SYS_MINDSET_v1.0
      </div>
    </div>
  );
}
