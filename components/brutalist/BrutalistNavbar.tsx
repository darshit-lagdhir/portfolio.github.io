"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

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
        { name: "START", href: "/#hero", id: "hero" },
        { name: "ARCHIVE", href: "/#projects", id: "projects" },
        { name: "IDENTITY", href: "/#about", id: "about" },
        { name: "CONTACT", href: "/#contact", id: "contact" },
    ];

    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: GLOBAL_EASE }}
            className={`
                fixed top-0 left-0 w-full z-[2000] select-none transition-all duration-1000
                ${scrolled ? "py-4 bg-[#030303]/90 backdrop-blur-xl border-b border-white/5" : "py-10 bg-transparent"}
            `}
        >
            <nav className="grid-poster items-center px-[5vw]">
                {/* LOGO AREA — PHASE 2 AALTO IDENTITY */}
                <div className="col-span-6 md:col-span-4">
                    <Link href="/" className="group flex flex-col gap-1 items-start">
                        <span className="text-medium text-white italic tracking-tight font-display group-hover:tracking-tighter transition-all duration-700">D_L</span>
                        <span className="text-[10px] font-sans opacity-10 group-hover:opacity-40 transition-opacity tracking-[0.2em] uppercase font-bold">SYSTEM_01 // 2024</span>
                    </Link>
                </div>

                {/* NAV LINKS — PHASE 2 HK GROTESK WIDE */}
                <div className="hidden md:flex md:col-span-8 justify-end gap-16">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`
                                    relative text-micro font-bold tracking-[0.5em] transition-all duration-700
                                    font-wide ${isActive ? "text-white opacity-100 scale-105" : "text-white/20 hover:text-white/60"} 
                                `}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute -bottom-1 left-0 w-full h-[1px] bg-white opacity-60"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* MOBILE TRIGGER */}
                <div className="col-span-6 md:hidden flex justify-end">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white font-bold text-[9px] tracking-[0.5em] p-2 hover:opacity-60 transition-opacity"
                    >
                        {menuOpen ? "[ CLOSE ]" : "[ SYNC ]"}
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU — PHASE 2 */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#030303] z-[3000] flex flex-col justify-center px-[10vw]"
                    >
                        <div className="flex flex-col gap-12">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.8, ease: GLOBAL_EASE }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-massive-mini italic text-white hover:tracking-tighter transition-all uppercase font-display"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="mt-20 text-micro text-white/20 self-start tracking-widest font-sans font-bold"
                        >
                            [ DISCONNECT_SESSION ]
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
