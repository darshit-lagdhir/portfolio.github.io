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
        className="flex flex-col gap-1 mb-sys-48"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <h2 className="type-emphasis text-xl md:text-2xl tracking-tighter text-text-primary">
            {identity.name.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + (i * 0.03),
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h2>
        </div>
        <p className="type-metadata text-[0.65rem] tracking-[0.3em] text-accent uppercase font-bold pl-5">
          {identity.headline}
        </p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="type-display mb-sys-48 leading-[0.85] tracking-tighter"
      >
        {identity.hero_identity.hero_title.includes('_') ? (
          <>
            {identity.hero_identity.hero_title.split('_')[0]} <br />
            <span className="text-text-muted">{identity.hero_identity.hero_title.split('_')[1]}_</span>
          </>
        ) : (
          identity.hero_identity.hero_title + "_"
        )}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[500px] relative mt-sys-16"
      >
        <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-border-dim hidden md:block" />
        <p className="type-body text-base md:text-lg leading-relaxed text-text-secondary opacity-70 font-medium tracking-tight">
          {identity.hero_identity.hero_description}
        </p>
      </motion.div>
    </div>
  );
}
