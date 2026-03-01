"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function BrutalistContact() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress: sectionScroll } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

    // CINEMATIC SECTION MORPH (PHASE 3: CONTROLLED)
    const scaleSection = useTransform(sectionScroll, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);
    const blurSection = useTransform(sectionScroll, [0, 0.2, 0.8, 1], [8, 0, 0, 8]);

    // CLOSING SHOT ATMOSPHERE (PHASE 11: FINAL FORM)
    const bloomScale = useTransform(sectionScroll, [0.3, 0.6, 1], [0.8, 1.8, 0.8]);
    const bloomOpacity = useTransform(sectionScroll, [0.4, 0.6, 1], [0, 0.15, 0]);

    // MOUSE REACTION (PHASE 1: REFINED PULL)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePos({
                x: (e.clientX - rect.left) / rect.width - 0.5,
                y: (e.clientY - rect.top) / rect.height - 0.5
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const springX = useSpring(mousePos.x, { damping: 50, stiffness: 100 });
    const springY = useSpring(mousePos.y, { damping: 50, stiffness: 100 });
    const xTitle = useTransform(springX, (v) => v * 40);
    const yTitle = useTransform(springY, (v) => v * 40);

    return (
        <section ref={sectionRef} className="spatial-section overflow-hidden relative min-h-[120vh] bg-black/50" id="contact">

            {/* AMBIENT FINAL BLOOM (PHASE 11: CLOSING SHOT) */}
            <motion.div
                style={{ scale: bloomScale, opacity: bloomOpacity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-white rounded-full blur-[400px] z-0 pointer-events-none"
            />

            <motion.div
                style={{ scale: scaleSection, filter: `blur(${blurSection}px)` }}
                className="grid-layout items-end relative z-10 morph-surface md:pl-[6%] lg:pl-[10%]"
            >
                <div className="col-span-12 flex flex-col gap-40 w-full mb-12">
                    <div className="flex flex-col gap-10">
                        {/* REVEAL PATTERN: BACKGROUND/IDENT (PHASE 6) */}
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: "-10%" }}
                            transition={{ duration: 1 }}
                            className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                        >
                            05 TERMINAL ENDPOINT // FINAL SCENE
                        </motion.span>

                        {/* REVEAL PATTERN: HEADLINE (PHASE 6) + CLOSING SHOT (PHASE 11) */}
                        <motion.div
                            style={{
                                x: xTitle,
                                y: yTitle,
                                translateZ: useTransform(sectionScroll, [0.4, 0.6], [-150, 0])
                            }}
                        >
                            <h2
                                className="font-title text-step-5 text-white uppercase tracking-tight-title leading-[0.8] mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] text-physical italic first-letter:not-italic"
                            >
                                CONNECT.
                            </h2>
                        </motion.div>
                    </div>

                    {/* Structural Footer */}
                    <div className="border-t border-border pt-16 pb-12 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline w-full">
                            <div className="md:col-span-12 lg:col-span-6">
                                {/* REVEAL PATTERN: SUPPORTING (PHASE 6) */}
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                                >
                                    DARSHIT LAGDHIR // ARCHITECTURAL INDEX 2026 // PHASE 05
                                </motion.span>
                            </div>

                            <div className="md:col-span-12 lg:col-span-12 xl:col-span-5 xl:col-start-8 flex justify-end gap-12 md:gap-24">
                                {/* REVEAL PATTERN: INTERACTIVE (PHASE 6) */}
                                {[
                                    { name: "GITHUB", url: "https://github.com/darshit-lagdhir" },
                                    { name: "LINKEDIN", url: "https://linkedin.com/in/darshit-lagdhir" }
                                ].map((l, i) => (
                                    <motion.a
                                        key={i}
                                        href={l.url}
                                        whileHover={{ scale: 1.05, x: 10, translateZ: 40 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                                        target="_blank"
                                        className="font-wide text-step-0 text-white uppercase tracking-micro hover:text-white transition-all duration-500 font-bold block link-underline"
                                    >
                                        {l.name}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
