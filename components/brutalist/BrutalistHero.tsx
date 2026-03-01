"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScene } from "@/context/SceneContext";

// PHASE 1: CENTRAL MOTION CONTROLLER
const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

const ScrambleText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [display, setDisplay] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

    useEffect(() => {
        let iteration = 0;
        let interval: NodeJS.Timeout;
        const startScramble = () => {
            interval = setInterval(() => {
                setDisplay(text.split("").map((char, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(""));
                if (iteration >= text.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        };
        const timer = setTimeout(startScramble, delay * 1000);
        return () => { clearInterval(interval); clearTimeout(timer); };
    }, [text, delay]);

    return <span>{display}</span>;
}

export default function BrutalistHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { mode, setActiveSection } = useScene();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

    // PHASE 4: RECOMPOSITION - CAMERA DRIFT & DEPTH
    const cameraZ = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);
    const contentTilt = useTransform(scrollYProgress, [0, 1], [0, -3]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 10,
                y: (e.clientY / window.innerHeight - 0.5) * 10
            });
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const springConfig = { damping: 40, stiffness: 200 };
    const springX = useSpring(mousePos.x, springConfig);
    const springY = useSpring(mousePos.y, springConfig);

    const rotateY = useTransform(springX, (v) => v * (mode === "depth" ? 0.08 : 0.04));
    const rotateX = useTransform(springY, (v) => v * (mode === "depth" ? -0.08 : -0.04));

    return (
        <section
            onPointerEnter={() => setActiveSection("hero")}
            ref={sectionRef}
            className="spatial-section relative flex items-center justify-center section-tone-shift tone-01"
            id="hero"
        >
            <div className="absolute inset-0 z-0 bg-radial-glow opacity-10" />

            {/* PHASE 4: ASYMMETRICAL POSTER COMPOSITION */}
            <motion.div
                style={{
                    translateZ: cameraZ,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    opacity: heroOpacity,
                    rotate: contentTilt,
                    transformStyle: "preserve-3d"
                }}
                className="w-full relative z-10"
            >
                <div className="grid-poster">
                    {/* PHASE 3: LEFT-DOMINANT LAYOUT */}
                    <div className="col-span-12 md:col-span-10 lg:col-span-8 flex flex-col items-start text-left">

                        {/* PHASE 2 & 9: MASSIVE TITLE (FOCAL ANCHOR) */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: GLOBAL_EASE }}
                            className="relative group h-auto"
                        >
                            <h1 className="text-massive text-white flex flex-col italic first-letter:not-italic select-none pointer-events-none mb-10">
                                <span className="block mb-2">
                                    <ScrambleText text="DARSHIT" delay={0.1} />
                                </span>
                                <span className="block">
                                    <ScrambleText text="LAGDHIR" delay={0.25} />
                                </span>
                            </h1>

                            {/* PHASE 7 & 8: 3D HERO ARCHITECTURAL FORM (DEPTH SYNCED) */}
                            <motion.div
                                style={{ rotateX, rotateY: rotateY }}
                                className="absolute -right-20 md:-right-40 top-0 w-64 h-64 hidden lg:block z-[-1] opacity-20 pointer-events-none"
                            >
                                <motion.div
                                    animate={{ rotateZ: [0, 360] }}
                                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-full border-[0.5px] border-white/50 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <div className="absolute inset-4 border-[0.5px] border-white/30" style={{ transform: "translateZ(20px)" }} />
                                    <div className="absolute inset-8 border-[0.5px] border-white/10" style={{ transform: "translateZ(40px)" }} />
                                    <div className="absolute inset-1/2 w-[1px] h-[1px] bg-white shadow-[0_0_20px_2px_rgba(255,255,255,1)]" style={{ transform: "translateZ(60px)" }} />
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* PHASE 2: SHORT DENSE CONTENT (TAGLINE) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 1, ease: GLOBAL_EASE }}
                            className="max-w-[40ch] mt-4"
                        >
                            <h2 className="text-large text-white/40 font-bold mb-4">SYSTEM_ARCHITECT</h2>
                            <p className="text-small text-muted font-light tracking-wide max-w-[50ch]">
                                Engineering high-precision digital environments through logic-first architecture and structural visual power.
                            </p>
                        </motion.div>

                        {/* PHASE 4: MINIMAL CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1, ease: GLOBAL_EASE }}
                            className="mt-12"
                        >
                            <a href="#projects" className="text-micro font-bold text-white group flex items-center gap-6 elastic-micro btn-tactile p-4 border border-white/5 bg-white/[0.02]">
                                <div className="w-12 h-px bg-white/20 group-hover:w-20 transition-all duration-500" />
                                [ INITIALIZE_SESSION ]
                            </a>
                        </motion.div>

                    </div>

                    {/* PHASE 3: RIGHT VISUAL ANCHOR (SUBTLE AMBIENCE) */}
                    <div className="hidden lg:flex col-span-4 col-start-9 items-end justify-end pb-20 overflow-hidden">
                        <div className="flex flex-col gap-8 opacity-20">
                            <div className="flex flex-col gap-2">
                                <span className="text-micro">LAT: GLOBAL_ALPHA</span>
                                <div className="w-40 h-[1px] bg-white" />
                            </div>
                            <div className="flex flex-col gap-2 text-right">
                                <span className="text-micro">STATUS: ENFORCING_GRID</span>
                                <div className="w-24 h-[1px] bg-white self-end" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* PHASE 1: SCREEN COMPOSITION INDICATOR */}
            <div className="absolute bottom-12 left-12 flex items-center gap-6 opacity-20 pointer-events-none">
                <span className="text-micro font-bold">ALPHA_V.01</span>
                <div className="w-12 h-px bg-white" />
                <span className="text-micro">SESSION_01</span>
            </div>
        </section>
    );
}
