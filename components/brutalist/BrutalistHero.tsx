"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScene } from "@/context/SceneContext";

// ADVANCED MAGNETIC TEXT (PHASE 8 & 10 MORPH)
const MagneticLetter = ({ char, springX, springY }: { char: string, springX: any, springY: any }) => {
    const { mode } = useScene();

    // Letters respond with micro movement
    // MODE: DEPTH boosts amplitude (PHASE 6)
    const amp = mode === "depth" ? 0.25 : 0.15;
    const x = useTransform(springX, (v: number) => v * amp);
    const y = useTransform(springY, (v: number) => v * amp);

    // TEXT MORPH INTERACTION (PHASE 10)
    const letterSpacing = useTransform(springX, (v: number) => `${Math.abs(v) * (mode === "minimal" ? 0.01 : 0.05)}px`);

    return (
        <motion.span
            style={{ x, y, letterSpacing }}
            className="inline-block transition-all duration-300 ease-cinematic"
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
}

const ScrambleText = ({ text, delay = 0, springX, springY }: { text: string, delay?: number, springX: any, springY: any }) => {
    const [display, setDisplay] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

    useEffect(() => {
        let iteration = 0;
        let interval: NodeJS.Timeout;
        const startScramble = () => {
            interval = setInterval(() => {
                setDisplay(text.split("").map((_, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(""));
                if (iteration >= text.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 40);
        };
        const timer = setTimeout(startScramble, delay * 1000);
        return () => { clearInterval(interval); clearTimeout(timer); };
    }, [text, delay]);

    return (
        <span className="flex">
            {display.split("").map((c, i) => (
                <MagneticLetter key={i} char={c} springX={springX} springY={springY} />
            ))}
        </span>
    );
}

export default function BrutalistHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { mode, setActiveSection } = useScene();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isIdle, setIsIdle] = useState(false);
    const idleTimer = useRef<NodeJS.Timeout>(null);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

    const outRotationX = useTransform(scrollYProgress, [0, 1], [0, -5]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1, 1, 0.6, 0.2]);
    const headlineX = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

    // SCROLL-BASED SHAPE SHIFT (PHASE 6)
    const shapeMorph = useTransform(scrollYProgress, [0, 1],
        ["polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", "polygon(5% 0%, 95% 2%, 100% 98%, 0% 95%)"]
    );

    useEffect(() => {
        const resetIdle = () => {
            setIsIdle(false);
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => setIsIdle(true), 4000);
        };
        const handleMouseMove = (e: MouseEvent) => {
            resetIdle();
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        resetIdle();
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, []);

    const springConfig = { damping: 50, stiffness: 100 };
    const springX = useSpring(mousePos.x, springConfig);
    const springY = useSpring(mousePos.y, springConfig);

    const interactiveRotateY = useTransform(springX, (v) => v * (mode === "depth" ? 0.15 : 0.1));
    const interactiveRotateX = useTransform(springY, (v) => v * (mode === "depth" ? -0.15 : -0.1));

    return (
        <section
            onPointerEnter={() => setActiveSection("hero")}
            ref={sectionRef}
            className="spatial-section overflow-hidden"
            id="hero"
            style={{ perspective: "1500px" }}
        >
            <motion.div
                style={{
                    rotateX: outRotationX,
                    opacity: heroOpacity,
                    clipPath: shapeMorph,
                    transformStyle: "preserve-3d"
                }}
                className="w-full h-full relative z-10 transition-all duration-700"
            >
                {/* AMBIENT EVOLUTION LAYER (PHASE 11: MODE AWARE) */}
                {mode !== "minimal" && (
                    <motion.div
                        animate={{ scale: isIdle ? 1.05 : 1, opacity: isIdle ? 0.05 : 0.15 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                        className="absolute inset-0 bg-radial-glow z-0 pointer-events-none"
                    />
                )}

                <div className="grid-layout relative z-10 md:pl-[6%] lg:pl-[10%] pt-20">
                    <motion.div
                        animate={{ opacity: isIdle ? 0.7 : 1, scale: isIdle ? 0.99 : 1 }}
                        transition={{ duration: 2 }}
                        style={{
                            rotateX: interactiveRotateX,
                            rotateY: interactiveRotateY,
                            transformStyle: "preserve-3d"
                        }}
                        className="col-span-12 items-center flex flex-col gap-10 text-center md:text-left md:items-start morph-surface"
                    >
                        <motion.div
                            style={{ x: headlineX, scale: headlineScale, transformStyle: "preserve-3d" }}
                            className="relative group cursor-none"
                        >
                            <h1 className="font-title text-step-5 text-white uppercase tracking-tight-title flex flex-col leading-[0.8] text-physical group-hover:tracking-tighter transition-all duration-700">
                                <span className="block italic pointer-events-none mb-4">
                                    <ScrambleText text="DARSHIT" delay={0.2} springX={springX} springY={springY} />
                                </span>
                                <span className="block pointer-events-none">
                                    <ScrambleText text="LAGDHIR" delay={0.4} springX={springX} springY={springY} />
                                </span>
                            </h1>

                            {/* FLOATING OBJECT MORPH (PHASE 9: MODE AWARE) */}
                            {mode !== "minimal" && (
                                <motion.div
                                    animate={{
                                        borderRadius: ["20%", "50%", "20%"],
                                        rotate: [0, 180, 360]
                                    }}
                                    transition={{ duration: mode === "depth" ? 12 : 20, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        x: useTransform(springX, (v) => v * (mode === 'depth' ? 0.8 : 0.5)),
                                        y: useTransform(springY, (v) => v * (mode === 'depth' ? 0.8 : 0.5))
                                    }}
                                    className="absolute -inset-20 z-[-1] pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity bg-white blur-3xl"
                                />
                            )}
                        </motion.div>

                        <div className="flex flex-col md:flex-row gap-16 md:gap-40 w-full mt-10 items-end md:items-baseline">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="max-w-[48ch]"
                            >
                                <p className="font-body text-step-1 text-muted font-light leading-relaxed">
                                    DESIGNING SPATIAL SYSTEMS FOR LOGISTICS, ADAPTIVE INTELLIGENCE, AND CONTRACT VERIFICATION.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
