"use client";

import { useState, useCallback } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { motionConfig } from "@/lib/motion";

const layers = [
    "Core Programming",
    "Backend Logic",
    "Data & Storage",
    "Interface Layer",
    "Infrastructure",
    "Tooling",
];

const flagship = "Courier Management System";

export default function SystemMapSection() {
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState<number | null>(null);

    const handleHover = useCallback((i: number | null) => setActive(i), []);

    return (
        <SectionWrapper id="system-map">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                    Engineering Layer Overview
                </p>
                <button
                    onClick={() => setVisible((v) => !v)}
                    className="text-xs font-mono text-neutral-400 dark:text-neutral-500 border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 rounded-md hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
                >
                    {visible ? "Hide" : "System View"}
                </button>
            </div>

            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: motionConfig.ease }}
                        className="overflow-hidden"
                    >
                        <div className="mt-10 flex flex-col md:flex-row items-start gap-10 md:gap-16">
                            {/* Left: Layers */}
                            <div className="space-y-0">
                                {layers.map((layer, i) => (
                                    <div
                                        key={layer}
                                        className="flex items-center gap-4"
                                        onMouseEnter={() => handleHover(i)}
                                        onMouseLeave={() => handleHover(null)}
                                    >
                                        <div className="flex flex-col items-center w-4 shrink-0">
                                            <div
                                                className={`w-2 h-2 rounded-full transition-colors duration-200 ${active === i
                                                        ? "bg-neutral-700 dark:bg-neutral-300"
                                                        : "bg-neutral-300 dark:bg-neutral-700"
                                                    }`}
                                            />
                                            {i < layers.length - 1 && (
                                                <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800" />
                                            )}
                                        </div>
                                        <span
                                            className={`text-sm py-2 transition-colors duration-200 ${active === i
                                                    ? "text-neutral-900 dark:text-neutral-100 font-medium"
                                                    : "text-neutral-500 dark:text-neutral-500"
                                                }`}
                                        >
                                            {layer}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Connector */}
                            <div className="hidden md:flex items-center self-center">
                                <div className="w-16 h-px bg-neutral-200 dark:bg-neutral-800" />
                                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-neutral-300 dark:border-l-neutral-700" />
                            </div>

                            {/* Right: Flagship */}
                            <div
                                className={`rounded-md border px-5 py-4 transition-colors duration-200 self-center ${active !== null
                                        ? "border-neutral-400 dark:border-neutral-600"
                                        : "border-neutral-200 dark:border-neutral-800"
                                    }`}
                            >
                                <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
                                    Flagship System
                                </p>
                                <p className="text-sm font-medium">{flagship}</p>
                            </div>
                        </div>

                        <p className="mt-8 text-xs text-neutral-400 dark:text-neutral-600 italic">
                            Each layer contributes to the system above — hover to trace the stack.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
