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
    const scrambledTitle = useScramble("IDENTITY_SYSTEM", inView);

    // PHASE 9 STEP 3: SECTION BREATHING
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const breathPadding = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["8rem", "10rem", "10rem", "8rem"]);

    return (
        <ChoreographedSection id="about">
            <div
                ref={containerRef}
                onPointerEnter={() => setActiveSection("about")}
                className="relative min-h-screen overflow-hidden bg-black text-white"
            >
                {/* PHASE 23 STEP 7: SECTION NUMBER SYSTEM */}
                <span className="absolute top-[10%] left-[5%] text-[20vw] font-heading font-black leading-none text-white opacity-[0.02] pointer-events-none z-0 select-none">
                    03
                </span>

                {/* PHASE 9: BREATHING WRAPPER */}
                <motion.div style={{ paddingTop: breathPadding, paddingBottom: breathPadding }} className="relative z-10">
                    <div className="w-full max-w-[1800px] mx-auto px-[5vw] flex flex-col gap-32">

                        {/* SECTION HEADING */}
                        <div className="flex flex-col gap-6 items-start self-start">
                            <span className="text-micro font-bold tracking-[0.8em] opacity-70">03_IDENTITY</span>
                            <h2 className={`text-[clamp(1.5rem,8vw,6rem)] break-words font-heading font-extrabold italic leading-none uppercase tracking-tighter w-full border-b border-white/20 pb-8 transition-opacity duration-1000 ${inView ? "opacity-100" : "opacity-0"}`}>
                                {scrambledTitle}
                            </h2>
                        </div>

                        {/* PHASE 23 STEP 8: EDITORIAL STATEMENT BLOCKS */}
                        <div className="grid grid-cols-12 gap-y-32 gap-x-8 items-start mt-20">

                            {/* BLOCK 1 - SYSTEMS THINKING */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: GLOBAL_EASE }}
                                className="col-span-12 lg:col-span-6 lg:col-start-1"
                            >
                                <h3 className="text-[clamp(1.5rem,4vw,3rem)] font-heading font-bold leading-tight uppercase mb-8">
                                    Systems <br /> <span className="text-white/40 italic">Thinking.</span>
                                </h3>
                                <p className="text-short-body text-white/70 tracking-wide bg-white/[0.08] p-6 md:p-8 border-l-2 border-white/30">
                                    I don't just write code; I design systems. Every component, from UI interactions to database queries, is treated as a node in a larger architectural network. Precision and scalability are non-negotiable.
                                </p>
                            </motion.div>

                            {/* BLOCK 2 - BACKEND ENGINEERING */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2, ease: GLOBAL_EASE }}
                                className="col-span-12 lg:col-span-5 lg:col-start-8"
                            >
                                <h3 className="text-[clamp(1.5rem,4vw,3rem)] font-heading font-bold leading-tight uppercase mb-8">
                                    Backend <br /> <span className="text-white/40 italic">Authority.</span>
                                </h3>
                                <p className="text-short-body text-white/70 tracking-wide bg-white/[0.08] p-6 md:p-8 border-l-2 border-white/30">
                                    Building rigid, secure, and highly performant data pipelines. I specialize in crafting backend infrastructure that withstands high concurrency and complex logic without exposing complexity to the frontend.
                                </p>
                            </motion.div>

                            {/* BLOCK 3 - LEARNING MINDSET */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4, ease: GLOBAL_EASE }}
                                className="col-span-12 lg:col-span-7 lg:col-start-3"
                            >
                                <h3 className="text-[clamp(1.5rem,4vw,3rem)] font-heading font-bold leading-tight uppercase mb-8">
                                    Dynamic <br /> <span className="text-white/40 italic">Evolution.</span>
                                </h3>
                                <p className="text-short-body text-white/70 tracking-wide bg-white/[0.08] p-6 md:p-8 border-l-2 border-white/30">
                                    Technology is a shifting landscape. My core skill is not a single language, but the ability to rapidly assimilate new paradigms, dissect unfamiliar architectures, and build production-ready software efficiently.
                                </p>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.8 }}
                            className="mt-20 md:mt-32 grid grid-cols-12 gap-4 md:gap-8 border-t border-white/20 pt-12 md:pt-16"
                        >
                            <div className="col-span-12 lg:col-span-3">
                                <span className="text-micro font-bold tracking-[0.3em] opacity-70">CURRENT_SYNC</span>
                            </div>
                            <div className="col-span-12 lg:col-span-9 flex flex-wrap gap-4 md:gap-6">
                                {["Low-Level Memory Mgt", "Distributed Databases", "Advanced WebGL", "Security Protocols"].map((item, idx) => (
                                    <div key={idx} className="border border-white/15 px-5 py-3 text-micro font-bold tracking-[0.15em] bg-white/[0.04] hover:bg-white/[0.08] transition-colors">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </ChoreographedSection>
    );
}
