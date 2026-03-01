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
            <div className="grid-layout items-start">
                {/* Identification Label (Grid Zone 1) */}
                <div className="col-span-12 mb-16 lg:mb-24">
                    <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                        02 PHILOSOPHY
                    </span>
                </div>

                {principles.map((p, i) => (
                    <div
                        key={i}
                        className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-border pt-12 pb-24 md:pb-32"
                    >
                        {/* Principle Heading (Grid Zone 1-6) */}
                        <div className="md:col-span-6">
                            <h2 className="font-title text-step-3 text-white uppercase tracking-tight-title max-w-[20ch]">
                                {p.statement}
                            </h2>
                        </div>

                        {/* Principle Documentation (Grid Zone 8-12: R-Aligned) */}
                        <div className="md:col-span-5 md:col-start-8">
                            <p className="font-body text-step-0 text-muted font-light leading-relaxed">
                                {p.details}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}






