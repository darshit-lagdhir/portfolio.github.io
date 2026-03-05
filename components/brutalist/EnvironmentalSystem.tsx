"use client";

import { motion, useSpring, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useScene } from "@/context/SceneContext";

// PHASE 18: ENVIRONMENTAL VISUAL FEEDBACK + DYNAMIC LIGHT FIELD
// Provides a subtle visual environment that reacts to user presence.
// Subdued, architectural, and minimal.

export default function EnvironmentalSystem() {
    const { activeSection, isIdle, interactionCount, attentionScore } = useScene();
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);
    const [isMobile, setIsMobile] = useState(false);

    // Smooth spotlight coordinates (Refined for Phase 22)
    const lightX = useSpring(mouseX, { damping: 60, stiffness: 150, mass: 1 });
    const lightY = useSpring(mouseY, { damping: 60, stiffness: 150, mass: 1 });

    // PHASE 18 STEP 11: REACTIVATION LIGHT SURGE
    const [surge, setSurge] = useState(1);
    useEffect(() => {
        if (!isIdle && interactionCount > 0) {
            setSurge(1.2); // Reduced surge for subtlety
            const timer = setTimeout(() => setSurge(1), 1500);
            return () => clearTimeout(timer);
        }
    }, [isIdle, interactionCount]);

    // PHASE 18 STEP 2 & PHASE 19 STEP 1, 10: SECTION AWARE & ATTENTION-DRIVEN LIGHT
    const baseIntensityValue =
        activeSection === "hero" ? 0.08 :
            activeSection === "projects" ? 0.05 :
                activeSection === "about" || activeSection === "contact" ? 0 :
                    0.03;

    // STEP 10: Stability Mode (dimmer on idle) + STEP 1: Attention Boost
    const targetIntensity = useTransform(attentionScore, (a: number) =>
        (baseIntensityValue * (isIdle ? 0.4 : 1)) + (a * 0.04)
    );

    const transformForSpring = useTransform(targetIntensity, v => v * surge);
    const smoothIntensity = useSpring(transformForSpring, { damping: 50, stiffness: 80 });

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

    const mobileBackground = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [
            "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.02) 0%, transparent 60%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)",
            "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.02) 0%, transparent 60%)"
        ]
    );

    const desktopBackground = useTransform([lightX, lightY, smoothIntensity], ([x, y, op]) => {
        return `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,${op}) 0%, transparent 70%)`;
    });

    if (isMobile) {
        // MOBILE LIGHT SYSTEM (STEP 12)
        return (
            <motion.div
                className="fixed inset-0 pointer-events-none z-[40]"
                style={{ background: mobileBackground }}
            />
        );
    }

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[40] transition-opacity duration-1000"
            style={{
                opacity: activeSection === "about" || activeSection === "contact" ? 0 : 1,
                // GLOBAL LIGHT FIELD (STEP 1)
                background: desktopBackground
            }}
        />
    );
}
