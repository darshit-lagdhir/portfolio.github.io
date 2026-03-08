"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useScene } from "@/context/SceneContext";
import { EASE, DUR } from "@/components/brutalist/SystemComponents";



// PHASE 25 STEP 13: MOBILE TOUCH FEEDBACK
export function TapRipple() {
    const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);
    const idRef = useRef(0);

    useEffect(() => {
        const handleTap = (e: MouseEvent | TouchEvent) => {
            const x = 'clientX' in e ? e.clientX : (e as TouchEvent).touches[0].clientX;
            const y = 'clientY' in e ? e.clientY : (e as TouchEvent).touches[0].clientY;

            const newRipple = { x, y, id: idRef.current++ };
            setRipples(prev => [...prev, newRipple]);

            setTimeout(() => {
                setRipples(prev => prev.filter(r => r.id !== newRipple.id));
            }, 1000);
        };

        window.addEventListener("mousedown", handleTap);
        window.addEventListener("touchstart", handleTap, { passive: true });
        return () => {
            window.removeEventListener("mousedown", handleTap);
            window.removeEventListener("touchstart", handleTap);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <AnimatePresence>
                {ripples.map(r => (
                    <motion.div
                        key={r.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute w-12 h-12 border border-white/30 rounded-full"
                        style={{ left: r.x - 24, top: r.y - 24 }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}

// PHASE 20 STEP 5: INTERACTION FEEDBACK DOT
export function DiscoveryFeedbackDot() {
    const { lastDiscoveryTime } = useScene();
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    useEffect(() => {
        if (!lastDiscoveryTime) return;
        
        const check = () => {
            const diff = Date.now() - lastDiscoveryTime;
            setIsActive(diff < 2000);
        };
        
        check();
        const interval = setInterval(check, 200);
        return () => clearInterval(interval);
    }, [lastDiscoveryTime]);

    if (!isActive) return null;

    return (
        <>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 4, 0], opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className="fixed pointer-events-none z-[300] w-2 h-2 rounded-full bg-white blur-[2px]"
                style={{ left: mousePos.x, top: mousePos.y, x: "-50%", y: "-50%" }}
            />
            <motion.div
                initial={{ scale: 0, opacity: 1, borderWidth: "2px" }}
                animate={{ scale: 6, opacity: 0, borderWidth: "0px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed pointer-events-none z-[299] w-4 h-4 rounded-full border-white"
                style={{ left: mousePos.x, top: mousePos.y, x: "-50%", y: "-50%" }}
            />
        </>
    );
}

// PHASE 21 STEP 9: CROSS-PAGE CONNECTION
export function CrossPageContinuity() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setIsVisible(true));
        const timer = setTimeout(() => requestAnimationFrame(() => setIsVisible(false)), DUR.PAGE * 1000);
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ opacity: 0, transition: { duration: DUR.MEDIUM, ease: EASE.ENTRY } }}
                    transition={{ duration: 1.2, ease: EASE.ENTRY }}
                    className="fixed top-0 left-[50%] w-px h-full bg-white/10 z-[50] origin-top pointer-events-none"
                />
            )}
        </AnimatePresence>
    );
}

// PHASE 36 STEP 7: MINIMAL SCROLL PROGRESS INDICATOR
export function ScrollProgressIndicator() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, { damping: 50, stiffness: 300 });

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 w-[1px] h-[30vh] bg-white/10 z-[100] origin-center hidden md:block overflow-hidden">
            <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-white origin-top"
                style={{ scaleY }}
            />
        </div>
    );
}
