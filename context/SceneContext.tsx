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
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function SceneProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<SceneMode>("standard");
    const [activeSection, setActiveSection] = useState<SectionId>("hero");
    const [isNavigating, setIsNavigating] = useState(false);
    const [isFocusing, setIsFocusing] = useState(false);
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);
    const pathname = usePathname();

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
            isSoundEnabled, setIsSoundEnabled
        }}>
            <div className={`scene-mode-${mode}`}>
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
