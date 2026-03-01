"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SystemBreadcrumbs({ current }: { current: string }) {
    return (
        <nav className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all mb-10 group">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span className="text-white/20 select-none scale-x-[-1] inline-block animate-pulse">{"<"}</span>
            <Link href="/#projects" className="hover:text-white transition-colors">PROJECTS</Link>
            <span className="text-white/20 select-none scale-x-[-1] inline-block">{"<"}</span>
            <span className="text-white font-bold">{current}</span>

            {/* HUD BREADCRUMB INDICATOR (PHASE 11) */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "20px" }}
                className="h-[1px] bg-white opacity-20 ml-2"
            />
        </nav>
    );
}
