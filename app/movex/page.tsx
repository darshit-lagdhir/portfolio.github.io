"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MoveXPage() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <div
            className="min-h-screen w-full bg-[#050505] text-neutral-50 px-8 py-32 md:px-12 xl:px-32 relative bg-layered overflow-hidden"
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
                            MoveX
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 1, ease: ease }}
                            className="font-body text-step-2 text-neutral-400 font-light leading-snug tracking-wide max-w-[50ch]"
                        >
                            Modern logistics backend specializing in strict role isolation, atomic workflows, and scalable tracking. Engineered for secure operations without external bloat.
                        </motion.p>
                    </div>
                </div>

                {/* Core Modules - Grid Dominance */}
                <div className="w-full flex flex-col gap-20">
                    <div className="flex items-center gap-10">
                        <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-600 block border-b border-neutral-900 pb-4">CORE MODULES // 01</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-neutral-900/50">
                        {[
                            { title: "Authentication", desc: "Argon2 encryption + dual JWT isolated pathways." },
                            { title: "Route Engine", desc: "Optimized multi-node dispatch routing." },
                            { title: "Isolation Layer", desc: "Admin, Fleet, and Consumer strict access controls." },
                            { title: "State Tracker", desc: "Real-time ledger tracing parcel coordinates." },
                            { title: "Telemetry Analytics", desc: "PostgreSQL analytical query optimization." },
                            { title: "Notification Sync", desc: "Webhook-based scalable notification streams." }
                        ].map((mod, i) => (
                            <div key={i} className="flex flex-col gap-8 p-12 border-r border-b border-neutral-900/50 bg-[#070707] hover:bg-[#0a0a0a] transition-colors duration-500">
                                <h3 className="font-heading text-step-0 font-bold uppercase tracking-micro text-white">{mod.title}</h3>
                                <div className="w-12 h-px bg-neutral-900" />
                                <p className="font-body text-step-1 text-neutral-500 font-light max-w-[30ch] leading-snug">{mod.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full bg-neutral-900/10 border border-neutral-900 py-32 md:py-60 flex flex-col items-center justify-center text-center px-8 transition-colors duration-300 hover:border-neutral-800">
                    <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-600 block mb-16">ARCHITECTURE // 02</span>
                    <h2 className="font-title text-step-4 text-neutral-200 uppercase tracking-tight-title block mb-12 leading-none">
                        Node.js <span className="text-neutral-800 mx-4">/</span> Prisma <span className="text-neutral-800 mx-4">/</span> PostgreSQL
                    </h2>
                    <p className="font-body text-step-1 text-neutral-500 uppercase tracking-micro max-w-[60ch]">
                        A modular monolith leveraging heavily structured relational flow and stateless JWT communication.
                    </p>
                </div>

                {/* Security - List Hierarchy */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 border-t border-neutral-900 pt-32 pb-60">
                    <div className="col-span-1 md:col-span-4 mb-20 md:mb-0">
                        <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-600 block">SECURITY // 03</span>
                    </div>
                    <div className="col-span-1 md:col-span-8 flex flex-col gap-16 font-body text-neutral-400 font-light text-step-2">
                        <div className="flex flex-col md:flex-row md:items-start gap-8 max-w-[60ch]">
                            <span className="text-white font-heading text-step--1 font-bold border-b border-neutral-800 pb-1 w-fit">PATH ISOLATION</span>
                            <span>Role-based path execution enforcing non-overlapping access boundaries.</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-start gap-8 max-w-[60ch]">
                            <span className="text-white font-heading text-step--1 font-bold border-b border-neutral-800 pb-1 w-fit">CRYPTOGRAPHIC KEY</span>
                            <span>Hardware-resistant cryptographic key derivation via Argon2id processing.</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-start gap-8 max-w-[60ch]">
                            <span className="text-white font-heading text-step--1 font-bold border-b border-neutral-800 pb-1 w-fit">CORS POLICY</span>
                            <span>Strict CORS policy blocking volatile cross-origin request contamination.</span>
                        </div>
                    </div>
                </div>

                {/* Closing Link */}
                <div className="border-t border-neutral-900 pt-20 pb-40 flex justify-between items-baseline">
                    <span className="font-heading text-step--1 text-neutral-600">DARSHIT LAGDHIR / 25</span>
                    <a href="https://github.com/darshit-lagdhir/" target="_blank" className="font-title text-step-4 text-white uppercase tracking-tight-title link-precision transition-all duration-700">
                        Source
                    </a>
                </div>

            </div>
        </div>
    );
}
