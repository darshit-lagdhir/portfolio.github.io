"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * GLOBAL PAGE TEMPLATE
 * Orchestrates entry animations and system state resets during route changes.
 * Ensures the portal resets to the origin coordinates (0,0) on every navigation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        // SYSTEM_RESET: Ensure scroll coordinates return to origin on route jump
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.5, 
                ease: [0.22, 1, 0.36, 1], // Precise architectural easing
                delay: 0.1 
            }}
            className="w-full relative"
        >
            {children}
        </motion.div>
    );
}
