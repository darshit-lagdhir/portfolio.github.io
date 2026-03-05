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
            className="inline-block kinetic-letter"
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

    // DEPTH SCALES — PHASE 4 + PHASE 9 CAMERA PULLBACK (STEP 2)
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
    const mainTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const stackTextOpacity = useTransform(scrollYProgress, [0, 0.4], [0.15, 0]);

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

            {/* PHASE 12 STEP 3: FLOATING MICRO OBJECTS */}
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[15%] right-[20%] w-12 h-12 border border-white/[0.04] rotate-45"
                />
                <motion.div
                    animate={{ y: [0, 30, 0], x: [0, -5, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[40%] left-[12%] w-px h-20 bg-white/[0.05]"
                />
                <motion.div
                    animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[25%] right-[35%] w-3 h-3 rounded-full border border-white/[0.04]"
                />
                <motion.div
                    animate={{ rotate: [0, 360], y: [0, -10, 0] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[60%] left-[75%] w-6 h-px bg-white/[0.03]"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-6 bg-white/[0.03]" />
                </motion.div>
                <motion.div
                    animate={{ x: [0, 15, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[30%] right-[55%] w-16 h-px bg-white/[0.03]"
                />
            </div>

            {/* PHASE 7: ARCHITECTURAL SPINE LINE */}
            <div className="absolute top-0 left-[5vw] w-px h-full bg-white/10 z-0">
                <motion.div style={{ height: spineHeight }} className="w-full bg-white" />
            </div>

            {/* PHASE 10 STEP 8: GHOST TEXT BACKDROP */}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.02 }}
                transition={{ duration: 3, delay: 1.5 }}
                className="ghost-text text-[25vw] font-heading font-bold leading-none top-[10%] left-[-5%]"
            >
                SYSTEM
            </motion.span>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.015 }}
                transition={{ duration: 3, delay: 2 }}
                className="ghost-text text-[20vw] font-heading font-bold leading-none bottom-[5%] right-[-10%]"
            >
                ARCHITECT
            </motion.span>

            <motion.div
                style={{ scale: heroScale, rotateX, rotateY, perspective: 1000 }}
                className="grid grid-cols-12 gap-10 items-end w-full max-w-[1800px] mx-auto pt-32"
            >
                {/* LEFT 60% — TYPOGRAPHIC STACKING — PHASE 4 */}
                <div className="col-span-12 lg:col-span-8 flex flex-col items-start gap-0 z-10">
                    <div className="relative group overflow-visible preserve-3d">
                        <motion.span
                            style={{
                                y: backY,
                                opacity: stackTextOpacity,
                                z: -50,
                                letterSpacing: trackingCompress as any
                            }}
                            className="absolute text-massive italic depth-layer select-none pointer-events-none perspective-tilt"
                            aria-hidden
                        >
                            <span style={{ color: 'transparent', textShadow: '0 0 80px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.08)' }}>
                                DARSHIT
                            </span>
                        </motion.span>
                        <motion.span
                            style={{ y: midY, opacity: stackTextOpacity, z: -25 }}
                            className="absolute -top-2 -left-1 text-massive italic text-white/20 depth-layer select-none pointer-events-none perspective-tilt"
                        >
                            DARSHIT
                        </motion.span>
                        <motion.h1
                            initial={{ y: "110%", translateZ: 50 }}
                            animate={{ y: 0, translateZ: 50 }}
                            style={{ y: frontY, opacity: mainTextOpacity, textShadow: '4px 4px 30px rgba(150,150,150,0.25), 0 0 60px rgba(200,200,200,0.1)' }}
                            transition={{ duration: 1.2, ease: GLOBAL_EASE }}
                            className={`text-massive italic leading-[0.8] -ml-[0.05em] whitespace-nowrap relative z-10 perspective-tilt glitch-safe word-drift ${glitchFired ? 'hero-glitch-once' : ''}`}
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

                    <div className="relative group overflow-visible mt-2 pl-[15vw] preserve-3d">
                        <motion.span
                            style={{ y: backY, opacity: stackTextOpacity, scale: 0.98, z: -50 }}
                            className="absolute text-massive depth-layer select-none pointer-events-none perspective-tilt"
                            aria-hidden
                        >
                            <span style={{ color: 'transparent', textShadow: '0 0 80px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.08)' }}>
                                LAGDHIR
                            </span>
                        </motion.span>
                        <motion.span
                            style={{ y: midY, opacity: stackTextOpacity, scale: 0.98, z: -25 }}
                            className="absolute -top-2 -left-1 text-massive text-white/20 depth-layer select-none pointer-events-none perspective-tilt"
                        >
                            LAGDHIR
                        </motion.span>
                        <motion.h1
                            initial={{ y: "110%", translateZ: 50 }}
                            animate={{ y: 0, translateZ: 50 }}
                            style={{ y: frontY, opacity: mainTextOpacity, textShadow: '4px 4px 30px rgba(150,150,150,0.25), 0 0 60px rgba(200,200,200,0.1)' }}
                            transition={{ duration: 1.2, delay: 0.1, ease: GLOBAL_EASE }}
                            className={`text-massive text-white leading-[0.8] whitespace-nowrap relative z-10 perspective-tilt glitch-safe word-drift-reverse ${glitchFired ? 'hero-glitch-once' : ''}`}
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
        </motion.section>
    );
}
