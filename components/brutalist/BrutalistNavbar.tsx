"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BrutalistNavbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
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

    return (
        <header
            className={`
                fixed top-0 left-0 w-full z-100 transition-all duration-300 ease-control
                ${scrolled ? "py-4 bg-background/95 backdrop-blur-md border-b border-border" : "py-8 md:py-12 bg-transparent border-b border-transparent"}
            `}
        >
            <nav className="grid-layout items-baseline">
                {/* Brand Execution (Aalto) */}
                <div className="col-span-12 md:col-span-4 lg:col-span-3">
                    <Link
                        href="/"
                        className="font-title text-step-0 text-white uppercase tracking-tight-title font-bold hover:text-muted transition-colors duration-200"
                    >
                        DARSHIT LAGDHIR
                    </Link>
                </div>

                {/* System Navigation (HK Grotesk Wide) */}
                <div className="hidden md:flex md:col-start-7 md:col-span-6 lg:col-start-9 lg:col-span-4 justify-end gap-x-12 lg:gap-x-16">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`
                                    relative font-wide text-step--1 uppercase tracking-micro font-bold 
                                    transition-colors duration-200
                                    ${isActive ? "text-white" : "text-muted hover:text-white"}
                                `}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
}







