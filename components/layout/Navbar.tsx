"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useActiveSection } from "@/lib/useActiveSection";
import Container from "@/components/layout/Container";

const navLinks = [
    { href: "#philosophy", label: "Philosophy", id: "philosophy" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#projects", label: "Systems", id: "projects" },
];

export default function Navbar() {
    const { toggleTheme } = useTheme();
    const activeSection = useActiveSection();
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <header className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md">
            <Container>
                <div className="py-4 flex items-center justify-between">
                    <Link href="/" className="font-semibold text-lg">
                        Darshit Lagdhir
                    </Link>

                    <nav className="flex items-center gap-6 text-sm">
                        {navLinks.map((link) => {
                            const isActive = isHome && activeSection === link.id;
                            return (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    className={`transition-colors ${isActive
                                            ? "text-neutral-900 dark:text-neutral-100"
                                            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                        <button
                            onClick={toggleTheme}
                            className="border border-neutral-300 dark:border-neutral-700 px-3 py-1 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        >
                            Theme
                        </button>
                    </nav>
                </div>
            </Container>
        </header>
    );
}
