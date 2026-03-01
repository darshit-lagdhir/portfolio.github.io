"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function BrutalistHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Parallax Hierarchy (Background slowest, Mid normal, Foreground faster)
    const yBack = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const zContent = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacityBack = useTransform(scrollYProgress, [0, 0.5], [0.15, 0]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 30,
                y: (e.clientY / window.innerHeight - 0.5) * 30
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const springX = useSpring(mousePos.x, { damping: 30, stiffness: 200 });
    const springY = useSpring(mousePos.y, { damping: 30, stiffness: 200 });

    const rotateYGeneral = useTransform(springX, (v) => v * 0.15);
    const rotateXGeneral = useTransform(springY, (v) => v * -0.15);

    // Background layer specific rotation
    const rotateYBack = useTransform(springX, (v) => v * 0.05);

    // 3D Title Offsets
    const xTitle = useTransform(springX, (v) => v * 0.8);
    const yTitle = useTransform(springY, (v) => v * 0.8);

    // Foreground Parallax
    const xForeground = useTransform(springX, (v) => v * -5);
    const yForeground = useTransform(springY, (v) => v * -5);

    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section ref={sectionRef} className="spatial-section overflow-hidden" id="hero">

            {/* BACKGROUND ENVIRONMENT (PHASE 2 & 6: ATMOSPHERIC) */}
            <motion.div
                style={{ y: yBack, x: springX, rotateY: rotateYBack, opacity: opacityBack }}
                className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
            >
                <div className="w-[140%] h-[140%] border-[1px] border-white/5 opacity-20 rotate-12 grid grid-cols-12 grid-rows-12 gap-8">
                    {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border-[0.5px] border-white/5 h-64" />
                    ))}
                </div>
            </motion.div>

            <div className="grid-layout relative z-10 perspective-origin-center">

                {/* CONTENT CHAMBER (PHASE 1: DEPTH STACKING) */}
                <motion.div
                    style={{ z: zContent, rotateX: rotateXGeneral, rotateY: rotateYGeneral }}
                    className="col-span-12 items-center flex flex-col gap-12 text-center md:text-left md:items-start"
                >

                    {/* 3D LAYERED TITLE (PHASE 2: DIMENSIONAL OBJECT) */}
                    <div className="relative group">
                        {/* Shadow Layers for Volume */}
                        {[0.5, 0.3, 0.15].map((op, i) => (
                            <motion.h1
                                key={i}
                                style={{
                                    x: xTitle,
                                    y: yTitle,
                                    translateZ: -(i + 1) * 20,
                                    opacity: op * 0.3
                                }}
                                className="absolute inset-0 font-title text-step-5 text-white/10 uppercase tracking-tight-title pointer-events-none select-none blur-[1px]"
                            >
                                <span className="block">DARSHIT</span>
                                <span className="block">LAGDHIR</span>
                            </motion.h1>
                        ))}

                        <motion.h1
                            className="font-title text-step-5 text-white uppercase tracking-tight-title flex flex-col leading-[0.85]"
                        >
                            {["DARSHIT", "LAGDHIR"].map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1.5, delay: i * 0.2, ease }}
                                    className="block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </div>

                    <motion.div
                        style={{ translateZ: 40 }}
                        className="flex flex-col md:flex-row gap-12 md:gap-32 w-full mt-12 items-end md:items-baseline"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 1, ease }}
                            className="max-w-[45ch]"
                        >
                            <p className="font-body text-step-1 text-muted font-light leading-relaxed">
                                BUILDING ARCHITECTURAL SYSTEMS FOR LOGISTICS, ADVISORY INTELLIGENCE, AND CONTRACT VERIFICATION.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2, duration: 1, ease }}
                            className="flex flex-col gap-4 text-right md:text-left ml-auto"
                        >
                            <a href="#projects" className="font-wide text-step--1 text-white uppercase tracking-micro hover:scale-105 transition-transform duration-300 font-bold block">
                                [ SYSTEMS ]
                            </a>
                            <a href="#about" className="font-wide text-step--1 text-muted uppercase tracking-micro hover:text-white transition-colors duration-200 font-bold block">
                                [ PHILOSOPHY ]
                            </a>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* FOREGROUND ACCENTS (PHASE 3: PARALLAX HIERARCHY) */}
            <motion.div
                style={{ x: xForeground, y: yForeground, translateZ: 100 }}
                className="absolute top-1/2 left-1/4 w-48 h-[1px] bg-white/30 origin-left scale-x-150 rotate-45 pointer-events-none z-20"
            />
        </section>
    );
}
