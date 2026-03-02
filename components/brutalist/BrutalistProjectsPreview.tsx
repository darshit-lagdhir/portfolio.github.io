"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useScene } from "@/context/SceneContext";

// PHASE 1: CENTRAL MOTION CONTROLLER
const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];
const GLOBAL_SPRING = { damping: 40, stiffness: 200 };

const projects = [
    {
        name: "MoveX",
        slug: "/movex",
        descriptor: "SECURE BACKEND LOGISTICS ARCHITECTURE",
        index: "SYSTEM 01",
    },
    {
        name: "UIDAI SYSTEM",
        slug: "/uidai",
        descriptor: "ADVISORY INTELLIGENCE PATTERN DETECTION",
        index: "SYSTEM 02",
    },
    {
        name: "POLYGLOT FFI",
        slug: "/pfcv",
        descriptor: "CROSS-LANGUAGE CONTRACT VERIFIER",
        index: "SYSTEM 03",
    }
];

function InteractiveProjectPanel({ project, index, activeProject, setActiveProject, isMobile }: { project: any, index: number, activeProject: string | null, setActiveProject: (s: string | null) => void, isMobile: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { mode, setIsFocusing } = useScene();
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mouseXSpring = useSpring(mouseX, GLOBAL_SPRING);
    const mouseYSpring = useSpring(mouseY, GLOBAL_SPRING);

    const amp = mode === 'depth' ? 1.5 : 0.8;
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${2.5 * amp}deg`, `-${2.5 * amp}deg`]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${2.5 * amp}deg`, `${2.5 * amp}deg`]);

    // PHASE 126.10: REACTIVE SHADOW ENGINE
    const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]);
    const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);

    // PHASE 3: LIGHTING RIM HIGHLIGHT + GLARE
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [-120, 120]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [-120, 120]);
    const backgroundGlare = useMotionTemplate`radial-gradient(400px circle at calc(50% + ${glareX}px) calc(50% + ${glareY}px), rgba(255,255,255,0.025), transparent 70%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || activeProject || isMobile) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const isTakingOver = activeProject === project.slug;
    const isOtherTakingOver = activeProject !== null && !isTakingOver;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (activeProject) return;
        setActiveProject(project.slug);
        setTimeout(() => {
            router.push(project.slug);
            setTimeout(() => setActiveProject(null), 1000);
        }, 600);
    };

    return (
        <motion.div className="flex-1 relative group isometric-slab h-full z-10">
            {/* PHASE 126.3: CONTROLLED DISTORTION LAYER */}
            {!isMobile && (
                <motion.div
                    style={{ background: backgroundGlare, opacity: isHovered ? 0.2 : 0 }}
                    className="absolute inset-[-40px] z-[-2] pointer-events-none rounded-3xl blur-2xl transition-opacity duration-700"
                />
            )}

            {/* PHASE 126.10: REACTIVE SHADOW ENGINE */}
            {!isMobile && (
                <motion.div
                    style={{ x: shadowX, y: shadowY }}
                    className="absolute inset-4 bg-black/60 z-[-1] pointer-events-none rounded-md blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000"
                />
            )}

            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => { !activeProject && setIsHovered(true); setIsFocusing(true); }}
                onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false); setIsFocusing(false); }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                animate={
                    isTakingOver ? {
                        scale: 1.1,
                        z: 100,
                        transition: { duration: 0.6, ease: GLOBAL_EASE }
                    } :
                        isOtherTakingOver ? {
                            scale: 0.9,
                            z: -50,
                            opacity: 0.2,
                            filter: "blur(10px)",
                            transition: { duration: 0.6, ease: GLOBAL_EASE }
                        } : {}
                }
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: GLOBAL_EASE }}
                style={{
                    rotateX: isTakingOver || isMobile ? 0 : rotateX,
                    rotateY: isTakingOver || isMobile ? 0 : rotateY,
                    transformStyle: "preserve-3d"
                }}
                className={`h-full flex flex-col justify-between heavy-panel signature-bracket p-10 md:p-14 md:min-h-[60vh] lg:min-h-[70vh] cursor-none overflow-hidden ${isTakingOver ? 'z-50' : 'z-10'} ${index % 2 !== 0 ? 'translate-y-4' : 'translate-y-0'}`} // PHASE 5: ASYMMETRY
                data-project="true"
            >
                <div className="flex justify-between items-start opacity-20">
                    <span className="text-micro font-bold">{project.index}</span>
                    <div className="w-10 h-[1px] bg-white group-hover:w-16 transition-all duration-700" />
                </div>

                {/* PHASE 126.7: MICRO EDGE ANIMATION ACCENTS */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40 z-20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-white/80" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40 z-20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-white/80" />

                <Link href={project.slug} onClick={handleClick} className="relative z-10 flex flex-col gap-6 mt-auto outline-none border-none group">
                    <motion.div
                        style={{
                            x: isMobile ? 0 : useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]),
                            y: isMobile ? 0 : useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10]),
                            translateZ: 50
                        }}
                        className="flex flex-col gap-6"
                    >
                        {/* PHASE 126.11: LAYER SEPARATION REINFORCEMENT */}
                        <h3 className="text-large text-white uppercase tracking-widest italic first-letter:not-italic group-hover:tracking-tighter transition-all duration-700 opacity-90 group-hover:opacity-100 relative drop-shadow-[10px_10px_20px_rgba(0,0,0,0.8)]">
                            {project.name}
                            <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-700 group-hover:w-[120%] group-hover:-left-[10%] opacity-0 group-hover:opacity-100" />
                        </h3>

                        <p className="text-micro text-muted font-bold tracking-[0.3em] opacity-30 group-hover:opacity-100 group-hover:text-white transition-opacity duration-500">
                            {project.descriptor}
                        </p>
                    </motion.div>

                    {/* PHASE 126.8: TEXT DISTORTION (SUBTLE TECH STACK) */}
                    <div className="overflow-x-auto no-scrollbar flex gap-4 pr-10 mt-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-150">
                        {["NEXT.JS", "TS", "GLSL", "FM"].map((tech) => (
                            <span key={tech} className="text-[8px] border border-white/10 px-3 py-1 bg-white/[0.02] text-muted whitespace-nowrap hover:text-white transition-colors">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* PHASE 8: PROJECT INTENTIONALITY (ARCHITECTURAL PORTAL INDICATOR) */}
                    <div className="mt-10 flex items-center gap-4 group/cta overflow-hidden">
                        <span className="text-[10px] text-white tracking-[0.4em] font-bold opacity-0 group-hover:opacity-40 transition-all duration-700 translate-x-[-10px] group-hover:translate-x-0">
                            INITIALIZE_PORTAL
                        </span>
                        <motion.div
                            animate={isHovered ? {
                                x: [0, 8, 0],
                                rotate: [45, 45, 45],
                                scale: [1, 1.2, 1]
                            } : { rotate: 45 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-2 h-2 border border-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center"
                        >
                            <div className="w-[2px] h-[2px] bg-white rounded-full" />
                        </motion.div>
                    </div>
                </Link>

                <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
            </motion.div>
        </motion.div>
    );
}

export default function BrutalistProjectsPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const { setActiveSection, activeSection } = useScene();
    const [activeProject, setActiveProject] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // PHASE 12: CURSOR FOCUS
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // PHASE 126.7: MICRO EDGE ANIMATION SYNC
    const edgeScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);

    return (
        <section
            ref={sectionRef}
            style={{ opacity: activeSection === "projects" ? 1 : 0.94 }}
            className="spatial-section min-h-screen flex items-center justify-center section-tone-shift tone-03 transition-opacity duration-1000"
            id="projects"
        >
            <div className="grid-poster py-24 flex flex-col gap-y-16">

                {/* PHASE 126.5: PREMIUM VISUAL TENSION */}
                <div className="col-span-12 lg:col-span-8 flex flex-col items-start gap-12 group ml-[5vw] transition-all duration-1000">
                    <div className="flex flex-col gap-6 items-start">
                        <motion.span
                            style={{ scaleY: edgeScale }}
                            className="text-micro font-bold text-muted border-l border-white/20 pl-6 h-4 flex items-center origin-top"
                        >
                            SECTION_ID_03
                        </motion.span>
                        <h2 className="text-large text-white flex flex-col italic first-letter:not-italic select-none pointer-events-none border-b border-white/5 pb-10 w-full overflow-hidden relative">
                            <motion.span
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: GLOBAL_EASE, delay: 0.3 }}
                            >
                                PROJECTS_ARCHIVE // <span className="text-white brightness-125 font-black tracking-tighter">SYSTEMS</span>
                            </motion.span>

                            <div className="absolute inset-x-0 bottom-10 z-[-1] opacity-10 blur-[2px] translate-x-[2px] translate-y-[2px] pointer-events-none text-black">
                                PROJECTS_ARCHIVE // SYSTEMS
                            </div>
                        </h2>
                    </div>
                </div>

                <div className="col-span-12 flex flex-col md:flex-row gap-8 lg:gap-12 mt-10">
                    {projects.map((p, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`${i === 0 ? "md:ml-[-4vw]" : ""} flex-1 transition-all duration-700 ${hoveredIndex !== null && hoveredIndex !== i ? 'opacity-25 blur-[1px]' : 'opacity-100 blur-0'}`}
                        > {/* PHASE 5: GRID BREAK + PHASE 12: FOCUS DIMMING */}
                            <InteractiveProjectPanel
                                project={p}
                                index={i}
                                activeProject={activeProject}
                                setActiveProject={setActiveProject}
                                isMobile={isMobile}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <motion.div
                style={{ scaleX: edgeScale, transformOrigin: "right" }}
                className="arch-line arch-line-h hidden lg:block right-0 top-[12vh] w-[30vw]"
            />
        </section>
    );
}
