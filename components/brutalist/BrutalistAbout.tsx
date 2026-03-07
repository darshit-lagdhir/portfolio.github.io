"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useScene } from "@/context/SceneContext";
import { ScrollMoment, ChoreographedSection, MaskReveal } from "@/components/brutalist/SystemComponents";

const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

// TEXT SCRAMBLE HOOK — PHASE 4
const useScramble = (text: string, active: boolean) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_//";

    useEffect(() => {
        if (!active) return;
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(prev => prev.split("").map((_, i) => {
                if (i < iteration) return text[i];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [active, text]);

    return display;
};

export default function BrutalistAbout() {
    const { setActiveSection } = useScene();
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: false, amount: 0.1 });
    const scrambledTitle = useScramble("IDENTITY_SYSTEM", inView);

    // PHASE 26 STEP 8: ABOUT SECTION SCROLL REVEAL
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const breathPadding = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["6rem", "10rem", "10rem", "6rem"]);

    return (
        <ChoreographedSection id="about">
            <div
                ref={containerRef}
                onPointerEnter={() => setActiveSection("about")}
                className="relative min-h-screen overflow-hidden bg-black text-white"
            >
                {/* SECTION NUMBER SYSTEM */}
                <span className="absolute top-[10%] left-[5%] text-[20vw] font-heading font-black leading-none text-white opacity-[0.02] pointer-events-none z-0 select-none">
                    03
                </span>

                <motion.div style={{ paddingTop: breathPadding, paddingBottom: breathPadding }} className="relative z-10">
                    <div className="w-full max-w-[1800px] mx-auto px-[5vw] flex flex-col gap-24 md:gap-32">

                        {/* SECTION HEADING — MASK REVEAL (STEP 9) */}
                        <div className="flex flex-col gap-6 items-start self-start">
                            <span className="text-caption">03_IDENTITY</span>
                            <div className="relative overflow-hidden py-2 px-1 -m-2">
                                <motion.h2
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: 0.2, ease: GLOBAL_EASE }}
                                    className="text-large break-words w-full border-b border-white/20 pb-8 type-react-hover text-white"
                                >
                                    {scrambledTitle}
                                </motion.h2>
                            </div>
                        </div>

                        {/* PHASE 31: SPACING TIGHTENED (REDUNDANT ZONE REMOVED) */}

                        {/* EDITORIAL STATEMENT BLOCKS — STAGGERED REVEAL (STEP 8) */}
                        <div className="grid grid-cols-12 gap-y-24 md:gap-y-32 gap-x-8 items-start">

                            {/* BLOCK 1 - SYSTEMS THINKING */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 1, ease: GLOBAL_EASE }}
                                className="col-span-12 lg:col-span-6 lg:col-start-1"
                            >
                                <MaskReveal delay={0.3} direction="up" duration={1.4}>
                                    <h3 className="text-medium mb-8 type-react-hover">
                                        Systems <br /> <span className="text-white/40 italic">Thinking.</span>
                                    </h3>
                                </MaskReveal>
                                <motion.p 
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: 0.5, ease: GLOBAL_EASE }}
                                    className="text-body text-white/50 bg-white/[0.04] p-6 md:p-8 border-l-2 border-white/20"
                                >
                                    I don't just write code; I design systems. Every component, from UI interactions to database queries, is treated as a node in a larger architectural network. Precision and scalability are non-negotiable.
                                </motion.p>
                            </motion.div>

                            {/* BLOCK 2 - BACKEND ENGINEERING */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 1, delay: 0.3, ease: GLOBAL_EASE }}
                                className="col-span-12 lg:col-span-5 lg:col-start-8"
                            >
                                <MaskReveal delay={0.6} direction="up" duration={1.4}>
                                    <h3 className="text-medium mb-8 type-react-hover">
                                        Backend <br /> <span className="text-white/40 italic">Authority.</span>
                                    </h3>
                                </MaskReveal>
                                <motion.p 
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: 0.8, ease: GLOBAL_EASE }}
                                    className="text-body text-white/50 bg-white/[0.04] p-6 md:p-8 border-l-2 border-white/20"
                                >
                                    Building rigid, secure, and highly performant data pipelines. I specialize in crafting backend infrastructure that withstands high concurrency and complex logic without exposing complexity to the frontend.
                                </motion.p>
                            </motion.div>

                            {/* BLOCK 3 - LEARNING MINDSET */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 1, delay: 0.5, ease: GLOBAL_EASE }}
                                className="col-span-12 lg:col-span-7 lg:col-start-3"
                            >
                                <MaskReveal delay={1.2} direction="up" duration={1.6}>
                                    <h3 className="text-medium mb-8 type-react-hover">
                                        Dynamic <br /> <span className="text-white/40 italic">Evolution.</span>
                                    </h3>
                                </MaskReveal>
                                <p className="text-body text-white/50 bg-white/[0.04] p-6 md:p-8 border-l-2 border-white/20">
                                    Technology is a shifting landscape. My core skill is not a single language, but the ability to rapidly assimilate new paradigms, dissect unfamiliar architectures, and build production-ready software efficiently.
                                </p>
                            </motion.div>
                        </div>

                        {/* SKILLS FOOTER REVEAL */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.8, ease: GLOBAL_EASE }}
                            className="mt-12 md:mt-20 grid grid-cols-12 gap-4 md:gap-8 border-t border-white/20 pt-12 md:pt-16"
                        >
                            <div className="col-span-12 lg:col-span-3">
                                <span className="text-caption">CURRENT_SYNC</span>
                            </div>
                            <div className="col-span-12 lg:col-span-9 flex flex-wrap gap-4 md:gap-6">
                                {["Low-Level Memory Mgt", "Distributed Databases", "Advanced WebGL", "Security Protocols"].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ backgroundColor: "rgba(255,255,255,0.12)", y: -2 }}
                                        className="border border-white/15 px-5 py-3 text-caption bg-white/[0.04] cursor-none transition-colors"
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </ChoreographedSection>
    );
}
