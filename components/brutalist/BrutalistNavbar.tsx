"use client";

import Link from "next/link";
import { useEffect, useState, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScene } from "@/context/SceneContext";
import { EASE, DUR } from "@/components/brutalist/SystemComponents";



export default function BrutalistNavbar() {
    const { activeSection, isIdle, markInteraction, setIsCommandPaletteOpen } = useScene();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                setScrolled(window.scrollY > 40);
            }
        };
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
            transition={{ duration: DUR.PAGE, ease: EASE.CALM }}
            className={`
                fixed top-0 left-0 w-full z-[2000] select-none transition-all duration-700
                ${scrolled ? "py-8 bg-[#000000] border-b border-white/30" : isIdle ? "py-12" : "py-14 md:py-24 bg-transparent"}
            `}
        >
            <nav className="flex justify-between items-center px-[5vw] w-full max-w-[1800px] mx-auto">
                {/* BRAND — LEFT ALIGNED */}
                <Link href="/" className="group flex items-center shrink-0">
                    <span className="text-medium italic font-extrabold" style={{ fontFamily: "Panchang, sans-serif" }}>DARSHIT.L</span>
                </Link>

                {/* SECTION INDEX — RIGHT ALIGNED — PHASE 4 */}
                <div className="hidden md:flex gap-6 lg:gap-10 items-baseline">
                    {navLinks.map((link, i) => (
                        <MagneticNavItem key={link.name} link={link} index={i} isActive={activeSection === link.id} />
                    ))}
                </div>

                {/* MOBILE TRIGGER */}
                <div className="flex items-center gap-4">
                    {/* COMMAND PALETTE ICON — STEP 12 */}
                    <button
                        onClick={() => setIsCommandPaletteOpen(true)}
                        className="p-2 border border-white/10 hover:border-white/40 transition-colors group"
                        title="Command Palette (Ctrl+K)"
                    >
                        <div className="flex flex-col gap-0.5">
                            <div className="w-4 h-0.5 bg-white group-hover:scale-x-110 origin-left transition-transform" />
                            <div className="w-2 h-0.5 bg-white group-hover:scale-x-150 origin-left transition-transform" />
                            <div className="w-3 h-0.5 bg-white group-hover:scale-x-125 origin-left transition-transform" />
                        </div>
                    </button>

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
                                transition={{ delay: idx * 0.1, duration: DUR.MEDIUM, ease: EASE.ENTRY }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-medium font-bold hover:opacity-70 transition-opacity"
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

// PHASE 11 STEP 2 & 7 & PHASE 27 STEP 7: MAGNETIC NAV ITEM W/ TACTILE FEEDBACK
const MagneticNavItem = memo(({
    link,
    index,
    isActive
}: {
    link: { name: string, href: string, id: string };
    index: number;
    isActive: boolean;
}) => {
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
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ 
                duration: isHovering ? DUR.MEDIUM : DUR.SLOW,
                ease: isHovering ? EASE.ENTRY : EASE.EXIT
            }}
            className="relative group magnetic-btn tactile-btn transform-gpu"
        >
            <Link
                href={link.href}
                className={`
                    flex items-baseline gap-2 text-micro font-bold transition-all duration-300
                    font-ui ${isActive ? "text-white" : "text-white/40 group-hover:text-white"} 
                `}
                style={{
                    letterSpacing: isHovering ? "0.6em" : "0.4em"
                }}
            >
                <motion.span
                    initial={false}
                    animate={
                        discoveries.has(`NAV_EXPAND_${index}`)
                            ? { scale: [1, 2.5, 1], x: [0, -5, 0], opacity: [0, 1, 0] }
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
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-white translate-y-1 shadow-[0_0_10px_rgba(255,255,255,0.5)] transform-gpu"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </motion.div>
    );
});

MagneticNavItem.displayName = "MagneticNavItem";
