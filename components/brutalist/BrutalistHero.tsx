"use client";

import { motion } from "framer-motion";

export default function BrutalistHero() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="hero">
            <div className="grid-layout">
                {/* Visual Label (High Tension) */}
                <div className="col-span-12 mb-16 lg:mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease }}
                        className="font-wide text-step--1 text-muted uppercase tracking-micro block font-bold"
                    >
                        ARCHITECTURAL INDEX // SELECTION
                    </motion.span>
                </div>

                {/* Primary Narrative (Aalto) */}
                <div className="col-span-12 lg:col-span-11">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease }}
                        className="font-title text-step-5 leading-tight-title text-white uppercase tracking-tight-title"
                        style={{ willChange: "transform, opacity" }}
                    >
                        DARSHIT LAGDHIR
                    </motion.h1>
                </div>

                {/* Depth Context (Space Grotesk) */}
                <div className="col-span-12 md:col-span-7 lg:col-span-6 mt-20 md:mt-32">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8, ease }}
                        className="font-body text-step-1 text-muted font-light leading-relaxed max-w-[50ch] mb-20"
                        style={{ willChange: "transform, opacity" }}
                    >
                        Engineering high-authority systems for logistics, advisory intelligence, and formal contract verification with architectural integrity.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease }}
                        className="flex items-center gap-12 lg:gap-16"
                    >
                        <a href="#projects" className="font-wide text-step-0 text-white uppercase tracking-micro hover:text-muted transition-colors duration-200 font-bold">
                            View Archive &rarr;
                        </a>
                        <a href="#about" className="font-wide text-step-0 text-muted uppercase tracking-micro hover:text-white transition-colors duration-200 font-bold">
                            Focus
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}




