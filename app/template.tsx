"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, translateZ: -200, filter: "blur(20px)" }}
                animate={{ opacity: 1, translateZ: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, translateZ: 200, filter: "blur(10px)" }}
                transition={{ duration: 1.2, ease }}
                className="page-fade"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* SYSTEM TRANSITION VEIL (PHASE 8: SPACE SHIFT) */}
                <motion.div
                    initial={{ transform: "translateY(0%)" }}
                    animate={{ transform: "translateY(-100%)" }}
                    exit={{ transform: "translateY(100%)" }}
                    transition={{ duration: 1, ease }}
                    className="fixed inset-0 bg-background z-[1000] pointer-events-none"
                />
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
