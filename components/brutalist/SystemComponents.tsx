"use client";

import { motion, useScroll, useTransform, useSpring, useVelocity, AnimatePresence, MotionValue } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];
const MICRO_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// PHASE 31: INTERFACE RHYTHM TOKENS
export const RHYTHM = {
    PRIMARY: 0.6,
    HOVER: 0.2,
    CURSOR: 0.12,
    MICRO: 0.08,
    EASE: GLOBAL_EASE,
    SNAP: [0.16, 1, 0.3, 1]
};

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
    // PHASE 37 STEP 7: GRID REFLECTION RESPONSE
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let lastX = 0, lastY = 0;
        const handleMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const dist = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
            if (dist > 70) {
                ref.current.style.opacity = "0.2";
                setTimeout(() => { if (ref.current) ref.current.style.opacity = "0.1" }, 300);
            }
            ref.current.style.setProperty('--grid-light-x', `${e.clientX}px`);
            ref.current.style.setProperty('--grid-light-y', `${e.clientY}px`);
            lastX = e.clientX;
            lastY = e.clientY;
        };
        window.addEventListener("mousemove", handleMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div ref={ref} className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] transition-all duration-700 ease-out grid-reflection-root">
            <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(circle at var(--grid-light-x, 50%) var(--grid-light-y, 50%), black 0%, transparent 60%)',
                WebkitMaskImage: 'radial-gradient(circle at var(--grid-light-x, 50%) var(--grid-light-y, 50%), black 0%, transparent 60%)'
            }} />
        </div>
    );
}

// PHASE 34 STEP 3 & 4: PROJECT INFORMATION PANELS WITH TENSION & TILT
export function ProjectPanel({ title, index, children }: { title: string, index: number, children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
    const scrollVelocity = useVelocity(scrollYProgress);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

    // Step 10: Scroll Interaction Tension (Stretch based on velocity)
    const scaleY = useTransform(smoothVelocity, [-1, 0, 1], [1.02, 1, 1.02]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ 
                scale, 
                opacity,
                scaleY,
                transformStyle: "preserve-3d",
                perspective: "1200px"
            }}
            whileHover={{ 
                zIndex: 20,
                // PHASE 37 STEP 4: DEPTH SHADOW SYSTEM
                boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 1px rgba(255,255,255,0.1)",
                transition: { duration: 0.3 }
            }}
            className="w-full border border-white/5 bg-black/40 p-8 md:p-12 transition-all duration-500 shadow-2xl group/panel overflow-hidden"
            data-project="true"
        >
            {/* PHASE 37 STEP 3 & 10: EDGE ILLUMINATION & HOVER REFLECTION */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover/panel:opacity-100 transition-opacity duration-700 z-0 bg-[radial-gradient(circle_at_var(--edge-light-x,50%)_var(--edge-light-y,50%),rgba(255,255,255,0.06)_0%,transparent_60%)]"
            />
            
            {/* PHASE 37 STEP 8: PANEL SPOTLIGHT */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/panel:opacity-30 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_80%)]" />

            <motion.div 
                className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-16"
                style={{
                    rotateX: "var(--tilt-x, 0deg)",
                    rotateY: "var(--tilt-y, 0deg)",
                    x: "var(--magnet-x, 0px)",
                    y: "var(--magnet-y, 0px)",
                }}
            >
                <div className="md:w-1/4">
                    <span className="text-micro font-bold tracking-[0.4em] text-white/40 uppercase group-hover/panel:text-white transition-colors">
                        {`0${index + 1}_${title}`}
                    </span>
                </div>
                <div className="md:w-3/4 flex flex-col gap-6">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
}

// PHASE 34 STEP 3: MAGNETIC BUTTON SYSTEM
export function MagneticButton({ 
    children, 
    className = "", 
    onClick 
}: { 
    children: React.ReactNode, 
    className?: string,
    onClick?: () => void 
}) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, y: 2 }}
            className={`magnetic-btn relative flex items-center justify-center transition-all duration-200 ${className}`}
            style={{
                x: "var(--magnet-x, 0px)",
                y: "var(--magnet-y, 0px)",
            }}
        >
            {children}
        </motion.button>
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

interface Command {
    id: string;
    label: string;
    section?: string;
    href?: string;
}

// PHASE 32: COMMAND INTERFACE (DEVELOPER NAVIGATION INTELLIGENCE)
export function CommandPalette() {
    const { isCommandPaletteOpen: open, setIsCommandPaletteOpen: setOpen, setIsNavigating } = useScene();
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const inputRef = useRef<HTMLInputElement>(null);

    const commands: Command[] = [
        { id: 'hero', label: 'GO_TO_HERO', section: 'hero' },
        { id: 'projects', label: 'GO_TO_PROJECTS', section: 'projects' },
        { id: 'about', label: 'GO_TO_ABOUT', section: 'about' },
        { id: 'contact', label: 'GO_TO_CONTACT', section: 'contact' },
        { id: 'movex', label: 'OPEN_MOVEX_SYSTEM', href: '/movex' },
        { id: 'uidai', label: 'OPEN_UIDAI_AI', href: '/uidai' },
        { id: 'pfcv', label: 'OPEN_POLYGLOT_FFI', href: '/pfcv' },
    ];

    const filtered = commands.filter(c => 
        c.label.toLowerCase().includes(query.toLowerCase())
    );

    const executeCommand = useCallback((cmd: Command) => {
        setOpen(false);
        if (cmd.section) {
            if (pathname !== "/") {
                setIsNavigating(true);
                router.push(`/#${cmd.section}`);
            } else {
                const el = document.getElementById(cmd.section);
                el?.scrollIntoView({ behavior: "smooth" });
            }
        } else if (cmd.href) {
            setIsNavigating(true);
            router.push(cmd.href);
        }
    }, [pathname, router, setOpen, setIsNavigating]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(o => !o);
            }
            if (e.key === "Escape") setOpen(false);

            if (open) {
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelectedIndex(i => (i + 1) % filtered.length);
                }
                if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelectedIndex(i => (i - 1 + filtered.length) % filtered.length);
                }
                if (e.key === "Enter" && filtered[selectedIndex]) {
                    e.preventDefault();
                    executeCommand(filtered[selectedIndex]);
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, filtered, selectedIndex, setOpen, executeCommand]);

    useEffect(() => {
        if (open) {
            requestAnimationFrame(() => {
                setQuery("");
                setSelectedIndex(0);
            });
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9000] flex items-center justify-center p-4 cursor-none"
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.98, opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: RHYTHM.EASE }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-xl border border-white/20 bg-[#050505] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
                    >
                        {/* SEARCH INPUT — STEP 2 & 10 */}
                        <div className="flex items-center gap-4 px-6 border-b border-white/10 h-16">
                            <span className="text-micro font-bold text-white/40 tracking-[0.4em]">SYS_NAV</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="EXECUTE_COMMAND..."
                                className="flex-1 bg-transparent border-none outline-none text-white text-sm font-ui tracking-wider placeholder:text-white/20 uppercase"
                            />
                            <div className="flex items-center gap-2">
                                <span className="bg-white/5 px-2 py-1 border border-white/10 text-[8px] text-white/40">ESC_CLOSE</span>
                            </div>
                        </div>

                        {/* COMMAND LIST — STEP 3 & 4 */}
                        <div className="p-2 max-h-[60vh] overflow-y-auto">
                            {filtered.length > 0 ? filtered.map((cmd, idx) => (
                                <motion.button
                                    key={cmd.id}
                                    onMouseMove={() => setSelectedIndex(idx)}
                                    onClick={() => executeCommand(cmd)}
                                    className={`
                                        group w-full text-left px-5 py-4 flex items-center justify-between transition-all duration-200
                                        ${idx === selectedIndex ? 'bg-white text-black' : 'text-white/60 hover:text-white hover:bg-white/5'}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={`text-[10px] opacity-40 ${idx === selectedIndex ? 'text-black' : 'text-white'}`}>
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <span className="text-xs font-bold font-heading tracking-widest uppercase">
                                            {cmd.label}
                                        </span>
                                    </div>
                                    <div className={`flex items-center gap-4 transition-all ${idx === selectedIndex ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                                        <span className="text-[10px] font-ui italic">CONFIRM_EXECUTION</span>
                                        <div className={`w-2 h-2 rounded-full ${idx === selectedIndex ? 'bg-black' : 'bg-white'}`} />
                                    </div>
                                </motion.button>
                            )) : (
                                <div className="px-6 py-12 text-center text-micro text-white/20 tracking-[0.4em]">
                                    NO_COMMANDS_MATCHED_QUERY
                                </div>
                            )}
                        </div>

                        {/* FOOTER BAR */}
                        <div className="px-6 py-3 bg-white/5 border-t border-white/10 flex justify-between items-center text-[8px] text-white/30 tracking-[0.4em] font-bold">
                            <span>PRECISION_NAV_V.3.2</span>
                            <div className="flex gap-4">
                                <span>↑↓_SELECT</span>
                                <span>ENTER_EXEC</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}


// PHASE 15 STEP 1, 2, 3, 4: SCROLL CHOREOGRAPHY ENGINE W/ TIMELINE
export function ChoreographedSection({ id, children, isProject = false, className = "" }: { id?: string, children: React.ReactNode, isProject?: boolean, className?: string }) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // PHASE 16 STEP 11: PANEL FOCUS LOCK (IS_IDLE DIMMING)
    const { isIdle, activeSection } = useScene();
    const isFocusedPanel = activeSection === id;
    const idleDimFilter = isIdle && !isFocusedPanel ? "brightness(0.7) saturate(0.8)" : "brightness(1) saturate(1)";

    // PHASE 30 STEP 1: SECTION ENTRY MORPHING (0 -> 1 Fade)
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.95, 1, 1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY as MotionValue<number>);
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
            {/* PHASE 28 STEP 11: SECTION ATMOSPHERIC SHIFT */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 0.05, 0] }}
                viewport={{ amount: 0.5 }}
                className="absolute inset-0 bg-white pointer-events-none z-0"
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
    useEffect(() => { 
        const frame = requestAnimationFrame(() => {
            setIsMobile(window.innerWidth < 768);
        });
        return () => cancelAnimationFrame(frame);
    }, []);

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

// PHASE 30 STEP 4: GRID RECONFIGURATION ENGINE
export function SectionGridShift() {
    const { scrollYProgress } = useScroll();
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]); // Subtle structural expansion

    return (
        <motion.div
            style={{ x, y, scale }}
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        >
            <div className="w-[120%] h-[120%] -translate-x-[5%] -translate-y-[5%]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)',
                backgroundSize: '100px 100px'
            }} />
        </motion.div>
    );
}

// PHASE 29 STEP 3, 5 & 12: ADVANCED MASK REVEAL FOR KINETIC TYPOGRAPHY
export function MaskReveal({ 
    children, 
    delay = 0, 
    direction = "up", 
    duration = 1.2 
}: { 
    children: React.ReactNode, 
    delay?: number, 
    direction?: "up" | "down" | "left" | "right",
    duration?: number
}) {
    const initialPos = {
        up: { y: "110%", x: 0 },
        down: { y: "-110%", x: 0 },
        left: { x: "110%", y: 0 },
        right: { x: "-110%", y: 0 }
    }[direction];

    return (
        <div className="relative overflow-hidden py-4 -my-4 px-2 -mx-2">
            <motion.div
                initial={{ ...initialPos, opacity: 0 }}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                    duration, 
                    delay, 
                    ease: [0.33, 1, 0.68, 1] // GLOBAL_EASE
                }}
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
