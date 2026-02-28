"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PFCVSystemPage() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <div
            className="min-h-screen w-full bg-[#050505] text-neutral-50 px-8 py-32 md:px-12 xl:px-32 relative bg-layered"
        >
            <div className="w-full max-w-screen-2xl mx-auto flex flex-col gap-40">

                <div className="border-b border-neutral-900 pb-10">
                    <Link href="/" className="font-heading text-step--1 uppercase tracking-micro text-neutral-500 hover:text-white link-precision transition-colors duration-200">
                        ← RETURN / INDEX
                    </Link>
                </div>

                {/* Hero Title & Overview - Magazine Header Style */}
                <div className="grid grid-cols-4 md:grid-cols-12 gap-x-6 gap-y-12">
                    <div className="col-span-4 md:col-span-12 lg:col-span-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: ease }}
                            className="font-title text-step-5 leading-tight-title text-white uppercase tracking-tight-title mb-16"
                        >
                            Polyglot FFI
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 1, ease: ease }}
                            className="font-body text-step-2 text-neutral-400 font-light leading-snug tracking-wide max-w-[50ch]"
                        >
                            Cross-language contract verifier for Foreign Function Interfaces. Engineered to eliminate memory safety vulnerabilities in language-boundary communication protocols.
                        </motion.p>
                    </div>
                </div>

                {/* Technical Overview - Grid Dominance */}
                <div className="w-full flex flex-col gap-24">
                    <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-600 block border-b border-neutral-900 pb-4">FFI VERIFICATION // 01</span>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 items-baseline">
                        <div className="col-span-12 md:col-span-8">
                            <h2 className="font-title text-step-4 uppercase tracking-tight-title text-neutral-100 leading-tight mb-12">
                                ENFORCING BOUNDARY SECURITY ACROSS STACKS.
                            </h2>
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <p className="font-body text-step-1 text-neutral-500 font-light leading-relaxed max-w-[30ch]">
                                Automatically validating memory layout and calling conventions between Rust, C++, and WebAssembly.
                            </p>
                        </div>
                    </div>
                </div>

                {/* System Architecture - Centered Logic Visual */}
                <div className="w-full bg-neutral-900/10 border border-neutral-900 py-32 md:py-60 flex flex-col items-center justify-center text-center px-8">
                    <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-600 block mb-16">SYSTEM LOGIC // 02</span>
                    <h2 className="font-title text-step-4 text-neutral-100 uppercase tracking-tight-title block mb-8 leading-none">
                        PARSER <span className="text-neutral-800 mx-4">→</span> GENERATOR <span className="text-neutral-800 mx-4">→</span> VERIFIER
                    </h2>
                    <p className="font-body text-step-1 text-neutral-500 uppercase tracking-micro max-w-[60ch]">
                        A unified pipeline for ABI-compatible contract enforcement.
                    </p>
                </div>

                {/* Verification Modules - List Hierarchy */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-l border-t border-neutral-800 mb-40">
                    {[
                        { title: "Layout Safety", focus: "Memory alignment & padding verification using LLVM metadata." },
                        { title: "Binary Isolation", focus: "Ensuring non-overlapping memory regions in concurrent calls." },
                        { title: "Calling Protocol", focus: "Validating stack alignment and register pressure across boundaries." },
                        { title: "Safe Bindings", focus: "Automatic FFI binding generation with embedded safety checks." }
                    ].map((mod, i) => (
                        <div key={i} className="flex flex-col gap-8 border-r border-b border-neutral-800 p-16 bg-[#030303]">
                            <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-500">SYS // 0{i + 1}</span>
                            <h3 className="font-heading text-step-0 font-bold uppercase tracking-micro text-white">{mod.title}</h3>
                            <p className="font-body text-step-2 text-neutral-400 font-light max-w-[40ch] leading-snug">{mod.focus}</p>
                        </div>
                    ))}
                </div>

                {/* Closing Link */}
                <div className="border-t border-neutral-900 pt-20 pb-40 flex justify-between items-baseline">
                    <span className="font-heading text-step--1 text-neutral-600">DARSHIT LAGDHIR / 25</span>
                    <a href="https://github.com/darshit-lagdhir/Polyglot-Contract-Verifier" target="_blank" className="font-title text-step-4 text-white uppercase tracking-tight-title link-precision transition-all duration-700">
                        Source
                    </a>
                </div>

            </div>
        </div>
    );
}
