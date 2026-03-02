"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];

export default function BrutalistHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { setActiveSection } = useScene();
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // PHASE 3 — DEPTH CONTROL
    const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const verticalShift = useTransform(scrollYProgress, [0, 1], ["0px", "-200px"]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[110vh] flex flex-col justify-center overflow-hidden bg-background px-[5vw]"
            id="hero"
            onPointerEnter={() => setActiveSection("hero")}
        >
            <div className="grid grid-cols-12 gap-10 items-end w-full max-w-[1800px] mx-auto pt-32">

                {/* LEFT 60% — TYPOGRAPHIC DOMINANCE */}
                <motion.div
                    style={{ scale: textScale, opacity: textOpacity, y: verticalShift }}
                    className="col-span-12 lg:col-span-8 flex flex-col items-start gap-4 z-10"
                >
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: GLOBAL_EASE }}
                            className="text-massive italic leading-[0.75] -ml-[0.05em] whitespace-nowrap"
                        >
                            DARSHIT
                        </motion.h1>
                    </div>

                    <div className="overflow-hidden pl-[15vw]">
                        <motion.h1
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: GLOBAL_EASE }}
                            className="text-massive text-white leading-[0.75] whitespace-nowrap"
                        >
                            LAGDHIR
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="divider-h mt-20"
                    />
                </motion.div>

                {/* RIGHT 40% — ARCHITECTURAL TENSION */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: GLOBAL_EASE }}
                    className="hidden lg:flex col-span-4 flex-col gap-12 pb-10"
                >
                    <div className="flex flex-col gap-4">
                        <span className="text-micro font-bold tracking-[0.6em] text-white">01_CORE</span>
                        <p className="text-short-body text-white/40 italic">
                            SCULPTING DIGITAL SYSTEMS <br />
                            THROUGH LOGIC-FIRST <br />
                            ARCHITECTURE.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-micro font-bold tracking-[0.6em] text-white">02_SESSION</span>
                        <p className="font-ui text-[10px] text-white/20 tracking-[0.2em] leading-loose">
                            LOC_INDIA // 2024.VER <br />
                            SYS_ACTIVE: TRUE <br />
                            MEM_SYNC: STABLE
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* ASYMMETRIC OVERFLOW DECOR (TIER 3) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute -right-20 top-1/2 -translate-y-1/2 select-none pointer-events-none"
            >
                <span className="text-[30vw] leading-none rotate-90 inline-block font-heading">
                    SYSTEM
                </span>
            </motion.div>

        </section>
    );
}
