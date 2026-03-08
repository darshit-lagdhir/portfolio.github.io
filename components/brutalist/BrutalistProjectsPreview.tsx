"use client";

import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";
import Link from "next/link";
import { useScene } from "@/context/SceneContext";
import { ChoreographedSection, LAYOUT, EASE, DUR, SectionHeader } from "@/components/brutalist/SystemComponents";
import { fetchGitHubData, GitHubRepoData } from "@/lib/github-service";

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

interface Project {
    id: string;
    name: string;
    repoName: string;
    type: string;
    href: string;
    desc: string;
    span: string;
}

const ProjectPreviewSignal = memo(({ repoName }: { repoName: string }) => {
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
});

ProjectPreviewSignal.displayName = "ProjectPreviewSignal";

const ProjectItem = memo(({ project, idx, scrollYProgress }: { project: Project, idx: number, scrollYProgress: MotionValue<number> }) => {
    const { setIsNavigating } = useScene();
    // PHASE 30 STEP 3: SEQUENTIAL REVEAL ENGINE — STAGGERED SYSTEM ENTRY
    // PHASE 36 STEP 4 & 9: STAGGERED ENTRY + HORIZONTAL MICRO-SCROLL
    const start = idx * 0.22 + 0.15; // Delay entry until after the section title reveal
    const end = start + 0.35;

    const pOpacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
    const pY = useTransform(scrollYProgress, [start, start + 0.15], [120, 0]); 
    // PHASE 36 STEP 9: SPATIAL VARIATION (Horizontal shift)
    const pX = useTransform(scrollYProgress, [start, end], [idx % 2 === 0 ? "5vw" : "-5vw", idx % 2 === 0 ? "-5vw" : "5vw"]);
    const pBlur = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], ["15px", "0px", "0px", "15px"]);
    const filterStr = useTransform(pBlur, b => `blur(${b})`);
    const pointerEventsVal = useTransform(pOpacity, (o: number) => o > 0.5 ? "auto" : "none") as MotionValue<"auto" | "none">;

    return (
        <motion.div
            style={{
                opacity: pOpacity,
                y: pY,
                x: pX,
                filter: filterStr,
                pointerEvents: pointerEventsVal
            }}
            className={`absolute inset-0 grid grid-cols-12 items-center ${project.span} transform-gpu`}
            data-project="true"
        >
            <div className="col-span-12">
                <Link 
                    href={project.href} 
                    className="group block w-full relative preserve-3d"
                    onClick={() => setIsNavigating(true)}
                >
                    <motion.div
                        whileTap={{ scale: 0.98, y: 2 }}
                        transition={{ duration: DUR.MEDIUM, ease: EASE.ENTRY }}
                        className="flex flex-col gap-6 w-full relative z-10 p-4 md:p-8 transform-gpu"
                        style={{
                            rotateX: "var(--tilt-x, 0deg)",
                            rotateY: "var(--tilt-y, 0deg)",
                            x: "var(--magnet-x, 0px)",
                            y: "var(--magnet-y, 0px)",
                            // PHASE 37 STEP 4: DEPTH SHADOW SYSTEM
                            boxShadow: "0 30px 60px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.05)",
                        }}
                    >
                        {/* PHASE 37 STEP 3, 8 & 10: EDGE ILLUMINATION & SPOTLIGHT */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 bg-[radial-gradient(circle_at_var(--edge-light-x,50%)_var(--edge-light-y,50%),rgba(0,0,0,0.03)_0%,transparent_60%)]"
                        />
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-5 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,rgba(0,0,0,1)_0%,transparent_80%)]" />
                        
                        <div className="flex items-baseline gap-4 relative">
                            <span className="text-caption text-black/20">{project.id}</span>
                            <div className="relative">
                                <h3 className="text-medium text-black type-react-hover group-hover:tracking-wider">
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
                            {/* PHASE 42: DNA LINE MOTIF FOR DESCRIPTION */}
                            <div className="dna-line-motif light">
                                <p className="text-body text-black/60 bg-black/[0.02] p-4 md:p-6 border-l-2 border-black/10 group-hover:bg-black/[0.04] group-hover:border-black transition-all duration-500 shadow-sm group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                                    {project.desc}
                                </p>
                            </div>
                            {/* PHASE 28 STEP 7: SURFACE DIFFUSION INDICATOR */}
                            <div className="flex justify-between items-center border-t border-black/[0.05] pt-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-caption opacity-20 group-hover:opacity-100 group-hover:text-black">
                                        {project.type}
                                    </span>
                                    <ProjectPreviewSignal repoName={project.repoName} />
                                </div>
                                <div className="discovery-reveal-hint flex flex-col items-end text-right">
                                    <span className="text-[10px] font-ui font-black text-black/40">STATUS: DEPLOYED</span>
                                    <span className="text-[8px] font-ui text-black/20">LAST_UPDATE: RECENT</span>
                                </div>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "2rem" }}
                                    className="h-[1px] bg-black/20"
                                />
                            </div>
                        </div>
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
});

ProjectItem.displayName = "ProjectItem";

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
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.04, 0.08, 0.08, 0.04]);

    const projects: Project[] = [
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

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <ChoreographedSection id="projects" className="bg-white text-black">
            {/* STEP 5: Scroll Container (Pinned Sequence) */}
            <div
                ref={containerRef}
                onPointerEnter={() => setActiveSection("projects")}
                className={`relative ${isMobile ? 'h-auto py-24' : 'h-[300vh]'} bg-white text-black`}
            >
                {/* STICKY WRAPPER — PHASE 34: ARCHITECTURAL ANCHOR */}
                <div className={`${isMobile ? 'relative' : 'sticky top-0 h-screen'} w-full overflow-hidden flex flex-col`}>
                    
                    {/* PHASE 39 STEP 4: GRID ALIGNMENT CORRECTION (Section Number) */}
                    <div className={`${LAYOUT.CONTAINER} absolute inset-0 flex flex-col justify-center pointer-events-none z-0`}>
                        <motion.span
                            style={{ opacity: isMobile ? 0.04 : sectionOpacity }}
                            className="text-[20vw] font-heading font-black leading-none text-black select-none translate-y-[-10%]"
                        >
                            02
                        </motion.span>
                    </div>

                    {/* FIXED HEADER SYSTEM — PHASE 42 DNA PATTERN */}
                    <motion.div 
                        style={{ 
                            opacity: useTransform(scrollYProgress, [0, 0.1, 0.8, 0.95], [0, 1, 1, 0]),
                            y: useTransform(scrollYProgress, [0, 0.1], [30, 0])
                        }}
                        className={`${LAYOUT.CONTAINER} pt-12 md:pt-20 z-20 shrink-0`}
                    >
                        <SectionHeader 
                            label="02_ARCHIVE" 
                            title={scrambledTitle} 
                            subtitle="Selected Engineering Work" 
                            theme="light"
                            discoveryHint="NAVIGABLE_HISTORY"
                        />
                    </motion.div>

                    {/* BREATHING PROJECT ZONE — PHASE 34: KINETIC CONTENT ONLY */}
                    <motion.div style={{ paddingBottom: breathPadding }} className="relative z-10 w-full flex-grow overflow-hidden mt-12 md:mt-24">
                        <div className={`${LAYOUT.CONTAINER} relative h-full`}>
                            {/* STEP 6 & 7: EDITORIAL PROJECT BLOCKS (PINNED REVEAL) */}
                            <div className="grid grid-cols-12 gap-y-12 gap-x-8 items-start relative h-full">
                                {projects.map((project, idx) => (
                                    <ProjectItem key={project.id} project={project} idx={idx} scrollYProgress={scrollYProgress} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </ChoreographedSection>
    );
}
