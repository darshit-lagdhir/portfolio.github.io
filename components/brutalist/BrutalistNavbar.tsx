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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#050505] border-b border-neutral-900 py-4" : "bg-transparent py-8 pt-12"
                }`}
        >
            <div className="w-full px-8 md:px-12 grid grid-cols-4 md:grid-cols-12 items-center">
                {/* Brand / Name */}
                <div className="col-span-2 md:col-span-4 lg:col-span-3">
                    <Link href="/" className="font-heading text-sm md:text-base uppercase tracking-widest text-neutral-100 hover:text-neutral-400 transition-colors">
                        Darshit Lagdhir.
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="col-span-2 md:col-span-8 lg:col-span-9 flex justify-end gap-6 md:gap-12">
                    {[
                        { name: "Home", href: "/" },
                        { name: "Systems", href: "/#projects" },
                        { name: "Contact", href: "https://github.com/darshit-lagdhir" }
                    ].map((link, i) => (
                        <Link
                            key={i}
                            href={link.href}
                            className={`font-heading text-xs md:text-xs uppercase tracking-widest transition-colors ${pathname === link.href ? "text-white border-b border-white pb-1" : "text-neutral-500 hover:text-neutral-200"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.header>
    );
}
