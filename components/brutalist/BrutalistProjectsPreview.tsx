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
    const containerRef = useRef<HTMLDivElement>(null);
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
        { id: "01", name: "MOVEX_SYSTEM", type: "LOGISTICS / BACKEND", href: "/movex", desc: "A robust supply chain engine focusing on real-time routing and high-scale operational capacity." },
        { id: "02", name: "UIDAI_AI", type: "PATTERN / AUTH", href: "/uidai", desc: "Advanced semantic search and retrieval architecture built for hyper-fast identity documentation." },
        { id: "03", name: "POLYGLOT_FFI", type: "CONTRACT", href: "/pfcv", desc: "Zero-overhead foreign function interfaces bridging isolated memory spaces with absolute type safety." }
    ];

    return (
        <div ref={containerRef} className="relative h-[350vh] bg-black">
            {/* PHASE 26 STEP 5: PROJECT SECTION PINNING (Narrative Scroll Engine) */}
            <motion.section
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
                className="sticky top-[2vh] h-[96vh] w-full bg-white text-black py-16 px-[5vw] flex flex-col items-center overflow-hidden preserve-3d transition-colors duration-500 rounded-[8px]"
            >
                {/* PHASE 23 STEP 7: SECTION NUMBER SYSTEM */}
                <span className="absolute top-[5%] right-[2%] text-[20vw] font-heading font-black leading-none text-black opacity-[0.02] pointer-events-none z-0 select-none">
                    02
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
                    <div className="flex flex-col gap-4 items-start self-start w-full absolute top-[5vh] left-[5vw]">
                        <span className="text-micro font-bold tracking-[0.5em] opacity-60">02_ARCHIVE</span>
                        <h2 className="text-[clamp(1.5rem,5vw,4rem)] text-black font-heading font-extrabold italic leading-none uppercase tracking-tighter w-[80vw] border-b border-black/20 pb-4">
                            {scrambledTitle}
                        </h2>
                    </div>

                    {/* PHASE 26 STEP 6: PINNED PROJECT SEQUENCE CONTAINER */}
                    <motion.div
                        style={{ x: velocityDriftX, scaleY: velocityStretchY }}
                        className="absolute top-[20vh] w-[90vw] h-[70vh] flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-start glitch-safe"
                    >
                        {projects.map((project, i) => (
                            <ProjectRow
                                key={project.id}
                                project={project}
                                index={i}
                                globalScrollProgress={scrollYProgress} // Pass pinned scroll down
                            />
                        ))}
                    </motion.div>
                </motion.div>

                {/* EXIT CUE — PHASE 4 */}
                <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col items-end gap-2 opacity-30">
                    <span className="text-micro font-bold tracking-[0.4em]">SYS_NAV_02</span>
                    <div className="w-16 h-px bg-black" />
                </div>
            </motion.section>
        </div>
    );
}

function ProjectRow({
    project,
    index,
    globalScrollProgress
}: {
    project: { id: string; name: string; type: string; href: string; desc: string };
    index: number;
    globalScrollProgress: any;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [flickerKey, setFlickerKey] = useState(0);
    const rowRef = useRef<HTMLDivElement>(null);
    const {
        markInteraction, markProjectInterest, projectInterests, scrollTempo, isIdle,
        triggerDiscovery, discoveries
    } = useScene();

    // PHASE 17 STEP 14: MOBILE SIMPLIFICATION (Hoist for Phase 24)
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => setIsMobile(window.innerWidth < 768), []);

    // PHASE 16 STEP 2 & 6: HOVER HISTORY MEMORY & DISCOVERY
    const [hasHovered, setHasHovered] = useState(false);
    const [discovered, setDiscovered] = useState(false);
    const [isMorphing, setIsMorphing] = useState(false);

    // PHASE 11 STEP 8: MAGNETIC TITLE DRIFT
    const magnetX = useMotionValue(0);
    const smoothMagnetX = useSpring(magnetX, { damping: 25, stiffness: 300 });

    // PHASE 24 STEP 5: FLOATING VISUAL PLANES (3D Tilt)
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const smoothTiltX = useSpring(tiltX, { damping: 40, stiffness: 200 });
    const smoothTiltY = useSpring(tiltY, { damping: 40, stiffness: 200 });

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
    const { scrollY } = useScroll({
        target: rowRef,
        offset: ["start end", "end start"]
    });
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 400 });
    const velocityScale = useTransform(smoothVelocity, [-2000, 0, 2000], [0.95, 1, 1.05]);
    const velocitySkew = useTransform(smoothVelocity, [-2000, 0, 2000], [-3, 0, 3]);

    // PHASE 26 STEP 6: CONTROLLED REVEAL ORDER (STAGGERED MOVEMENT IN PINNED SECTION)
    // 0: 0-0.3, 1: 0.3-0.6, 2: 0.6-0.9
    const start = index * 0.25;
    const peak = start + 0.15;
    const end = start + 0.35;

    // Horizontal tracking while pinned
    const slideX = useTransform(globalScrollProgress, [0, 1], ["20vw", "-120vw"]);
    const slideY = useTransform(globalScrollProgress, [start, peak, end], [100, 0, -50]);
    const panelOpacity = useTransform(globalScrollProgress, [start - 0.1, start, peak, end], [0, 1, 1, 0.2]);

    // PHASE 24 STEP 6: DEPTH-BASED HOVER (Rise smoothly on hover)
    const hoverZ = isHovered && !isMobile ? 60 : 0;

    // PHASE 19 STEP 5: ATTENTION REFOCUS (Highlight on pause)
    const pauseBorderColor = useTransform(globalScrollProgress, [0.4, 0.5, 0.6], ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.1)"]);

    const finalTopColor = useTransform(
        [edgeLight, pauseBorderColor],
        ([edge, pause]: any[]) => isIdle ? pause : edge
    );
    const finalSideColor = useTransform(pauseBorderColor, (pause: string) => isIdle ? pause : "rgba(0,0,0,0.1)");

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
        const centerY = rect.top + rect.height / 2;

        const dx = (e.clientX - centerX) / rect.width * 12;
        magnetX.set(dx);

        // PHASE 24 STEP 5: TILT CALCULATION (Subtle plane rotation)
        const dxNorm = (e.clientX - centerX) / (rect.width / 2);
        const dyNorm = (e.clientY - centerY) / (rect.height / 2);
        tiltX.set(-dyNorm * 4); // Max 4 degrees tilt X
        tiltY.set(dxNorm * 4);  // Max 4 degrees tilt Y

        // PHASE 18: CALCULATE PROXIMITY
        const distY = Math.abs(e.clientY - centerY);
        const prox = Math.max(0, 1 - (distY / (rect.height * 1.5)));
        proximity.set(prox);
    };

    const handleLeave = () => {
        setIsHovered(false);
        magnetX.set(0);
        tiltX.set(0);
        tiltY.set(0);
        proximity.set(0);
    };

    // PHASE 26 STEP 10: CURSOR DRAG GESTURE DETECTION (implied by horizontal move)
    return (
        <motion.div
            ref={rowRef}
            initial={{ opacity: 0 }}
            whileHover={{ scale: hasHovered ? 1.03 : 1.02 }}
            whileTap={{ scale: 0.97 }}
            viewport={{ once: true }}
            style={{
                scaleY: velocityScale,
                skewY: isMobile ? 0 : velocitySkew,
                scale: isHovered ? 1.03 : 1,
                y: isMobile ? 0 : slideY,
                x: isMobile ? 0 : slideX,
                z: isHovered ? 60 : 0,
                opacity: panelOpacity,
                rotateX: isMobile ? 0 : smoothTiltX, // PHASE 24 STEP 5
                rotateY: isMobile ? 0 : smoothTiltY, // PHASE 24 STEP 5
                rotateZ: isMobile ? 0 : (isHovered ? -0.2 : 0), // STEP 6 & 13
                transformStyle: "preserve-3d", // Prevent nested flattening
                borderTopColor: finalTopColor, // STEP 3 + PHASE 19
                borderBottomColor: finalTopColor,
                borderLeftColor: finalSideColor,
                borderRightColor: finalSideColor,
                boxShadow: shadowDepth,    // STEP 8
            }}
            className={`
                relative shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw] h-full border border-black/10 group cursor-none project-row-transition origin-left py-12 px-6 md:py-16 md:px-12 flex flex-col justify-end
                ${isHovered ? "flash-invert bg-black drop-shadow-[0_0_40px_rgba(255,255,255,0.05)]" : "bg-black/[0.02]"}
            `}
            onMouseEnter={handleEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleLeave}
            data-project="true"
        >
            {/* PHASE 28 STEP 3: MICRO SURFACE TEXTURE */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-black/[0.01] to-transparent opacity-50 mix-blend-multiply" />

            {/* PHASE 18 STEP 9: PROJECT SURFACE LIGHT RESPONSE (SHEEN) */}
            <motion.div
                style={{
                    opacity: surfaceLightOpacity,
                    background: `linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.2) 50%, transparent 100%)`,
                    x: surfaceMagnetX
                }}
                className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay"
            />

            {/* PHASE 16 STEP 6: PROJECT DISCOVERY HIGHLIGHT SCROLL SWEEP */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-black pointer-events-none mix-blend-difference overflow-hidden z-10">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: discovered ? "100%" : "-100%" }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 + index * 0.1 }}
                    className="w-full h-full bg-white"
                />
            </div >

            {/* PHASE 21 STEP 3 & 5: PROJECT CONNECTION SYSTEM (Vertical connector) */}
            {
                !isMobile && index < 2 && (
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
                )
            }

            <Link
                href={project.href}
                onClick={() => setIsMorphing(true)}
                className={`flex flex-col md:flex-row md:items-end justify-between w-full gap-16 group-hover:text-white transition-all duration-500 ${hasHovered ? 'duration-150' : 'duration-300'}`}
            >

                {/* ID + TITLE — MAGNETIC DRIFT — PHASE 11 STEP 8 */}
                <motion.div style={{ x: smoothMagnetX }} className="flex flex-col items-start gap-4 mask-reveal overflow-visible origin-left">
                    <motion.h3
                        key={flickerKey}
                        animate={{
                            letterSpacing: isHovered ? "0.08em" : "0.02em",
                            scale: isHovered ? 1.05 : 1,
                            filter: hasHovered && isHovered ? "brightness(1.5)" : "brightness(1)"
                        }}
                        className={`text-[clamp(1.5rem,5vw,3.5rem)] font-heading font-bold italic uppercase transition-all origin-left glitch-safe relative py-2 overflow-visible flex items-baseline gap-3 ${isHovered ? 'project-title-flicker' : ''} ${hasHovered ? 'duration-150' : 'duration-300'}`}
                    >
                        <span className="text-base font-bold opacity-40 shrink-0">{project.id}</span>
                        <span>{project.name}</span>
                        {/* PHASE 20 STEP 3: PROJECT TITLE DISCOVERY UNDERLINE */}
                        {discoveries.has(`UNDERLINE_${project.id}`) && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: [0, 1, 0] }}
                                transition={{ duration: 1.5, times: [0, 0.5, 1], ease: "easeInOut" }}
                                className="absolute bottom-1 left-0 w-full h-[1px] bg-white origin-left z-20"
                            />
                        )}
                    </motion.h3>
                    <p className="text-short-body text-black/50 group-hover:text-white/60 tracking-wider mt-4">
                        {project.desc}
                    </p>
                </motion.div>

                <div className="flex flex-col md:items-end gap-2 shrink-0 max-w-[160px]">
                    <span className="text-micro font-bold tracking-[0.2em] md:tracking-[0.4em] opacity-40 group-hover:opacity-100 italic text-right break-words w-full">
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
        </motion.div >
    );
}
