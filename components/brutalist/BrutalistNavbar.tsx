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
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#050505] border-b border-neutral-900 py-4" : "bg-transparent py-8 pt-12"
                }`}
        >
            <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-12 xl:px-32 grid grid-cols-4 md:grid-cols-12 items-center">
                {/* Brand / Name */}
                <div className="col-span-2 md:col-span-4 lg:col-span-3">
                    <Link href="/" className="font-heading text-step-0 uppercase tracking-micro text-neutral-100 hover:text-neutral-400 transition-colors">
                        Darshit Lagdhir.
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="col-span-2 md:col-span-8 lg:col-span-9 flex justify-end gap-16">
                    {[
                        { name: "Home", href: "/" },
                        { name: "Systems", href: "/#projects" },
                        { name: "Archive", href: "https://github.com/darshit-lagdhir" }
                    ].map((link, i) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={i}
                                href={link.href}
                                className={`font-heading text-step--1 uppercase tracking-micro link-precision transition-colors duration-200 ${isActive ? "text-white after:w-full" : "text-neutral-500 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </motion.header>
    );
}
