"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, MotionValue } from "framer-motion";
import { useRef, useEffect, useState, memo } from "react";
import { useScene } from "@/context/SceneContext";
import { LAYOUT, EASE, DUR } from "@/components/brutalist/SystemComponents";



const Letter = memo(({ char, index, total, smoothMouseX, isMobile }: {
    char: string,
    index: number,
    total: number,
    smoothMouseX: MotionValue<number>,
    isMobile: boolean
}) => {
    const relPos = index / total;
    const mappedMouse = useTransform(smoothMouseX, (x: number) => x + 0.5);
    const dist = useTransform(mappedMouse, (m: number) => Math.abs(m - relPos));

    // PHASE 29 STEP 4 & 5: CURSOR PROXIMITY PRESSURE
    const pressureY = useTransform(dist, (d: number) => (index % 2 === 0 ? 1 : -1) * (d < 0.08 ? (1 - d / 0.08) * 10 : 0));
    const smoothPressureY = useSpring(pressureY, { damping: 40, stiffness: 300 });

    // PHASE 31: MEDIUM ENERGY REVEAL — GRADUAL & CINEMATIC
    const revealDelay = index * 0.04 + 0.8;

    // PHASE 37 STEP 6: TYPOGRAPHY LIGHT REACTION
    const charBrightness = useTransform(dist, [0, 0.15], [2, 1]);
    const smoothBrightness = useSpring(charBrightness, { damping: 50, stiffness: 200 });

    return (
        <motion.span
            className="inline-block relative kinetic-letter transform-gpu"
            initial={{ clipPath: isMobile ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", y: isMobile ? 0 : 30, opacity: 0 }}
            animate={{ clipPath: "inset(-20% -20% -20% -20%)", y: 0, opacity: 1 }}
            whileHover={isMobile ? {} : {
                scale: 1.15,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            transition={{
                duration: isMobile ? 0.6 : 1.8,
                delay: isMobile ? index * 0.02 : revealDelay,
                ease: [0.33, 1, 0.68, 1],
                scale: { type: "spring", stiffness: 400, damping: 15 }
            }}
            style={{
                y: isMobile ? 0 : smoothPressureY,
                filter: isMobile ? "none" : useMotionTemplate`brightness(${smoothBrightness})`,
                display: "inline-block",
                padding: "0.05em 0.02em" // Breathing room for italicized characters
            }}
        >
            {char}
        </motion.span>
    );
});

// Set display name for debugging
Letter.displayName = "KineticLetter";

export default function BrutalistHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const {
        setActiveSection, isIdle, scrollTempo, attentionScore,
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

    // PHASE 36 STEP 1: SECTION PINNING SYSTEM
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

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

    // PHASE 36 STEP 2: HERO SCROLL TRANSFORMATION
    const heroScale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.8, 0.7]);
    const heroRotateX = useTransform(scrollYProgress, [0, 0.6], [0, 10]);
    const geomZ = useTransform(scrollYProgress, [0, 0.8], [-200, -2500]);
    const geomOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [0.2, 0.1, 0]);

    const mainTextOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 0]);
    const subTextOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0]);

    // PHASE 30 STEP 2: CINEMATIC EXIT CHOREOGRAPHY
    const frontY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "0%", "-60%"]);
    const backY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "0%", "-90%"]);
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    // PHASE 26 STEP 4: SECTION EXIT MORPH
    const morphScaleX = useTransform(scrollYProgress, [0.8, 1], [1, 0.92]);
    const morphScaleY = useTransform(scrollYProgress, [0.8, 1], [1, 0.88]);
    const morphRotate = useTransform(scrollYProgress, [0.8, 1], [0, -1.5]);
    const morphZ = useTransform(scrollYProgress, [0.8, 1], [0, -200]);
    const morphOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

    // PHASE 20 STEP 1 & 2: HERO DISCOVERY TRIGGER
    useEffect(() => {
        if (discoveries.has("HERO_RIPPLE")) return;
        const check = () => {
            if (scrollTempo.get() > 0.85 && attentionScore.get() > 0.7) {
                triggerDiscovery("HERO_RIPPLE");
            }
        };
        const int = setInterval(check, 1000); // Throttled from 500ms to 1000ms
        return () => clearInterval(int);
    }, [scrollTempo, attentionScore, triggerDiscovery, discoveries]);

    // PHASE 16 STEP 1: INTERACTION VELOCITY RESPONSE
    // Note: scrollVelocity/globalY were previously used for intensity systems.

    // PHASE 19 STEP 4: Tempo-based tracking
    const heroLetterSpacing = useTransform(scrollTempo, t => hasExplored ? "-0.02em" : (0.02 + (1 - t) * 0.1) + "em");

    // PHASE 28 STEP 9: CURSOR LIGHT INTERACTION (Dynamic Atmosphere)
    const bgLightX = useTransform(smoothMouseX, [-0.5, 0.5], ["20%", "80%"]);
    const bgLightY = useTransform(smoothMouseY, [-0.5, 0.5], ["20%", "80%"]);
    const atmosphericGradient = useMotionTemplate`radial-gradient(circle at ${bgLightX} ${bgLightY}, rgba(255,255,255,0.04) 0%, transparent 60%)`;

    // PHASE 29 STEP 11: PERSISTENT MOBILE DETECTION
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const textArray1 = "DARSHIT".split("");
    const textArray2 = "LAGDHIR".split("");

    return (
        <motion.section
            ref={sectionRef}
            className={`relative ${isMobile ? 'h-[120vh]' : 'h-[200vh]'} flex flex-col items-center section-boundary-flash ${isIdle ? 'brightness-50' : 'brightness-100'}`}
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
            <div className={`${isMobile ? 'relative' : 'sticky top-0'} h-screen w-full flex flex-col justify-center overflow-hidden`}>
                {/* BREATHING BACKGROUND — PHASE 4 + PHASE 9 + PHASE 28 STEP 9: ATMOSPHERIC LIGHTING OVERLAY */}
                <motion.div
                    animate={{ scale: [1, 1.005, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen"
                    style={{
                        y: bgY,
                        background: atmosphericGradient
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
                            className="absolute w-[35vh] h-[35vh] border border-white/10 rounded-sm"
                        />
                    </div>
                </motion.div>

                {/* PHASE 39 STEP 4: GRID ALIGNMENT CORRECTION (Section Number) */}
                <div className={`${LAYOUT.CONTAINER} absolute inset-0 flex flex-col justify-center pointer-events-none z-0`}>
                    <motion.span
                        style={{ x: bgTransX, y: bgTransY, opacity: useTransform(scrollYProgress, [0, 0.3], [0.02, 0]) }}
                        className="text-[20vw] font-heading font-black leading-none text-white select-none translate-y-[-10%]"
                    >
                        01
                    </motion.span>
                </div>

                <motion.div
                    style={{ 
                        scale: heroScale, 
                        rotateX: useTransform([rotateX, heroRotateX], ([rX, hX]) => (rX as number) + (hX as number)) as MotionValue<number>, 
                        rotateY: rotateY as MotionValue<number>, 
                        perspective: 1000, 
                        x: fgTransX, 
                        y: fgTransY 
                    }}
                    className={`${LAYOUT.CONTAINER} pt-32 z-10 grid grid-cols-12 gap-6 md:gap-10 items-center`}
                >
                    {/* PHASE 23 STEP 3 & 4: SPLIT HERO - TYPOGRAPHY DOMINANCE */}
                    <div className="col-span-12 lg:col-span-7 flex flex-col items-start gap-0 z-10">
                        <div className="relative group overflow-visible preserve-3d">
                            {/* PHASE 28 STEP 4: TYPOGRAPHY CONTRAST REFINEMENT */}
                            <motion.span
                                style={{ y: backY, opacity: 0.05 }} // PHASE 39 STEP 7: REDUCED FOR HIERARCHY
                                className="absolute top-[4px] left-[4px] text-massive italic text-white select-none pointer-events-none perspective-tilt z-0 whitespace-nowrap"
                                aria-hidden
                            >
                                {textArray1.map((char, i) => (
                                    <Letter
                                        key={`shadow1-${i}`}
                                        char={char}
                                        index={i}
                                        total={textArray1.length}
                                        smoothMouseX={smoothMouseX}
                                        isMobile={isMobile}
                                    />
                                ))}
                            </motion.span>
                            {/* MAIN TEXT LAYER — crisp, direct focus */}
                            <motion.h1
                                initial={{ y: "110%", translateZ: 50 }}
                                animate={{ y: 0, translateZ: 50 }}
                                style={{ y: frontY, opacity: mainTextOpacity }}
                                transition={{ duration: DUR.PAGE, ease: EASE.EXIT }}
                                className={`text-massive italic relative z-10 perspective-tilt glitch-safe word-drift drop-shadow-[0_0_20px_rgba(255,255,255,0.06)] ${glitchFired ? 'hero-glitch-once' : ''} whitespace-nowrap md:whitespace-nowrap`}
                            >
                                {textArray1.map((char, i) => (
                                    <Letter
                                        key={i}
                                        char={char}
                                        index={i}
                                        total={textArray1.length}
                                        smoothMouseX={smoothMouseX}
                                        isMobile={isMobile}
                                    />
                                ))}
                            </motion.h1>
                        </div>

                        <div className="relative group overflow-visible -mt-6 md:-mt-10 md:pl-[10vw] preserve-3d">
                            {/* GREY SHADOW LAYER — offset behind main text, interactive */}
                            <motion.span
                                style={{ y: backY, opacity: 0.1 }} // PHASE 39 STEP 7: REDUCED FOR HIERARCHY
                                className="absolute top-[4px] left-[4px] text-massive italic text-white select-none pointer-events-none perspective-tilt z-0 whitespace-nowrap"
                                aria-hidden
                            >
                                {textArray2.map((char, i) => (
                                    <Letter
                                        key={`shadow2-${i}`}
                                        char={char}
                                        index={i}
                                        total={textArray2.length}
                                        smoothMouseX={smoothMouseX}
                                        isMobile={isMobile}
                                    />
                                ))}
                            </motion.span>
                            <motion.h1
                                initial={{ y: "110%", translateZ: 50 }}
                                animate={{ y: 0, translateZ: 50 }}
                                style={{ y: frontY, opacity: mainTextOpacity }}
                                transition={{ duration: DUR.PAGE, delay: 0.1, ease: EASE.EXIT }}
                                className={`text-massive italic text-white relative z-10 perspective-tilt glitch-safe word-drift-reverse ${glitchFired ? 'hero-glitch-once' : ''} whitespace-nowrap md:whitespace-nowrap`}
                            >
                                {textArray2.map((char, i) => (
                                    <Letter
                                        key={i}
                                        char={char}
                                        index={i}
                                        total={textArray2.length}
                                        smoothMouseX={smoothMouseX}
                                        isMobile={isMobile}
                                    />
                                ))}
                            </motion.h1>
                        </div>

                        <motion.div style={{ opacity: subTextOpacity }} className="mt-12 md:mt-16 flex flex-col gap-4">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1, ease: EASE.EXIT }}
                                className="text-medium text-white/40" // PHASE 39 STEP 7: SUBTLE CONTRAST
                            >
                                SYSTEMS ARCHITECT //
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 1, ease: EASE.EXIT }}
                                className="text-medium text-white/40" // PHASE 39 STEP 7: SUBTLE CONTRAST
                            >
                                INTERFACE ENGINEER
                            </motion.span>
                        </motion.div>
                    </div>

                    {/* PHASE 23 STEP 4: RIGHT 5-COLS — INTERACTIVE VISUAL ELEMENT */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ opacity: subTextOpacity }}
                        transition={{ duration: DUR.PAGE, delay: 0.8, ease: EASE.EXIT }}
                        className="hidden lg:flex col-span-5 flex-col justify-center items-center h-[50vh] relative pl-10"
                    >
                        <div className="relative w-[30vh] h-[30vh] flex items-center justify-center opacity-40">
                            <motion.div
                                style={{
                                    rotateX: rotateX as MotionValue<number>,
                                    rotateY: rotateY as MotionValue<number>,
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
          </div>
        </motion.section>
    );
}
