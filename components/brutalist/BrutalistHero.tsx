"use client";

import { motion } from "framer-motion";

export default function BrutalistHero() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="min-h-screen w-full flex flex-col justify-center items-start bg-[#050505] overflow-hidden snap-start relative px-8 md:px-12 xl:px-32 py-60">
            <div className="w-full max-w-screen-2xl mx-auto z-10 relative">

                {/* Micro Label - Prompt 91 */}
                <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: ease }}
                    className="font-heading text-step--1 text-neutral-600 uppercase tracking-micro mb-8 block"
                >
                    DIGITAL ARCHITECT // PORTFOLIO 25
                </motion.span>

                {/* Hero Title - Massive but Structured */}
                <div className="flex flex-col gap-0 select-none">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: ease }}
                        className="font-title text-step-5 leading-tight-title text-white uppercase tracking-tight-title"
                    >
                        DARSHIT
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: ease }}
                        className="font-title text-step-5 leading-tight-title text-white uppercase tracking-tight-title"
                    >
                        LAGDHIR
                    </motion.h1>
                </div>

                {/* Hero Mission - Space Grotesk Controlled */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1, ease: ease }}
                    className="mt-12 md:mt-24 max-w-[50ch]"
                >
                    <p className="font-body text-step-2 text-neutral-500 font-light tracking-wide leading-snug">
                        Systems engineering at the intersection of modular logistics and analytical advisory protocols.
                    </p>
                </motion.div>

                {/* Navigation / CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1, ease: ease }}
                    className="mt-12 md:mt-16 flex flex-wrap items-center gap-12"
                >
                    <a href="#projects" className="font-heading text-step-0 uppercase tracking-micro text-white link-precision transition-colors duration-200">
                        View System
                    </a>
                    <div className="w-12 h-px bg-neutral-900" />
                    <a href="https://github.com/darshit-lagdhir" target="_blank" className="font-heading text-step-0 uppercase tracking-micro text-neutral-600 hover:text-white link-precision transition-colors duration-200">
                        Source Control
                    </a>
                </motion.div>
            </div>

            {/* Structural Negative Space Element */}
            <div className="absolute left-8 md:left-12 xl:left-32 bottom-20 w-px h-[30vh] bg-gradient-to-t from-neutral-900 to-transparent" />
        </section>
    );
}
