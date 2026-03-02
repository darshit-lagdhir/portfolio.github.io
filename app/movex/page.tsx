"use client";

import { useScene } from "@/context/SceneContext";
import SystemBreadcrumbs from "@/components/brutalist/SystemBreadcrumbs";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MoveXPage() {
    const ease = [0.16, 1, 0.3, 1] as const;
    const { setActiveSection } = useScene();

    useEffect(() => {
        setActiveSection("projects");
    }, [setActiveSection]);

    return (
        <div className="min-h-screen w-full bg-background text-foreground relative py-32 px-[5vw]">
            <SystemBreadcrumbs current="MOVEX" />

            <div className="max-w-[1200px] mx-auto flex flex-col gap-y-32">

                {/* PROJECT HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease }}
                    className="col-span-12 lg:col-span-10"
                >
                    <div className="flex flex-col gap-8">
                        <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                            01 LOGISTICS // MECHANICAL MOOD
                        </span>
                        <h1 className="font-title text-step-5 leading-tight-title uppercase tracking-tight-title text-physical italic first-letter:not-italic">
                            MoveX
                        </h1>
                        <p className="font-body text-step-1 text-muted font-light max-w-[50ch] leading-relaxed">
                            Modular backend infrastructure for role-isolated logistics management. Built with Node.js and PostgreSQL.
                        </p>
                    </div>
                </motion.div>

                {/* ANALYTICAL ROW 01: OVERVIEW */}
                <div className="col-span-12 border-t border-border pt-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-12"
                    >
                        <div className="md:col-span-4 lg:col-span-3">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline">
                                OVERVIEW
                            </span>
                        </div>
                        <div className="md:col-span-8 md:col-start-6 lg:col-start-6">
                            <h2 className="font-title text-step-3 text-white uppercase tracking-tight-title mb-8">
                                Secure Logistics Pathway
                            </h2>
                            <p className="font-body text-step-0 text-muted font-light leading-relaxed">
                                MoveX implements strict role-based pathway isolation, ensuring that interactions are secure and auditable. The architecture focuses on data access integrity and zero-trust reliability.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* ANALYTICAL ROW 02: ARCHITECTURE */}
                <div className="col-span-12 border-t border-border pt-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-12"
                    >
                        <div className="md:col-span-4 lg:col-span-3">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline">
                                ARCHITECTURE
                            </span>
                        </div>
                        <div className="md:col-span-8 md:col-start-6 lg:col-start-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-24">
                                {[
                                    { title: "Isolated Dashboarding", desc: "UI/UX separation based on verified role signatures." },
                                    { title: "Prisma Layering", desc: "Type-safe mapping for supply chain telemetry." },
                                    { title: "Session Enforcement", desc: "JWT propagation with rotating secret validation." },
                                    { title: "Audit Logging", desc: "Immutable state-change ledger for transactions." }
                                ].map((m, i) => (
                                    <div key={i} className="flex flex-col gap-4">
                                        <h3 className="font-wide text-step-0 text-white uppercase tracking-micro font-bold">
                                            {m.title}
                                        </h3>
                                        <p className="font-body text-step--1 text-muted font-light leading-snug">
                                            {m.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* SYSTEM EXIT NAVIGATION */}
                <div className="col-span-12 border-t border-border pt-24 pb-12 flex justify-between items-baseline">
                    <Link href="/" className="font-wide text-step-0 text-muted uppercase tracking-micro font-bold hover:text-white transition-colors duration-200">
                        INDEX
                    </Link>
                    <Link href="/uidai" className="font-wide text-step-0 text-muted uppercase tracking-micro font-bold hover:text-white transition-colors duration-200 group">
                        NEXT <span className="group-hover:translate-x-2 inline-block transition-transform duration-300 italic">&rarr;</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
