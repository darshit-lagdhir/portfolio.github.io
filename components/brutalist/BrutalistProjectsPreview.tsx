"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useScene } from "@/context/SceneContext";
import { ChoreographedSection } from "@/components/brutalist/SystemComponents";

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

export default function BrutalistProjectsPreview() {
    const { setActiveSection } = useScene();
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: false, amount: 0.1 });
    const scrambledTitle = useScramble("SELECTED_WORK_ARCHIVE", inView);

    // PHASE 26 STEP 5: PROJECT SECTION PINNING ENGINE
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Pinned reveal transforms
    const breathPadding = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], ["4rem", "8rem", "8rem", "4rem"]);

    const projects = [
        {
            id: "01",
            name: "MOVEX_SYSTEM",
            type: "LOGISTICS / BACKEND",
            href: "/movex",
            desc: "A robust supply chain engine focusing on real-time routing and high-scale operational capacity. Engineered for precision and transparency in global movement.",
            span: "lg:col-span-6 lg:col-start-1"
        },
        {
            id: "02",
            name: "UIDAI_AI",
            type: "PATTERN / AUTH",
            href: "/uidai",
            desc: "Advanced semantic search and retrieval architecture built for hyper-fast identity documentation. Integrating neural patterns into structural databases.",
            span: "lg:col-span-5 lg:col-start-8"
        },
        {
            id: "03",
            name: "POLYGLOT_FFI",
            type: "CONTRACT / SECURITY",
            href: "/pfcv",
            desc: "Zero-overhead foreign function interfaces bridging isolated memory spaces with absolute type safety. Secured through rigorous algorithmic validation.",
            span: "lg:col-span-7 lg:col-start-3"
        }
    ];

    return (
        <ChoreographedSection id="projects" className="bg-white text-black">
            {/* STEP 5: Scroll Container (Pinned Sequence) */}
            <div
                ref={containerRef}
                onPointerEnter={() => setActiveSection("projects")}
                className="relative h-[300vh] bg-white text-black"
            >
                {/* STICKY WRAPPER */}
                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
                    {/* SECTION NUMBER SYSTEM — PHASE 30 VISIBILITY FIX */}
                    <motion.span
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.04, 0.08, 0.08, 0.04]) }}
                        className="absolute top-[10%] left-[5%] text-[20vw] font-heading font-black leading-none text-black pointer-events-none z-0 select-none"
                    >
                        02
                    </motion.span>

                    {/* BREATHING WRAPPER */}
                    <motion.div style={{ paddingTop: breathPadding, paddingBottom: breathPadding }} className="relative z-10 w-full">
                        <div className="w-full max-w-[1800px] mx-auto px-[5vw] flex flex-col gap-12 md:gap-24">

                            {/* SECTION HEADING — PHASE 30 REFINED */}
                            <div className="flex flex-col gap-4 items-start self-start w-full">
                                <span className="text-caption text-black/60">02_ARCHIVE</span>
                                <motion.h2
                                    className="text-[clamp(1.2rem,6vw,4.2rem)] font-heading font-extrabold uppercase tracking-tighter whitespace-nowrap w-full border-b border-black/20 pb-4 type-react-hover text-black"
                                >
                                    {scrambledTitle}
                                </motion.h2>
                            </div>

                            {/* STEP 6 & 7: EDITORIAL PROJECT BLOCKS (PINNED REVEAL) */}
                            <div className="grid grid-cols-12 gap-y-12 gap-x-8 items-start relative h-[50vh]">
                                {projects.map((project, idx) => {
                                    // PHASE 30 STEP 3: SEQUENTIAL REVEAL ENGINE — STAGGERED SYSTEM ENTRY
                                    const start = idx * 0.28; // Increased delay gap
                                    const end = start + 0.38; // Slightly longer presence window

                                    const pOpacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
                                    const pY = useTransform(scrollYProgress, [start, start + 0.12], [80, 0]); // Increased upward slide for cinematic feel
                                    const pX = useTransform(scrollYProgress, [start, end], [idx % 2 === 0 ? "2vw" : "-2vw", idx % 2 === 0 ? "-2vw" : "2vw"]);
                                    const pBlur = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], ["12px", "0px", "0px", "12px"]);

                                    return (
                                        <motion.div
                                            key={project.id}
                                            style={{
                                                opacity: pOpacity,
                                                y: pY,
                                                x: pX,
                                                filter: useTransform(pBlur, b => `blur(${b})`),
                                                pointerEvents: useTransform(pOpacity, o => o > 0.5 ? "auto" : "none") as any
                                            }}
                                            className={`absolute inset-0 grid grid-cols-12 items-center ${project.span}`}
                                            data-project="true"
                                        >
                                            <div className="col-span-12">
                                                <Link href={project.href} className="group block w-full">
                                                    <motion.div
                                                        whileHover={{ y: -10, filter: "brightness(1.1)" }}
                                                        whileTap={{ scale: 0.98 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                                        className="flex flex-col gap-6 w-full"
                                                    >
                                                        <div className="flex items-baseline gap-4 relative">
                                                            <span className="text-caption text-black/40">{project.id}</span>
                                                            <div className="relative">
                                                                <h3 className="text-medium text-black type-react-hover group-hover:tracking-wider transition-all duration-500">
                                                                    {project.name.replace('_', '\u00A0')}
                                                                </h3>
                                                                <motion.div
                                                                    initial={{ scaleX: 0 }}
                                                                    whileHover={{ scaleX: 1 }}
                                                                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-black origin-left"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-6 max-w-xl">
                                                            {/* PHASE 28 STEP 3: PANEL SURFACE TEXTURE REFINEMENT */}
                                                            <p className="text-body text-black/70 bg-black/[0.03] p-4 md:p-6 border-l-2 border-black/20 group-hover:bg-black/5 group-hover:border-black transition-all duration-500 shadow-sm group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                                                                {project.desc}
                                                            </p>
                                                            {/* PHASE 28 STEP 7: SURFACE DIFFUSION INDICATOR */}
                                                            <div className="flex justify-between items-center border-t border-black/5 pt-4">
                                                                <span className="text-caption opacity-30 group-hover:opacity-100 group-hover:text-black transition-all duration-500">
                                                                    {project.type}
                                                                </span>
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    whileHover={{ width: "2rem" }}
                                                                    className="h-[1px] bg-black/40"
                                                                />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* EXIT CUE */}
                            <motion.div
                                style={{ opacity: useTransform(scrollYProgress, [0.8, 0.9], [0, 0.3]) }}
                                className="mt-8 border-t border-black/10 pt-8 flex justify-end"
                            >
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-micro font-bold tracking-[0.4em]">SYS_NAV_02 / EOT</span>
                                    <div className="w-16 h-px bg-black" />
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </ChoreographedSection>
    );
}
