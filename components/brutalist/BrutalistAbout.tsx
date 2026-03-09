"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useScene } from "@/context/SceneContext";
import { ChoreographedSection, MaskReveal, LAYOUT, EASE, DUR, SectionHeader } from "@/components/brutalist/SystemComponents";



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
    const { setActiveSection, isMobile } = useScene();
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: false, amount: 0.1 });
    const scrambledTitle = useScramble("IDENTITY_SYSTEM", inView);

    // PHASE 36 STEP 6: ABOUT SECTION SOFT ENTRY
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const aboutOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
    const aboutY = useTransform(scrollYProgress, [0, 0.15], [isMobile ? 30 : 60, 0]);
    const breathPadding = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [isMobile ? "0rem" : "2rem", "0rem", isMobile ? "0rem" : "2rem"]);

    return (
        <ChoreographedSection id="about">
            <div
                ref={containerRef}
                onPointerEnter={() => setActiveSection("about")}
                className="relative overflow-hidden bg-black text-white"
            >
                {/* PHASE 39 STEP 4: GRID ALIGNMENT CORRECTION (Section Number) */}
                <div className={`${LAYOUT.CONTAINER} absolute inset-0 flex flex-col justify-center pointer-events-none z-0`}>
                    <span className="text-[20vw] font-heading font-black leading-none text-white opacity-[0.02] select-none translate-y-[-10%]">
                        03
                    </span>
                </div>

                <motion.div 
                    style={{ 
                        paddingTop: breathPadding, 
                        paddingBottom: breathPadding,
                        opacity: aboutOpacity,
                        y: aboutY
                    }} 
                    className="relative z-10"
                >
                    <div className={`${LAYOUT.CONTAINER} flex flex-col gap-6 md:gap-10`}>

                        {/* SECTION HEADING — PHASE 42 DNA PATTERN */}
                        <SectionHeader 
                            label="03_IDENTITY" 
                            title={scrambledTitle} 
                            subtitle="Engineering Philosophy & Technical Mindset" 
                            discoveryHint="SYSTEM_PHILOSOPHY"
                        />

                        {/* EDITORIAL STATEMENT BLOCKS — STAGGERED REVEAL (STEP 8) */}
                        <div className="grid grid-cols-12 gap-y-24 md:gap-y-32 gap-x-8 items-start">

                            {/* BLOCK 1 - SYSTEMS THINKING */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: DUR.MEDIUM, ease: EASE.ENTRY }}
                                className="col-span-12 lg:col-span-6 lg:col-start-1"
                            >
                                <MaskReveal delay={0.3} direction="up" duration={1.4}>
                                    <h3 className="text-medium mb-8 type-react-hover">
                                        Systems <br /> <span className="text-white/40 italic">Thinking.</span>
                                    </h3>
                                </MaskReveal>
                                <div className="dna-line-motif">
                                    <motion.p
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: DUR.SLOW, delay: 0.5, ease: EASE.EXIT }}
                                        className="text-body text-white/50 bg-white/[0.02] p-6 md:p-8 border-l-2 border-white/10"
                                    >
                                        I don&apos;t just write code; I design systems. Every component, from UI interactions to database queries, is treated as a node in a larger architectural network. Precision and scalability are non-negotiable.
                                    </motion.p>
                                </div>
                            </motion.div>

                            {/* BLOCK 2 - BACKEND ENGINEERING */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: DUR.MEDIUM, delay: 0.3, ease: EASE.ENTRY }}
                                className="col-span-12 lg:col-span-5 lg:col-start-8"
                            >
                                <MaskReveal delay={0.6} direction="up" duration={1.4}>
                                    <h3 className="text-medium mb-8 type-react-hover">
                                        Backend <br /> <span className="text-white/40 italic">Authority.</span>
                                    </h3>
                                </MaskReveal>
                                <div className="dna-line-motif">
                                    <motion.p
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: DUR.SLOW, delay: 0.8, ease: EASE.EXIT }}
                                        className="text-body text-white/50 bg-white/[0.02] p-6 md:p-8 border-l-2 border-white/10"
                                    >
                                        Building rigid, secure, and highly performant data pipelines. I specialize in crafting backend infrastructure that withstands high concurrency and complex logic without exposing complexity to the frontend.
                                    </motion.p>
                                </div>
                            </motion.div>

                            {/* BLOCK 3 - LEARNING MINDSET */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: DUR.MEDIUM, delay: 0.5, ease: EASE.ENTRY }}
                                className="col-span-12 lg:col-span-7 lg:col-start-3"
                            >
                                <MaskReveal delay={1.2} direction="up" duration={1.6}>
                                    <h3 className="text-medium mb-8 type-react-hover">
                                        Dynamic <br /> <span className="text-white/40 italic">Evolution.</span>
                                    </h3>
                                </MaskReveal>
                                <div className="dna-line-motif">
                                    <p className="text-body text-white/50 bg-white/[0.02] p-6 md:p-8 border-l-2 border-white/10">
                                        Technology is a shifting landscape. My core skill is not a single language, but the ability to rapidly assimilate new paradigms, dissect unfamiliar architectures, and build production-ready software efficiently.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* SKILLS FOOTER REVEAL */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: DUR.SLOW * 2, delay: 0.8, ease: EASE.CALM }}
                            className="mt-12 md:mt-20 grid grid-cols-12 gap-4 md:gap-8 border-t border-white/10 pt-12 md:pt-16"
                        >
                            <div className="col-span-12 lg:col-span-3">
                                <span className="text-caption text-white/40">CURRENT_SYNC</span>
                            </div>
                            <div className="col-span-12 lg:col-span-9 flex flex-wrap gap-4 md:gap-6">
                                {["Low-Level Memory Mgt", "Distributed Databases", "Advanced WebGL", "Security Protocols"].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ backgroundColor: "rgba(255,255,255,0.08)", y: -2 }}
                                        className="border border-white/10 px-5 py-3 text-caption bg-white/[0.02] cursor-none transition-colors"
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
