"use client";

import { motion } from "framer-motion";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];

export default function BrutalistAbout() {
    const { setActiveSection } = useScene();

    return (
        <section
            id="about"
            onPointerEnter={() => setActiveSection("about")}
            className="relative min-h-screen flex flex-col justify-center px-[10vw] py-40 border-t border-white"
        >
            <div className="grid grid-cols-12 gap-10 items-start w-full max-w-[1800px] mx-auto">

                {/* LARGE ASYMMETRIC HEADER — PHASE 3 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, ease: GLOBAL_EASE }}
                    className="col-span-12 lg:col-span-10 flex flex-col items-start gap-12"
                >
                    <span className="text-micro font-bold tracking-[1em] opacity-40">03_PHILOSOPHY</span>
                    <h2 className="text-large text-white italic tracking-tighter font-heading leading-[0.85] uppercase max-w-[12ch]">
                        Logic is the absolute <br />
                        foundation of <br />
                        experience.
                    </h2>
                </motion.div>

                {/* TWO-COLUMN STRUCTURAL DESCRIPTION — PHASE 3 */}
                <div className="col-span-12 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-20 mt-32 border-t border-white/20 pt-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.6 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="flex flex-col gap-8"
                    >
                        <span className="text-micro font-bold tracking-[0.4em] text-white">SYSTEM_LOGIC</span>
                        <p className="text-short-body italic">
                            EVERY INTERACTION IS A CALCULATED RESPONSE <br />
                            TO SYSTEM PERFORMANCE.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.4 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="flex flex-col gap-8"
                    >
                        <span className="text-micro font-bold tracking-[0.4em] text-white">VISUAL_ATMOSPHERE</span>
                        <p className="text-short-body">
                            I DEFINE THE BOUNDARY <br />
                            BETWEEN SYSTEM LOGIC <br />
                            AND VISUAL POWER.
                        </p>
                    </motion.div>
                </div>

                {/* ARCHITECTURAL CORNER BLOCK (TIER 3) */}
                <div className="absolute right-0 top-0 w-32 h-32 border-l border-b border-white opacity-20 pointer-events-none" />
                <div className="absolute left-0 bottom-0 w-20 h-[50vh] border-r border-white opacity-10 pointer-events-none" />
            </div>
        </section>
    );
}
