"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function BrutalistHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { setActiveSection } = useScene();
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // PHASE 2 - STRUCTURAL HERO SYSTEM
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const subtitleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
            id="hero"
            onPointerEnter={() => setActiveSection("hero")}
        >
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "15%"]) }}
                className="absolute inset-[10%] z-0 border-[0.5px] border-white/5 opacity-5 pointer-events-none"
            />

            <motion.div
                style={{ scale: heroScale, opacity: heroOpacity }}
                className="w-full relative z-10 flex flex-col items-center px-[5vw] text-center"
            >
                {/* TOP SMALL INDICATOR — PHASE 2 */}
                <motion.span
                    style={{ opacity: subtitleOpacity }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{ duration: 1, delay: 0.1, ease: GLOBAL_EASE }}
                    className="text-micro font-bold tracking-[0.5em] mb-12"
                >
                    SESSION_01 // FOUNDATION
                </motion.span>

                {/* MIDDLE BOLD IDENTITY — PHASE 2 (PHASE 9 TEXT REVEAL: STAGGER LINES) */}
                <h1 className="text-massive text-white tracking-tight-title flex flex-col items-center leading-[0.85] mb-16 uppercase font-display select-none">
                    <div className="overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: GLOBAL_EASE }}
                            className="block italic"
                        >
                            DARSHIT
                        </motion.span>
                    </div>
                    <div className="overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.35, ease: GLOBAL_EASE }}
                            className="block text-white/90"
                        >
                            LAGDHIR
                        </motion.span>
                    </div>
                </h1>

                {/* SUBTITLE — PHASE 2 */}
                <motion.p
                    style={{ opacity: subtitleOpacity }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ duration: 1, delay: 1, ease: GLOBAL_EASE }}
                    className="text-medium text-white italic max-w-[40ch] leading-relaxed tracking-widest"
                >
                    SCULPTING DIGITAL SYSTEMS THROUGH LOGIC-FIRST ARCHITECTURE.
                </motion.p>
            </motion.div>

            {/* BOTTOM SCROLL CUE — PHASE 2 */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 1, delay: 1.5, ease: GLOBAL_EASE }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
            >
                <div className="w-px h-12 bg-white/20" />
                <span className="text-micro font-bold tracking-[0.8em] font-sans">SCROLL</span>
            </motion.div>

        </section>
    );
}
