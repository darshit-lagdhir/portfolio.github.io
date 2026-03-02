"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const projects = [
    {
        name: "MoveX",
        slug: "/movex",
        descriptor: "SECURE BACKEND LOGISTICS",
        index: "01",
    },
    {
        name: "UIDAI SYSTEM",
        slug: "/uidai",
        descriptor: "PATTERN DETECTION INTELLIGENCE",
        index: "02",
    },
    {
        name: "POLYGLOT FFI",
        slug: "/pfcv",
        descriptor: "CROSS-LANGUAGE VERIFIER",
        index: "03",
    }
];

function InteractiveProjectPanel({ project, index, isMobile }: { project: any, index: number, isMobile: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: GLOBAL_EASE }}
            className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] h-[50vh] md:h-full flex"
        >
            <Link href={project.slug} className="w-full h-full block">
                <motion.div
                    ref={cardRef}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={!isMobile ? { scale: 1.02, y: -10 } : {}}
                    transition={{ duration: 0.4, ease: GLOBAL_EASE }}
                    className="w-full h-full bg-white/[0.02] border border-white/5 p-10 md:p-14 flex flex-col justify-between relative group overflow-hidden transition-colors hover:bg-white/[0.04] backdrop-blur-md"
                >
                    <div className="relative z-10 flex justify-between items-start">
                        <span className="text-micro font-bold opacity-30 group-hover:opacity-100 uppercase tracking-[0.5em]">
                            {project.index}
                        </span>
                        <div className="w-8 h-px bg-white/10 group-hover:w-16 group-hover:bg-white/40 transition-all duration-700" />
                    </div>

                    <div className="relative z-10 mt-auto">
                        <h3 className="text-massive-mini text-white italic tracking-tight-title mb-4 transition-all duration-700 group-hover:tracking-tighter leading-tight uppercase font-medium">
                            {project.name}
                        </h3>
                        <p className="text-micro text-white/40 font-bold tracking-[0.4em] mb-12 group-hover:text-white transition-all uppercase">
                            {project.descriptor}
                        </p>

                        {!isMobile && (
                            <div className="flex items-center gap-4 group/cta h-10 overflow-hidden">
                                <motion.span
                                    animate={isHovered ? { x: 0, opacity: 0.5 } : { x: -10, opacity: 0 }}
                                    className="text-micro font-bold tracking-[0.4em] uppercase"
                                >
                                    VIEW_WORK
                                </motion.span>
                                <motion.div
                                    animate={isHovered ? { rotate: 45, x: 0 } : { rotate: 0, x: -10 }}
                                    className="w-2 h-2 border-t border-r border-white/40"
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}

export default function BrutalistProjectsPreview() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { setActiveSection } = useScene();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef
    });

    // HORIZONTAL SCROLL CALCULATION — PHASE 2
    const x = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]), {
        stiffness: 120,
        damping: 35,
        restDelta: 0.001
    });

    if (isMobile) {
        return (
            <section
                id="projects"
                onPointerEnter={() => setActiveSection("projects")}
                className="relative py-24 px-[5vw] bg-background flex flex-col gap-12"
            >
                <div className="w-full mb-12 flex flex-col items-start gap-4">
                    <span className="text-micro font-bold tracking-[0.6em] uppercase opacity-40">02_ARCHIVE</span>
                    <h2 className="text-large italic text-white tracking-tight-title uppercase leading-none">SELECTED SYSTEMS</h2>
                </div>
                {projects.map((p, i) => (
                    <InteractiveProjectPanel key={i} project={p} index={i} isMobile={isMobile} />
                ))}
            </section>
        );
    }

    return (
        <section
            ref={targetRef}
            id="projects"
            onPointerEnter={() => setActiveSection("projects")}
            className="relative h-[220vh] bg-background"
        >
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                <div className="max-w-[1600px] mx-auto w-full px-[5vw] mb-12 flex flex-col items-start gap-4">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 0.4, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: GLOBAL_EASE }}
                        className="text-micro font-bold tracking-[0.6em] uppercase"
                    >
                        02_ARCHIVE
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: GLOBAL_EASE }}
                        className="text-massive-mini italic text-white tracking-tight-title uppercase leading-none"
                    >
                        SELECTED SYSTEMS
                    </motion.h2>
                </div>

                <div className="max-w-[1600px] mx-auto w-full px-[5vw] flex items-center">
                    <motion.div
                        style={{ x }}
                        className="flex gap-14 h-[55vh]"
                    >
                        {projects.map((p, i) => (
                            <InteractiveProjectPanel key={i} project={p} index={i} isMobile={isMobile} />
                        ))}
                    </motion.div>
                </div>

                <div className="max-w-[1600px] mx-auto w-full px-[5vw] absolute bottom-16 left-1/2 -translate-x-1/2 h-px bg-white/5 overflow-hidden">
                    <motion.div
                        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                        className="w-full h-full bg-white/20"
                    />
                </div>
            </div>
        </section>
    );
}
