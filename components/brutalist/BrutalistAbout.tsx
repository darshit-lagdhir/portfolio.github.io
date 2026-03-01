"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const principles = [
    {
        statement: "Logic-First Architecture.",
        details: "Prioritizing structural integrity over surface aesthetics. Foundation dictates performance ceiling."
    },
    {
        statement: "Absolute Modular Isolation.",
        details: "Every system engineered for strict independence, ensuring zero-trust reliability across boundaries."
    },
    {
        statement: "Honest System Refinement.",
        details: "True stability is forged through controlled failure and recursive debugging. Logic-driven recovery."
    }
];

export default function BrutalistAbout() {
    return (
        <section className="spatial-section relative" id="about">
            <div className="grid-layout items-start relative z-10">
                {/* Identification Label (Grid Zone 1) */}
                <div className="col-span-12 mb-16 lg:mb-24">
                    <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                        02 SYSTEM PHILOSOPHY
                    </span>
                </div>

                {principles.map((p, i) => {
                    const principleRef = useRef<HTMLDivElement>(null);
                    const { scrollYProgress } = useScroll({
                        target: principleRef,
                        offset: ["start end", "end start"]
                    });

                    // Spatial Scroll (PHASE 3: LAYER SEPARATION)
                    const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, 100]);
                    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

                    return (
                        <motion.div
                            ref={principleRef}
                            key={i}
                            style={{ translateZ, opacity }}
                            className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-border pt-12 pb-24 md:pb-32 relative group"
                        >
                            {/* Principle Heading (PHASE 9: MICRO GLOW) */}
                            <div className="md:col-span-6">
                                <h3 className="font-title text-step-3 text-white uppercase tracking-tight-title max-w-[20ch] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-700">
                                    {p.statement}
                                </h3>
                            </div>

                            {/* Principle Documentation (PHASE 4: VERTICAL INTERPOLATION) */}
                            <motion.div
                                whileHover={{ x: 20, scale: 1.02 }}
                                className="md:col-span-4 md:col-start-9 transition-all duration-700"
                            >
                                <p className="font-body text-step-0 text-muted font-light leading-relaxed group-hover:text-white">
                                    {p.details}
                                </p>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
