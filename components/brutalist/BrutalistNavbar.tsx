"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScene } from "@/context/SceneContext";

export default function BrutalistNavbar() {
    const pathname = usePathname();
    const { mode, setMode, setIsNavigating } = useScene();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Portfolio", href: "/" },
        { name: "Archive", href: "/#projects" },
        { name: "Focus", href: "/#about" },
        { name: "Connect", href: "/#contact" },
    ];

    const modes = [
        { id: "standard", label: "STD" },
        { id: "depth", label: "DPT" },
        { id: "minimal", label: "MIN" }
    ] as const;

    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 1.2 }}
            className={`
                fixed top-0 left-0 w-full z-[1000] transition-all duration-500
                ${scrolled ? "py-4 bg-background/95 backdrop-blur-3xl border-b border-border" : "py-10 md:py-14 bg-transparent border-b border-transparent"}
            `}
        >
            <nav className="grid-layout items-baseline md:pl-[6%] lg:pl-[10%]">
                <div className="col-span-8 md:col-span-4 lg:col-span-3">
                    <Link
                        href="/"
                        onClick={() => setIsNavigating(true)}
                        className="group font-title text-step-0 text-white uppercase tracking-tight-title font-bold block"
                    >
                        <motion.span
                            whileHover={{ scale: 1.02, translateZ: 20 }}
                            className="inline-block transition-transform duration-500 italic"
                        >
                            DARSHIT LAGDHIR
                        </motion.span>
                    </Link>
                </div>

                {/* SCENE MODE SWITCHER (PHASE 5) */}
                <div className="hidden lg:flex col-start-4 gap-4 items-center">
                    <span className="font-mono text-[9px] opacity-20 tracking-widest uppercase">SYS_MODE:</span>
                    <div className="flex gap-2 bg-white/5 p-1 rounded-sm border border-white/10">
                        {modes.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMode(m.id)}
                                className={`
                                    font-mono text-[9px] px-2 py-0.5 rounded-xs transition-all duration-300
                                    ${mode === m.id ? "bg-white text-black" : "text-muted hover:text-white hover:bg-white/10"}
                                `}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="hidden md:flex md:col-start-7 md:col-span-6 lg:col-start-9 lg:col-span-4 justify-end gap-x-12 lg:gap-x-16">
                    {navLinks.map((link, idx) => {
                        const isActive = pathname === link.href;
                        return (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 + idx * 0.1, duration: 0.5, ease }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsNavigating(true)}
                                    className={`
                                        relative font-wide text-step--1 uppercase tracking-micro font-bold 
                                        transition-all duration-500 block link-underline
                                        ${isActive ? "text-white" : "text-muted hover:text-white"}
                                    `}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* MOBILE HAMBURGER (PHASE 12) */}
                <div className="col-span-4 md:hidden flex justify-end">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white font-mono text-[10px] tracking-widest"
                    >
                        {menuOpen ? "[ CLOSE ]" : "[ MENU ]"}
                    </button>
                </div>
            </nav>

            {/* MOBILE NAV PANEL (PHASE 12) */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.5, ease }}
                        className="fixed inset-0 bg-background/98 z-[2000] flex flex-col items-center justify-center gap-10"
                    >
                        {navLinks.map((link, idx) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => { setMenuOpen(false); setIsNavigating(true); }}
                                    className="font-title text-step-3 text-white uppercase"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}

                        <div className="mt-10 flex flex-col items-center gap-4">
                            <span className="font-mono text-[10px] opacity-40">SCENE_MODES:</span>
                            <div className="flex gap-4">
                                {modes.map(m => (
                                    <button
                                        key={m.id}
                                        onClick={() => setMode(m.id)}
                                        className={`font-mono text-[11px] ${mode === m.id ? 'text-white underline' : 'text-muted'}`}
                                    >
                                        {m.id.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
