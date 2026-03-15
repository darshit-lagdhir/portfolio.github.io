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
        className="flex flex-col gap-1 mb-sys-48 mt-sys-32 md:mt-0"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent shrink-0" />
          <h2 className="type-emphasis text-lg md:text-2xl tracking-tighter text-text-primary text-wrap-balance">
            <span className="flex flex-wrap gap-x-4">
              {identity.name.split(' ').map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap">
                  {word.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + (wIdx * 10 + i) * 0.03, // Adjusted delay for word-aware reveal
                        ease: "easeOut"
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
          </h2>
        </div>
        <p className="type-metadata text-[0.45rem] md:text-[0.65rem] tracking-[0.2em] md:tracking-[0.3em] text-accent uppercase font-bold pl-5 mt-4 max-w-[70vw] leading-relaxed hyphens-auto">
          {identity.headline}
        </p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="type-display mb-sys-48 leading-[0.95] tracking-tighter w-full"
        style={{ fontSize: "clamp(1.5rem, 11vw, 7.5rem)" }}
      >
        {identity.hero_identity.hero_title.includes('_') ? (
          <div className="flex flex-col gap-2">
            <span className="block w-fit">{identity.hero_identity.hero_title.split('_')[0]}</span>
            <span className="text-text-muted block w-fit">{identity.hero_identity.hero_title.split('_')[1]}_</span>
          </div>
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
