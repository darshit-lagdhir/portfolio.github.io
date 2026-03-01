"use client";

import { motion } from "framer-motion";

export default function BrutalistHero() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="hero">
            <div className="grid-layout">

                {/* Primary Narrative (Grid Zone 1-8) */}
                <div className="col-span-12 lg:col-span-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease }}
                        className="font-title text-step-5 text-white uppercase tracking-tight-title"
                    >
                        DARSHIT LAGDHIR
                    </motion.h1>
                </div>

                {/* Depth Context (Grid Zone 9-12: R-Aligned) */}
                <div className="col-span-12 lg:col-span-3 lg:col-start-10 mt-12 md:mt-20">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6, ease }}
                        className="font-body text-step-0 text-muted font-light leading-relaxed mb-12"
                    >
                        Engineering high-authority systems for logistics, advisory intelligence, and contract verification.
                    </motion.p>

                    <div className="flex flex-col gap-4">
                        <a href="#projects" className="font-wide text-step--1 text-muted uppercase tracking-micro hover:text-white transition-colors duration-200 font-bold">
                            View Archive &rarr;
                        </a>
                        <a href="#about" className="font-wide text-step--1 text-muted uppercase tracking-micro hover:text-white transition-colors duration-200 font-bold">
                            Focus &amp; Principles
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}







