"use client";

import { motion, useSpring, useMotionValue, useTransform, useScroll, MotionValue, useMotionTemplate } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";
import { useScene } from "@/context/SceneContext";
import { usePathname } from "next/navigation";
import { DUR } from "@/components/brutalist/SystemComponents";

// PHASE 43: GRID NODE REACTION (STEP 4)
// PHASE 46: SIMPLIFIED STATIC GRID NODES
function GridDiscoveryNodes() {
    const nodes = useMemo(() => {
        const arr = [];
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 6; y++) {
                arr.push({ x: (x + 1) * 16, y: (y + 1) * 16, id: `${x}-${y}` });
            }
        }
        return arr;
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden opacity-10">
            {nodes.map(node => (
                <div 
                    key={node.id}
                    className="discovery-node absolute"
                    style={{ left: `${node.x}%`, top: `${node.y}%`, width: '2px', height: '2px', background: 'white', opacity: 0.2 }}
                />
            ))}
        </div>
    );
}

export default function EnvironmentalSystem() {
    const { activeSection, isIdle, interactionCount, attentionScore, mouseX, mouseY, isMobile } = useScene();
    
    // Smooth trailing follow for atmospheric light
    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 200 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 200 });

    const pathname = usePathname();
    const isProjectPage = pathname !== "/" && pathname !== "";

    // PHASE 18 STEP 11: REACTIVATION LIGHT SURGE
    const [surge, setSurge] = useState(1);
    useEffect(() => {
        if (!isIdle && interactionCount > 0) {
            requestAnimationFrame(() => setSurge(1.15));
            const timer = setTimeout(() => requestAnimationFrame(() => setSurge(1)), DUR.PAGE * 1000);
            return () => clearTimeout(timer);
        }
    }, [isIdle, interactionCount]);

    // PHASE 37 STEP 1 & 9: SECTION-AWARE AMBIENT & SCROLL DEPTH SHADING
    const baseIntensityValue = useMemo(() => {
        if (isProjectPage) return 0.04; 
        switch (activeSection) {
            case "hero": return 0.12; 
            case "projects": return 0.08;
            case "about": return 0.04;
            case "contact": return 0.06;
            default: return 0.05;
        }
    }, [activeSection, isProjectPage]);

    // Attention-driven intensity calculation
    const targetIntensity = useTransform(attentionScore, (a: number) =>
        (baseIntensityValue * (isIdle ? 0.3 : 1)) + (a * 0.05)
    );

    const smoothIntensity = useSpring(useTransform(targetIntensity, v => v * surge), { 
        damping: 50, 
        stiffness: 80,
    });

    const { scrollYProgress } = useScroll();

    // PHASE 37 STEP 1: GLOBAL AMBIENT LIGHT LAYER
    const ambientBackground = useTransform(
        scrollYProgress,
        [0, 1],
        [
            "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.02) 0%, transparent 70%)",
            "radial-gradient(circle at 50% 70%, rgba(255,255,255,0.02) 0%, transparent 70%)"
        ]
    );

    const cursorLightBackground = useMotionTemplate`radial-gradient(circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(255,255,255,${smoothIntensity}) 0%, transparent 60%)`;

    return (
        <div className="fixed inset-0 pointer-events-none z-[40]">
            {/* PHASE 43 IDLE BREATHING (STEP 12) */}
            <motion.div 
                animate={{ opacity: isIdle ? [0.4, 0.7, 0.4] : 1 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0"
            >
                {/* CONSOLIDATED DYNAMIC LIGHTING SOURCE (PHASE 47) */}
                {!isMobile && (
                    <motion.div
                        className="absolute inset-0 z-0 transform-gpu"
                        style={{ background: cursorLightBackground }}
                    />
                )}

                {/* GLOBAL AMBIENT LAYER (PHASE 37) */}
                <motion.div 
                    className="absolute inset-0"
                    style={{ background: ambientBackground, opacity: isMobile ? 0.3 : 1 }}
                />
            </motion.div>
            
            {!isMobile && <GridDiscoveryNodes />}
            
            {/* ATMOSPHERIC DENSITY OVERLAY (STEP 11) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_80%)]" />
        </div>
    );
}
