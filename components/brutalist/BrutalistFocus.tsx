"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useScene } from "@/context/SceneContext";

// PHASE 1: CENTRAL MOTION CONTROLLER
const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

const bentoCells = [
    {
        id: "ai",
        title: "AIML.",
        descriptor: "AUTONOMOUS PATTERN.",
        full: "SIGNAL TO INTELLIGENCE MAPPING. DEEP NEURAL ARCHITECTURES FOR PREDICTIVE LOGISTICS AND PATTERN RECOVERY.",
        span: "col-span-12 md:col-span-4",
        height: "h-[300px]",
        index: "DATA_NODE_01"
    },
    {
        id: "sec",
        title: "SECURITY.",
        descriptor: "ZERO-TRUST.",
        full: "FORMAL-VERIFICATION AND REDUCING UNCERTAINTY IN CROSS-LANGUAGE INTERACTIONS. HARDENED SYSTEM BOUNDARIES.",
        span: "col-span-12 md:col-span-4",
        height: "h-[300px]",
        index: "SEC_NODE_02"
    },
    {
        id: "arch",
        title: "ARCH.",
        descriptor: "SPATIAL SYSTEM.",
        full: "BEYOND INTERFACES. WE BUILD ENVIRONMENTS. 3D SPATIAL SLABS AND DIMENSIONAL DATA VISUALIZATION.",
        span: "col-span-12 md:col-span-4",
        height: "h-[300px]",
        index: "STRUCT_NODE_03"
    }
];

const techStack = [
    "REACT", "NEXT.JS", "FRAMER_MOTION", "THREE.JS", "PRISMA", "NODE.JS", "POSTGRESQL", "TYPESCRIPT"
];

function BentoCard({ cell, isActive, onToggle, activeId }: { cell: any, isActive: boolean, onToggle: (id: string | null) => void, activeId: string | null }) {
    const { mode } = useScene();

    return (
        <motion.div
            layout
            onClick={() => onToggle(isActive ? null : cell.id)}
            style={{
                opacity: activeId && activeId !== cell.id ? 0.3 : 1,
                transformStyle: "preserve-3d"
            }}
            animate={{
                borderRadius: isActive ? 12 : 0,
                scale: isActive ? 1.01 : 1,
                translateZ: isActive ? 30 : 0
            }}
            transition={{ duration: 0.5, ease: GLOBAL_EASE }}
            className={`
                heavy-panel mat-glass btn-tactile relative cursor-none group h-full w-full
                ${isActive ? "z-50" : "z-10"}
                ${!isActive && "hover:bg-[#0c0c0c]"}
            `}
        >
            <div className="absolute inset-x-10 inset-y-10 flex flex-col justify-between z-10 transition-transform duration-500">
                <div className="flex justify-between items-start">
                    <motion.span
                        layout="position"
                        className="text-micro font-bold text-muted opacity-30"
                    >
                        {cell.index}
                    </motion.span>
                </div>

                <div className="flex flex-col gap-6">
                    <motion.h3
                        layout="position"
                        className="text-medium text-white tracking-widest italic first-letter:not-italic"
                    >
                        {cell.title}
                    </motion.h3>
                    <motion.p
                        layout="position"
                        className={`text-body text-step-0 tracking-wide leading-relaxed ${isActive ? "opacity-100" : "opacity-30"}`}
                    >
                        {isActive ? cell.full : cell.descriptor}
                    </motion.p>
                </div>
            </div>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 z-0 ${mode === 'minimal' ? 'bg-background border border-white/10' : 'bg-white/[0.03] backdrop-blur-2xl'}`}
                    />
                )}
            </AnimatePresence>

            <div className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-100 transition-opacity rim-highlight" />
        </motion.div>
    );
}

export default function BrutalistFocus() {
    const sectionRef = useRef<HTMLElement>(null);
    const { mode, setActiveSection, activeSection } = useScene();
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress: sectionScroll } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const rotateX = useTransform(sectionScroll, [0, 0.4, 0.6, 1], mode === 'depth' ? [2.5, 0, 0, -2.5] : [1.2, 0, 0, -1.2]);

    return (
        <section
            onPointerEnter={() => setActiveSection("focus")}
            ref={sectionRef}
            style={{ opacity: activeSection === "focus" ? 1 : 0.94 }}
            className="spatial-section relative flex items-center justify-center section-tone-shift tone-01 transition-opacity duration-1000"
            id="focus"
        >
            <motion.div
                style={{ rotateX, transformStyle: "preserve-3d" }}
                className="grid-poster py-24 flex flex-col gap-y-12"
            >
                <div className="col-span-12 lg:col-span-8 flex flex-col items-start gap-12">
                    <div className="flex flex-col gap-6 items-start">
                        <span className="text-micro font-bold text-muted border-l border-white/20 pl-6 h-4 flex items-center">SECTION_ID_04</span>
                        <motion.h2
                            initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.3, ease: GLOBAL_EASE }}
                            className="text-large text-white flex flex-col italic first-letter:not-italic select-none pointer-events-none border-b border-white/5 pb-10 w-full mb-4 text-white filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
                        >
                            RESEARCH_FOCUS // <span className="text-white brightness-150 font-black tracking-tighter">TOOLS</span>
                        </motion.h2>
                    </div>

                    <p className="text-small text-muted font-light tracking-wide max-w-[42ch]">
                        Our workflow is built on autonomous pattern detection and structural isolation across all system boundaries.
                    </p>
                </div>

                <div className="col-span-12 mt-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="horizontal-tray py-10 opacity-20 hover:opacity-100 transition-opacity"
                    >
                        {techStack.map((tech, i) => (
                            <div
                                key={i}
                                className="text-micro font-bold border border-white/5 px-8 h-12 flex items-center bg-white/[0.02] elastic-micro hover:bg-white/10 hover:border-white/20 transition-all cursor-none"
                            >
                                [ {tech} ]
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="col-span-12 grid grid-cols-12 gap-8 relative mt-10">
                    {bentoCells.map((cell, i) => (
                        <motion.div
                            key={cell.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + i * 0.1, duration: 1 }}
                            className={`${cell.span} ${cell.height} ${i % 2 !== 0 ? 'translate-y-6' : 'translate-y-0'} transition-all duration-1000 ${activeId && activeId !== cell.id ? 'opacity-20 pointer-events-none blur-[2px]' : 'opacity-100 blur-0'}`}
                        >
                            <BentoCard
                                cell={cell}
                                isActive={activeId === cell.id}
                                onToggle={setActiveId}
                                activeId={activeId}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <div className="absolute top-[20%] right-[12%] opacity-10 pointer-events-none hidden lg:block">
                <div className="w-16 h-16 border-t border-r border-white" />
            </div>
        </section>
    );
}
