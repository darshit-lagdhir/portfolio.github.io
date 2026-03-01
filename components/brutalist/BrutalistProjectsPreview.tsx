"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useScene } from "@/context/SceneContext";

const projects = [
    {
        name: "MoveX",
        slug: "/movex",
        descriptor: "SECURE BACKEND LOGISTICS ARCHITECTURE",
        index: "SYSTEM 01",
        image: "https://images.unsplash.com/photo-1635311000406-880c5417937a?q=80&w=2000&auto=format&fit=crop"
    },
    {
        name: "UIDAI SYSTEM",
        slug: "/uidai",
        descriptor: "ADVISORY INTELLIGENCE PATTERN DETECTION",
        index: "SYSTEM 02",
        image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2000&auto=format&fit=crop"
    },
    {
        name: "POLYGLOT FFI",
        slug: "/pfcv",
        descriptor: "CROSS-LANGUAGE CONTRACT VERIFIER",
        index: "SYSTEM 03",
        image: "https://images.unsplash.com/photo-1542641728-6ca359b085f4?q=80&w=2000&auto=format&fit=crop"
    }
];

function InteractiveProjectCard({ project, index, scrollYProgress }: { project: any, index: number, scrollYProgress: any }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { mode } = useScene();
    const [isHovered, setIsHovered] = useState(false);

    const startPoint = index * 0.2;
    const midPoint = startPoint + 0.15;
    const endPoint = midPoint + 0.15;

    // HORIZONTAL PANEL EXPANSION (PHASE 7 + MODE BIAS)
    const scaleFactor = useTransform(scrollYProgress,
        [startPoint, midPoint, endPoint],
        [mode === 'depth' ? 0.75 : 0.85, 1, mode === 'depth' ? 0.75 : 0.85]
    );
    const xFlip = useTransform(scrollYProgress, [startPoint, midPoint, endPoint], [mode === 'depth' ? 800 : 500, 0, mode === 'depth' ? -800 : -500]);
    const zFlip = useTransform(scrollYProgress, [startPoint, midPoint, endPoint], [mode === 'depth' ? -500 : -300, 0, mode === 'depth' ? -500 : -300]);
    const rotateYFlip = useTransform(scrollYProgress, [startPoint, midPoint, endPoint], [25, 0, -25]);
    const opacityFlip = useTransform(scrollYProgress, [startPoint, midPoint, endPoint], [0, 1, 0]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mouseXSpring = useSpring(mouseX, { damping: 50, stiffness: 100 });
    const mouseYSpring = useSpring(mouseY, { damping: 50, stiffness: 100 });

    const amp = mode === 'depth' ? 2 : 1;
    const isometricRotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${5 * amp}deg`, `-${5 * amp}deg`]);
    const isometricRotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${5 * amp}deg`, `${5 * amp}deg`]);

    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [-150, 150]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [-150, 150]);
    const backgroundGlare = useMotionTemplate`radial-gradient(600px circle at calc(50% + ${glareX}px) calc(50% + ${glareY}px), rgba(255,255,255,${mode === 'minimal' ? '0.03' : '0.06'}), transparent 40%)`;

    // INTERACTIVE DEFORMATION (PHASE 5: MODE AWARE)
    const deformationX = useTransform(mouseXSpring, [-0.5, 0.5], [mode === 'depth' ? -5 : -2, mode === 'depth' ? 5 : 2]);
    const deformationY = useTransform(mouseYSpring, [-0.5, 0.5], [mode === 'depth' ? -5 : -2, mode === 'depth' ? 5 : 2]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false); }}
            style={{
                x: xFlip,
                z: zFlip,
                scale: scaleFactor,
                rotateX: isometricRotateX,
                rotateY: isHovered ? isometricRotateY : rotateYFlip,
                translateX: isHovered ? deformationX : 0,
                translateY: isHovered ? deformationY : 0,
                opacity: opacityFlip,
                zIndex: projects.length - index,
                transformStyle: "preserve-3d"
            }}
            className={`absolute inset-0 spatial-card border border-border bg-background p-16 md:p-40 flex items-center justify-center transition-all duration-700 overflow-hidden cursor-none ${mode !== 'minimal' ? 'project-card-morph' : ''}`}
        >
            {/* HOVER GLARE SYSTEM (PHASE 9: MODE AWARE) */}
            {mode !== 'minimal' && (
                <motion.div style={{ background: backgroundGlare }} className="absolute inset-0 z-0 pointer-events-none" />
            )}

            <Link href={project.slug} className="grid grid-layout relative z-10 w-full group">
                <div className="col-span-12 md:col-span-8 flex flex-col gap-5">
                    <motion.span
                        animate={isHovered ? { x: 5 } : { x: 0 }}
                        className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                    >
                        SYSTEM // {project.index}
                    </motion.span>
                    <h3 className="font-title text-step-2 md:text-step-4 text-white uppercase tracking-tight-title text-physical italic first-letter:not-italic group-hover:tracking-tighter transition-all duration-700">
                        {project.name}
                    </h3>
                </div>
            </Link>

            {/* MAGNETIC TRIGGER (PHASE 9: MODE AWARE) */}
            {mode !== 'minimal' && (
                <motion.div
                    animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                    style={{ translateZ: -60 }}
                    className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none"
                />
            )}
        </motion.div>
    );
}

export default function BrutalistProjectsPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const { mode, setActiveSection } = useScene();
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

    return (
        <section
            onMouseOver={() => setActiveSection("projects")}
            ref={sectionRef}
            className="relative w-full h-[400vh] bg-black/5"
            id="projects"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ perspective: "2000px" }}>
                <motion.div
                    style={{
                        translateZ: mode === 'depth' ? 120 : 80,
                        transformStyle: "preserve-3d"
                    }}
                    className="w-full h-full relative flex items-center justify-center p-8 md:p-24"
                >
                    <div className="absolute top-[12%] left-[6%] md:left-[10%] z-20 flex justify-between items-end w-full pr-[10%] md:pr-[15%]">
                        <motion.span
                            initial={{ opacity: 0, x: -25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2 }}
                            className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                        >
                            03 SYSTEMS ARCHIVE // MORPHING LAYERS
                        </motion.span>
                    </div>

                    <div className="relative w-full max-w-[1300px] aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9]">
                        {projects.map((p, i) => (
                            <InteractiveProjectCard
                                key={i}
                                project={p}
                                index={i}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
