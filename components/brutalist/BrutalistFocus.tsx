"use client";

import { motion } from "framer-motion";

export default function BrutalistFocus() {
    return (
        <section className="min-h-screen w-full bg-[#050505] border-t border-neutral-900 border-dashed flex flex-col justify-center py-40 overflow-hidden relative snap-start">
            <div className="absolute top-10 right-10 z-0 text-right">
                <span className="font-heading text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-2">SECT // 04</span>
            </div>

            <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-12 grid grid-cols-4 md:grid-cols-12 gap-x-6 items-center">
                <div className="col-span-4 md:col-span-12 flex flex-col md:flex-row items-baseline gap-8 md:gap-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="font-title text-[clamp(4.5rem,10vw,14rem)] leading-[0.85] text-white uppercase tracking-tighter"
                    >
                        AIML
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="font-title text-[clamp(4rem,9vw,12rem)] leading-[0.85] text-transparent uppercase tracking-tighter"
                        style={{ WebkitTextStroke: "1px #262626", WebkitTextFillColor: "transparent" }}
                    >
                        SECURITY
                    </motion.h2>
                </div>

                <div className="col-span-4 md:col-start-7 md:col-span-6 mt-20">
                    <div className="w-12 h-px bg-neutral-800 mb-8" />
                    <p className="font-body text-xl md:text-3xl text-neutral-500 font-light tracking-wide leading-snug">
                        Currently engineering the intersection of modular logistics and analytical advisory protocols.
                    </p>
                </div>
            </div>
        </section>
    );
}
