"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useScene } from "@/context/SceneContext";
import { ChoreographedSection } from "@/components/brutalist/SystemComponents";
import { fetchGitHubData } from "@/lib/github-service";

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
    const breathPadding = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], ["1rem", "6rem", "6rem", "1rem"]);

    const projects = [
        {
            id: "01",
            name: "MOVEX_SYSTEM",
            repoName: "movex",
            type: "LOGISTICS / BACKEND",
            href: "/movex",
            desc: "A robust supply chain engine focusing on real-time routing and high-scale operational capacity. Engineered for precision and transparency in global movement.",
            span: "lg:col-span-6 lg:col-start-1"
        },
        {
            id: "02",
            name: "UIDAI_AI",
            repoName: "uidai-advisory-system",
            type: "PATTERN / AUTH",
            href: "/uidai",
            desc: "Advanced semantic search and retrieval architecture built for hyper-fast identity documentation. Integrating neural patterns into structural databases.",
            span: "lg:col-span-5 lg:col-start-8"
        },
        {
            id: "03",
            name: "POLYGLOT_FFI",
            repoName: "polyglot-ffi-verifier",
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
                {/* STICKY WRAPPER — PHASE 34: ARCHITECTURAL ANCHOR */}
                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
                    {/* SECTION NUMBER SYSTEM — PHASE 30 VISIBILITY FIX */}
                    <motion.span
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.04, 0.08, 0.08, 0.04]) }}
                        className="absolute top-[10%] left-[5%] text-[20vw] font-heading font-black leading-none text-black pointer-events-none z-0 select-none"
                    >
                        02
                    </motion.span>

                    {/* FIXED HEADER SYSTEM */}
                    <div className="w-full max-w-[1800px] mx-auto px-[5vw] pt-12 md:pt-20 z-20 shrink-0">
                        <div className="flex flex-col gap-4 items-start self-start w-full">
                            <span className="text-caption text-black/60">02_ARCHIVE</span>
                            <motion.h2
                                className="text-[clamp(1.2rem,6vw,4.2rem)] font-heading font-extrabold uppercase tracking-tighter whitespace-nowrap w-full border-b border-black/20 pb-4 type-react-hover text-black"
                            >
                                {scrambledTitle}
                            </motion.h2>
                        </div>
                    </div>

                    {/* BREATHING PROJECT ZONE — PHASE 34: KINETIC CONTENT ONLY */}
                    <motion.div style={{ paddingBottom: breathPadding }} className="relative z-10 w-full flex-grow overflow-hidden mt-12 md:mt-24">
                        <div className="w-full max-w-[1800px] mx-auto px-[5vw] relative h-full">
                            {/* STEP 6 & 7: EDITORIAL PROJECT BLOCKS (PINNED REVEAL) */}
                            <div className="grid grid-cols-12 gap-y-12 gap-x-8 items-start relative h-full">
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
                                                pointerEvents: useTransform(pOpacity, (o: number) => o > 0.5 ? "auto" : ("none" as any))
                                            }}
                                            className={`absolute inset-0 grid grid-cols-12 items-center ${project.span}`}
                                            data-project="true"
                                        >
                                            <div className="col-span-12">
                                                <Link href={project.href} className="group block w-full relative preserve-3d">
                                                    <motion.div
                                                        whileHover={{ z: 50 }}
                                                        whileTap={{ scale: 0.98, y: 2 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                                        className="flex flex-col gap-6 w-full relative z-10"
                                                        style={{
                                                            rotateX: "var(--tilt-x, 0deg)",
                                                            rotateY: "var(--tilt-y, 0deg)",
                                                            x: "var(--magnet-x, 0px)",
                                                            y: "var(--magnet-y, 0px)",
                                                        }}
                                                    >
                                                        {/* STEP 7: Panel Edge Light Response */}
                                                        <div
                                                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                                                            style={{
                                                                background: `radial-gradient(circle at var(--edge-light-x, 50%) var(--edge-light-y, 50%), rgba(0,0,0,0.05) 0%, transparent 60%)`
                                                            }}
                                                        />
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
                                                                <div className="flex flex-col gap-1">
                                                                    <span className="text-caption opacity-30 group-hover:opacity-100 group-hover:text-black transition-all duration-500">
                                                                        {project.type}
                                                                    </span>
                                                                    <ProjectPreviewSignal repoName={project.repoName} />
                                                                </div>
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
                            {/* EXIT CUE REMOVED AS REQUESTED */}

                        </div>
                    </motion.div>
                </div>
            </div>
        </ChoreographedSection>
    );
}

import { GitHubRepoData } from "@/lib/github-service";

function ProjectPreviewSignal({ repoName }: { repoName: string }) {
    const [data, setData] = useState<GitHubRepoData | null>(null);

    useEffect(() => {
        fetchGitHubData(repoName).then(setData);
    }, [repoName]);

    if (!data) return null;

    const date = new Date(data.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-[9px] uppercase tracking-wider text-black/40"
        >
            <span>UPDATED: {date}</span>
            <span className="hidden sm:inline w-1 h-1 bg-black/20 rounded-full" />
            <span className="hidden sm:inline">{data.language}</span>
        </motion.div>
    );
}
