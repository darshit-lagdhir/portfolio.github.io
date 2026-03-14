"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useActiveSection, useScrollProgress, usePerformanceDetection } from "@/lib/interaction";

type SectionId = "hero" | "systems" | "domains" | "philosophy" | "about" | "contact" | string;

interface SceneContextType {
    activeSection: SectionId;
    setActiveSection: (id: SectionId) => void;
    isNavigating: boolean;
    setIsNavigating: (val: boolean) => void;
    isMobile: boolean;
    isScrolled: boolean;
    isLowPerf: boolean;
    isIdle: boolean;
    scrollProgress: number;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

const SECTIONS = ["hero", "about", "domains", "systems", "comparison", "exploration", "archive", "philosophy", "reflections", "contact"];

export function SceneProvider({ children }: { children: React.ReactNode }) {
    const [isNavigating, setIsNavigating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const idleTimer = useRef<NodeJS.Timeout | null>(null);
    
    const pathname = usePathname();
    const observedActiveSection = useActiveSection(SECTIONS);
    const [manualActiveSection, setManualActiveSection] = useState<SectionId>("");
    
    // activeSection is either manually set (during navigation locks) or observed
    const activeSection = manualActiveSection || observedActiveSection;

    const { progress: scrollProgress, isScrolled } = useScrollProgress();
    const isDetectedLowPerf = usePerformanceDetection();
    const isLowPerf = isDetectedLowPerf || isMobile;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        const resetIdleTimer = () => {
            setIsIdle(false);
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => setIsIdle(true), 15000);
        };

        checkMobile();
        resetIdleTimer();

        window.addEventListener("resize", checkMobile);
        window.addEventListener("mousemove", resetIdleTimer, { passive: true });
        window.addEventListener("keydown", resetIdleTimer, { passive: true });

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", resetIdleTimer);
            window.removeEventListener("keydown", resetIdleTimer);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, []);

    // Sync activeSection with route change if not on home
    useEffect(() => {
        if (pathname !== "/") {
            const section = pathname.replace("/", "");
            setManualActiveSection(section || "hero");
        } else {
            setManualActiveSection("");
        }
    }, [pathname]);

    // Transition lock management
    useEffect(() => {
        if (isNavigating) {
            const timer = setTimeout(() => setIsNavigating(false), 800);
            return () => clearTimeout(timer);
        }
    }, [isNavigating]);

    return (
        <SceneContext.Provider value={{
            activeSection, 
            setActiveSection: setManualActiveSection,
            isNavigating, setIsNavigating,
            isMobile, isScrolled, isLowPerf, isIdle,
            scrollProgress
        }}>
            {children}
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
