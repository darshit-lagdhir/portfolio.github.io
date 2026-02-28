"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
    const { toggleTheme } = useTheme();

    return (
        <header className="border-b border-neutral-800 dark:border-neutral-700">
            <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                <Link href="/" className="font-semibold text-lg">
                    Darshit Lagdhir
                </Link>

                <nav className="flex items-center gap-6 text-sm">
                    <Link href="#philosophy">Philosophy</Link>
                    <Link href="#skills">Skills</Link>
                    <Link href="#projects">Systems</Link>
                    <button onClick={toggleTheme} className="border px-3 py-1 rounded-md">
                        Theme
                    </button>
                </nav>
            </div>
        </header>
    );
}
