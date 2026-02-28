"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function UIDAIAdvisoryPage() {
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

                {/* Title & Advisory Statement */}
                <div className="col-span-4 md:col-span-8 lg:col-span-7 mb-32 border-l border-white pl-8">
                    <span className="font-heading text-[10px] md:text-sm uppercase tracking-[0.5em] text-neutral-600 block mb-12">SYSTEM PROTOCOL // 01</span>
                    <h1 className="font-title text-[clamp(4.5rem,10vw,12rem)] leading-[0.85] text-white uppercase tracking-tighter mb-12">
                        UIDAI<br />Advisory
                    </h1>
                    <h2 className="font-heading text-lg md:text-xl text-red-500 uppercase tracking-widest mb-6 border-b border-neutral-800 pb-4 inline-block font-bold">
                        Advisory Override Protocol
                    </h2>
                    <p className="font-body text-xl md:text-2xl text-neutral-400 font-light leading-snug tracking-wide max-w-[65ch]">
                        This system generates signals, not decisions. It operates strictly as an advisory layer designed to empower human judgment by detecting probabilistic enrollment anomalies without executing automated rejection.
                    </p>
                </div>

                {/* Pattern Types Grid */}
                <div className="col-span-4 md:col-span-12 mb-32">
                    <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-12 border-b border-neutral-900 pb-4">PATTERN RECOGNITION // 02</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
                        {[
                            { title: "Baby Boom Cluster", desc: "Unusual concurrent enrollments in isolated demographics." },
                            { title: "Ghost Zone Sync", desc: "Activity originating from geographically dormant coordinates." },
                            { title: "Temporal Skew", desc: "Application timings violating standard operational bounds." },
                            { title: "Operator Velocity", desc: "Processing rates defying human verification constraints." },
                            { title: "Biometric Noise", desc: "Statistical anomalies in raw hardware signal collection." },
                            { title: "Hardware Drift", desc: "Unexpected hardware ID shifting across concurrent sessions." }
                        ].map((mod, i) => (
                            <div key={i} className="flex flex-col gap-4 border border-neutral-900 p-8 hover:bg-neutral-900/10 transition-colors">
                                <h3 className="font-heading text-sm uppercase tracking-widest text-neutral-200">{mod.title}</h3>
                                <div className="w-12 h-px bg-neutral-800" />
                                <p className="font-body text-neutral-500 font-light max-w-[50ch]">{mod.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Confidence Levels & Ethics Split */}
                <div className="col-span-4 md:col-span-12 mb-32 grid grid-cols-1 lg:grid-cols-12 gap-x-6 border-t border-neutral-900 pt-20">
                    <div className="col-span-1 lg:col-span-6 mb-16 lg:mb-0">
                        <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-12">CONFIDENCE CALIBRATION // 03</span>
                        <p className="font-body text-neutral-400 font-light text-lg mb-8 leading-relaxed max-w-[65ch]">
                            Rather than binary outcomes, outputs are expressed as floating-point probability vectors. These confidence scores map mathematically against the severity of the flagged pattern, forcing reviewers to contextualize the anomaly against statistical noise rather than accepting black-box execution.
                        </p>
                    </div>

                    <div className="col-span-1 lg:col-span-6">
                        <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-12">ETHICAL OVERSIGHT // 04</span>
                        <p className="font-body text-neutral-400 font-light text-lg mb-8 leading-relaxed max-w-[65ch]">
                            The objective was preventing machine autonomy over human citizenship. By constraining the AI to purely advisory telemetry, the architecture preserves ethical auditing and legal review standards inherently present in demographic processing.
                        </p>
                    </div>
                </div>

                {/* Concept Banner */}
                <div className="col-span-4 md:col-span-12 mb-32 p-8 border border-neutral-900 border-dashed text-center py-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[length:200px] bg-repeat opacity-80 mix-blend-screen">
                    <h3 className="font-title text-[clamp(2.5rem,5vw,6rem)] text-neutral-300 uppercase tracking-tighter leading-none z-10 relative saturate-0">
                        Machine Precision.<br />
                        <span className="text-white">Human Authority.</span>
                    </h3>
                </div>

                {/* Exit */}
                <div className="col-span-4 md:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-neutral-900 pt-16 pb-32">
                    <div className="mb-12 md:mb-0">
                        <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-6">DEPLOYMENT // 05</span>
                        <p className="font-body text-neutral-500 font-light max-w-[50ch]">Conceptual System Audit.</p>
                    </div>
                    <a href="https://github.com/darshit-lagdhir/" target="_blank" className="font-title text-5xl md:text-7xl text-neutral-700 uppercase tracking-tighter hover:text-white transition-colors cursor-pointer">
                        Archive Locked
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
