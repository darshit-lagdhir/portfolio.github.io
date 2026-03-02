"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];

export default function BrutalistNavbar() {
    const { activeSection } = useScene();
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
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: GLOBAL_EASE }}
            className={`
                fixed top-0 left-0 w-full z-[2000] select-none transition-all duration-300
                ${scrolled ? "py-4 bg-[#000000] border-b border-white" : "py-10 bg-transparent"}
            `}
        >
            <nav className="flex justify-between items-center px-[5vw] w-full max-w-[1800px] mx-auto">
                {/* BRAND — LEFT ALIGNED */}
                <Link href="/" className="group flex flex-col gap-1 items-start">
                    <span className="text-medium text-white font-ui tracking-tight italic">DARSHIT.L</span>
                </Link>

                {/* SECTION INDEX — RIGHT ALIGNED */}
                <div className="hidden md:flex gap-12 items-baseline">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`
                                    relative text-micro font-bold tracking-[0.4em] transition-all duration-300
                                    font-ui ${isActive ? "text-white opacity-100" : "text-white/40 hover:text-white/80"} 
                                `}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-line"
                                        className="absolute -bottom-2 left-0 w-full h-[2px] bg-white translate-y-1"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* MOBILE TRIGGER */}
                <div className="md:hidden flex">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
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
                                    className="text-large-mini italic text-white font-heading hover:tracking-tighter transition-all uppercase"
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
