"use client";

import { motion } from "framer-motion";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const learning = [
    { label: "ENGINE_01", detail: "RUST ARCHITECTURE" },
    { label: "ENGINE_02", detail: "LOW-LEVEL GRAPHICS" },
    { label: "ENGINE_03", detail: "DISTRIBUTED SYSTEMS" }
];

export default function BrutalistAbout() {
    const { setActiveSection } = useScene();

    return (
        <section
            id="about"
            onPointerEnter={() => setActiveSection("about")}
            className="relative min-h-[80vh] flex flex-col justify-center px-[5vw] py-24 bg-background"
        >
            <div className="grid-poster">
                {/* LEFT CORE STATEMENT — PHASE 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, ease: GLOBAL_EASE }}
                    className="col-span-12 lg:col-span-10 flex flex-col items-start"
                >
                    <span className="text-micro font-bold tracking-[0.6em] opacity-40 mb-10">
                        03_IDENTITY
                    </span>

                    <h2 className="text-massive-mini text-white italic tracking-tight-title font-medium leading-[1.05] uppercase mb-16 max-w-[15ch]">
                        Logic is the absolute foundation of cinematic experience.
                    </h2>

                    <div className="flex flex-col md:flex-row gap-16 md:gap-24 w-full">
                        <div className="flex flex-col gap-8 max-w-[36ch]">
                            <p className="text-medium text-white/50 leading-relaxed font-medium italic">
                                I engineer high-precision digital environments where every interaction is a calculated response to system performance.
                            </p>
                            <p className="text-small text-white/30 leading-relaxed">
                                From secure backend infrastructures to low-level graphical explorations, I define the boundary between system logic and visual atmosphere.
                            </p>
                        </div>

                        {/* LEARNING TRACK — PHASE 2 */}
                        <div className="flex flex-col gap-10 flex-1 md:pl-20 md:border-l border-white/5">
                            <span className="text-micro font-bold tracking-[0.4em] opacity-20">SYSTEM_LEARNING</span>
                            <div className="flex flex-col gap-8">
                                {learning.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: GLOBAL_EASE }}
                                        className="flex flex-col gap-2 group"
                                    >
                                        <span className="text-[9px] font-bold text-white/20 tracking-widest group-hover:text-white/40 transition-colors">{item.label}</span>
                                        <span className="text-micro font-bold text-white/60 tracking-[0.2em] group-hover:text-white transition-colors uppercase">{item.detail}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* AMBIENT BACKDROP — PHASE 2 */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30vw] h-px bg-white/5 overflow-hidden pointer-events-none hidden lg:block">
                <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
            </div>
        </section>
    );
}
