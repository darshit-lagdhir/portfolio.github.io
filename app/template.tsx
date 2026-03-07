"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useScene } from "@/context/SceneContext";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");
    const lastClickTime = useRef(Date.now());
    const { isNavigating } = useScene();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // PHASE 12: CINEMATIC TIMING (SUB-600MS)
    // PHASE 31: RHYTHM HARMONIZATION (PRIMARY: 600MS)
    const [duration, setDuration] = useState(0.65);

    useEffect(() => {
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
    }, [pathname]);

    const ease = [0.16, 1, 0.3, 1] as const;

    // PHASE 13 STEP 9 & 2: PROJECT ENTRY MORPH & PANEL TRANSITIONS
    const isProjectPage = pathname !== "/";

    const variants = {
        initial: (dir: string) => {
            if (isProjectPage && !isMobile) {
                // Morph from panel shape (Phase 30 Step 10)
                return {
                    clipPath: "inset(30% 10vw 30% 10vw)",
                    scale: 0.9,
                    y: "5%",
                    opacity: 0,
                    transformPerspective: 1200,
                    zIndex: 10,
                };
            }
            return {
                clipPath: isMobile ? "inset(0% 0% 0% 0%)" : (dir === "forward" ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)"),
                y: dir === "forward" ? "15%" : "-15%",
                scale: 0.95,
                opacity: 0,
                zIndex: 10,
            };
        },
        animate: {
            clipPath: "inset(0% 0% 0% 0%)",
            y: "0%",
            scale: 1,
            opacity: 1,
            zIndex: 10,
            transition: { duration: duration * 1.2, ease, delay: 0.2 } // PHASE 31 STEP 8: INTERACTION BREATHING SPACE
        },
        exit: (dir: string) => {
            if (isProjectPage && !isMobile) {
                // Collapse into panel shape (Phase 30 Step 12)
                return {
                    clipPath: "inset(30% 10vw 30% 10vw)",
                    scale: 0.9,
                    y: "5%",
                    opacity: 0,
                    zIndex: 0,
                    transition: { duration: duration, ease }
                };
            }
            return {
                clipPath: isMobile ? "inset(0% 0% 0% 0%)" : (dir === "forward" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)"),
                y: dir === "forward" ? "-15%" : "15%",
                scale: 0.95,
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
                transition={{ duration, ease }}
                className="page-fade"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* PHASE 8/13: ADVANCED PAGE TRANSITION FEEDBACK */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 bg-white z-[2000] pointer-events-none origin-bottom"
                />

                <motion.div
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
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
