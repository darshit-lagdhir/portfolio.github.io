"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MoveXPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen w-full bg-[#050505] text-neutral-50 px-8 py-32 md:px-12 xl:px-32 relative"
        >
            <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-4 md:grid-cols-12 gap-x-6 gap-y-12">
                <div className="col-span-4 md:col-span-12 mb-20 border-b border-neutral-900 pb-10">
                    <Link href="/" className="font-heading text-[10px] md:text-sm uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                        ← RETURN / INDEX
                    </Link>
                </div>

                {/* Title & Overview */}
                <div className="col-span-4 md:col-span-8 lg:col-span-7 mb-32">
                    <h1 className="font-title text-[clamp(4.5rem,10vw,12rem)] leading-[0.85] text-white uppercase tracking-tighter mb-12">
                        MoveX
                    </h1>
                    <p className="font-body text-xl md:text-2xl text-neutral-400 font-light leading-snug tracking-wide max-w-[65ch]">
                        Modern logistics backend specializing in strict role isolation, atomic workflows, and scalable tracking. Engineered for secure operations without external bloat.
                    </p>
                </div>

                {/* Core Modules Grid */}
                <div className="col-span-4 md:col-span-12 mb-32">
                    <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-12 border-b border-neutral-900 pb-4">CORE MODULES // 01</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {[
                            { title: "Authentication", desc: "Argon2 encryption + dual JWT isolated pathways." },
                            { title: "Route Engine", desc: "Optimized multi-node dispatch routing." },
                            { title: "Isolation Layer", desc: "Admin, Fleet, and Consumer strict access controls." },
                            { title: "State Tracker", desc: "Real-time ledger tracing parcel coordinates." },
                            { title: "Telemetry Analytics", desc: "PostgreSQL analytical query optimization." },
                            { title: "Notification Sync", desc: "Webhook-based scalable notification streams." }
                        ].map((mod, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-neutral-200">{mod.title}</h3>
                                <div className="w-12 h-px bg-neutral-800" />
                                <p className="font-body text-neutral-500 font-light max-w-[50ch]">{mod.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Architecture Overview */}
                <div className="col-span-4 md:col-span-12 mb-32">
                    <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-12 border-b border-neutral-900 pb-4">ARCHITECTURE // 02</span>
                    <div className="w-full bg-neutral-900/10 border border-neutral-800 p-8 md:p-20 flex flex-col items-center justify-center text-center">
                        <span className="font-title text-4xl md:text-6xl text-neutral-200 uppercase tracking-tighter block mb-10 leading-none">
                            Node.js <span className="text-neutral-700 mx-4">→</span> Prisma <span className="text-neutral-700 mx-4">→</span> PostgreSQL
                        </span>
                        <p className="font-body text-neutral-500 uppercase tracking-widest text-[10px] md:text-sm max-w-[60ch]">
                            A modular monolith leveraging heavily structured relational flow and stateless JWT communication.
                        </p>
                    </div>
                </div>

                {/* Security Features */}
                <div className="col-span-4 md:col-span-12 mb-32 grid grid-cols-1 md:grid-cols-12 gap-x-6 border-t border-neutral-900 pt-20">
                    <div className="col-span-1 md:col-span-4 mb-10 md:mb-0">
                        <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-600 block">SECURITY // 03</span>
                    </div>
                    <div className="col-span-1 md:col-span-8 flex flex-col gap-8 font-body text-neutral-400 font-light text-lg lg:text-xl">
                        <div className="flex items-start gap-6 max-w-[65ch]"><span className="text-white font-heading text-sm font-bold border-b border-neutral-700 pb-1">01.</span> Role-based path execution enforcing non-overlapping access boundaries.</div>
                        <div className="flex items-start gap-6 max-w-[65ch]"><span className="text-white font-heading text-sm font-bold border-b border-neutral-700 pb-1">02.</span> Hardware-resistant cryptographic key derivation via Argon2id processing.</div>
                        <div className="flex items-start gap-6 max-w-[65ch]"><span className="text-white font-heading text-sm font-bold border-b border-neutral-700 pb-1">03.</span> Strict CORS policy blocking volatile cross-origin request contamination.</div>
                    </div>
                </div>

                {/* Deployment & Exit */}
                <div className="col-span-4 md:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-neutral-900 pt-16 pb-32">
                    <div className="mb-12 md:mb-0">
                        <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-6">DEPLOYMENT // 04</span>
                        <p className="font-body text-neutral-500 font-light max-w-[50ch]">Currently staging preview availability.</p>
                    </div>
                    <a href="https://github.com/darshit-lagdhir/" target="_blank" className="font-title text-5xl md:text-7xl text-white uppercase tracking-tighter hover:text-neutral-500 transition-colors">
                        Review Code
                    </a>
                </div>

            </div>
        </motion.div>
    );
}
