"use client";

import { motion, useScroll, useTransform, useSpring, useVelocity, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];
const MICRO_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// PHASE 14 STEP 11: PROJECT ENTRY LOADING SEQUENCE
export function ProjectEntryLoader() {
    return (
        <div className="fixed inset-0 z-[100] pointer-events-none">
            <motion.div
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{ scaleX: 1, opacity: 0 }}
                transition={{ duration: 0.4, ease: "circIn" }}
                className="absolute top-1/2 left-0 w-full h-[1px] bg-white origin-left"
            />

            {/* PHASE 16 STEP 10: PROJECT PAGE EXPLORATION MODE */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
                transition={{ duration: 4, times: [0, 0.1, 0.8, 1], ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-6 text-micro text-white/80 tracking-widest uppercase font-bold text-center"
            >
                PROJECT MODE ACTIVE
            </motion.div>
        </div>
    );
}

// PHASE 21 STEP 1: GLOBAL NETWORK ELEMENT (Anchor point)
export function NetworkAnchor({ id, className = "" }: { id: string, className?: string }) {
    return <div id={`anchor-${id}`} className={`absolute w-1 h-1 bg-white/20 rounded-full ${className}`} />;
}

// PHASE 14 STEP 1 & 12: SYSTEM HEADER BAR & STATUS INDICATOR
export function SystemHeaderBar({ current }: { current: string }) {
    // PHASE 16 STEP 4: SYSTEM RESPONSE INDICATOR
    const { interactionCount } = useScene();

    return (
        <div className="fixed top-0 left-0 w-full h-12 border-b border-white/10 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-between px-6 font-ui text-[10px] tracking-widest text-white/60">
            <div className="flex items-center gap-6">
                <Link href="/" className="hover:text-white transition-colors">SYS_OVERRIDE</Link>
                <span className="opacity-30">/</span>
                <span className="text-white">{current}</span>
            </div>
            {/* STEP 12 & PHASE 16 STEP 4: SYSTEM STATUS INDICATOR INTERACTIVE */}
            <div className="flex items-center gap-3">
                <span className="uppercase opacity-50">INTERFACE ACTIVE</span>
                <motion.div
                    key={interactionCount} // Overrides to bright standard animation briefly on interact
                    initial={{ opacity: 1, scale: 1.5 }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: 1 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full bg-white"
                />
            </div>
        </div>
    );
}

// PHASE 14 STEP 8: SYSTEM GRID OVERLAY
export function SystemGridOverlay() {
    // PHASE 16 STEP 8: SYSTEM GRID ACTIVATION VELOCITY
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let lastX = 0, lastY = 0;
        const handleMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const dist = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
            if (dist > 70) {
                ref.current.style.opacity = "0.2";
                setTimeout(() => { if (ref.current) ref.current.style.opacity = "0.08" }, 200);
            }
            lastX = e.clientX;
            lastY = e.clientY;
        };
        window.addEventListener("mousemove", handleMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div ref={ref} className="fixed inset-0 pointer-events-none z-0 opacity-[0.08] transition-opacity duration-500">
            <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />
        </div>
    );
}

// PHASE 14 STEP 2, 7 & 13: PROJECT INFORMATION PANELS
export function ProjectPanel({ title, index, children }: { title: string, index: number, children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
    // Step 13: Panel stack depth (active panel comes forward)
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity }}
            whileHover={{ scale: 1.01, boxShadow: "0 10px 40px rgba(0,0,0,0.5)", borderColor: "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full border border-white/5 bg-black/40 p-8 md:p-12 transition-colors origin-bottom"
        >
            <div className="flex flex-col md:flex-row gap-6 md:gap-16">
                <div className="md:w-1/4">
                    <span className="text-micro font-bold tracking-[0.4em] text-white/40 uppercase">
                        {`0${index + 1}_${title}`}
                    </span>
                </div>
                <div className="md:w-3/4 flex flex-col gap-6">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

// PHASE 14 STEP 6: PROJECT METADATA PANEL
export function ProjectMetadata({ tech, language, type, arch }: { tech: string[], language: string, type: string, arch: string }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-white/10 w-full mb-20 font-ui text-[11px] uppercase tracking-widest text-white/60">
            <div className="flex flex-col gap-2">
                <span className="opacity-40">System Type</span>
                <span className="text-white">{type}</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="opacity-40">Core Language</span>
                <span className="text-white">{language}</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="opacity-40">Architecture</span>
                <span className="text-white">{arch}</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="opacity-40">Core Stack</span>
                <div className="flex flex-wrap gap-2 text-white">
                    {tech.map(t => <span key={t}>{t}</span>)}
                </div>
            </div>
        </div>
    );
}

// PHASE 14 STEP 5: PROJECT FLOW TIMELINE
export function ProjectTimeline({ steps }: { steps: string[] }) {
    return (
        <div className="w-full flex items-center justify-between relative py-8">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0" />

            {steps.map((step, i) => (
                <motion.div
                    key={step}
                    initial={{ opacity: 0.3, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-20% 0px -20% 0px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative z-10 flex flex-col items-center gap-3 bg-black px-4"
                >
                    <div className="w-2 h-2 border border-white bg-black rotate-45" />
                    <span className="text-[10px] font-ui tracking-widest text-white/50 uppercase">{step}</span>
                </motion.div>
            ))}
        </div>
    );
}

// PHASE 14 STEP 4 & 3: ARCHITECTURE VISUALIZATION
export function ArchitectureVisual() {
    const [isHovered, setIsHovered] = useState(false);
    const { triggerDiscovery, discoveries } = useScene();

    useEffect(() => {
        if (!isHovered || discoveries.has("ARCH_COMPLEXITY")) return;
        const timer = setTimeout(() => {
            triggerDiscovery("ARCH_COMPLEXITY");
        }, 1500);
        return () => clearTimeout(timer);
    }, [isHovered, triggerDiscovery, discoveries]);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full h-64 border border-white/10 mt-8 relative flex items-center justify-center bg-[#050505] transition-colors duration-500 hover:border-white/20 group/arch"
        >
            <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none">
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d="M 10 30 L 100 30 L 150 120 L 300 120"
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                />
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    d="M 100 200 L 150 120"
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4 4"
                />

                {/* PHASE 20 STEP 4: EXTRA CONNECTION LINES */}
                <AnimatePresence>
                    {discoveries.has("ARCH_COMPLEXITY") && (
                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            d="M 150 120 L 250 30 L 350 120"
                            stroke="white"
                            strokeWidth="0.5"
                            fill="none"
                        />
                    )}
                </AnimatePresence>
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: isHovered ? 1 : 0, opacity: isHovered ? 0.15 : 0 }}
                    transition={{ duration: 0.8, ease: MICRO_EASE }}
                    d="M 300 120 L 500 120 M 100 200 L 0 200"
                    stroke="white"
                    strokeWidth="0.5"
                    fill="none"
                />
            </svg>
            <div className="grid grid-cols-3 gap-24 relative z-10">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="border border-white/20 px-6 py-4 text-[10px] tracking-widest bg-black">FRONTEND_SYS</motion.div>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="border border-white/40 px-6 py-4 text-[10px] tracking-widest text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] bg-black">CORE_ENGINE</motion.div>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }} className="border border-white/20 px-6 py-4 text-[10px] tracking-widest bg-black relative">
                    DB_CLUSTER
                    {/* PHASE 20 STEP 7: SECRET ANNOTATION */}
                    <AnimatePresence>
                        {isHovered && discoveries.has("ARCH_COMPLEXITY") && (
                            <motion.span
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-full left-0 mt-2 text-[8px] text-white/40 italic whitespace-nowrap"
                            >
                                *NODE_SYNC_ACTIVE
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

// PHASE 14 STEP 10: PROJECT CODE BLOCK VISUAL
export function CodeBlockVisual({ code }: { code: string[] }) {
    return (
        <div className="w-full border border-white/10 bg-[#0a0a0a] p-6 text-white/50 font-mono text-sm leading-relaxed overflow-x-hidden mt-8">
            {code.map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex gap-6"
                >
                    <span className="opacity-20 select-none">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: line.replace(/ /g, '&nbsp;') }} />
                </motion.div>
            ))}
        </div>
    );
}

// PHASE 14 STEP 9 & 14: COMMAND-LIKE NAVIGATION
export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                // Step 14: Disable command palette on mobile
                if (window.innerWidth >= 768) {
                    setOpen(o => !o);
                }
            }
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (!open) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg border border-white/10 bg-black shadow-2xl overflow-hidden"
            >
                <div className="px-4 py-3 border-b border-white/10 text-[10px] tracking-widest text-white/40 uppercase">
                    System Command Palette
                </div>
                <div className="p-2 flex flex-col gap-1">
                    {[
                        { label: "SYS_HOME", href: "/" },
                        { label: "MOD_MOVEX", href: "/movex" },
                        { label: "MOD_UIDAI", href: "/uidai" },
                        { label: "MOD_PFCV", href: "/pfcv" },
                    ].map(cmd => (
                        <button
                            key={cmd.label}
                            onClick={() => {
                                router.push(cmd.href);
                                setOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-ui tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            {cmd.label}
                        </button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

// PHASE 15 STEP 1, 2, 3, 4: SCROLL CHOREOGRAPHY ENGINE W/ TIMELINE
export function ChoreographedSection({ id, children, isProject = false, className = "" }: { id?: string, children: React.ReactNode, isProject?: boolean, className?: string }) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // PHASE 16 STEP 11: PANEL FOCUS LOCK (IS_IDLE DIMMING)
    const { isIdle, activeSection } = useScene();
    const isFocusedPanel = activeSection === id;
    const idleDimFilter = isIdle && !isFocusedPanel ? "brightness(0.3) saturate(0.5)" : "brightness(1) saturate(1)";

    // Step 3 & 4: Focus state rules + exit choreography
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.95, 1, 1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

    // Step 2: Frame Border + Midpoint focus
    const borderColor = useTransform(scrollYProgress, [0, 0.4, 0.6, 1],
        ["rgba(255,255,255,0)", isProject ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)", isProject ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)", "rgba(255,255,255,0)"]
    );

    const bridgeHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY as any);
    const [duration, setDuration] = useState(0.8);

    useEffect(() => {
        const unsubscribe = scrollVelocity.on("change", (v) => {
            const speed = Math.abs(v);
            // Higher speed = shorter duration (snappier)
            // Range: [0.4, 1.2]
            const nextDuration = Math.max(0.4, Math.min(1.2, 1.2 - (speed / 10000)));
            setDuration(nextDuration);
        });
        return () => unsubscribe();
    }, [scrollVelocity]);

    return (
        <motion.section
            ref={ref}
            id={id}
            style={{ scale, opacity, filter: idleDimFilter }}
            className={`w-full relative transition-all duration-[800ms] ease-out ${isProject ? '' : 'bg-white text-black'} ${className}`}
            transition={{ duration, ease: GLOBAL_EASE }}
        >
            {/* Step 6: Visual Transition Bridges REMOVED */}
            {/* PHASE 21 STEP 10: SECTION ENTRY SIGNAL */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: [0, 0.3, 0], scale: [0.98, 1, 1.01] }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: MICRO_EASE }}
                className="absolute inset-0 border border-white/5 pointer-events-none z-[-1]"
            />
            {children}
        </motion.section>
    );
}

// PHASE 15 STEP 7 & PHASE 21 STEP 4, 12: SYSTEM SPINE
export function ContinuityLine() {
    return null;
}

// PHASE 15 STEP 11: SCROLL MOMENT EMPHASIS
export function ScrollMoment({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ scale: 0.9, filter: "blur(10px)", opacity: 0 }}
            whileInView={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

// PHASE 15 STEP 5, 8 & 10: STORYTELLING BLOCKS & MICRO-ANIMATION
export function StoryBlock({ title, children }: { title: string, children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

    return (
        <div className="w-full relative py-20 group">
            {/* Step 10: Project Page Scene Break sweep animation */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: isMobile ? "0px" : "-10%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 w-full h-px bg-white/20 origin-left"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-12">
                <div className="md:col-span-1 border-l border-white/20 pl-6 h-fit overflow-hidden">
                    {/* Step 8: Story block micro-animation (Headlines mask slide) */}
                    <motion.span
                        initial={{ y: "100%", opacity: 0 }}
                        whileInView={{ y: "0%", opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="block text-micro font-bold tracking-[0.4em] text-white/40 uppercase"
                    >
                        {title}
                    </motion.span>
                </div>
                <div className="md:col-span-3 flex flex-col gap-8">
                    {/* Step 8: Supporting text fades */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
// PHASE 26 STEP 12: SCROLL PROGRESS INDICATOR
export function ScrollProgressIndicator() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

    return (
        <motion.div
            style={{ scaleY }}
            className="fixed top-0 right-8 w-px h-1/4 bg-white/20 origin-top z-[2001] pointer-events-none"
        >
            <div className="absolute top-0 right-0 w-4 h-px bg-white/40" />
            <div className="absolute bottom-0 right-0 w-4 h-px bg-white/40" />
        </motion.div>
    );
}

// PHASE 26 STEP 10: STRUCTURAL GRID SHIFT
export function SectionGridShift() {
    const { scrollYProgress } = useScroll();
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    return (
        <motion.div
            style={{ x, y }}
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        >
            <div className="w-[120%] h-[120%] -translate-x-[5%] -translate-y-[5%]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)',
                backgroundSize: '100px 100px'
            }} />
        </motion.div>
    );
}

// PHASE 26 STEP 9: MASK REVEAL FOR TYPOGRAPHY
export function MaskReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    return (
        <div className="relative overflow-hidden">
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.2, delay, ease: GLOBAL_EASE }}
            >
                {children}
            </motion.div>
        </div>
    );
}

// PHASE 19 STEP 11: SYSTEM STATE INDICATOR
export function SystemStateIndicator({ active }: { active: boolean }) {
    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="fixed bottom-24 left-[5vw] z-[100] flex items-center gap-4 pointer-events-none"
                >
                    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
                    <span className="text-micro font-bold tracking-[0.8em] text-white/60 uppercase whitespace-nowrap">
                        Interface_Responding
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
