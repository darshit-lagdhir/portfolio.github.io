"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];
const MICRO_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function BrutalistNavbar() {
    const { activeSection, isIdle, markInteraction } = useScene();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "01_HOME", href: "/#hero", id: "hero" },
        { name: "02_WORK", href: "/#projects", id: "projects" },
        { name: "03_ABOUT", href: "/#about", id: "about" },
        { name: "04_SYNC", href: "/#contact", id: "contact" },
    ];

    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{
                opacity: isIdle ? 0.3 : 1,
                y: isIdle ? -10 : 0,
                filter: isIdle ? "blur(2px)" : "blur(0px)"
            }}
            transition={{ duration: 1.2, ease: GLOBAL_EASE }}
            className={`
                fixed top-0 left-0 w-full z-[2000] select-none transition-all duration-700
                ${scrolled ? "py-3 bg-[#000000] border-b border-white/30" : isIdle ? "py-4" : "py-5 md:py-8 bg-transparent"}
            `}
        >
            <nav className="flex justify-between items-center px-[5vw] w-full max-w-[1800px] mx-auto">
                {/* BRAND — LEFT ALIGNED */}
                <Link href="/" className="group flex items-center shrink-0">
                    <span className="text-[clamp(0.75rem,1.5vw,1.1rem)] text-white font-ui tracking-tight italic font-semibold">DARSHIT.L</span>
                </Link>

                {/* SECTION INDEX — RIGHT ALIGNED — PHASE 4 */}
                <div className="hidden md:flex gap-6 lg:gap-10 items-baseline">
                    {navLinks.map((link, i) => (
                        <MagneticNavItem key={link.name} link={link} index={i} isActive={activeSection === link.id} />
                    ))}
                </div>

                {/* MOBILE TRIGGER */}
                <div className="md:hidden flex">
                    <button
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                            markInteraction();
                        }}
                        className="text-white font-bold text-[10px] tracking-[0.4em] p-2"
                    >
                        {menuOpen ? "[ CLOSE ]" : "[ MENU ]"}
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU — PHASE 3 */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#000000] z-[3000] flex flex-col justify-center px-[10vw] gap-16"
                    >
                        {navLinks.map((link, idx) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.6, ease: GLOBAL_EASE }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-large-mini italic text-white font-heading font-bold hover:tracking-tighter transition-all uppercase"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="mt-10 text-micro text-white/40 self-start tracking-widest font-ui font-bold underline"
                        >
                            CLOSE_SESSION
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

// PHASE 11 STEP 2 & 7: MAGNETIC NAV ITEM
function MagneticNavItem({
    link,
    index,
    isActive
}: {
    link: { name: string, href: string, id: string };
    index: number;
    isActive: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { triggerDiscovery, discoveries } = useScene();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!isHovering || discoveries.has(`NAV_EXPAND_${index}`)) return;
        const timer = setTimeout(() => {
            triggerDiscovery(`NAV_EXPAND_${index}`);
        }, 1200);
        return () => clearTimeout(timer);
    }, [isHovering, index, triggerDiscovery, discoveries]);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    return (
        <motion.div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.93 }}
            transition={{ scale: { type: "spring", stiffness: 400, damping: 15 } }}
            className={`relative group magnetic-btn tactile-btn`}
        >
            <Link
                href={link.href}
                className={`
                    flex items-baseline gap-2 text-micro font-bold tracking-[0.4em] transition-all duration-300
                    font-ui ${isActive ? "text-white" : "text-white/40 hover:text-white/80"} 
                `}
            >
                <motion.span
                    initial={false}
                    animate={
                        discoveries.has(`NAV_EXPAND_${index}`)
                            ? { scale: [1, 2.5, 1], x: [0, -5, 0], opacity: [0.4, 1, 0.4] }
                            : (isActive ? { rotateX: [-90, 0], opacity: 1, scale: 1.25 } : { rotateX: 0, opacity: 0.4, scale: 1 })
                    }
                    transition={{ duration: 0.8, ease: "circInOut" }}
                    className="text-[8px] transform-gpu origin-bottom inline-block"
                >
                    {`0${index + 1}`}
                </motion.span>
                {link.name.replace(/^\d+_/, '')}
            </Link>
            {isActive && (
                <motion.div
                    layoutId="nav-line"
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-white translate-y-1"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </motion.div>
    );
}
