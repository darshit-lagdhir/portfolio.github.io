"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MoveXPage() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            <div className="grid-layout py-32 lg:py-48 gap-y-32">

                {/* PROJECT HEADER (AALTO) */}
                <div className="col-span-12 lg:col-span-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease }}
                        className="flex flex-col gap-8"
                    >
                        <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                            SYSTEM // ARCHIVE-001
                        </span>
                        <h1 className="font-title text-step-5 leading-tight-title uppercase tracking-tight-title">
                            MoveX
                        </h1>
                        <p className="font-body text-step-1 text-muted font-light max-w-[50ch] leading-relaxed">
                            Modular backend infrastructure for role-isolated logistics management. Built with absolute integrity in Node.js and PostgreSQL.
                        </p>
                    </motion.div>
                </div>

                {/* EDITORIAL ROW 01: OVERVIEW */}
                <div className="col-span-12 border-t border-border pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                                01 // OVERVIEW
                            </span>
                        </div>
                        <div className="md:col-span-8">
                            <h2 className="font-title text-step-2 text-white uppercase tracking-tight-title mb-8">
                                Secure Logistics Pathway
                            </h2>
                            <p className="font-body text-step-0 text-muted font-light leading-relaxed max-w-[60ch]">
                                Engineering a multi-tenant logistics environment required a zero-trust approach to data access. MoveX implements strict role-based pathway isolation, ensuring that every interaction—from administrative oversight to individual user state tracking—is cryptographically secure and auditable.
                            </p>
                        </div>
                    </div>
                </div>

                {/* EDITORIAL ROW 02: MODULES */}
                <div className="col-span-12 border-t border-border pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                                02 // MODULES
                            </span>
                        </div>
                        <div className="md:col-span-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                                {[
                                    { title: "Isolated Dashboarding", desc: "Granular UI/UX separation based on verified role signatures." },
                                    { title: "Prisma Layering", desc: "Type-safe relational mapping for complex supply chain telemetry." },
                                    { title: "Session Enforcement", desc: "Stateless JWT propagation with rotating secret validation." },
                                    { title: "Audit Logging", desc: "Immutable state-change ledger for every parcel transaction." }
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
                    </div>
                </div>

                {/* EDITORIAL ROW 03: REFLECTION */}
                <div className="col-span-12 border-t border-border pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                                03 // REFLECTION
                            </span>
                        </div>
                        <div className="md:col-span-8">
                            <p className="font-body text-step-1 text-muted font-light italic leading-relaxed max-w-[55ch]">
                                The focus was not on visual complexity, but on the architectural purity of the backend. Truth exists in the logic, not the interface.
                            </p>
                        </div>
                    </div>
                </div>

                {/* EXIT NAVIGATION */}
                <div className="col-span-12 border-t border-border pt-24 pb-12 flex justify-between items-baseline">
                    <Link href="/" className="font-wide text-step-0 text-muted uppercase tracking-micro font-bold hover:text-white transition-colors duration-200">
                        &larr; INDEX
                    </Link>
                    <Link href="/uidai" className="font-wide text-step-0 text-white uppercase tracking-micro font-bold hover:text-muted transition-colors duration-200">
                        NEXT SYSTEM &rarr;
                    </Link>
                </div>

            </div>
        </div>
    );
}



