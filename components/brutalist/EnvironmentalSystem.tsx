"use client";

import { motion, useSpring, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useScene } from "@/context/SceneContext";

// PHASE 18: ENVIRONMENTAL VISUAL FEEDBACK + DYNAMIC LIGHT FIELD
// Provides a subtle visual environment that reacts to user presence.
// Subdued, architectural, and minimal.

export default function EnvironmentalSystem() {
    const { activeSection, isIdle, interactionCount } = useScene();
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);
    const [isMobile, setIsMobile] = useState(false);

    // Smooth spotlight coordinates
    const lightX = useSpring(mouseX, { damping: 45, stiffness: 200, mass: 1 });
    const lightY = useSpring(mouseY, { damping: 45, stiffness: 200, mass: 1 });

    // PHASE 18 STEP 11: REACTIVATION LIGHT SURGE
    const [surge, setSurge] = useState(1);
    useEffect(() => {
        if (!isIdle && interactionCount > 0) {
            setSurge(1.4);
            const timer = setTimeout(() => setSurge(1), 1200);
            return () => clearTimeout(timer);
        }
    }, [isIdle, interactionCount]);

    // PHASE 18 STEP 2: SECTION AWARE LIGHT INTENSITY
    const intensity =
        activeSection === "hero" ? (isIdle ? 0.04 : 0.08) :
            activeSection === "projects" ? (isIdle ? 0.02 : 0.05) :
                activeSection === "about" || activeSection === "contact" ? 0 :
                    0.03; // Default

    const smoothIntensity = useSpring(intensity * surge, { damping: 30, stiffness: 100 });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        const trackMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        if (!isMobile) {
            window.addEventListener("mousemove", trackMouse, { passive: true });
        }

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", trackMouse);
        };
    }, [isMobile, mouseX, mouseY]);

    // PHASE 18 STEP 6 & 12: SCROLL-BASED LIGHT SHIFT & MOBILE FALLBACK
    const { scrollYProgress } = useScroll();
    const scrollLightY = useTransform(scrollYProgress, [0, 1], ["20%", "80%"]);

    if (isMobile) {
        // MOBILE LIGHT SYSTEM (STEP 12)
        return (
            <motion.div
                className="fixed inset-0 pointer-events-none z-[40]"
                style={{
                    background: useTransform(
                        scrollYProgress,
                        [0, 0.5, 1],
                        [
                            "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.02) 0%, transparent 60%)",
                            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)",
                            "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.02) 0%, transparent 60%)"
                        ]
                    )
                }}
            />
        );
    }

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[40] transition-opacity duration-1000"
            style={{
                opacity: activeSection === "about" || activeSection === "contact" ? 0 : 1,
                // GLOBAL LIGHT FIELD (STEP 1)
                background: useTransform([lightX, lightY, smoothIntensity], ([x, y, op]) => {
                    return `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,${op}) 0%, transparent 70%)`;
                })
            }}
        />
    );
}
