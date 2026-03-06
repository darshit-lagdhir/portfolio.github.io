"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];
const MICRO_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const Letter = ({ char, index, total, smoothMouseX, attentionScore, rippleActive, scrollTempo }: {
    char: string,
    index: number,
    total: number,
    smoothMouseX: any,
    attentionScore: any,
    rippleActive: boolean,
    scrollTempo: any
}) => {
    const relPos = index / total;
    const mappedMouse = useTransform(smoothMouseX, (x: number) => x + 0.5);
    const dist = useTransform(mappedMouse, (m: number) => Math.abs(m - relPos));
    // STEP 1: Cluster displacement — pairs of letters move differently
    const clusterMultiplier = index % 3 === 0 ? 1.3 : index % 3 === 1 ? 0.7 : 1;
    // PHASE 19 STEP 1: Attention-driven pressure
    const pressureIntensity = useTransform(attentionScore, (a: number) => 4 + (a * 4));
    const pressureY = useTransform([dist, pressureIntensity], ([d, p]: any[]) => (index % 2 === 0 ? p : -p) * clusterMultiplier * (d < 0.15 ? (1 - d / 0.15) : 0));
    const smoothPressureY = useSpring(pressureY, { damping: 35, stiffness: 250 });

    // PHASE 20 STEP 2 & PHASE 22: DISCOVERY RIPPLE (SMOOTHED)
    const rippleX = useTransform([dist, scrollTempo], ([d, t]: any[]) =>
        rippleActive && t > 0.7 && d < 0.2 ? (0.2 - d) * 15 : 0
    );
    const smoothRippleX = useSpring(rippleX, { damping: 50, stiffness: 180 });

    return (
        <motion.span
            className="inline-block kinetic-letter txt-micro-react"
            style={{ y: smoothPressureY, x: smoothRippleX }}
            transition={{ duration: 0.2, ease: MICRO_EASE }}
        >
            {char}
        </motion.span>
    );
};

export default function BrutalistHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const {
        setActiveSection, isIdle, interactionCount, scrollTempo, attentionScore,
        triggerDiscovery, discoveries
    } = useScene();

    // PHASE 16 STEP 2: INTERACTION MEMORY (Sticky state on return)
    const [hasExplored, setHasExplored] = useState(false);
    const { scrollYProgress: globalScroll } = useScroll();
    useEffect(() => {
        const unsubscribe = globalScroll.on("change", (v) => {
            if (v > 0.8) setHasExplored(true);
        });
        return () => unsubscribe();
    }, [globalScroll]);

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

    // PHASE 24 STEP 8: HERO CAMERA PARALLAX (Spatial Layers)
    const bgTransX = useTransform(smoothMouseX, [-0.5, 0.5], [15, -15]);
    const bgTransY = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);
    const fgTransX = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
    const fgTransY = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10]);

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
    }, [mouseX, mouseY]);

    // PHASE 26 STEP 3 & 4: HERO SCROLL REACTION & EXIT TRANSITION
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]); // Typography scales slightly
    const geomZ = useTransform(scrollYProgress, [0, 1], [-200, -800]);  // Geometry deep plunge
    const geomOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0]); // Fade geom

    const mainTextOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]); // Quick typography fade
    const stackTextOpacity = useTransform(scrollYProgress, [0, 0.2], [0.15, 0]);

    // PHASE 9 STEP 1: CAMERA SCROLL — MULTI-LAYER PARALLAX
    const frontY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);   // Foreground: slowest
    const midY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);    // Mid layers
    const backY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);   // Background: fastest
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);      // BG counter-scroll

    // PHASE 17 STEP 1, 6, 11, 12, 14: SECTION MORPH ENGINE
    const morphScaleX = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1, 1, 0.98, 0.98]);
    const morphScaleY = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1, 1, 0.98, 0.96]); // VERTICAL COLLAPSE (STEP 11)
    const morphRotate = useTransform(scrollYProgress, [0.8, 1], [0, -0.4]); // MICRO ROTATION (STEP 6)
    const morphZ = useTransform(scrollYProgress, [0.8, 1], [0, -40]); // DEPTH SHIFT (STEP 12)
    const morphOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.3]);

    // PHASE 20 STEP 1 & 2: HERO DISCOVERY TRIGGER
    useEffect(() => {
        if (discoveries.has("HERO_RIPPLE")) return;
        const check = () => {
            if (scrollTempo.get() > 0.85 && attentionScore.get() > 0.7) {
                triggerDiscovery("HERO_RIPPLE");
            }
        };
        const int = setInterval(check, 500);
        return () => clearInterval(int);
    }, [scrollTempo, attentionScore, triggerDiscovery, discoveries]);

    // PHASE 16 STEP 1: INTERACTION VELOCITY RESPONSE
    const { scrollY: globalY } = useScroll();
    const scrollVelocity = useVelocity(globalY as any);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 400 });
    const trackingCompress = useTransform(smoothVelocity, [-2000, 0, 2000], ["0.1em", "-0.04em", "0.1em"]);

    // PHASE 19 STEP 4: Tempo-based tracking
    const heroLetterSpacing = useTransform(scrollTempo, t => hasExplored ? "-0.02em" : (0.02 + (1 - t) * 0.1) + "em");

    const textArray1 = "DARSHIT".split("");
    const textArray2 = "LAGDHIR".split("");

    return (
        <motion.section
            ref={sectionRef}
            className={`relative h-[110vh] flex flex-col justify-center overflow-hidden transition-all duration-1000 ease-in-out section-boundary-flash ${isIdle ? 'brightness-50' : 'brightness-100'}`}
            id="hero"
            onPointerEnter={() => setActiveSection("hero")}
            style={{
                letterSpacing: heroLetterSpacing,
                scaleX: morphScaleX,
                scaleY: morphScaleY,
                rotate: morphRotate,
                z: morphZ,
                opacity: morphOpacity,
                transformPerspective: 1200
            }}
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

            {/* PHASE 24 STEP 2 & PHASE 26 STEP 3: FLOATING GEOMETRIC OBJECT DEEP PULLBACK */}
            <motion.div
                style={{ x: bgTransX, y: bgTransY, translateZ: geomZ, opacity: geomOpacity }}
                className="absolute inset-0 pointer-events-none flex justify-center items-center"
            >
                <div className="relative w-full h-full max-w-[1200px] flex justify-center items-center perspective-root">
                    {/* Slow tumbling geometric rings */}
                    <motion.div
                        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[50vh] h-[50vh] border border-white/10 rounded-full"
                    />
                    <motion.div
                        animate={{ rotateX: [360, 0], rotateZ: [0, 360] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[35vh] h-[35vh] border border-white/15 rounded-sm"
                    />
                </div>
            </motion.div>

            {/* PHASE 23 STEP 7: SECTION NUMBER SYSTEM (FIXED: reduced size, centered) */}
            <motion.span
                style={{ x: bgTransX, y: bgTransY }}
                className="absolute top-[10%] left-[5%] text-[20vw] font-heading font-black leading-none text-white opacity-[0.02] pointer-events-none z-0 select-none"
            >
                01
            </motion.span>

            <motion.div
                style={{ scale: heroScale, rotateX, rotateY, perspective: 1000, x: fgTransX, y: fgTransY }}
                className="grid grid-cols-12 gap-6 md:gap-10 items-center w-full max-w-[1800px] mx-auto px-[5vw] pt-32 z-10"
            >
                {/* PHASE 23 STEP 3 & 4: SPLIT HERO - TYPOGRAPHY DOMINANCE */}
                <div className="col-span-12 lg:col-span-7 flex flex-col items-start gap-0 z-10">
                    <div className="relative group overflow-visible preserve-3d">
                        {/* GREY SHADOW LAYER — offset behind main text, interactive */}
                        <motion.span
                            style={{ y: backY, opacity: 0.15 }}
                            className="absolute top-[4px] left-[4px] text-massive italic text-white/30 select-none pointer-events-none perspective-tilt z-0"
                            aria-hidden
                        >
                            {textArray1.map((char, i) => (
                                <Letter
                                    key={`shadow1-${i}`}
                                    char={char}
                                    index={i}
                                    total={textArray1.length}
                                    smoothMouseX={smoothMouseX}
                                    attentionScore={attentionScore}
                                    rippleActive={discoveries.has("HERO_RIPPLE")}
                                    scrollTempo={scrollTempo}
                                />
                            ))}
                        </motion.span>
                        <motion.h1
                            initial={{ y: "110%", translateZ: 50 }}
                            animate={{ y: 0, translateZ: 50 }}
                            style={{ y: frontY, opacity: mainTextOpacity }}
                            transition={{ duration: 1.2, ease: GLOBAL_EASE }}
                            className={`text-massive italic relative z-10 perspective-tilt glitch-safe word-drift ${glitchFired ? 'hero-glitch-once' : ''}`}
                        >
                            {textArray1.map((char, i) => (
                                <Letter
                                    key={i}
                                    char={char}
                                    index={i}
                                    total={textArray1.length}
                                    smoothMouseX={smoothMouseX}
                                    attentionScore={attentionScore}
                                    rippleActive={discoveries.has("HERO_RIPPLE")}
                                    scrollTempo={scrollTempo}
                                />
                            ))}
                        </motion.h1>
                    </div>

                    <div className="relative group overflow-visible -mt-6 md:-mt-10 md:pl-[10vw] preserve-3d">
                        {/* GREY SHADOW LAYER — offset behind main text, interactive */}
                        <motion.span
                            style={{ y: backY, opacity: 0.15 }}
                            className="absolute top-[4px] left-[4px] text-massive text-white/30 select-none pointer-events-none perspective-tilt z-0"
                            aria-hidden
                        >
                            {textArray2.map((char, i) => (
                                <Letter
                                    key={`shadow2-${i}`}
                                    char={char}
                                    index={i}
                                    total={textArray2.length}
                                    smoothMouseX={smoothMouseX}
                                    attentionScore={attentionScore}
                                    rippleActive={discoveries.has("HERO_RIPPLE")}
                                    scrollTempo={scrollTempo}
                                />
                            ))}
                        </motion.span>
                        <motion.h1
                            initial={{ y: "110%", translateZ: 50 }}
                            animate={{ y: 0, translateZ: 50 }}
                            style={{ y: frontY, opacity: mainTextOpacity }}
                            transition={{ duration: 1.2, delay: 0.1, ease: GLOBAL_EASE }}
                            className={`text-massive text-white relative z-10 perspective-tilt glitch-safe word-drift-reverse ${glitchFired ? 'hero-glitch-once' : ''}`}
                        >
                            {textArray2.map((char, i) => (
                                <Letter
                                    key={i}
                                    char={char}
                                    index={i}
                                    total={textArray2.length}
                                    smoothMouseX={smoothMouseX}
                                    attentionScore={attentionScore}
                                    rippleActive={discoveries.has("HERO_RIPPLE")}
                                    scrollTempo={scrollTempo}
                                />
                            ))}
                        </motion.h1>
                    </div>

                    <div className="mt-12 md:mt-16 flex flex-col gap-3">
                        <motion.span
                            initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.5, duration: 1 }}
                            className="text-medium font-bold tracking-[0.3em] md:tracking-[0.6em]"
                        >
                            SYSTEMS ARCHITECT //
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.7, duration: 1 }}
                            className="text-medium font-bold tracking-[0.3em] md:tracking-[0.6em]"
                        >
                            INTERFACE ENGINEER
                        </motion.span>
                    </div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 1, ease: GLOBAL_EASE }}
                        className="divider-h mt-12 md:mt-16 opacity-10 w-full max-w-full"
                    />
                </div>

                {/* PHASE 23 STEP 4: RIGHT 5-COLS — INTERACTIVE VISUAL ELEMENT */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: GLOBAL_EASE }}
                    className="hidden lg:flex col-span-5 flex-col justify-center items-center h-[50vh] relative border-l border-white/5 pl-10"
                >
                    <div className="relative w-[30vh] h-[30vh] flex items-center justify-center opacity-40">
                        {/* Minimal architectural motion element */}
                        <motion.div
                            style={{
                                rotateX: rotateX as any,
                                rotateY: rotateY as any,
                            }}
                            className="w-full h-full border border-white/20 absolute z-10 pointer-events-none"
                        />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="w-[120%] h-[120%] border border-white/[0.05] rounded-full absolute pointer-events-none"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                            className="w-[80%] h-[80%] border border-white/[0.05] rounded-full absolute pointer-events-none"
                        />
                        <div className="absolute w-1 h-1 bg-white/50 rounded-full" />
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
