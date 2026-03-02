"use client";

import { useScene } from "@/context/SceneContext";
import SystemBreadcrumbs from "@/components/brutalist/SystemBreadcrumbs";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const GLOBAL_EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];

export default function MoveXPage() {
    const { setActiveSection } = useScene();

    useEffect(() => {
        setActiveSection("projects");
    }, [setActiveSection]);

    return (
        <div className="min-h-screen w-full bg-black text-white relative py-40 px-[5vw]">
            <SystemBreadcrumbs current="MOVEX" />

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
                            01_LOGISTICS // MECHANICAL_SYNC
                        </span>
                        <h1 className="text-large md:text-massive italic text-white font-heading leading-none uppercase tracking-tight-title">
                            MOVEX_SYSTEM
                        </h1>
                        <p className="text-short-body text-white/40 italic">
                            Modular backend infrastructure for role-isolated logistics management. Built with Node.js and PostgreSQL.
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
                                Secure Logistics Pathway
                            </h2>
                            <p className="text-short-body text-white/40">
                                MoveX implements strict role-based pathway isolation, ensuring that interactions are secure and auditable. The architecture focuses on data access integrity and zero-trust reliability.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* ANALYTICAL ROW 02: ARCHITECTURE — PHASE 3 */}
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
                                ARCHITECTURE
                            </span>
                        </div>
                        <div className="md:col-span-8 lg:col-span-9">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-32">
                                {[
                                    { title: "Isolated Dashboarding", desc: "UI/UX separation based on verified role signatures." },
                                    { title: "Prisma Layering", desc: "Type-safe mapping for supply chain telemetry." },
                                    { title: "Session Enforcement", desc: "JWT propagation with rotating secret validation." },
                                    { title: "Audit Logging", desc: "Immutable state-change ledger for transactions." }
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
                    <Link href="/uidai" className="text-micro font-bold text-white/40 tracking-[0.6em] hover:text-white transition-all group flex items-center gap-4">
                        NEXT_SYSTEM <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
