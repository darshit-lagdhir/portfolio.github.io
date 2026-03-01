"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useScene } from "@/context/SceneContext";

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
    const { mode, setActiveSection } = useScene();
    const [activeId, setActiveId] = useState<number | null>(null);

    const { scrollYProgress: sectionScroll } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // SCROLLYTELLING LAYER (PHASE 3: MASKED REVEAL)
    const clipPathScale = useTransform(sectionScroll, [0, 0.4, 0.6, 1], ["polygon(0 0, 0 0, 0 100%, 0% 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)", "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"]);

    // PERSPECTIVE SLAB (MODE: DEPTH BOOST)
    const perspectiveRotateX = mode === "depth" ? [5, 0, 0, -5] : [3, 0, 0, -3];
    const rotateX = useTransform(sectionScroll, [0, 0.4, 0.6, 1], perspectiveRotateX);
    const baseZ = mode === "depth" ? 50 : 20;

    return (
        <section
            onPointerEnter={() => setActiveSection("about")}
            ref={sectionRef}
            className="spatial-section relative overflow-hidden"
            id="about"
        >
            <motion.div
                style={{
                    rotateX,
                    translateZ: useTransform(sectionScroll, (v) => baseZ + (v * (mode === 'depth' ? 30 : 15))),
                    clipPath: mode === "minimal" ? "none" : clipPathScale, // Minimal mode disables scrolly mask
                    transformStyle: "preserve-3d"
                }}
                className={`grid-layout items-start relative z-10 morph-surface md:pl-[6%] transition-colors duration-700 ${activeId !== null ? 'bg-white invert-section' : ''}`}
            >
                <div className="col-span-12 mb-16">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-10%" }}
                        transition={{ duration: 1.2 }}
                        className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                    >
                        02 SYSTEM PHILOSOPHY // SCROLLY REVEAL
                    </motion.span>
                </div>

                {principles.map((p, i) => {
                    const principleRef = useRef<HTMLDivElement>(null);
                    const { scrollYProgress } = useScroll({
                        target: principleRef,
                        offset: ["start end", "end start"]
                    });

                    const itemZ = useTransform(scrollYProgress, [0, 0.5, 1], [mode === 'depth' ? -200 : -100, 0, mode === 'depth' ? 200 : 100]);
                    const itemOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0.2]);

                    return (
                        <motion.div
                            ref={principleRef}
                            key={i}
                            style={{ translateZ: itemZ, opacity: itemOpacity, transformStyle: "preserve-3d" }}
                            className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-border pt-16 pb-20 md:pb-32 relative group"
                        >
                            <div className="md:col-span-8">
                                <motion.h3
                                    initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                                    whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className={`font-title text-step-4 uppercase tracking-tight-title transition-all duration-700 text-physical italic first-letter:not-italic ${activeId !== null ? 'text-black' : 'text-white'}`}
                                >
                                    {p.statement}
                                </motion.h3>
                            </div>

                            <motion.div
                                onMouseEnter={() => setActiveId(i)}
                                onMouseLeave={() => setActiveId(null)}
                                whileHover={{ x: 15, scale: 1.01, translateZ: 40 }}
                                className={`md:col-span-4 md:col-start-9 transition-all duration-500 mt-6 md:mt-0 p-6 ${mode === 'minimal' ? 'border border-border' : 'glass-panel'}`}
                            >
                                <p className={`font-body text-step-0 font-light leading-relaxed transition-colors ${activeId === i ? 'text-black' : 'text-muted'}`}>
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
