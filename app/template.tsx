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

    // PHASE 12: CINEMATIC TIMING (SUB-600MS)
    const [duration, setDuration] = useState(0.55);

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

    // PHASE 9 STEP 12: CAMERA ZOOM ENTRY FOR PROJECT PAGES
    const isProjectPage = pathname !== "/";

    // PHASE 6: MASK REVEAL ENTRY (STEP 2) + PHASE 9 STEP 4: VIEWPORT SHUTTER
    const variants = {
        initial: (dir: string) => ({
            clipPath: dir === "forward" ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
            translateY: dir === "forward" ? "20%" : "-20%",
            scale: isProjectPage ? 1.02 : 1,
            zIndex: 10,
        }),
        animate: {
            clipPath: "inset(0% 0 0 0)",
            translateY: "0%",
            scale: 1,
            zIndex: 10,
            transition: { duration, ease, delay: 0.1 }
        },
        exit: (dir: string) => ({
            clipPath: dir === "forward" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)",
            translateY: dir === "forward" ? "-20%" : "20%",
            scale: 0.98,
            zIndex: 0,
            transition: { duration: duration * 0.8, ease }
        }),
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
