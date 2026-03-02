"use client";

import Link from "next/link";

export default function SystemBreadcrumbs({ current }: { current: string }) {
    return (
        <nav className="flex items-center gap-6 text-[10px] font-bold tracking-[0.5em] opacity-30 hover:opacity-100 transition-all mb-20 font-ui">
            <Link href="/" className="hover:text-white transition-colors">00_INDEX</Link>
            <span className="text-white/20 select-none">/</span>
            <Link href="/#projects" className="hover:text-white transition-colors">02_ARCHIVE</Link>
            <span className="text-white/20 select-none">/</span>
            <span className="text-white">{current}</span>
        </nav>
    );
}
