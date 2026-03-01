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
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress: sectionScroll } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // CINEMATIC SECTION REVEAL (PHASE 2 & 9)
    const scaleSection = useTransform(sectionScroll, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);
    const blurSection = useTransform(sectionScroll, [0, 0.2, 0.8, 1], [6, 0, 0, 6]);

    return (
        <section ref={sectionRef} className="spatial-section relative overflow-hidden" id="about">
            <motion.div
                style={{ scale: scaleSection, filter: `blur(${blurSection}px)` }}
                className="grid-layout items-start relative z-10 morph-surface md:pl-[6%]"
            >
                {/* REVEAL PATTERN: BACKGROUND/IDENT (PHASE 6) */}
                <div className="col-span-12 mb-20">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                        className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                    >
                        02 SYSTEM PHILOSOPHY // REFINED FLOW
                    </motion.span>
                </div>

                {principles.map((p, i) => {
                    const principleRef = useRef<HTMLDivElement>(null);
                    const { scrollYProgress } = useScroll({
                        target: principleRef,
                        offset: ["start end", "end start"]
                    });

                    // Spatial Scroll (PHASE 3: REDUCED INTENSITY)
                    const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-150, 0, 150]);
                    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

                    return (
                        <motion.div
                            ref={principleRef}
                            key={i}
                            style={{ translateZ, opacity }}
                            className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-border pt-16 pb-20 md:pb-32 relative group"
                        >
                            {/* REVEAL PATTERN: HEADLINE (PHASE 6) */}
                            <div className="md:col-span-8">
                                <motion.h3
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ margin: "-15%" }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="font-title text-step-4 text-white uppercase tracking-tight-title max-w-[20ch] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-700 text-physical italic first-letter:not-italic"
                                >
                                    {p.statement}
                                </motion.h3>
                            </div>

                            {/* REVEAL PATTERN: SUPPORTING (PHASE 6) */}
                            <motion.div
                                initial={{ opacity: 0, x: 15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ margin: "-15%" }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                whileHover={{ x: 20, scale: 1.02, translateZ: 40 }}
                                className="md:col-span-4 md:col-start-9 transition-all duration-500 mt-6 md:mt-0"
                            >
                                <p className="font-body text-step-0 text-muted font-light leading-relaxed group-hover:text-white transition-colors">
                                    {p.details}
                                </p>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
