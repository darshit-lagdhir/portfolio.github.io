"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
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

    // Weight interpolates slightly: 300 (thin) to 500 (normal)
    const fontWeight = useTransform(scrollYProgress, [0, 0.2], [400, 600]);

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

    // DEPTH SCALES — PHASE 4
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const mainTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const stackTextOpacity = useTransform(scrollYProgress, [0, 0.4], [0.15, 0]);

    // LAYERED PARALLAX — PHASE 4
    const frontY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
    const backY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

    // PHASE 7: LETTER PRESSURE
    const textArray1 = "DARSHIT".split("");
    const textArray2 = "LAGDHIR".split("");

    const Letter = ({ char, index, total }: { char: string, index: number, total: number }) => {
        // Approximate distance based on array index relative to mouse position (-0.5 to 0.5)
        const relPos = index / total; // 0 to 1
        // Map mouseX (-0.5 to 0.5) to (0 to 1) 
        const mappedMouse = useTransform(smoothMouseX, x => x + 0.5);
        const dist = useTransform(mappedMouse, m => Math.abs(m - relPos));

        // Pressure affects nearby letters (dist < 0.2)
        const pressureY = useTransform(dist, [0, 0.2], [index % 2 === 0 ? 6 : -6, 0]);
        const smoothPressureY = useSpring(pressureY, { damping: 20, stiffness: 300 });

        return (
            <motion.span style={{ display: "inline-block", y: smoothPressureY }}>{char}</motion.span>
        );
    };

    // PHASE 7: SLICE TEXT EFFECT
    const SliceReveal = ({ text, delay }: { text: string[], delay: number }) => (
        <div className="relative">
            {/* TOP SLICE */}
            <motion.div
                initial={{ y: "100%", clipPath: "inset(0 0 100% 0)" }}
                animate={{ y: "0%", clipPath: "inset(0 0 50% 0)" }}
                transition={{ duration: 0.8, delay: delay, ease: GLOBAL_EASE }}
                className="absolute inset-0 flex"
            >
                {text.map((char, i) => <Letter key={i} char={char} index={i} total={text.length} />)}
            </motion.div>
            {/* BOTTOM SLICE */}
            <motion.div
                initial={{ y: "-100%", clipPath: "inset(100% 0 0 0)" }}
                animate={{ y: "0%", clipPath: "inset(50% 0 0 0)" }}
                transition={{ duration: 0.8, delay: delay + 0.05, ease: GLOBAL_EASE }}
                className="flex"
            >
                {text.map((char, i) => <Letter key={i} char={char} index={i} total={text.length} />)}
            </motion.div>
        </div>
    );

    // PHASE 8 STEP 9: LETTER TRAIL
    const [trailLetters, setTrailLetters] = useState<{ char: string, x: number, y: number, id: number }[]>([]);
    const trailIdRef = useRef(0);

    const handleHeroMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        // Only spawn trail near the headline area (top 60%)
        if (relY > rect.height * 0.7) return;
        const chars = "DARSHITLAGDHIR";
        const char = chars[Math.floor(Math.random() * chars.length)];
        const id = trailIdRef.current++;
        setTrailLetters(prev => [...prev.slice(-6), { char, x: relX, y: relY, id }]);
        setTimeout(() => {
            setTrailLetters(prev => prev.filter(t => t.id !== id));
        }, 400);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-[110vh] flex flex-col justify-center overflow-hidden bg-background px-[5vw] section-boundary-flash"
            id="hero"
            onPointerEnter={() => setActiveSection("hero")}
            onMouseMove={handleHeroMouseMove}
        >
            {/* BREATHING BACKGROUND — PHASE 4 */}
            <motion.div
                animate={{ scale: [1, 1.005, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)"
                }}
            />

            {/* PHASE 7: ARCHITECTURAL SPINE LINE */}
            <div className="absolute top-0 left-[5vw] w-px h-full bg-white/10 z-0">
                <motion.div style={{ height: spineHeight }} className="w-full bg-white" />
            </div>

            {/* PHASE 8 STEP 9: LETTER TRAIL LAYER */}
            <div className="absolute inset-0 z-[5] pointer-events-none">
                {trailLetters.map(t => (
                    <motion.span
                        key={t.id}
                        initial={{ opacity: 0.15, scale: 1.2 }}
                        animate={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute text-massive italic text-white/10 pointer-events-none select-none glitch-safe"
                        style={{ left: t.x, top: t.y, transform: "translate(-50%, -50%)" }}
                    >
                        {t.char}
                    </motion.span>
                ))}
            </div>

            <motion.div
                style={{ scale: heroScale, rotateX, rotateY, perspective: 1000 }}
                className="grid grid-cols-12 gap-10 items-end w-full max-w-[1800px] mx-auto pt-32"
            >
                {/* LEFT 60% — TYPOGRAPHIC STACKING — PHASE 4 */}
                <div className="col-span-12 lg:col-span-8 flex flex-col items-start gap-0 z-10">

                    {/* DARSHIT LAYER STACK */}
                    <div className="relative group overflow-visible preserve-3d">
                        {/* BACK LAYER - THIN FRAME SHADOW */}
                        <motion.span
                            style={{ y: backY, opacity: stackTextOpacity, z: -50, fontWeight }}
                            className="absolute text-massive italic text-white/10 depth-layer select-none pointer-events-none perspective-tilt text-shadow-architectural flex"
                        >
                            {textArray1.join("")}
                        </motion.span>
                        {/* MID LAYER - SHADOW */}
                        <motion.span
                            style={{ y: backY, opacity: stackTextOpacity, z: -25, fontWeight }}
                            className="absolute -top-2 -left-1 text-massive italic text-white/30 depth-layer select-none pointer-events-none perspective-tilt flex"
                        >
                            {textArray1.join("")}
                        </motion.span>
                        {/* FRONT LAYER - FOREGROUND + PHASE 8 GLITCH */}
                        <motion.h1
                            initial={{ translateZ: 50 }}
                            animate={{ translateZ: 50 }}
                            style={{ y: frontY, opacity: mainTextOpacity, fontWeight }}
                            className={`text-massive italic leading-[0.8] -ml-[0.05em] whitespace-nowrap relative z-10 perspective-tilt flex glitch-safe ${glitchFired ? 'hero-glitch-once' : ''}`}
                        >
                            <SliceReveal text={textArray1} delay={0} />
                        </motion.h1>
                    </div>

                    {/* LAGDHIR LAYER STACK */}
                    <div className="relative group overflow-visible mt-2 pl-[15vw] preserve-3d">
                        {/* BACK LAYER */}
                        <motion.span
                            style={{ y: backY, opacity: stackTextOpacity, scale: 0.98, z: -50, fontWeight }}
                            className="absolute text-massive text-white/10 depth-layer select-none pointer-events-none perspective-tilt flex"
                        >
                            {textArray2.join("")}
                        </motion.span>
                        {/* MID LAYER */}
                        <motion.span
                            style={{ y: backY, opacity: stackTextOpacity, scale: 0.98, z: -25, fontWeight }}
                            className="absolute -top-2 -left-1 text-massive text-white/30 depth-layer select-none pointer-events-none perspective-tilt flex"
                        >
                            {textArray2.join("")}
                        </motion.span>
                        {/* FRONT LAYER + PHASE 8 GLITCH */}
                        <motion.h1
                            initial={{ translateZ: 50 }}
                            animate={{ translateZ: 50 }}
                            style={{ y: frontY, opacity: mainTextOpacity, fontWeight }}
                            className={`text-massive text-white leading-[0.8] whitespace-nowrap relative z-10 perspective-tilt flex glitch-safe ${glitchFired ? 'hero-glitch-once' : ''}`}
                        >
                            <SliceReveal text={textArray2} delay={0.1} />
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
