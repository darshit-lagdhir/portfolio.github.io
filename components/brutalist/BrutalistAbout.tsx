"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useScene } from "@/context/SceneContext";
import { ScrollMoment, ChoreographedSection } from "@/components/brutalist/SystemComponents";

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
    const scrambledTitle = useScramble("CORE_SYSTEM_LOGIC", inView);

    // PHASE 9 STEP 3: SECTION BREATHING
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const breathPadding = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["8rem", "10rem", "10rem", "8rem"]);
    const editorialX = useTransform(scrollYProgress, [0, 1], ["-120px", "20px"]);

    return (
        <ChoreographedSection
            id="about"
        >
            <div
                ref={containerRef}
                onPointerEnter={() => setActiveSection("about")}
                className="relative min-h-screen overflow-hidden bg-black"
            >
                {/* PHASE 10 STEP 8: GHOST TEXT BACKDROP */}
                <span className="ghost-text text-[28vw] font-heading font-black leading-none top-[15%] left-[-8%] text-white">
                    ENGINEERING
                </span>
                {/* WHITE WIPE TRANSITION — PHASE 4 (STEP 3) */}
                <div className={`absolute inset-0 z-0 bg-white transition-all duration-1000 ease-out clip-path-wipe ${inView ? "clip-path-full" : "clip-path-empty"}`}
                    style={{
                        clipPath: inView ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                        transition: "clip-path 1.2s cubic-bezier(0.33, 1, 0.68, 1)"
                    }}
                />

                {/* PHASE 9: BREATHING WRAPPER */}
                <motion.div style={{ paddingTop: breathPadding, paddingBottom: breathPadding }} className="relative z-10">
                    <div className="relative z-10 w-full max-w-[1800px] mx-auto px-[5vw] flex flex-col gap-32">

                        {/* SECTION HEADING — TEXT SCRAMBLE — PHASE 4 */}
                        <div className="flex flex-col gap-6 items-start self-start text-black">
                            <span className="text-micro font-bold tracking-[0.8em] opacity-40">03_IDENTITY</span>
                            <h2 className={`text-large font-heading italic leading-none uppercase tracking-tighter w-full border-b border-black/10 pb-8 transition-opacity duration-1000 ${inView ? "opacity-100" : "opacity-0"}`}>
                                {scrambledTitle}
                            </h2>
                        </div>

                        {/* EDITORIAL OVERFLOW TYPOGRAPHY — PHASE 4 (STEP 12) */}
                        <div className="grid grid-cols-12 gap-10 items-start">
                            <div className="col-span-12 lg:col-span-11 relative">
                                <motion.h3
                                    initial={{ x: -100, opacity: 0 }}
                                    whileInView={{ x: -20, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: GLOBAL_EASE }}
                                    style={{ x: editorialX }}
                                    className="text-[12vw] md:text-[8vw] font-heading font-black text-black leading-[0.85] uppercase -ml-[10vw] whitespace-nowrap"
                                >
                                    ENGINEERED <br />
                                    <span className="pl-[20vw]">EMOTION.</span>
                                </motion.h3>

                                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-20">
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.4 }}
                                        className="text-short-body text-black/60 italic leading-relaxed"
                                    >
                                        I build systems that live at the intersection of architectural precision and digital expression.
                                        My work is focused on the tension between pure logic and human interaction.
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.6 }}
                                        className="text-short-body text-black/60 italic leading-relaxed"
                                    >
                                        Based in Bangalore, I specialize in systems-focused development, creating
                                        robust backends and expressive frontends that prioritize smoothness and authority.
                                    </motion.p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* DECORATIVE TERMINAL BLOCK (TIER 3) */}
                <div className="absolute bottom-20 left-[5vw] flex items-end gap-12 opacity-5 text-black">
                    <span className="text-[15vw] leading-none font-hero font-bold">INFO</span>
                    <div className="flex flex-col gap-2 pb-10">
                        <span className="text-micro font-bold tracking-widest whitespace-nowrap">STATUS: ARCHITECT_ACTIVE</span>
                        <span className="text-micro font-bold tracking-widest whitespace-nowrap">LAST_BUILD: MARCH_2024</span>
                    </div>
                </div>

            </div>
        </ChoreographedSection>
    );
}
