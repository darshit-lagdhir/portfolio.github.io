"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScene } from "@/context/SceneContext";

// PHASE 1: CENTRAL MOTION CONTROLLER
const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

const principles = [
    {
        index: "01",
        label: "ARCHITECTURE",
        statement: "Logic-First.",
        details: "Foundation dictates performance ceiling. Systems must be engineered, not decorated."
    },
    {
        index: "02",
        label: "MODULARITY",
        statement: "Isolation.",
        details: "Strict independence for every system component. Zero-trust reliability across boundaries."
    },
    {
        index: "03",
        label: "REFINEMENT",
        statement: "Honesty.",
        details: "Stability is forged through controlled failure. Logic-driven recovery is maturity."
    }
];

export default function BrutalistAbout() {
    const sectionRef = useRef<HTMLElement>(null);
    const { mode, setActiveSection } = useScene();

    const { scrollYProgress: sectionScroll } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // PHASE 6: SECTION TRANSITION (TONE SHIFT)
    const rotateX = useTransform(sectionScroll, [0, 0.4, 0.6, 1], mode === "depth" ? [2.5, 0, 0, -2.5] : [1, 0, 0, -1]);

    return (
        <section
            onPointerEnter={() => setActiveSection("about")}
            ref={sectionRef}
            className="spatial-section relative flex items-center justify-center section-tone-shift tone-02"
            id="about"
        >
            <motion.div
                style={{ rotateX, transformStyle: "preserve-3d" }}
                className="w-full relative z-10"
            >
                <div className="grid-poster py-24 flex flex-col gap-y-12">

                    {/* PHASE 3: LEFT-DOMINANT LAYOUT */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, ease: GLOBAL_EASE }}
                        className="col-span-12 md:col-span-8 lg:col-span-6 flex flex-col items-start gap-12"
                    >
                        {/* PHASE 9: TYPOGRAPHY HIERARCHY (FS-SECTION) */}
                        <div className="flex flex-col gap-6 items-start">
                            <span className="text-micro font-bold text-muted border-l border-white/20 pl-6 h-4 flex items-center">SECTION_ID_02</span>
                            <h2 className="text-large text-white flex flex-col border-b border-white/5 pb-10 w-full italic first-letter:not-italic select-none pointer-events-none transition-all duration-700 hover:tracking-tighter text-highlight-sweep">
                                SYSTEM_ARCHITECT // PHILOSOPHY
                            </h2>
                        </div>

                        {/* PHASE 2: SHORT PUNCHY CONTENT */}
                        <p className="text-small text-muted font-light tracking-wide max-w-[42ch]">
                            We do not decorate. We build structural environments. Every visual choice is a logical consequence of technical integrity.
                        </p>
                    </motion.div>

                    {/* PHASE 10: HORIZONTAL MICRO-SCROLL (PRINCIPLES TRAY) */}
                    <div className="col-span-12 mt-10">
                        <div className="horizontal-tray pb-12 overflow-x-visible pb-20">
                            {principles.map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.98, x: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                    viewport={{ margin: "-10%" }}
                                    transition={{ duration: 0.6, delay: i * 0.1, ease: GLOBAL_EASE }}
                                    // PHASE 5 & 119: HEAVY PANEL + TACTILE MATTE + BRACKET
                                    className="heavy-panel signature-bracket mat-paper btn-signature elastic-micro min-w-[320px] md:min-w-[400px] p-12 pr-24 flex flex-col gap-10 group"
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="text-micro font-bold text-muted group-hover:text-white transition-colors">{p.label}</span>
                                        <span className="text-micro opacity-10">{p.index}</span>
                                    </div>

                                    <h3 className="text-massive-mini text-step-2 md:text-step-3 text-white tracking-widest italic group-hover:tracking-tighter transition-all duration-700">
                                        {p.statement}
                                    </h3>

                                    <p className="text-body text-step-0 text-muted leading-relaxed font-light group-hover:text-white transition-colors">
                                        {p.details}
                                    </p>

                                    {/* PHASE 3: RIM HIGHLIGHT */}
                                    <div className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-100 transition-all rim-highlight" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* PHASE 8: INTERACTIVE NEGATIVE SPACE (AMBIENT OBJECTS) */}
            <div className="absolute top-[15%] right-[10%] opacity-10 pointer-events-none hidden lg:block">
                <motion.div
                    animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.05, 1], rotate: [0, 4, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="w-80 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                />
            </div>
        </section>
    );
}
