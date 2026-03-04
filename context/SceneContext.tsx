"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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
    // PHASE 16: SYSTEM INTELLIGENCE LAYER
    isIdle: boolean;
    interactionCount: number;
    markInteraction: () => void;
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
    const pathname = usePathname();

    const markInteraction = React.useCallback(() => {
        setIsIdle(false);
        setInteractionCount(prev => prev + 1);
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const resetIdle = () => {
            setIsIdle(false);
            clearTimeout(timeout);
            timeout = setTimeout(() => setIsIdle(true), 4000); // 4 seconds of NO interaction = IDLE
        };

        window.addEventListener("mousemove", resetIdle);
        window.addEventListener("scroll", resetIdle, { passive: true });
        window.addEventListener("keydown", resetIdle);
        window.addEventListener("touchstart", resetIdle, { passive: true });

        resetIdle(); // Start timer

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", resetIdle);
            window.removeEventListener("scroll", resetIdle);
            window.removeEventListener("keydown", resetIdle);
            window.removeEventListener("touchstart", resetIdle);
        };
    }, []);

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
        if (pathname === "/") setActiveSection("hero");
        else setActiveSection(pathname.replace("/", ""));
    }, [pathname]);

    return (
        <SceneContext.Provider value={{
            mode, setMode,
            activeSection, setActiveSection,
            isNavigating, setIsNavigating,
            isFocusing, setIsFocusing,
            isSoundEnabled, setIsSoundEnabled,
            isIdle, interactionCount, markInteraction
        }}>
            <div className={`scene-mode-${mode} ${isIdle ? 'system-idle' : 'system-active'}`}>
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
