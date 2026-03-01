"use client";

import { motion } from "framer-motion";

const principles = [
    {
        statement: "Logic-First Architecture.",
        details: "Prioritizing structural integrity over surface-level aesthetics. Foundation dictates the ceiling of performance."
    },
    {
        statement: "Absolute Modular Isolation.",
        details: "Every system is engineering for strict independence, ensuring zero-trust reliability across boundaries."
    },
    {
        statement: "Honest System Refinement.",
        details: "Constant debugging and iterative rebuilding. True stability is forged through controlled failure and recovery."
    }
];

export default function BrutalistAbout() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section section-bg-alt" id="about">
            <div className="grid-layout gap-y-32 lg:gap-y-40">
                {principles.map((p, i) => (
                    <div
                        key={i}
                        className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start border-t border-border pt-16 lg:pt-24"
                    >
                        {/* Principle Selector (HK Grotesk Wide) */}
                        <div className="md:col-span-3 lg:col-span-2">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                                SELECT // 0{i + 1}
                            </span>
                        </div>

                        {/* Concept Headline (Aalto) */}
                        <div className="md:col-span-5 lg:col-span-6">
                            <motion.h2
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, ease }}
                                className="font-title text-step-3 text-white uppercase tracking-tight-title"
                                style={{ willChange: "transform, opacity" }}
                            >
                                {p.statement}
                            </motion.h2>
                        </div>

                        {/* Support Context (Space Grotesk) */}
                        <div className="md:col-span-4 flex justify-end">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.8, ease }}
                                className="font-body text-step-0 text-muted font-light leading-relaxed max-w-[32ch]"
                            >
                                {p.details}
                            </motion.p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}




