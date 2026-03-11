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
        className="flex items-center gap-sys-12 mb-sys-48"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
        <div className="type-metadata flex items-center gap-3">
          <span className="opacity-20 font-mono tracking-widest text-[0.4rem]">SYSTEM_ID_00</span>
          <span className="opacity-40 tracking-[0.4em] text-[0.45rem]">{identity.name.toUpperCase()}</span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="type-identity mb-sys-64 leading-[0.85] tracking-tighter"
      >
        EXPLORING <br />
        <span className="text-text-secondary opacity-40">MECHANICS_</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[480px] relative"
      >
        <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-border-dim hidden md:block" />
        <p className="type-body text-base md:text-lg leading-relaxed text-text-secondary opacity-80 font-medium tracking-tight mb-6">
          {identity.heroParagraph}
        </p>
        <p className="type-metadata text-[0.55rem] tracking-widest text-accent/60 uppercase">
          {identity.linkedinHeadline}
        </p>
      </motion.div>
    </div>
  );
}
