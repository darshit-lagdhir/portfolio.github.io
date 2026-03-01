"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function UIDAIAdvisoryPage() {
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
                            SYSTEM // ARCHIVE-002
                        </span>
                        <h1 className="font-title text-step-5 leading-tight-title uppercase tracking-tight-title">
                            UIDAI SYSTEM
                        </h1>
                        <p className="font-body text-step-1 text-muted font-light max-w-[50ch] leading-relaxed">
                            Advisory intelligence system for biometric pattern detection and enrollment anomaly clustering.
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
                                Pattern Recognition Framework
                            </h2>
                            <p className="font-body text-step-0 text-muted font-light leading-relaxed max-w-[60ch]">
                                Designed to identify subtle drifts in biometric registration data, the system serves as a human-in-the-loop advisory tool. By clustering anomalies into distinct risk categories, it provides decision-support telemetry without autonomous determination, ensuring ethical oversight in identity verification.
                            </p>
                        </div>
                    </div>
                </div>

                {/* EDITORIAL ROW 02: DETECTION */}
                <div className="col-span-12 border-t border-border pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                                02 // DETECTION
                            </span>
                        </div>
                        <div className="md:col-span-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                                {[
                                    { title: "Biometric Drift", desc: "Detection of temporal variants in fingerprint and iris telemetry." },
                                    { title: "Anomaly Clustering", desc: "Algorithmic grouping of registration signals into risk vectors." },
                                    { title: "Assisted Validation", desc: "Precision scoring for manual human-in-the-loop review cycles." },
                                    { title: "Inference Isolation", desc: "Separation of raw data from pattern-detected advisory outputs." }
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

                {/* EDITORIAL ROW 03: SAFEGUARDS */}
                <div className="col-span-12 border-t border-border pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                                03 // SAFEGUARDS
                            </span>
                        </div>
                        <div className="md:col-span-8">
                            <p className="font-body text-step-1 text-muted font-light italic leading-relaxed max-w-[55ch]">
                                Identity is an absolute right. The advisory system is engineered to bolster human judgment, not replace it. Transparency is the core architectural constraint.
                            </p>
                        </div>
                    </div>
                </div>

                {/* EXIT NAVIGATION */}
                <div className="col-span-12 border-t border-border pt-24 pb-12 flex justify-between items-baseline">
                    <Link href="/" className="font-wide text-step-0 text-muted uppercase tracking-micro font-bold hover:text-white transition-colors duration-200">
                        &larr; INDEX
                    </Link>
                    <Link href="/pfcv" className="font-wide text-step-0 text-white uppercase tracking-micro font-bold hover:text-muted transition-colors duration-200">
                        NEXT SYSTEM &rarr;
                    </Link>
                </div>

            </div>
        </div>
    );
}



