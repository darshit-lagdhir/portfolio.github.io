"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

export default function BrutalistHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { setActiveSection } = useScene();

    // PHASE 8 STEP 1: ONE-SHOT GLITCH STATE
    const [glitchFired, setGlitchFired] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setGlitchFired(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // MOUSE PARALLAX — PHASE 4
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [2, -2]); // MAX TILT: 2 DEGREES
    const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-2, 2]); // COMPLEMENTARY TILT

    // PHASE 7: VARIABLE TYPOGRAPHY MOTION
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // PHASE 7: LINE SYSTEM (Architectural Spine)
    const spineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set(clientX / innerWidth - 0.5);
            mouseY.set(clientY / innerHeight - 0.5);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // DEPTH SCALES — PHASE 4 + PHASE 9 CAMERA PULLBACK (STEP 2)
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
    const mainTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const stackTextOpacity = useTransform(scrollYProgress, [0, 0.4], [0.15, 0]);

    // PHASE 9 STEP 1: CAMERA SCROLL — MULTI-LAYER PARALLAX
    const frontY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);   // Foreground: slowest
    const midY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);    // Mid layers
    const backY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);   // Background: fastest
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);      // BG counter-scroll

    // PHASE 9 STEP 2: FRAME EXPANSION ON PULLBACK
    const framePadding = useTransform(scrollYProgress, [0, 0.5], ["5vw", "7vw"]);

    // PHASE 7: LETTER PRESSURE DISTORTION (FIXED — BOLD)
    const textArray1 = "DARSHIT".split("");
    const textArray2 = "LAGDHIR".split("");

    const Letter = ({ char, index, total }: { char: string, index: number, total: number }) => {
        const relPos = index / total;
        const mappedMouse = useTransform(smoothMouseX, x => x + 0.5);
        const dist = useTransform(mappedMouse, m => Math.abs(m - relPos));
        const pressureY = useTransform(dist, [0, 0.15], [index % 2 === 0 ? 4 : -4, 0]);
        const smoothPressureY = useSpring(pressureY, { damping: 25, stiffness: 300 });

        return (
            <motion.span style={{ display: "inline-block", y: smoothPressureY }}>{char}</motion.span>
        );
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-[110vh] flex flex-col justify-center overflow-hidden bg-background px-[5vw] section-boundary-flash"
            id="hero"
            onPointerEnter={() => setActiveSection("hero")}
        >
            {/* BREATHING BACKGROUND — PHASE 4 + PHASE 9 COUNTER-SCROLL */}
            <motion.div
                animate={{ scale: [1, 1.005, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    y: bgY,
                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)"
                }}
            />

            {/* PHASE 7: ARCHITECTURAL SPINE LINE */}
            <div className="absolute top-0 left-[5vw] w-px h-full bg-white/10 z-0">
                <motion.div style={{ height: spineHeight }} className="w-full bg-white" />
            </div>

            <motion.div
                style={{ scale: heroScale, rotateX, rotateY, perspective: 1000 }}
                className="grid grid-cols-12 gap-10 items-end w-full max-w-[1800px] mx-auto pt-32"
            >
                {/* LEFT 60% — TYPOGRAPHIC STACKING — PHASE 4 */}
                <div className="col-span-12 lg:col-span-8 flex flex-col items-start gap-0 z-10">

                    {/* DARSHIT LAYER STACK */}
                    <div className="relative group overflow-visible preserve-3d">
                        {/* GREY SHADOW LAYER — VISIBLE DEPTH */}
                        <motion.span
                            style={{ y: backY, opacity: stackTextOpacity, z: -50 }}
                            className="absolute text-massive italic depth-layer select-none pointer-events-none perspective-tilt"
                            aria-hidden
                        >
                            <span style={{ color: 'transparent', textShadow: '0 0 80px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.08)' }}>
                                DARSHIT
                            </span>
                        </motion.span>
                        {/* MID LAYER - GREY SHADOW */}
                        <motion.span
                            style={{ y: midY, opacity: stackTextOpacity, z: -25 }}
                            className="absolute -top-2 -left-1 text-massive italic text-white/20 depth-layer select-none pointer-events-none perspective-tilt"
                        >
                            DARSHIT
                        </motion.span>
                        {/* FRONT LAYER - BOLD + PRESSURE + GLITCH + GREY SHADOW */}
                        <motion.h1
                            initial={{ y: "110%", translateZ: 50 }}
                            animate={{ y: 0, translateZ: 50 }}
                            style={{ y: frontY, opacity: mainTextOpacity, textShadow: '4px 4px 30px rgba(150,150,150,0.25), 0 0 60px rgba(200,200,200,0.1)' }}
                            transition={{ duration: 1.2, ease: GLOBAL_EASE }}
                            className={`text-massive italic leading-[0.8] -ml-[0.05em] whitespace-nowrap relative z-10 perspective-tilt glitch-safe ${glitchFired ? 'hero-glitch-once' : ''}`}
                        >
                            {textArray1.map((char, i) => <Letter key={i} char={char} index={i} total={textArray1.length} />)}
                        </motion.h1>
                    </div>

                    {/* LAGDHIR LAYER STACK */}
                    <div className="relative group overflow-visible mt-2 pl-[15vw] preserve-3d">
                        {/* GREY SHADOW LAYER — VISIBLE DEPTH */}
                        <motion.span
                            style={{ y: backY, opacity: stackTextOpacity, scale: 0.98, z: -50 }}
                            className="absolute text-massive depth-layer select-none pointer-events-none perspective-tilt"
                            aria-hidden
                        >
                            <span style={{ color: 'transparent', textShadow: '0 0 80px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.08)' }}>
                                LAGDHIR
                            </span>
                        </motion.span>
                        {/* MID LAYER - GREY SHADOW */}
                        <motion.span
                            style={{ y: midY, opacity: stackTextOpacity, scale: 0.98, z: -25 }}
                            className="absolute -top-2 -left-1 text-massive text-white/20 depth-layer select-none pointer-events-none perspective-tilt"
                        >
                            LAGDHIR
                        </motion.span>
                        {/* FRONT LAYER - BOLD + PRESSURE + GLITCH + GREY SHADOW */}
                        <motion.h1
                            initial={{ y: "110%", translateZ: 50 }}
                            animate={{ y: 0, translateZ: 50 }}
                            style={{ y: frontY, opacity: mainTextOpacity, textShadow: '4px 4px 30px rgba(150,150,150,0.25), 0 0 60px rgba(200,200,200,0.1)' }}
                            transition={{ duration: 1.2, delay: 0.1, ease: GLOBAL_EASE }}
                            className={`text-massive text-white leading-[0.8] whitespace-nowrap relative z-10 perspective-tilt glitch-safe ${glitchFired ? 'hero-glitch-once' : ''}`}
                        >
                            {textArray2.map((char, i) => <Letter key={i} char={char} index={i} total={textArray2.length} />)}
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 1, ease: GLOBAL_EASE }}
                        className="divider-h mt-20 opacity-30"
                    />
                </div>

                {/* RIGHT 40% — ARCHITECTURAL TENSION */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: GLOBAL_EASE }}
                    className="hidden lg:flex col-span-4 flex-col gap-12 pb-10"
                >
                    <div className="flex flex-col gap-4">
                        <span className="text-micro font-bold tracking-[0.6em] text-white">01_CORE</span>
                        <p className="text-short-body text-white/40 italic">
                            SCULPTING DIGITAL SYSTEMS <br />
                            THROUGH LOGIC-FIRST <br />
                            ARCHITECTURE.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-micro font-bold tracking-[0.6em] text-white">02_SESSION</span>
                        <p className="font-ui text-[10px] text-white/20 tracking-[0.2em] leading-loose">
                            LOC_INDIA // 2024.VER <br />
                            SYS_ACTIVE: TRUE <br />
                            MEM_SYNC: STABLE
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* ASYMMETRIC OVERFLOW DECOR (TIER 3) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute -right-20 top-1/2 -translate-y-1/2 select-none pointer-events-none"
            >
                <span className="text-[30vw] leading-none rotate-90 inline-block font-heading">
                    SYSTEM
                </span>
            </motion.div>

        </section>
    );
}
