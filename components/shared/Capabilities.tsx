"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    category: "LANGUAGES",
    items: ["TypeScript", "Rust", "Python", "C++", "SQL"],
    description: "Multi-paradigm internal logic and formal systems verification."
  },
  {
    category: "SYSTEMS",
    items: ["Next.js", "Node.js", "Express", "PostgreSQL", "Redis"],
    description: "Building scalable backend architectures and high-assurance frontends."
  },
  {
    category: "DATA & AI",
    items: ["PyTorch", "Pandas", "Pipeline Synthesis", "Vector Search"],
    description: "Designing intelligent data flows and human-in-the-loop diagnostic tools."
  },
  {
    category: "SECURITY",
    items: ["JWT Isolation", "Memory Safety", "FFI Contracts", "Auth Patterns"],
    description: "Enforcing strict security boundaries and binary-level contract safety."
  }
];

export default function Capabilities() {
  return (
    <section className="py-sys-128">
      <div className="section-divider" data-label="03_TECHNICAL_PRIMITIVES">
        <span className="divider-label">03_TECHNICAL_PRIMITIVES</span>
      </div>

      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4">
          <h2 className="type-h1 mb-sys-24">CAPABILITIES_</h2>
          <p className="type-body text-sm mb-sys-48">
            Modular categorization of technical areas and conceptual explorations.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-sys-64 gap-x-sys-96">
            {capabilities.map((cap, index) => (
              <motion.div 
                key={cap.category}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="type-label mb-sys-16 text-accent">{cap.category}</div>
                <h3 className="type-emphasis text-lg mb-sys-16">{cap.category}</h3>
                <p className="type-body text-sm mb-sys-24 opacity-80">
                  {cap.description}
                </p>
                <div className="flex flex-wrap gap-x-sys-16 gap-y-sys-8 border-t border-border-dim pt-sys-16">
                  {cap.items.map(item => (
                    <span key={item} className="type-metadata text-[0.6rem] opacity-60">
                      {item.toUpperCase()}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
