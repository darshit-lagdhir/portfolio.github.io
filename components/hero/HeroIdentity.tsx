"use client";

import { motion } from "framer-motion";
import { identity } from "@/data/identity";
import { cn } from "@/lib/utils";

export default function HeroIdentity() {
  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center relative gap-3 mb-sys-48 mt-sys-32 md:mt-0">
          <span className="absolute -left-6 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent shrink-0" />
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
        <p className="type-metadata text-[0.45rem] md:text-[0.65rem] tracking-[0.2em] md:tracking-[0.3em] text-accent uppercase font-bold mt-4 max-w-[70vw] leading-relaxed hyphens-auto">
          {identity.headline}
        </p>
      </motion.div>

      <motion.h1
        className="type-display mb-sys-48 leading-[0.95] tracking-tighter w-full"
        style={{ fontSize: "clamp(1.5rem, 11vw, 7.5rem)" }}
      >
        <span className="flex flex-col gap-2">
          {identity.hero_identity.hero_title.split('_').map((line, lIdx) => (
            <span key={lIdx} className={cn("block w-fit overflow-hidden", lIdx === 1 && "text-text-muted")}>
              {line.split('').map((char, cIdx) => (
                <motion.span
                  key={cIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6 + (lIdx * 10 + cIdx) * 0.04,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              {lIdx === 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  _
                </motion.span>
              )}
            </span>
          ))}
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
