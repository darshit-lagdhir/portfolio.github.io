"use client";

import { motion } from "framer-motion";

const aboutBlocks = [
    {
        statement: "Systems from the inside out.",
        details: "I focus on understanding how components interact before optimizing individual parts."
    },
    {
        statement: "Logic-first engineering.",
        details: "Aesthetics matter, but foundation dictates scale. True performance begins below the surface."
    },
    {
        statement: "Break. Debug. Rebuild.",
        details: "Testing theories against real-world friction. Constant refinement demands controlled failure."
    }
];

export default function BrutalistAbout() {
    const ease = [0.16, 1, 0.3, 1] as const;
    return (
        <section className="min-h-screen w-full bg-[#050505] flex flex-col justify-center py-40 overflow-hidden relative border-t border-neutral-900 border-dashed snap-start px-8 md:px-12 xl:px-32">
            {/* Micro Label - Section Marker */}
            <div className="absolute top-10 right-10 z-0 text-right">
                <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-600 block mb-2 font-bold">SECT // 01</span>
            </div>

            <div className="w-full max-w-screen-2xl mx-auto flex flex-col gap-60">
                {aboutBlocks.map((block, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: ease }}
                            viewport={{ once: true, margin: "-100px" }}
                            key={i}
                            className="w-full grid grid-cols-4 md:grid-cols-12 gap-x-12 gap-y-12 items-start"
                        >
                            {/* Left/Right Statement (Aalto Display) */}
                            <div className={`col-span-4 md:col-span-12 lg:col-span-7 xl:col-span-6 ${isEven ? "" : "lg:col-start-6 xl:col-start-7 lg:text-right"}`}>
                                <h2 className="font-title text-step-4 leading-tight-title text-neutral-50 uppercase tracking-tight-title">
                                    {block.statement}
                                </h2>
                            </div>

                            {/* Right/Left Paragraph (Space Grotesk) - Controlled Width */}
                            <div className={`col-span-4 md:col-span-8 lg:col-span-5 xl:col-span-4 mt-8 lg:mt-0 ${isEven ? "lg:col-start-8 xl:col-start-9" : "lg:col-start-1 lg:row-start-1"}`}>
                                <p className={`font-body text-step-2 text-neutral-500 font-light leading-snug tracking-wide max-w-[30ch] ${isEven ? "" : "lg:ml-0"}`}>
                                    {block.details}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
