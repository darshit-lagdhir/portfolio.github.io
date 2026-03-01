"use client";

import { motion } from "framer-motion";

const domains = [
    {
        title: "AIML.",
        description: "Autonomous pattern recognition and intelligent systems. Signal to intelligence mapping."
    },
    {
        title: "SECURITY.",
        description: "Formal verification and zero-trust protocols. Reducing uncertainty in cross-language interactions."
    }
];

export default function BrutalistFocus() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section section-bg-alt" id="focus">
            <div className="grid-layout items-start">
                {/* Identification Label (Grid Zone 1) */}
                <div className="col-span-12 mb-16 lg:mb-24">
                    <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                        04 FOCUS
                    </span>
                </div>

                {/* Primary Research Bricks */}
                <div className="col-span-12 flex flex-col">
                    {domains.map((d, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline border-t border-border pt-12 pb-24 md:pb-32">
                            {/* Domain (Grid Zone 1-6) */}
                            <div className="md:col-span-6">
                                <h3 className="font-title text-step-3 text-white uppercase tracking-tight-title">
                                    {d.title}
                                </h3>
                            </div>

                            {/* Narrative (Grid Zone 9-12: R-Aligned) */}
                            <div className="md:col-span-4 md:col-start-9">
                                <p className="font-body text-step-0 text-muted font-light leading-relaxed">
                                    {d.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
