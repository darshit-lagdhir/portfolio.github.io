"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function UIDAIAdvisoryPage() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            <div className="grid-layout py-32 lg:py-48 flex flex-col gap-y-40 md:gap-y-64">

                {/* PROJECT HEADER */}
                <div className="col-span-12 lg:col-span-10">
                    <div className="flex flex-col gap-8">
                        <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                            02 INTELLIGENCE
                        </span>
                        <h1 className="font-title text-step-5 leading-tight-title uppercase tracking-tight-title">
                            UIDAI SYSTEM
                        </h1>
                        <p className="font-body text-step-1 text-muted font-light max-w-[50ch] leading-relaxed">
                            Advisory intelligence system for biometric pattern detection and enrollment anomaly clustering.
                        </p>
                    </div>
                </div>

                {/* ANALYTICAL ROW 01: OVERVIEW */}
                <div className="col-span-12 border-t border-border pt-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4 lg:col-span-3">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                                OVERVIEW
                            </span>
                        </div>
                        <div className="md:col-span-8 md:col-start-6 lg:col-start-6">
                            <h2 className="font-title text-step-3 text-white uppercase tracking-tight-title mb-8">
                                Pattern Recognition Framework
                            </h2>
                            <p className="font-body text-step-0 text-muted font-light leading-relaxed">
                                A human-in-the-loop advisory tool designed to identify biometric registration drifts. It clusters anomalies into risk categories to support decision-making without autonomous determination.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ANALYTICAL ROW 02: DETECTION */}
                <div className="col-span-12 border-t border-border pt-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4 lg:col-span-3">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                                DETECTION
                            </span>
                        </div>
                        <div className="md:col-span-8 md:col-start-6 lg:col-start-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-24">
                                {[
                                    { title: "Biometric Drift", desc: "Detection of variants in fingerprint and iris telemetry." },
                                    { title: "Anomaly Clustering", desc: "Grouping of registration signals into risk vectors." },
                                    { title: "Assisted Validation", desc: "Scoring for manual human-in-the-loop review cycles." },
                                    { title: "Inference Isolation", desc: "Separation of raw data from detected advisory outputs." }
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

                {/* SYSTEM EXIT NAVIGATION */}
                <div className="col-span-12 border-t border-border pt-24 pb-12 flex justify-between items-baseline">
                    <Link href="/" className="font-wide text-step-0 text-muted uppercase tracking-micro font-bold hover:text-white transition-colors duration-200">
                        INDEX
                    </Link>
                    <Link href="/pfcv" className="font-wide text-step-0 text-muted uppercase tracking-micro font-bold hover:text-white transition-colors duration-200">
                        NEXT &rarr;
                    </Link>
                </div>

            </div>
        </div>
    );
}
