"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScene } from "@/context/SceneContext";

// PHASE 1: CENTRAL MOTION CONTROLLER
const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

export default function BrutalistNavbar() {
    const pathname = usePathname();
    const { mode, setMode, setIsNavigating, activeSection } = useScene();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "01_START", href: "/#hero" },
        { name: "02_PHILO", href: "/#about" },
        { name: "03_SYNC", href: "/#projects" },
        { name: "04_BENTO", href: "/#focus" },
        { name: "05_TERM", href: "/#contact" },
    ];

    const modes = [
        { id: "standard", label: "STD" },
        { id: "depth", label: "DPT" },
        { id: "minimal", label: "MIN" }
    ] as const;

    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: GLOBAL_EASE }}
            className={`
                fixed top-0 left-0 w-full z-[2000] transition-all duration-500 select-none
                ${scrolled ? "py-4 bg-[#050505]/90 backdrop-blur-2xl border-b border-white/5" : "py-10 bg-[#050505]/0"}
            `}
        >
            <nav className="grid-poster items-center">
                {/* PHASE 3: LEFT-DOMINANT LOGO */}
                <div className="col-span-6 md:col-span-3">
                    <Link
                        href="/"
                        onClick={() => setIsNavigating(true)}
                        className="group flex flex-col gap-1"
                    >
                        <span className="text-micro font-bold tracking-[0.4em] opacity-20 group-hover:opacity-100 transition-opacity">DARSHIT_LAGDHIR</span>
                        <span className="text-micro font-light opacity-10 group-hover:opacity-30 transition-opacity">SYSTEM_ARCHITECT // v.01</span>
                    </Link>
                </div>

                {/* PHASE 127.2: MODE SWITCHER (TIER 3 AMBIENT) */}
                <div className="hidden lg:flex col-start-4 col-span-3 gap-6 items-center">
                    <div className="flex gap-4 p-1 opacity-10 hover:opacity-100 transition-opacity duration-700">
                        {modes.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMode(m.id)}
                                className={`
                                    elastic-micro text-[9px] font-bold tracking-[0.2em] relative px-2 py-1 rounded-sm
                                    ${mode === m.id ? "text-white" : "text-white/40 hover:text-white/80"}
                                `}
                            >
                                {m.label}
                                {mode === m.id && (
                                    <motion.div layoutId="nav-mode-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* PHASE 127.1: NAV LINKS (TIER 2 SECONDARY) */}
                <div className="hidden md:flex md:col-start-7 md:col-span-6 lg:col-start-8 lg:col-span-5 justify-end gap-x-10">
                    {navLinks.map((link) => {
                        const linkSection = link.href.replace("/#", "");
                        const isActive = activeSection === linkSection || (activeSection === 'hero' && linkSection === 'hero');

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsNavigating(true)}
                                className={`
                                    relative text-micro font-bold tracking-[0.3em] elastic-micro
                                    block text-highlight-sweep h-4 transition-all duration-700
                                    ${isActive ? "text-white active drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] scale-110" : "text-white/10 hover:text-white/60"} 
                                `}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* MOBILE TRIGGER */}
                <div className="col-span-6 md:hidden flex justify-end">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white font-bold text-[9px] tracking-[0.4em] flex items-center gap-4"
                    >
                        [ {menuOpen ? "CLOSE" : "SYNC"} ]
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: GLOBAL_EASE }}
                        className="fixed inset-0 bg-[#050505] z-[3000] flex flex-col p-12 justify-center"
                    >
                        <div className="flex flex-col gap-8">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05, ease: GLOBAL_EASE }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => { setMenuOpen(false); setIsNavigating(true); }}
                                        className="text-large text-white group block italic hover:tracking-tighter transition-all duration-500"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-20 border-t border-white/5 pt-10 flex flex-col gap-6">
                            <span className="text-micro opacity-30">SCENE_MODES</span>
                            <div className="flex gap-8">
                                {modes.map(m => (
                                    <button
                                        key={m.id}
                                        onClick={() => setMode(m.id)}
                                        className={`text-micro ${mode === m.id ? 'text-white' : 'text-white/20'}`}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setMenuOpen(false)} className="mt-10 text-micro text-white/40 self-start">[ DISCONNECT_SESSION ]</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
