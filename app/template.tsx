"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");

    useEffect(() => {
        // TRANSITION INTELLIGENCE (PHASE 7: DIRECTIONAL AWARENESS)
        if (pathname === "/" && prevPathname.current !== "/") {
            setDirection("backward");
        } else if (pathname !== "/" && prevPathname.current === "/") {
            setDirection("forward");
        }
        prevPathname.current = pathname;
    }, [pathname]);

    const ease = [0.16, 1, 0.3, 1] as const;

    const variants = {
        initial: (dir: string) => ({
            opacity: 0,
            translateZ: dir === "forward" ? -250 : 250,
            filter: "blur(20px)",
        }),
        animate: {
            opacity: 1,
            translateZ: 0,
            filter: "blur(0px)",
        },
        exit: (dir: string) => ({
            opacity: 0,
            translateZ: dir === "forward" ? 250 : -250,
            filter: "blur(10px)",
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
                transition={{ duration: 1.2, ease }}
                className="page-fade"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* SYSTEM TRANSITION VEIL (PHASE 8: SPACE SHIFT) */}
                <motion.div
                    initial={{ transform: direction === "forward" ? "translateY(100%)" : "translateY(-100%)" }}
                    animate={{ transform: "translateY(-100%)" }}
                    exit={{ transform: direction === "forward" ? "translateY(-100%)" : "translateY(100%)" }}
                    transition={{ duration: 1, ease }}
                    className="fixed inset-0 bg-background z-[1000] pointer-events-none"
                />
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
