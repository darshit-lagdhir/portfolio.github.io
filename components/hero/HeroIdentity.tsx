"use client";

import { motion } from "framer-motion";
import { identity } from "@/data/identity";

export default function HeroIdentity() {
  return (
    <div className="flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-sys-12 mb-sys-32"
      >
        <span className="status-dot active" />
        <div className="type-metadata flex items-center gap-2">
          <span className="eng-bracket">PROTOCOL_V2.0</span>
          <span className="opacity-60">{identity.name.toUpperCase()}</span>
        </div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="type-identity mb-sys-48 leading-[0.9] tracking-tighter"
      >
        ARCHITECTING <br />
        <span className="text-secondary">SYSTEMS_THAT_ENDURE</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[480px]"
      >
        <p className="type-body text-lg md:text-xl leading-relaxed text-text-secondary">
          A {identity.positioning} specializing in low-latency architectures, durable state machines, and cross-platform systems logic.
        </p>
      </motion.div>
    </div>
  );
}
