"use client";

import { motion } from "framer-motion";

export default function Mindset() {
  return (
    <div className="w-full">
      <div className="section-divider" data-label="01_SYSTEM_PHILOSOPHY">
        <span className="divider-label">01_SYSTEM_PHILOSOPHY</span>
      </div>

      <div className="grid-12">
        <div className="col-span-12 lg:col-span-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="type-h1 max-w-4xl"
          >
            WHY_SYSTEMS_MATTER: <br />
            <span className="text-secondary">INTERNAL_MECHANICS_AND_DURABILITY</span>
          </motion.h2>

          <div className="grid-12">
            <div className="col-span-12 md:col-span-6">
              <p className="type-body mb-sys-32">
                In engineering, the surface is often a distraction. True durability is found in the internal mechanics—the way data flows, how state is managed, and how components decouple under pressure.
              </p>
              <p className="type-body">
                I approach development as an architectural discipline. Performance is not a feature; it is a foundational constraint. Reliability is not an afterthought; it is the primary deliverable.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col justify-center border-l border-border-dim pl-sys-32">
              <div className="type-label mb-sys-16">CORE_PRINCIPLES</div>
              <ul className="space-y-4">
                <li className="type-emphasis text-sm flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  STRUCTURAL_INTEGRITY
                </li>
                <li className="type-emphasis text-sm flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  PREDICTABLE_STATE
                </li>
                <li className="type-emphasis text-sm flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  LATENCY_MINIMIZATION
                </li>
                <li className="type-emphasis text-sm flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  DECOUPLED_ARCHITECTURE
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
