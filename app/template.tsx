"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useScene } from "@/context/SceneContext";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");
    const lastClickTime = useRef(0);
    const { isNavigating } = useScene();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            if (typeof window !== 'undefined') {
                setIsMobile(window.innerWidth < 768);
            }
        });
        const handleResize = () => {
            requestAnimationFrame(() => setIsMobile(window.innerWidth < 768));
        };
        window.addEventListener("resize", handleResize);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // PHASE 12: CINEMATIC TIMING (SUB-600MS)
    // PHASE 31: RHYTHM HARMONIZATION (PRIMARY: 600MS)
    const [duration, setDuration] = useState(0.65);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const now = Date.now();
            const timeSinceLastAction = now - lastClickTime.current;

            if (timeSinceLastAction < 2000) {
                setDuration(0.4); // Faster for rapid nav
            } else {
                setDuration(0.55); // Cinematic
            }
            lastClickTime.current = now;

            if (pathname === "/" && prevPathname.current !== "/") {
                setDirection("backward");
            } else if (pathname !== "/" && prevPathname.current === "/") {
                setDirection("forward");
            }
            prevPathname.current = pathname;
        });

        return () => cancelAnimationFrame(frame);
    }, [pathname]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

    // PHASE 38 STEP 1 & 4: PROJECT PANEL EXPANSION/COLLAPSE
    const isProjectPage = pathname !== "/" && pathname !== "";

    const variants = {
        initial: (dir: string) => {
            if (isProjectPage && !isMobile) {
                return {
                    clipPath: "inset(20% 5vw 20% 5vw)", 
                    scale: 0.85,
                    y: "10%",
                    opacity: 0,
                    transformPerspective: 1500,
                    zIndex: 50,
                };
            }
            return {
                clipPath: isMobile ? "inset(0% 0% 0% 0%)" : (dir === "forward" ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)"),
                y: dir === "forward" ? "20%" : "-20%",
                scale: 0.9,
                opacity: 0,
                zIndex: 50,
            };
        },
        animate: {
            clipPath: "inset(0% 0% 0% 0%)",
            y: "0%",
            scale: 1,
            opacity: 1,
            zIndex: 50,
            transition: { 
                duration: duration * 1.5, // Slower expansion for cinematic feel
                ease: [0.19, 1, 0.22, 1] as [number, number, number, number], 
                delay: 0.1 
            }
        },
        exit: (dir: string) => {
            if (isProjectPage && !isMobile) {
                return {
                    clipPath: "inset(20% 5vw 20% 5vw)",
                    scale: 0.85,
                    y: "10%",
                    opacity: 0,
                    zIndex: 0,
                    transition: { duration: duration, ease }
                };
            }
            return {
                clipPath: isMobile ? "inset(0% 0% 0% 0%)" : (dir === "forward" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)"),
                y: dir === "forward" ? "-20%" : "20%",
                scale: 0.9,
                opacity: 0,
                zIndex: 0,
                transition: { duration: duration, ease }
            };
        },
    };

    return (
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={pathname}
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-fade"
                style={{ 
                    transformStyle: "preserve-3d",
                    pointerEvents: isNavigating ? "none" : "auto" // PHASE 38 STEP 13: INTERACTION LOCK
                }}
            >
                {/* PHASE 38 STEP 2: BACKGROUND DIMMING DURING TRANSITION */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isNavigating ? 0.4 : 0 }}
                    className="fixed inset-0 bg-black z-[100] pointer-events-none"
                    transition={{ duration: 0.4 }}
                />

                {/* PHASE 38 STEP 6: ROUTE TRANSITION OVERLAY */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
                    className="fixed inset-0 bg-white z-[2000] pointer-events-none origin-bottom"
                />

                <motion.div
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1], delay: 0.05 }}
                    className="fixed inset-0 bg-white z-[2000] pointer-events-none origin-top"
                />

                {/* PHASE 8 STEP 13: 1PX FLASH LINE AT BOUNDARY */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 0 }}
                    exit={{ scaleX: 1 }}
                    transition={{ duration: 0.15, ease: "easeOut", delay: 0.05 }}
                    className="fixed top-1/2 left-0 w-full h-[1px] bg-white z-[2001] pointer-events-none origin-left"
                />

                {/* SYSTEM PULSE ON TRANSITION (PHASE 13) */}
                <AnimatePresence>
                    {isNavigating && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-white z-[3000] pointer-events-none mix-blend-overlay"
                        />
                    )}
                </AnimatePresence>

                {/* SKELETON + MORPH LOADER */}
                <motion.div
                    initial={{ translateY: direction === "forward" ? "100%" : "-100%" }}
                    animate={{ translateY: "-100%" }}
                    exit={{ translateY: direction === "forward" ? "-100%" : "100%" }}
                    transition={{ duration: duration + 0.1, ease }}
                    className="fixed inset-0 bg-background z-[1000] pointer-events-none"
                />

                <div className="relative z-10">
                    {children}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
