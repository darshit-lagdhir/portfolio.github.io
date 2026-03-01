"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
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

function InteractiveProjectPanel({ project, index }: { project: any, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { mode } = useScene();
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mouseXSpring = useSpring(mouseX, GLOBAL_SPRING);
    const mouseYSpring = useSpring(mouseY, GLOBAL_SPRING);

    const amp = mode === 'depth' ? 1.5 : 0.8;
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${2.5 * amp}deg`, `-${2.5 * amp}deg`]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${2.5 * amp}deg`, `${2.5 * amp}deg`]);

    // PHASE 3: LIGHTING RIM HIGHLIGHT + GLARE (PH-13 REFINED)
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [-120, 120]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [-120, 120]);
    const backgroundGlare = useMotionTemplate`radial-gradient(400px circle at calc(50% + ${glareX}px) calc(50% + ${glareY}px), rgba(255,255,255,0.025), transparent 70%)`;

    // PHASE 4: DEPTH REACTIVE SHADOWS (MICRO OFFSET)
    const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [4, -4]);
    const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [4, -4]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div className="flex-1 relative group">
            {/* PHASE 3: ENVIRONMENTAL LIGHT REACTION (AMBIENT GLOW) */}
            <motion.div
                style={{ background: backgroundGlare, opacity: isHovered ? 0.3 : 0 }}
                className="absolute inset-[-60px] z-[-2] pointer-events-none rounded-3xl blur-3xl transition-opacity duration-1000"
            />

            {/* PHASE 4: DEPTH REACTIVE SHADOWS */}
            <motion.div
                style={{ x: shadowX, y: shadowY }}
                className="absolute inset-0 bg-black z-[-1] pointer-events-none rounded-sm blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
            />

            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false); }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: GLOBAL_EASE }}
                style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="h-full flex flex-col justify-between heavy-panel p-10 md:p-14 md:min-h-[60vh] lg:min-h-[70vh] cursor-none bg-transparent overflow-hidden"
            >
                {/* PHASE 9: LIGHT ACCENT EDGE GLOW */}
                <div className="absolute inset-0 z-0 pointer-events-none rim-highlight opacity-10 group-hover:opacity-40 transition-opacity" />

                {mode !== 'minimal' && (
                    <motion.div style={{ background: backgroundGlare }} className="absolute inset-0 z-0 pointer-events-none opacity-40 transition-opacity" />
                )}

                <div className="flex justify-between items-start opacity-20">
                    <span className="text-micro font-bold">{project.index}</span>
                    <div className="w-10 h-[1px] bg-white" />
                </div>

                <Link href={project.slug} className="relative z-10 flex flex-col gap-6 mt-auto">
                    {/* PHASE 7: FOCAL ANCHOR (TITLE) - PH-9 SCALE */}
                    <h3 className="text-large text-white uppercase tracking-widest italic first-letter:not-italic group-hover:tracking-tighter transition-all duration-700">
                        {project.name}
                    </h3>

                    <p className="text-micro text-muted font-bold tracking-[0.3em] opacity-30 group-hover:opacity-100 group-hover:text-white transition-all">
                        {project.descriptor}
                    </p>

                    {/* MINIMAL CTA ACTION (PHASE 2) */}
                    <span className="mt-10 inline-block text-[10px] tracking-widest font-bold opacity-0 group-hover:opacity-20 transition-all">
                        OPEN_INTEGRATION_PROTOCOLS &rarr;
                    </span>
                </Link>

                {/* PHASE 13: SURFACE TEXTURE */}
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
            </motion.div>
        </motion.div>
    );
}

export default function BrutalistProjectsPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const { mode, setActiveSection } = useScene();
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

    return (
        <section
            onPointerEnter={() => setActiveSection("projects")}
            ref={sectionRef}
            className="spatial-section min-h-screen flex items-center justify-center section-tone-shift tone-03"
            id="projects"
        >
            <div className="grid-poster py-24 flex flex-col gap-y-16">

                {/* PHASE 3: LEFT-DOMINANT LAYOUT */}
                <div className="col-span-12 lg:col-span-8 flex flex-col items-start gap-12">
                    <div className="flex flex-col gap-6 items-start">
                        <span className="text-micro font-bold text-muted border-l border-white/20 pl-6 h-4 flex items-center">SECTION_ID_03</span>
                        <h2 className="text-large text-white flex flex-col italic first-letter:not-italic select-none pointer-events-none border-b border-white/5 pb-10 w-full">
                            PROJECTS_ARCHIVE // SYSTEMS
                        </h2>
                    </div>
                </div>

                {/* PHASE 5: PROJECT PREVIEW REBUILD - THREE LARGE PANELS SIDE-BY-SIDE */}
                <div className="col-span-12 flex flex-col md:flex-row gap-8 lg:gap-12 mt-10">
                    {projects.map((p, i) => (
                        <InteractiveProjectPanel
                            key={i}
                            project={p}
                            index={i}
                        />
                    ))}
                </div>
            </div>

            {/* PHASE 8: INTERACTIVE NEGATIVE SPACE (AMBIENT BRACKETS) */}
            <div className="absolute bottom-[10%] left-[8%] opacity-5 pointer-events-none hidden lg:block">
                <div className="w-12 h-12 border-b border-l border-white" />
            </div>
        </section>
    );
}
