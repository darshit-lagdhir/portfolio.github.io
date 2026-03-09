"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useMotionValue, MotionValue } from "framer-motion";

type SceneMode = "standard" | "depth" | "minimal";
type SectionId = "hero" | "about" | "projects" | "focus" | "contact" | string;

interface SceneContextType {
    mode: SceneMode;
    setMode: (mode: SceneMode) => void;
    activeSection: SectionId;
    setActiveSection: (id: SectionId) => void;
    isNavigating: boolean;
    setIsNavigating: (val: boolean) => void;
    isFocusing: boolean;
    setIsFocusing: (val: boolean) => void;
    isSoundEnabled: boolean;
    setIsSoundEnabled: (val: boolean) => void;
    // PHASE 16 & 19: SYSTEM INTELLIGENCE LAYER
    isIdle: boolean;
    interactionCount: number;
    markInteraction: () => void;
    // PHASE 19: ADAPTIVE INTELLIGENCE SIGNALS
    scrollTempo: MotionValue<number>; // 0 (fast) to 1 (slow)
    attentionScore: MotionValue<number>; // 0 to 1
    focusZone: "top" | "center" | "bottom";
    projectInterests: Record<string, number>; // ProjectID -> InteractionCount
    markProjectInterest: (id: string) => void;
    // PHASE 20: DISCOVERY ENGINE
    discoveries: Set<string>;
    triggerDiscovery: (id: string) => void;
    lastDiscoveryTime: number;
    // PHASE 32: COMMAND INTERFACE STATE
    isCommandPaletteOpen: boolean;
    setIsCommandPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // PHASE 47: CONSOLIDATED RENDER PIPELINE
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    mouseXProgress: MotionValue<number>; // -0.5 to 0.5
    mouseYProgress: MotionValue<number>; // -0.5 to 0.5
    isLowPerf: boolean;
    isMobile: boolean;
    isScrolled: boolean;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function SceneProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<SceneMode>("standard");
    const [activeSection, setActiveSection] = useState<SectionId>("hero");
    const [isNavigating, setIsNavigating] = useState(false);
    const [isFocusing, setIsFocusing] = useState(false);
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);

    // PHASE 16: SYSTEM IDLE TRACKING & RE-ENGAGEMENT
    const [isIdle, setIsIdle] = useState(false);
    const [interactionCount, setInteractionCount] = useState(0);

    // PHASE 19: BEHAVIORAL SIGNALS (MotionValues for performance)
    const scrollTempo = useMotionValue(1);
    const attentionScore = useMotionValue(0.5);
    const [focusZone, setFocusZone] = useState<"top" | "center" | "bottom">("center");
    const [projectInterests, setProjectInterests] = useState<Record<string, number>>({});

    const [discoveries, setDiscoveries] = useState<Set<string>>(new Set());
    const [lastDiscoveryTime, setLastDiscoveryTime] = useState(0);

    // PHASE 32: COMMAND INTERFACE
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

    // PHASE 47: CONSOLIDATED RENDER PIPELINE SIGNALS
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);
    const mouseXProgress = useMotionValue(0);
    const mouseYProgress = useMotionValue(0);
    const [isLowPerf, setIsLowPerf] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Detect low-end devices via hardwareConcurrency or memory if available
        if (typeof navigator !== 'undefined') {
            const lowCpu = (navigator.hardwareConcurrency || 4) <= 4;
            // @ts-expect-error - deviceMemory is not standard yet
            const lowMem = (navigator.deviceMemory || 8) <= 4;
            if (lowCpu || lowMem) setIsLowPerf(true);
        }

        const handleGlobalMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set(clientX);
            mouseY.set(clientY);
            mouseXProgress.set(clientX / innerWidth - 0.5);
            mouseYProgress.set(clientY / innerHeight - 0.5);
        };

        window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleGlobalMouseMove);
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [mouseX, mouseY, mouseXProgress, mouseYProgress]);

    // PHASE 34: PURITY FIX - Extracted sound logic
    const playDiscoverySound = useCallback(() => {
        if (!isSoundEnabled) return;
        try {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            const ctx = new AudioContextClass();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.005, ctx.currentTime + 0.01);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch { /* silent fail */ }
    }, [isSoundEnabled]);

    const triggerDiscovery = useCallback((id: string) => {
        setDiscoveries(prev => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            return next;
        });
        
        // Purity fix: side-effects outside of state updater
        setLastDiscoveryTime(Date.now());
        playDiscoverySound();
    }, [playDiscoverySound]);

    const markProjectInterest = useCallback((id: string) => {
        setProjectInterests(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
        // Boost attention score on interaction
        attentionScore.set(Math.min(1, attentionScore.get() + 0.1));
    }, [attentionScore]);

    const pathname = usePathname();

    const markInteraction = useCallback(() => {
        setIsIdle(false);
        setInteractionCount(prev => prev + 1);
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

        const resetIdle = () => {
            setIsIdle(false);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setIsIdle(true);
                attentionScore.set(attentionScore.get() * 0.8); // Decay attention on idle
            }, 4000);
        };

        const handleScroll = () => {
            resetIdle();
            const currentScrollY = window.scrollY;
            const delta = Math.abs(currentScrollY - lastScrollY);
            lastScrollY = currentScrollY;

            // Calculate tempo (Step 4: fast scroll -> low tempo)
            const newTempo = Math.max(0, 1 - delta / 100);
            scrollTempo.set(scrollTempo.get() * 0.8 + newTempo * 0.2); // Smooth transition

            // Calculate zone (Step 2)
            const viewportHeight = window.innerHeight;
            const scrollPos = currentScrollY % viewportHeight;
            if (scrollPos < viewportHeight * 0.3) setFocusZone("top");
            else if (scrollPos > viewportHeight * 0.7) setFocusZone("bottom");
            else setFocusZone("center");
        };

        window.addEventListener("mousemove", resetIdle);
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("keydown", resetIdle);
        window.addEventListener("touchstart", resetIdle, { passive: true });

        resetIdle();

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", resetIdle);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("keydown", resetIdle);
            window.removeEventListener("touchstart", resetIdle);
        };
    }, [attentionScore, scrollTempo]);

    // Reset navigating state after transitions
    useEffect(() => {
        if (isNavigating) {
            const timer = setTimeout(() => setIsNavigating(false), 800);
            return () => clearTimeout(timer);
        }
    }, [isNavigating]);

    // Sync activeSection with scroll position via IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: [0.1, 0.4, 0.6], rootMargin: "-20% 0px -20% 0px" }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    // Update section context on route change
    useEffect(() => {
        requestAnimationFrame(() => {
            if (pathname === "/") setActiveSection("hero");
            else setActiveSection(pathname.replace("/", ""));
        });
    }, [pathname]);

    return (
        <SceneContext.Provider value={{
            mode, setMode,
            activeSection, setActiveSection,
            isNavigating, setIsNavigating,
            isFocusing, setIsFocusing,
            isSoundEnabled, setIsSoundEnabled,
            isIdle, interactionCount, markInteraction,
            scrollTempo, attentionScore, focusZone, projectInterests, markProjectInterest,
            discoveries, triggerDiscovery, lastDiscoveryTime,
            isCommandPaletteOpen, setIsCommandPaletteOpen,
            mouseX, mouseY, mouseXProgress, mouseYProgress, isLowPerf, isMobile, isScrolled
        }}>
            <div className={`scene-mode-${mode} ${isIdle ? 'system-idle' : 'system-active'} focus-zone-${focusZone}`}>
                {children}
            </div>
        </SceneContext.Provider>
    );
}

export function useScene() {
    const context = useContext(SceneContext);
    if (context === undefined) {
        throw new Error("useScene must be used within a SceneProvider");
    }
    return context;
}
