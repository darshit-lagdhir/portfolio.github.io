"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function UIDAIAdvisoryPage() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <div
            className="min-h-screen w-full bg-[#050505] text-neutral-50 px-8 py-32 md:px-12 xl:px-32 relative bg-layered"
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
                            UIDAI Advisory
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 1, ease: ease }}
                            className="font-body text-step-2 text-neutral-400 font-light leading-snug tracking-wide max-w-[50ch]"
                        >
                            National Datathon advisory protocol focused on pattern detection, biometric integrity, and ethical AI oversight. Architectural oversight for the "Unlocking Innovation" datathon.
                        </motion.p>
                    </div>
                </div>

                {/* Advisory Mission - Large Statement Balance */}
                <div className="w-full flex flex-col gap-24">
                    <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-600 block border-b border-neutral-900 pb-4">ADVISORY MISSION // 01</span>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 items-baseline">
                        <div className="col-span-12 md:col-span-8">
                            <h2 className="font-title text-step-4 uppercase tracking-tight-title text-neutral-100 leading-tight mb-12">
                                PROTECTING IDENTITY THROUGH ANALYTICAL INTEGRITY.
                            </h2>
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <p className="font-body text-step-1 text-neutral-500 font-light leading-relaxed max-w-[30ch]">
                                Developing the framework for detection and prevention of algorithmic bias in national biometric systems.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Focus Pillars - Grid Hierarchy */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-neutral-900/40 pt-0 mb-40">
                    {[
                        { title: "Pattern Analysis", focus: "Biometric Data Integrity" },
                        { title: "Ethical Oversight", focus: "AI Bias Detection System" },
                        { title: "Scale Architecture", focus: "Datathon Challenge Framework" }
                    ].map((pillar, i) => (
                        <div key={i} className="flex flex-col gap-8 p-12 border-r border-b border-neutral-900/40 bg-[#060606] bg-opacity-50">
                            <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-700">PILLAR // 0{i + 1}</span>
                            <h3 className="font-heading text-step-0 font-bold uppercase tracking-micro text-neutral-200">{pillar.title}</h3>
                            <p className="font-body text-step-1 text-neutral-500 font-light max-w-[25ch]">{pillar.focus}</p>
                        </div>
                    ))}
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
