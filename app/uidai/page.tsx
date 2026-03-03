"use client";

import { useScene } from "@/context/SceneContext";
import SystemBreadcrumbs from "@/components/brutalist/SystemBreadcrumbs";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const GLOBAL_EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];

export default function UIDAIPage() {
    const { setActiveSection } = useScene();

    useEffect(() => {
        setActiveSection("projects");
    }, [setActiveSection]);

    return (
        <div className="min-h-screen w-full bg-black text-white relative py-40 px-[5vw]">
            <SystemBreadcrumbs current="UIDAI" />

            <div className="max-w-[1800px] mx-auto flex flex-col gap-y-40">

                {/* PROJECT HEADER — PHASE 3 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: GLOBAL_EASE }}
                    className="grid grid-cols-12 gap-10"
                >
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-12">
                        <span className="text-micro font-bold text-white tracking-[0.8em]">
                            02_INTELLIGENCE // PATTERN_SYNC
                        </span>
                        <motion.h1
                            initial={{ scaleX: 1.5, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="text-large md:text-massive italic text-white font-heading leading-none uppercase tracking-tight-title origin-left glitch-safe flex overflow-hidden"
                        >
                            {"UIDAI_SYSTEM".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: i % 2 === 0 ? -40 : 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.1 + i * 0.02, ease: [0.33, 1, 0.68, 1] }}
                                    className="inline-block"
                                >
                                    {char === "_" ? <span>&nbsp;</span> : char}
                                </motion.span>
                            ))}
                        </motion.h1>
                        <p className="text-short-body text-white/40 italic">
                            Advisory intelligence system for biometric pattern detection and enrollment anomaly clustering.
                        </p>
                    </div>
                </motion.div>

                {/* ANALYTICAL ROW 01: OVERVIEW — PHASE 3 */}
                <div className="col-span-12 border-t border-white/20 pt-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-20"
                    >
                        <div className="md:col-span-4 lg:col-span-3">
                            <span className="text-micro font-bold tracking-[0.4em] text-white opacity-40">
                                OVERVIEW
                            </span>
                        </div>
                        <div className="md:col-span-8 lg:col-span-7">
                            <h2 className="text-medium text-white font-heading uppercase tracking-widest mb-12">
                                Pattern Recognition Framework
                            </h2>
                            <p className="text-short-body text-white/40">
                                A human-in-the-loop advisory tool designed to identify biometric registration drifts. It clusters anomalies into risk categories to support decision-making without autonomous determination.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* ANALYTICAL ROW 02: DETECTION — PHASE 3 */}
                <div className="col-span-12 border-t border-white/20 pt-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-20"
                    >
                        <div className="md:col-span-4 lg:col-span-3">
                            <span className="text-micro font-bold tracking-[0.4em] text-white opacity-40">
                                DETECTION
                            </span>
                        </div>
                        <div className="md:col-span-8 lg:col-span-9">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-32">
                                {[
                                    { title: "Biometric Drift", desc: "Detection of variants in fingerprint and iris telemetry." },
                                    { title: "Anomaly Clustering", desc: "Grouping of registration signals into risk vectors." },
                                    { title: "Assisted Validation", desc: "Scoring for manual human-in-the-loop review cycles." },
                                    { title: "Inference Isolation", desc: "Separation of raw data from detected advisory outputs." }
                                ].map((m, i) => (
                                    <div key={i} className="flex flex-col gap-6">
                                        <h3 className="text-micro font-bold text-white tracking-[0.4em]">
                                            {m.title}
                                        </h3>
                                        <p className="text-short-body text-white/20 italic">
                                            {m.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* SYSTEM EXIT NAVIGATION — PHASE 3 */}
                <div className="col-span-12 border-t border-white pt-32 pb-20 flex justify-between items-baseline">
                    <Link href="/" className="text-micro font-bold text-white/40 tracking-[0.6em] hover:text-white transition-all">
                        00_INDEX
                    </Link>
                    <Link href="/pfcv" className="text-micro font-bold text-white/40 tracking-[0.6em] hover:text-white transition-all group flex items-center gap-4">
                        NEXT_SYSTEM <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
