"use client";

import Link from "next/link";

export default function SystemBreadcrumbs({ current }: { current: string }) {
    return (
        <nav className="flex items-center gap-6 text-[10px] font-bold tracking-[0.4em] opacity-30 hover:opacity-100 transition-all mb-12">
            <Link href="/" className="hover:text-white transition-colors">INDEX</Link>
            <span className="text-white/10 select-none">/</span>
            <Link href="/#projects" className="hover:text-white transition-colors">WORK</Link>
            <span className="text-white/10 select-none">/</span>
            <span className="text-white">{current}</span>
        </nav>
    );
}
