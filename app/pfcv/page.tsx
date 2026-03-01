"use client";

import { useScene } from "@/context/SceneContext";
import SystemBreadcrumbs from "@/components/brutalist/SystemBreadcrumbs";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PFCVPage() {
    const ease = [0.16, 1, 0.3, 1] as const;
    const { setActiveSection } = useScene();

    useEffect(() => {
        setActiveSection("pfcv");
    }, [setActiveSection]);

    return (
        <div className="min-h-screen w-full bg-background text-foreground relative overflow-hidden">
            <div className="grid-layout pt-40 pointer-events-none md:pl-[6%] lg:pl-[10%]">
                <SystemBreadcrumbs current="PFCV" />
            </div>

            {/* PROJECT MOOD: SHARP/CONTRAST (PHASE 4) */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30">
                <div className="w-full h-px bg-white/20 absolute rotate-45" />
                <div className="w-full h-px bg-white/20 absolute -rotate-45" />
            </div>

            <div className="grid-layout py-32 lg:py-48 flex flex-col gap-y-40 md:gap-y-64 relative z-10">

                {/* PROJECT HEADER */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease }}
                    className="col-span-12 lg:col-span-10"
                >
                    <div className="flex flex-col gap-8">
                        <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                            03 SECURITY // SHARP MOOD
                        </span>
                        <h1 className="font-title text-step-5 leading-tight-title uppercase tracking-tight-title text-physical italic first-letter:not-italic">
                            POLYGLOT FFI
                        </h1>
                        <p className="font-body text-step-1 text-muted font-light max-w-[50ch] leading-relaxed">
                            Cross-language contract verification pipeline for memory-safe FFI boundaries.
                        </p>
                    </div>
                </motion.div>

                {/* ANALYTICAL ROW 01: OVERVIEW */}
                <div className="col-span-12 border-t border-border pt-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-12"
                    >
                        <div className="md:col-span-4 lg:col-span-3">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline">
                                OVERVIEW
                            </span>
                        </div>
                        <div className="md:col-span-8 md:col-start-6 lg:col-start-6">
                            <h2 className="font-title text-step-3 text-white uppercase tracking-tight-title mb-8">
                                Binary Contract Enforcement
                            </h2>
                            <p className="font-body text-step-0 text-muted font-light leading-relaxed">
                                Polyglot FFI eliminates memory layout uncertainty at the boundary between Rust, C++, and WebAssembly. By synthesizing an intermediate representation, the system validates memory alignment and calling conventions before execution.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* ANALYTICAL ROW 02: PIPELINE */}
                <div className="col-span-12 border-t border-border pt-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-12"
                    >
                        <div className="md:col-span-4 lg:col-span-3">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline">
                                PIPELINE
                            </span>
                        </div>
                        <div className="md:col-span-8 md:col-start-6 lg:col-start-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-24">
                                {[
                                    { title: "IR Normalization", desc: "Synthesis of Language-agnostic Intermediate Representation." },
                                    { title: "Layout Verifier", desc: "Validation of memory alignment and padding invariants." },
                                    { title: "Convention Enforcement", desc: "Checks for stack discipline and register pressure." },
                                    { title: "Safe Adapter Gen", desc: "Automatic generation of instrumented FFI bridges." }
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
                    <Link href="/movex" className="font-wide text-step-0 text-muted uppercase tracking-micro font-bold hover:text-white transition-colors duration-200 group">
                        NEXT <span className="group-hover:translate-x-2 inline-block transition-transform duration-300 italic">&rarr;</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
