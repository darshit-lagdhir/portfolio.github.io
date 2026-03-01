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
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

    // BACK MESH (PHASE 6: MOTION GRID)
    const yMesh = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const rotateMesh = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const opacityMesh = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.2, 0]);

    return (
        <section ref={sectionRef} className="spatial-section bg-surface/30 relative overflow-hidden" id="focus">

            {/* ATMOSPHERIC ENVIRONMENT (PHASE 6: SPATIAL GRID) */}
            <motion.div
                style={{ y: yMesh, rotate: rotateMesh, opacity: opacityMesh }}
                className="absolute inset-x-0 -top-[50%] h-[200%] z-0 flex items-center justify-center pointer-events-none"
            >
                <div className="w-[150%] h-[150%] grid grid-cols-12 gap-12 -rotate-12">
                    {Array.from({ length: 288 }).map((_, i) => (
                        <div key={i} className="border-l border-t border-white/[0.03] h-48 w-full" />
                    ))}
                </div>
            </motion.div>

            <div className="grid-layout items-start relative z-10">
                <div className="col-span-12 mb-16 lg:mb-24">
                    <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                        04 RESEARCH FOCUS
                    </span>
                </div>

                <div className="col-span-12 flex flex-col">
                    {domains.map((d, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, translateZ: -100 }}
                            whileInView={{ opacity: 1, translateZ: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center border-t border-border pt-12 pb-24 md:pb-32 group"
                        >
                            <div className="md:col-span-6">
                                <h3 className="font-title text-step-3 text-white uppercase tracking-tight-title group-hover:translate-x-4 transition-transform duration-700">
                                    {d.title}
                                </h3>
                            </div>

                            <div className="md:col-span-4 md:col-start-9">
                                <p className="font-body text-step-0 text-muted font-light leading-relaxed group-hover:text-white transition-colors duration-700">
                                    {d.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
