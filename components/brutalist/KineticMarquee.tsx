"use client";

import { motion, useMotionValue } from "framer-motion";
import { useRef, useMemo } from "react";
import { useScene } from "@/context/SceneContext";

const MARQUEE_WORDS = [
    "SELECTED WORK",
    "SYSTEM DESIGN",
    "SOFTWARE ENGINEERING",
    "BACKEND ARCHITECTURE",
    "BUILDING SYSTEMS",
    "LOGIC-FIRST",
    "STRUCTURAL CODE",
    "DIGITAL PRECISION",
];

export default function KineticMarquee() {
    const { isMobile } = useScene();
    const containerRef = useRef<HTMLDivElement>(null);
    const isHovered = useMotionValue(0);

    const handleEnter = () => isHovered.set(1);
    const handleLeave = () => isHovered.set(0);

    // Double the content for seamless loop
    const content = useMemo(() => [...MARQUEE_WORDS, ...MARQUEE_WORDS], []);

    return (
        <div
            ref={containerRef}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className={`relative w-full overflow-hidden py-10 border-y border-white/5 ${isMobile ? '' : 'cursor-none'} bg-black`}
        >
            {/* STEP 3: INFINITE MARQUEE BAND */}
            <motion.div 
                className="flex whitespace-nowrap"
                animate={{ x: [0, "-50%"] }}
                transition={{ 
                    duration: 40, // Base duration, dynamic linking to animDuration requires MotionValue on style
                    repeat: Infinity, 
                    ease: "linear" 
                }}
                style={{
                    // Linking animDuration to actual speed would require a custom ticker or useTime
                    // For now, we'll keep the base animation stable
                }}
            >
                {content.map((word, i) => (
                    <span
                        key={`${word}-${i}`}
                        className="text-[4vw] md:text-[3vw] font-heading font-black italic text-white/10 tracking-[0.4em] px-[5vw] transition-colors duration-500 hover:text-white/30 select-none"
                    >
                        {word}
                        <span className="text-white/5 px-[3vw]">—</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
