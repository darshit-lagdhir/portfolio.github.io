"use client";

import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionValue, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];
const MICRO_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// TEXT SCRAMBLE HOOK — PHASE 4 (STEP 5)
const useScramble = (text: string, active: boolean) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_//";

    useEffect(() => {
        if (!active) return;
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(prev => prev.split("").map((_, i) => {
                if (i < iteration) return text[i];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [active, text]);

    return display;
};

export default function BrutalistProjectsPreview() {
    const { setActiveSection, scrollTempo } = useScene();
    const containerRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
    const scrambledTitle = useScramble("SELECTED_WORK_ARCHIVE", inView);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // HORIZONTAL MOTION INSERT — PHASE 4 (STEP 9)
    const xParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    // PHASE 9 STEP 5: VELOCITY-BASED HORIZONTAL DRIFT
    const scrollVelocity = useVelocity(scrollYProgress);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 100, stiffness: 200 }); // HIGH DAMPING (STEP 3)
    const velocityDriftX = useTransform(smoothVelocity, [-0.5, 0, 0.5], [-10, 0, 10]);
    const velocityStretchY = useTransform(smoothVelocity, [-0.5, 0, 0.5], [0.998, 1, 1.002]); // SUBTLE STRETCH

    // PHASE 13 STEP 14: MOBILE DETECTION FOR SIMPLIFICATIONS
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // PHASE 13 STEP 2, 7, 11: PANEL MORPH, COLLAPSE, & DEPTH STACK
    const panelScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.96, 1, 1, 0.96]);

    // PHASE 13 STEP 4: PANEL SLIDE FRAMES
    const panelSlide = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "-4%"]);

    // PHASE 13 STEP 8 & 13: PANEL EDGE LIGHTING & SHADOW
    const panelEdgeLight = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["rgba(255,255,255,0)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0)"]);

    // PHASE 17 STEP 1, 6, 11, 12, 14: SECTION MORPH ENGINE
    const morphZ = useTransform(scrollYProgress, [0, 0.5, 1], [-60, 0, -60]); // DEPTH LAYER (STEP 12)
    const morphRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0, -0.4]); // PANEL ROTATION (STEP 6)

    // PHASE 19 STEP 4: ADAPTIVE MOTION SCALING (Tempo-aware expansion)
    const panelMorphY = useTransform(
        [scrollYProgress, scrollTempo],
        ([progress, tempo]: any[]) => {
            const base = progress < 0.2 ? 1.02 : progress > 0.8 ? 1.02 : 1;
            const multiplier = 1 + (1 - tempo) * 0.05;
            return base * multiplier;
        }
    );
    const panelMorphScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.98, 1, 1, 0.98]);

    const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const projects = [
        { id: "01", name: "MOVEX_SYSTEM", type: "LOGISTICS / BACKEND", href: "/movex" },
        { id: "02", name: "UIDAI_AI", type: "PATTERN / AUTH", href: "/uidai" },
        { id: "03", name: "POLYGLOT_FFI", type: "CONTRACT_VERIFIER", href: "/pfcv" }
    ];

    return (
        <motion.section
            ref={containerRef}
            id="projects"
            style={{
                scale: panelMorphScale,
                scaleY: panelMorphY,
                x: panelSlide,
                z: morphZ,
                rotate: morphRotate,
                borderColor: panelEdgeLight,
                borderTopWidth: "1px",
                borderBottomWidth: "1px",
                transformPerspective: 1200
            }}
            onPointerEnter={() => setActiveSection("projects")}
            className="relative min-h-screen bg-white text-black py-40 px-[5vw] flex flex-col items-center overflow-hidden preserve-3d transition-colors duration-500 rounded-[8px]"
        >
            {/* PHASE 10 STEP 8: GHOST TEXT BACKDROP */}
            <span className="ghost-text text-[30vw] font-heading font-black leading-none top-[20%] right-[-5%] text-black">
                BUILD
            </span>

            {/* PHASE 13 STEP 10: STORYTELLING TIMELINE LINE */}
            <motion.div
                className="absolute left-[8vw] top-0 w-px bg-black/10 origin-top z-0"
                style={{ height: timelineHeight }}
            />

            <motion.div
                onViewportEnter={() => setInView(true)}
                className="w-full max-w-[1700px] mx-auto flex flex-col gap-24 relative z-10"
            >

                {/* SECTION HEADING — TEXT SCRAMBLE — PHASE 4 */}
                <div className="flex flex-col gap-6 items-start self-start">
                    <span className="text-micro font-bold tracking-[0.8em] opacity-40">02_ARCHIVE</span>
                    <h2 className="text-large text-black font-heading italic leading-none uppercase tracking-tighter w-full border-b border-black pb-8">
                        {scrambledTitle}
                    </h2>
                </div>

                {/* PROJECT ROWS — PHASE 4 + PHASE 9 DRIFT */}
                <motion.div
                    style={{ x: velocityDriftX, scaleY: velocityStretchY }}
                    className="flex flex-col w-full glitch-safe"
                >
                    {projects.map((project, i) => (
                        <ProjectRow key={project.id} project={project} index={i} />
                    ))}
                </motion.div>

                {/* PHASE 8 STEP 4: NEGATIVE VOID */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: GLOBAL_EASE }}
                    className="w-full flex"
                >
                    <div className="hidden lg:block w-1/3 negative-void" />
                    <div className="w-full lg:w-2/3 flex flex-col items-start">
                        <motion.p
                            initial={{ x: 80, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 0.3 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.3, ease: GLOBAL_EASE }}
                            className="text-micro font-bold tracking-[0.6em] italic"
                        >
                            VOID_SPACE // INTENTIONAL_EMPTINESS
                        </motion.p>
                    </div>
                </motion.div>
            </motion.div>

            {/* EXIT CUE — PHASE 4 */}
            <div className="absolute bottom-12 right-12 flex flex-col items-end gap-2 opacity-10">
                <span className="text-micro font-bold tracking-[0.6em]">SYS_NAV_02</span>
                <div className="w-20 h-px bg-black" />
            </div>
        </motion.section>
    );
}

function ProjectRow({ project, index }: { project: any, index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const [flickerKey, setFlickerKey] = useState(0);
    const rowRef = useRef<HTMLDivElement>(null);
    const {
        markInteraction, markProjectInterest, projectInterests, scrollTempo, isIdle,
        triggerDiscovery, discoveries
    } = useScene();

    // PHASE 16 STEP 2 & 6: HOVER HISTORY MEMORY & DISCOVERY
    const [hasHovered, setHasHovered] = useState(false);
    const [discovered, setDiscovered] = useState(false);
    const [isMorphing, setIsMorphing] = useState(false);

    // PHASE 11 STEP 8: MAGNETIC TITLE DRIFT
    const magnetX = useMotionValue(0);
    const smoothMagnetX = useSpring(magnetX, { damping: 25, stiffness: 300 });

    // PHASE 18 STEP 3 & 4: CURSOR PROXIMITY LIGHTING
    const proximity = useMotionValue(0);
    const smoothProximity = useSpring(proximity, { damping: 40, stiffness: 200 });

    // PHASE 19 STEP 6: PROJECT INTEREST BOOST
    const interestLevel = projectInterests[project.name] || 0;
    const isHighInterest = interestLevel > 2;
    // We use animate for state-to-motion bridge
    const interestHighlight = useMotionValue(0);
    useEffect(() => {
        animate(interestHighlight, isHighInterest ? 1 : 0, { damping: 30, stiffness: 100 });
    }, [isHighInterest, interestHighlight]);

    const edgeLight = useTransform(
        [smoothProximity, interestHighlight],
        ([prox, highlight]: any[]) => `rgba(0,0,0,${0.1 + (prox * 0.3) + (highlight * 0.2)})`
    );
    const shadowDepth = useTransform(
        [smoothProximity, interestHighlight],
        ([prox, highlight]: any[]) => `0px ${20 * Math.max(prox, highlight)}px ${40 * Math.max(prox, highlight)}px rgba(0,0,0,${0.1 * Math.max(prox, highlight)})`
    );
    const surfaceLightOpacity = useTransform(smoothProximity, [0, 1], [0, 0.05]);
    const surfaceMagnetX = useTransform(magnetX, (x: number) => x * 10);

    // PHASE 16 STEP 1: INTERACTION VELOCITY RESPONSE
    const { scrollY, scrollYProgress } = useScroll({
        target: rowRef,
        offset: ["start end", "end start"]
    });
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 400 });
    const velocityScale = useTransform(smoothVelocity, [-2000, 0, 2000], [0.95, 1, 1.05]);
    const velocitySkew = useTransform(smoothVelocity, [-2000, 0, 2000], [-3, 0, 3]);

    // PHASE 17 STEP 3 & 5: PROJECT PANEL EXPANSION & SNAP
    const activeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.04, 0.98]);
    const activeZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 40, 0]);

    // PHASE 19 STEP 5: ATTENTION REFOCUS (Highlight on pause)
    const pauseBorderColor = useTransform(scrollYProgress, [0.4, 0.5, 0.6], ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.1)"]);

    const finalTopColor = useTransform(
        [edgeLight, pauseBorderColor],
        ([edge, pause]: any[]) => isIdle ? pause : edge
    );
    const finalSideColor = useTransform(pauseBorderColor, (pause: string) => isIdle ? pause : "rgba(0,0,0,0.1)");

    // PHASE 17 STEP 14: MOBILE SIMPLIFICATION
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // PHASE 8 STEP 2: Trigger scanline flicker on each hover entry
    const handleEnter = () => {
        setIsHovered(true);
        if (!hasHovered) setHasHovered(true);
        setFlickerKey(prev => prev + 1);
        markInteraction();
        markProjectInterest(project.name);
    };

    // PHASE 20 STEP 1 & 3 & 13: PROJECT DISCOVERY TRIGGER
    useEffect(() => {
        if (!isHovered || discoveries.has(`UNDERLINE_${project.id}`)) return;
        const timer = setTimeout(() => {
            triggerDiscovery(`UNDERLINE_${project.id}`);
        }, 2000);
        return () => clearTimeout(timer);
    }, [isHovered, project.id, triggerDiscovery, discoveries]);


    const handleMouseMove = (e: React.MouseEvent) => {
        if (!rowRef.current) return;
        const rect = rowRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const dx = (e.clientX - centerX) / rect.width * 12;
        magnetX.set(dx);

        // PHASE 18: CALCULATE PROXIMITY
        const distY = Math.abs(e.clientY - (rect.top + rect.height / 2));
        const prox = Math.max(0, 1 - (distY / (rect.height * 1.5)));
        proximity.set(prox);
    };

    const handleLeave = () => {
        setIsHovered(false);
        magnetX.set(0);
        proximity.set(0);
    };

    return (
        <motion.div
            ref={rowRef}
            initial={{ opacity: 0, y: 50, z: 0 }}
            whileInView={{ opacity: 1, y: 0, z: 0 }}
            onViewportEnter={() => setDiscovered(true)}
            whileHover={{ scale: hasHovered ? 1.03 : 1.02 }}
            whileTap={{ scale: 0.97 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: 0.05 + index * 0.05,
                ease: GLOBAL_EASE,
                scale: { type: "spring", stiffness: 350, damping: 25 }
            }}
            style={{
                scaleY: velocityScale,
                skewY: isMobile ? 0 : velocitySkew,
                scale: isMorphing ? 1.5 : activeScale,
                z: isMorphing ? 500 : activeZ,
                rotate: isMobile ? 0 : (isHovered ? -0.2 : 0), // STEP 6 & 13
                opacity: isMorphing ? 0 : 1,
                borderTopColor: finalTopColor, // STEP 3 + PHASE 19
                borderBottomColor: finalSideColor,
                borderLeftColor: finalSideColor,
                borderRightColor: finalSideColor,
                boxShadow: shadowDepth,    // STEP 8
            }}
            className={`
                relative w-full border-b border-black group cursor-none project-row-transition origin-left
                ${isHovered ? "flash-invert" : ""}
            `}
            onMouseEnter={handleEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleLeave}
            data-project="true"
        >
            {/* PHASE 18 STEP 9: PROJECT SURFACE LIGHT RESPONSE (SHEEN) */}
            <motion.div
                style={{
                    opacity: surfaceLightOpacity,
                    background: `linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.2) 50%, transparent 100%)`,
                    x: surfaceMagnetX
                }}
                className="absolute inset-0 pointer-events-none z-0"
            />

            {/* PHASE 16 STEP 6: PROJECT DISCOVERY HIGHLIGHT SCROLL SWEEP */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-black pointer-events-none mix-blend-difference overflow-hidden z-10">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: discovered ? "100%" : "-100%" }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 + index * 0.1 }}
                    className="w-full h-full bg-white"
                />
            </div>

            {/* PHASE 21 STEP 3 & 5: PROJECT CONNECTION SYSTEM (Vertical connector) */}
            {!isMobile && index < 2 && (
                <div className="absolute left-[30vw] top-full h-16 w-px pointer-events-none z-20">
                    <motion.div
                        initial={{ scaleY: 0, opacity: 0.1 }}
                        animate={{
                            scaleY: isHovered ? 1.2 : 1,
                            opacity: isHovered ? 0.4 : 0.1,
                            backgroundColor: isHovered ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.1)"
                        }}
                        transition={{ duration: 0.2, ease: MICRO_EASE }}
                        className="w-full h-full origin-top"
                    />
                </div>
            )}

            <Link
                href={project.href}
                onClick={() => setIsMorphing(true)}
                className={`flex flex-col md:flex-row md:items-center justify-between py-16 gap-8 px-4 group-hover:bg-black group-hover:text-white transition-all duration-500 ${hasHovered ? 'duration-150' : 'duration-300'} ${isHovered && !isMobile ? 'pl-12' : ''}`}
            >

                {/* ID + TITLE — MAGNETIC DRIFT — PHASE 11 STEP 8 */}
                <motion.div style={{ x: smoothMagnetX }} className="flex items-center gap-12 mask-reveal overflow-visible origin-left">
                    <motion.span
                        animate={{ letterSpacing: isHovered ? "0.2em" : "0.02em", x: isHovered ? 20 : 0 }}
                        className="text-[14px] font-bold opacity-30 group-hover:opacity-100 transition-all duration-300"
                    >
                        {project.id}
                    </motion.span>
                    <motion.h3
                        key={flickerKey}
                        animate={{
                            letterSpacing: isHovered ? "0.08em" : "0.02em",
                            scale: isHovered ? 1.05 : 1,
                            filter: hasHovered && isHovered ? "brightness(1.5)" : "brightness(1)"
                        }}
                        className={`text-large-mini md:text-large font-heading italic uppercase transition-all origin-left glitch-safe relative ${isHovered ? 'project-title-flicker' : ''} ${hasHovered ? 'duration-150' : 'duration-300'}`}
                    >
                        {project.name}
                        {/* PHASE 20 STEP 3: PROJECT TITLE DISCOVERY UNDERLINE */}
                        {discoveries.has(`UNDERLINE_${project.id}`) && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: [0, 1, 0] }}
                                transition={{ duration: 1.5, times: [0, 0.5, 1], ease: "easeInOut" }}
                                className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-white origin-left z-20"
                            />
                        )}
                    </motion.h3>
                </motion.div>

                <div className="flex flex-col md:items-end gap-2">
                    <span className="text-micro font-bold tracking-[0.4em] opacity-40 group-hover:opacity-100 italic">
                        {project.type}
                    </span>
                    <div className="relative overflow-hidden w-full md:w-32 h-px bg-black/20 group-hover:bg-white/40">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: isHovered ? "0%" : "-100%" }}
                            transition={{ duration: 0.4, ease: GLOBAL_EASE }}
                            className="absolute inset-0 bg-white"
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
