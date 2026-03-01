"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const domains = [
    {
        title: "AIML.",
        description: "AUTONOMOUS PATTERN RECOGNITION AND INTELLIGENT SYSTEMS. SIGNAL TO INTELLIGENCE MAPPING."
    },
    {
        title: "SECURITY.",
        description: "FORMAL-VERIFICATION AND ZERO-TRUST PROTOCOLS. REDUCING UNCERTAINTY IN CROSS-LANGUAGE INTERACTIONS."
    }
];

export default function BrutalistFocus() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress: sectionScroll } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

    // SECTION MORPH (PHASE 3: CINEMATIC CONTROL)
    const scaleSection = useTransform(sectionScroll, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);
    const blurSection = useTransform(sectionScroll, [0, 0.2, 0.8, 1], [8, 0, 0, 8]);

    // ATMOSPHERIC GRID (PHASE 5: REFINED INTENSITY)
    const yMesh = useTransform(sectionScroll, [0, 1], [0, -300]);
    const rotateMesh = useTransform(sectionScroll, [0, 1], [0, 15]);
    const opacityMesh = useTransform(sectionScroll, [0, 0.4, 0.6, 1], [0, 0.2, 0.2, 0]);

    return (
        <section ref={sectionRef} className="spatial-section bg-surface/30 relative overflow-hidden" id="focus">

            {/* BACKGROUND LAYER (PHASE 6: REVEAL FIRST) */}
            <motion.div
                style={{ y: yMesh, rotate: rotateMesh, opacity: opacityMesh }}
                className="absolute inset-x-0 -top-[40%] h-[180%] z-0 flex items-center justify-center pointer-events-none"
            >
                <div className="w-[160%] h-[160%] grid grid-cols-24 gap-12 -rotate-12">
                    {Array.from({ length: 576 }).map((_, i) => (
                        <div key={i} className="border-l border-t border-white/[0.03] h-64 w-full" />
                    ))}
                </div>
            </motion.div>

            <motion.div
                style={{ scale: scaleSection, filter: `blur(${blurSection}px)` }}
                className="grid-layout items-start relative z-10 md:pl-[6%] lg:pl-[10%]"
            >
                <div className="col-span-12 mb-20">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-10%" }}
                        transition={{ duration: 1 }}
                        className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                    >
                        04 RESEARCH FOCUS // REFINED CONTROL
                    </motion.span>
                </div>

                <div className="col-span-12 flex flex-col">
                    {domains.map((d, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, translateZ: -120 }}
                            whileInView={{ opacity: 1, translateZ: 0 }}
                            viewport={{ once: true, margin: "-15%" }}
                            transition={{ duration: 1.2, delay: i * 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center border-t border-border pt-16 pb-20 md:pb-32 group"
                        >
                            {/* REVEAL PATTERN: HEADLINE (PHASE 6) */}
                            <div className="md:col-span-8">
                                <motion.h3
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ margin: "-15%" }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    className="font-title text-step-4 text-white uppercase tracking-tight-title group-hover:translate-x-8 transition-all duration-700 text-physical italic first-letter:not-italic"
                                >
                                    {d.title}
                                </motion.h3>
                            </div>

                            {/* REVEAL PATTERN: SUPPORTING (PHASE 6) */}
                            <div className="md:col-span-4 md:col-start-9 mt-6 md:mt-0">
                                <motion.p
                                    initial={{ opacity: 0, x: 15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ margin: "-15%" }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="font-body text-step-0 text-muted font-light leading-relaxed group-hover:text-white transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                                >
                                    {d.description}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
