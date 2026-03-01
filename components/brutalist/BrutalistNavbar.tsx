"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BrutalistNavbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Portfolio", href: "/" },
        { name: "Archive", href: "/#projects" },
        { name: "Focus", href: "/#about" },
        { name: "Connect", href: "/#contact" },
    ];

    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 1.2 }}
            className={`
                fixed top-0 left-0 w-full z-100 transition-all duration-500
                ${scrolled ? "py-4 bg-background/95 backdrop-blur-3xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "py-10 md:py-14 bg-transparent border-b border-transparent"}
            `}
        >
            <nav className="grid-layout items-baseline md:pl-[6%] lg:pl-[10%]">
                <div className="col-span-12 md:col-span-4 lg:col-span-3">
                    <Link
                        href="/"
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

                <div className="hidden md:flex md:col-start-7 md:col-span-6 lg:col-start-9 lg:col-span-4 justify-end gap-x-12 lg:gap-x-16">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`
                                    relative font-wide text-step--1 uppercase tracking-micro font-bold 
                                    transition-all duration-500
                                    ${isActive ? "text-white" : "text-muted hover:text-white"}
                                `}
                            >
                                <motion.span
                                    whileHover={{ scale: 1.02, translateZ: 25 }}
                                    className="inline-block link-underline"
                                >
                                    {link.name}
                                </motion.span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </motion.header>
    );
}
