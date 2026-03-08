"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useVelocity, AnimatePresence, MotionValue } from "framer-motion";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useScene } from "@/context/SceneContext";
import { EASE, DUR } from "@/components/brutalist/SystemComponents";


export default function CustomCursor() {
    const mouse = {
        x: useMotionValue(-100),
        y: useMotionValue(-100),
    };

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY as MotionValue<number>);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

    // PHASE 40 STEP 3 & 4: TRANSFORM-BASED KINETIC STRETCH
    const stretchY = useTransform(smoothVelocity, [-2000, 0, 2000], [0.6, 1, 0.6]);
    const stretchX = useTransform(smoothVelocity, [-2000, 0, 2000], [1.4, 1, 1.4]);

    const { lastDiscoveryTime } = useScene();
    const [cursorVariant, setCursorVariant] = useState("default");
    const [isRecentDiscovery, setIsRecentDiscovery] = useState(false);
    const [depthScale, setDepthScale] = useState(1);
    const [cursorLabel, setCursorLabel] = useState("");
    const [cursorOpacity, setCursorOpacity] = useState(1);

    // PHASE 40 STEP 13: MEMORY DISCIPLINE (Ref-based observers)
    const interactablesRef = useRef<HTMLElement[]>([]);
    const pathname = usePathname();

    // PHASE 40 STEP 5 & 6: CACHED INTERACTION ENGINE
    const refreshInteractables = useCallback(() => {
        if (typeof document === 'undefined') return;
        requestAnimationFrame(() => {
            const elements = document.querySelectorAll(".magnetic-btn, [data-project='true']");
            interactablesRef.current = Array.from(elements) as HTMLElement[];
        });
    }, []);

    useEffect(() => {
        refreshInteractables();
        // Refresh on scroll end or resize to catch lazy-loaded elements
        window.addEventListener("resize", refreshInteractables);
        return () => window.removeEventListener("resize", refreshInteractables);
    }, [refreshInteractables, pathname]);

    // PHASE 35: INACTIVITY FADE (Step 12)
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const handleMove = () => {
            setCursorOpacity(1);
            clearTimeout(timeout);
            timeout = setTimeout(() => setCursorOpacity(0.35), 3000);
        };
        window.addEventListener("mousemove", handleMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMove);
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if (!lastDiscoveryTime) {
            requestAnimationFrame(() => setIsRecentDiscovery(false));
            return;
        }
        requestAnimationFrame(() => setIsRecentDiscovery(true));
        const timer = setTimeout(() => requestAnimationFrame(() => setIsRecentDiscovery(false)), DUR.PAGE * 1000);
        return () => clearTimeout(timer);
    }, [lastDiscoveryTime]);

    // Interaction Resistance
    const isResistant = cursorVariant === "nav" || cursorVariant === "project";
    const resistanceSpring = useMemo(() => ({ 
        damping: isResistant ? 50 : 35, 
        stiffness: isResistant ? 150 : 400 
    }), [isResistant]);

    // Core dot: EXACT instant tracking response (no lag)
    const dot = {
        x: useSpring(mouse.x, { damping: 30, stiffness: 2000, mass: 0.05 }),
        y: useSpring(mouse.y, { damping: 30, stiffness: 2000, mass: 0.05 }),
    };

    // Outer ring: SMOOTH trailing response
    const ring = {
        x: useSpring(mouse.x, resistanceSpring),
        y: useSpring(mouse.y, resistanceSpring),
    };

    const [isPressed, setIsPressed] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [trails, setTrails] = useState<{ x: number, y: number, id: number }[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        requestAnimationFrame(() => setIsMounted(true));
        
        if (window.matchMedia("(hover: none)").matches || window.innerWidth < 768) return;

        const moveMouse = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Detect target states without reflow where possible
            const target = e.target as HTMLElement;
            const isNav = !!target.closest(".magnetic-btn, .nav-item");
            const isProject = !!target.closest("[data-project='true']");
            const isText = !!target.closest("h1, h2, h3, p, .text-massive, .text-large, .kinetic-letter");
            const isWhite = !!target.closest(".bg-white");

            mouse.x.set(clientX);
            mouse.y.set(clientY);

            // Maintain discovery highlights (non-magnetic)
            const interactables = interactablesRef.current;
            for (let i = 0; i < interactables.length; i++) {
                const htmlEl = interactables[i];
                const rect = htmlEl.getBoundingClientRect();
                const dx = clientX - (rect.left + rect.width / 2);
                const dy = clientY - (rect.top + rect.height / 2);
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                const isProjectItem = htmlEl.getAttribute('data-project') === 'true';
                const radius = isProjectItem ? 400 : 150;

                if (dist < radius) {
                    const rx = ((clientX - rect.left) / rect.width) * 100;
                    const ry = ((clientY - rect.top) / rect.height) * 100;
                    htmlEl.style.setProperty('--edge-light-x', `${rx}%`);
                    htmlEl.style.setProperty('--edge-light-y', `${ry}%`);
                } else {
                    htmlEl.style.setProperty('--edge-light-x', '50%');
                    htmlEl.style.setProperty('--edge-light-y', '50%');
                }
            }

            // Limited trail generation
            if (Math.abs(scrollVelocity.get()) > 300) {
                setTrails(prev => [{ x: clientX, y: clientY, id: Date.now() }, ...prev].slice(0, 5));
            }

            // Depth Mapping
            if (target.closest(".z-depth-front")) setDepthScale(1.4);
            else if (target.closest(".z-depth-far")) setDepthScale(0.7);
            else setDepthScale(1);

            // Variant switching
            if (isProject) {
                setCursorVariant("project");
                setCursorLabel("VIEW_ARCHIVE");
            } else if (isNav) {
                setCursorVariant("nav");
                setCursorLabel("");
            } else if (isText) {
                setCursorVariant("text");
                setCursorLabel("");
            } else {
                setCursorVariant("default");
                setCursorLabel("");
            }

            if (isWhite) document.body.classList.add("cursor-invert");
            else document.body.classList.remove("cursor-invert");
        };

        window.addEventListener("mousemove", moveMouse, { passive: true });
        return () => window.removeEventListener("mousemove", moveMouse);
    }, [mouse.x, mouse.y, scrollVelocity]);

    // Unified press listeners
    useEffect(() => {
        const press = () => setIsPressed(true);
        const release = () => setIsPressed(false);
        window.addEventListener("mousedown", press);
        window.addEventListener("mouseup", release);
        return () => {
            window.removeEventListener("mousedown", press);
            window.removeEventListener("mouseup", release);
        };
    }, []);

    // Optimized tail cleanup
    useEffect(() => {
        const timer = setInterval(() => {
            setTrails(prev => prev.length > 0 ? prev.slice(0, -1) : prev);
        }, 120); // Faster rhythm than standard exit for trails
        return () => clearInterval(timer);
    }, []);

    const variants = {
        default: { 
            width: 32, height: 32, borderRadius: "50%",
            borderWidth: "1px", backgroundColor: "transparent", borderColor: "white" 
        },
        nav: { 
            width: 64, height: 64, borderRadius: "2px",
            borderWidth: "2px", backgroundColor: "rgba(255,255,255,0.08)", borderColor: "white" 
        },
        project: { 
            width: 140, height: 140, borderRadius: "2px",
            borderWidth: "1px", backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.4)" 
        },
        text: { 
            width: 2, height: 40, borderRadius: "0px",
            borderWidth: "0px", backgroundColor: "white", borderColor: "transparent" 
        },
    };

    if (!isMounted) return null;
    if (typeof window !== 'undefined' && (window.matchMedia("(hover: none)").matches || window.innerWidth < 768)) return null;

    return (
        <>
            <AnimatePresence>
                {trails.map(t => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0.2, scale: 0.5 }}
                        animate={{ opacity: 0, scale: 0 }}
                        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[9997]"
                        style={{ x: t.x, y: t.y, translateX: "-50%", translateY: "-50%" }}
                    />
                ))}
            </AnimatePresence>

            <motion.div
                className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    scale: (isPressed ? 0.6 : 1) * depthScale,
                    opacity: (cursorVariant === "text" || cursorVariant === "project") ? 0 : cursorOpacity
                }}
                style={{ x: dot.x, y: dot.y, translateX: "-50%", translateY: "-50%", width: 14, height: 14 }}
            />

            <motion.div
                className="fixed top-0 left-0 border pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center overflow-hidden"
                animate={{
                    ...variants[cursorVariant as keyof typeof variants],
                    scale: (isPressed ? 0.85 : (isRecentDiscovery ? 1.4 : 1)) * depthScale,
                    opacity: cursorOpacity,
                }}
                transition={{
                    duration: DUR.MEDIUM,
                    ease: EASE.ENTRY
                }}
                style={{ 
                    x: ring.x, 
                    y: ring.y, 
                    translateX: "-50%", 
                    translateY: "-50%",
                    scaleX: cursorVariant === "default" ? stretchX : 1,
                    scaleY: cursorVariant === "default" ? stretchY : 1
                }}
            >
                <AnimatePresence>
                    {cursorLabel && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                            className="text-[10px] font-ui font-black tracking-[0.4em] text-white pt-1"
                        >
                            {cursorLabel}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
