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
                    {/* SECTION NUMBER SYSTEM */}
                    <motion.span
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.02, 0.04, 0.04, 0.02]) }}
                        className="absolute top-[10%] left-[5%] text-[20vw] font-heading font-black leading-none text-black pointer-events-none z-0 select-none"
                    >
                        02
                    </motion.span>

                    {/* BREATHING WRAPPER */}
                    <motion.div style={{ paddingTop: breathPadding, paddingBottom: breathPadding }} className="relative z-10 w-full">
                        <div className="w-full max-w-[1800px] mx-auto px-[5vw] flex flex-col gap-12 md:gap-24">

                            {/* SECTION HEADING */}
                            <div className="flex flex-col gap-4 items-start self-start w-full">
                                <span className="text-micro font-bold tracking-[0.8em] opacity-40">02_ARCHIVE</span>
                                <motion.h2
                                    className="text-[clamp(1.5rem,8vw,6rem)] break-words font-heading font-extrabold italic leading-none uppercase tracking-tighter w-full border-b border-black/20 pb-4 type-react-hover whitespace-nowrap"
                                >
                                    {scrambledTitle}
                                </motion.h2>
                            </div>

                            {/* STEP 6 & 7: EDITORIAL PROJECT BLOCKS (PINNED REVEAL) */}
                            <div className="grid grid-cols-12 gap-y-12 gap-x-8 items-start relative h-[50vh]">
                                {projects.map((project, idx) => {
                                    // SEQUENTIAL REVEAL LOGIC
                                    const start = idx * 0.25;
                                    const end = start + 0.35;

                                    const pOpacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
                                    const pY = useTransform(scrollYProgress, [start, start + 0.15], [40, 0]);
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
                                                <Link href={project.href} className="group flex flex-col gap-6 w-full">
                                                    <div className="flex items-baseline gap-4">
                                                        <span className="text-micro font-bold opacity-30">{project.id}</span>
                                                        <h3 className="text-[clamp(1.5rem,4vw,3.5rem)] font-heading font-bold leading-tight uppercase type-react-hover group-hover:italic transition-all duration-500">
                                                            {project.name.split('_').map((word, i) => (
                                                                <span key={i} className={i === 1 ? "text-black/40 italic" : ""}>
                                                                    {word}{i === 0 && <br />}
                                                                </span>
                                                            ))}
                                                        </h3>
                                                    </div>
                                                    <div className="flex flex-col gap-6 max-w-xl">
                                                        <p className="text-short-body text-black/70 tracking-wide bg-black/[0.04] p-4 md:p-6 border-l-2 border-black/30 group-hover:bg-black/5 transition-colors">
                                                            {project.desc}
                                                        </p>
                                                        <div className="flex justify-between items-center border-t border-black/10 pt-4">
                                                            <span className="text-micro font-bold tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">
                                                                {project.type}
                                                            </span>
                                                        </div>
                                                    </div>
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
