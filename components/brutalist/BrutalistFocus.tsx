"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useScene } from "@/context/SceneContext";

const bentoCells = [
    {
        id: "ai",
        title: "AIML.",
        descriptor: "AUTONOMOUS PATTERN RECOGNITION.",
        full: "SIGNAL TO INTELLIGENCE MAPPING. DEEP NEURAL ARCHITECTURES FOR PREDICTIVE LOGISTICS AND PATTERN RECOVERY.",
        span: "col-span-12 md:col-span-8",
        height: "h-[300px] md:h-[400px]",
        index: "DATA_NODE_01"
    },
    {
        id: "sec",
        title: "SECURITY.",
        descriptor: "ZERO-TRUST PROTOCOLS.",
        full: "FORMAL-VERIFICATION AND REDUCING UNCERTAINTY IN CROSS-LANGUAGE INTERACTIONS. HARDENED SYSTEM BOUNDARIES.",
        span: "col-span-12 md:col-span-4",
        height: "h-[300px] md:h-[400px]",
        index: "SEC_NODE_02"
    },
    {
        id: "arch",
        title: "ARCH.",
        descriptor: "SPATIAL SYSTEM DESIGN.",
        full: "BEYOND INTERFACES. WE BUILD ENVIRONMENTS. 3D SPATIAL SLABS AND DIMENSIONAL DATA VISUALIZATION.",
        span: "col-span-12 md:col-span-4",
        height: "h-[300px]",
        index: "STRUCT_NODE_03"
    },
    {
        id: "ffi",
        title: "VERIFIER.",
        descriptor: "POLYGLOT CONTRACTS.",
        full: "ENSURING LOGICAL INTEGRITY ACROSS FFI BOUNDARIES. AUTOMATED FORMAL VERIFICATION FOR POLYGLOT SYSTEMS.",
        span: "col-span-12 md:col-span-8",
        height: "h-[300px]",
        index: "LOGIC_NODE_04"
    }
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
                borderRadius: isActive ? 24 : 4,
                scale: isActive ? 1.02 : 1
            }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className={`
                bento-card relative cursor-none group ${cell.span} ${cell.height} 
                ${isActive ? "z-50 !col-span-12 !h-[500px]" : "z-10"}
                ${!isActive && "hover:scale-[0.99]"}
            `}
        >
            <div className="absolute inset-x-8 inset-y-8 flex flex-col justify-between z-10 transition-transform duration-500">
                <div className="flex justify-between items-start">
                    <motion.span
                        layout="position"
                        className="font-mono text-[10px] text-muted tracking-widest uppercase opacity-50"
                    >
                        {cell.index}
                    </motion.span>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-12 h-1 bg-white/5 relative overflow-hidden">
                            <motion.div
                                animate={{ width: ["0%", "80%", "0%"] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-0 left-0 h-full bg-white opacity-40"
                            />
                        </div>
                        <span className="font-mono text-[9px] opacity-40">CALIBRATING_NODE</span>
                    </motion.div>
                </div>

                <div className="flex flex-col gap-4">
                    <motion.h3
                        layout="position"
                        className="font-title text-step-2 md:text-step-3 text-white uppercase tracking-tight-title text-physical"
                    >
                        {cell.title}
                    </motion.h3>
                    <motion.p
                        layout="position"
                        className={`font-body text-step-0 text-muted uppercase tracking-micro font-bold ${isActive ? "opacity-100" : "opacity-40"}`}
                    >
                        {isActive ? cell.full : cell.descriptor}
                    </motion.p>
                </div>
            </div>

            <AnimatePresence>
                {isActive && (
                    <>
                        <motion.div
                            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                            exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                            className={`absolute inset-0 z-0 ${mode === 'minimal' ? 'bg-background border-2 border-white/10' : 'bg-white/5 backdrop-blur-3xl'}`}
                        />
                        {mode !== 'minimal' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="absolute inset-x-0 inset-y-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.05),transparent_70%)] z-0"
                            />
                        )}
                    </>
                )}
            </AnimatePresence>

            <motion.div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.02] transition-colors" />
        </motion.div>
    );
}

export default function BrutalistFocus() {
    const sectionRef = useRef<HTMLElement>(null);
    const { mode, setActiveSection } = useScene();
    const [activeId, setActiveId] = useState<string | null>(null);

    const { scrollYProgress: sectionScroll } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const rotateX = useTransform(sectionScroll, [0, 0.4, 0.6, 1], mode === 'depth' ? [5, 0, 0, -5] : [3, 0, 0, -3]);

    return (
        <section
            onMouseOver={() => setActiveSection("focus")}
            ref={sectionRef}
            className="spatial-section relative overflow-hidden"
            id="focus"
        >
            <motion.div
                style={{
                    rotateX,
                    transformStyle: "preserve-3d"
                }}
                className="grid-layout items-start relative z-10 morph-surface md:pl-[6%] lg:pl-[10%]"
            >
                <div className="col-span-12 mb-16 flex justify-between items-end">
                    <motion.span
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                        className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                    >
                        04 RESEARCH FOCUS // BENTO ARCHITECTURE
                    </motion.span>
                </div>

                <div className="col-span-12 grid grid-cols-12 gap-6 relative">
                    {bentoCells.map((cell) => (
                        <BentoCard
                            key={cell.id}
                            cell={cell}
                            isActive={activeId === cell.id}
                            onToggle={setActiveId}
                            activeId={activeId}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
