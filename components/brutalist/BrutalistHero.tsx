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

    // CINEMATIC DEPTH (PHASE 5: REFINED INTENSITY)
    const yBack = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const zContent = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const blurContent = useTransform(scrollYProgress, [0, 0.5], [0, 8]);
    const opacityBack = useTransform(scrollYProgress, [0, 0.4], [0.2, 0]);

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

    const springX = useSpring(mousePos.x, { damping: 45, stiffness: 120 });
    const springY = useSpring(mousePos.y, { damping: 45, stiffness: 120 });

    const rotateYGeneral = useTransform(springX, (v) => v * 0.08);
    const rotateXGeneral = useTransform(springY, (v) => v * -0.08);

    // Magnetic Typography (PHASE 3: CINEMATIC CONTROL)
    const xTitle = useTransform(springX, (v) => v * 0.2);
    const yTitle = useTransform(springY, (v) => v * 0.2);
    const rotateYBack = useTransform(springX, (v) => v * 0.02);

    const ease = [0.16, 1, 0.3, 1] as const;

    // HERO CINEMATIC OPENING (PHASE 1: ACT 1)
    const openingTransition = { duration: 1, ease };

    return (
        <section ref={sectionRef} className="spatial-section overflow-hidden bg-black/10" id="hero">

            {/* AMBIENT ENVIRONMENT (PHASE 1) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease }}
                style={{ y: yBack, x: springX, rotateY: rotateYBack, opacity: opacityBack }}
                className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center translate-z-[-150px]"
            >
                <div className="w-[140%] h-[140%] border-[2px] border-white/5 opacity-10 rotate-12 grid grid-cols-24 grid-rows-24 gap-12">
                    {Array.from({ length: 576 }).map((_, i) => (
                        <div key={i} className="border-[0.5px] border-white/5 h-80 w-full" />
                    ))}
                </div>
            </motion.div>

            <div className="grid-layout relative z-10 md:pl-[6%] lg:pl-[10%]">

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={openingTransition}
                    style={{ z: zContent, rotateX: rotateXGeneral, rotateY: rotateYGeneral, filter: `blur(${blurContent}px)` }}
                    className="col-span-12 items-center flex flex-col gap-12 text-center md:text-left md:items-start morph-surface"
                >

                    {/* TITLE WITH DEPTH COMPRESSION (PHASE 1) */}
                    <div className="relative group">
                        <motion.div
                            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                            transition={{ duration: 1.2, ease, delay: 0.2 }}
                            className="relative z-10"
                        >
                            {[0.4, 0.2].map((op, i) => (
                                <motion.h1
                                    key={i}
                                    style={{
                                        x: xTitle,
                                        y: yTitle,
                                        translateZ: -(i + 1) * 25,
                                        opacity: op * 0.3
                                    }}
                                    className="absolute inset-0 font-title text-step-5 text-white/5 uppercase tracking-tight-title pointer-events-none select-none blur-[2px]"
                                >
                                    <span className="block italic">DARSHIT</span>
                                    <span className="block">LAGDHIR</span>
                                </motion.h1>
                            ))}

                            <h1
                                className="font-title text-step-5 text-white uppercase tracking-tight-title flex flex-col leading-[0.8] text-physical"
                            >
                                <span className="block italic">DARSHIT</span>
                                <span className="block">LAGDHIR</span>
                            </h1>
                        </motion.div>
                    </div>

                    {/* SECONDARY CONTENT CHOREOGRAPHY (PHASE 1) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8, ease }}
                        style={{ translateZ: 50 }}
                        className="flex flex-col md:flex-row gap-16 md:gap-40 w-full mt-10 items-end md:items-baseline"
                    >
                        <div className="max-w-[48ch]">
                            <p className="font-body text-step-1 text-muted font-light leading-relaxed">
                                ENGINEERING CINEMATIC ARCHITECTURE FOR LOGISTICS, ADVISORY INTELLIGENCE, AND CONTRACT VERIFICATION.
                            </p>
                        </div>

                        {/* NAVIGATION (PHASE 1: FADES LAST) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5, ease }}
                            className="flex flex-col gap-5 text-right md:text-left ml-auto"
                        >
                            <a href="#projects" className="link-underline font-wide text-step--1 text-white uppercase tracking-micro font-bold block translate-z-[30px] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                [ VIEW SYSTEMS ]
                            </a>
                            <a href="#about" className="link-underline font-wide text-step--1 text-muted uppercase tracking-micro font-bold block opacity-40 hover:opacity-100 transition-opacity">
                                [ PHILOSOPHY ]
                            </a>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
