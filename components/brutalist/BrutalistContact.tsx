"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BrutalistContact() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

    // CONNECT CHAMBER (PHASE 11: FINAL ARRIVAL)
    const scaleGlow = useTransform(scrollYProgress, [0.3, 0.6, 0.9], [0.5, 1.5, 0.5]);
    const opacityGlow = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 0.15, 0]);
    const yContent = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={sectionRef} className="spatial-section overflow-hidden relative min-h-[120vh]" id="contact">

            {/* ATMOSPHERIC BLOOM (PHASE 11: FINAL CHAMBER) */}
            <motion.div
                style={{ scale: scaleGlow, opacity: opacityGlow }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white rounded-full blur-[250px] z-0 pointer-events-none"
            />

            <div className="grid-layout items-end relative z-10">
                <motion.div
                    style={{ y: yContent }}
                    className="col-span-12 flex flex-col gap-40 w-full"
                >
                    <div className="flex flex-col gap-12">
                        <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                            05 TERMINAL ENDPOINT
                        </span>

                        <motion.h2
                            initial={{ opacity: 0, translateZ: -200 }}
                            whileInView={{ opacity: 1, translateZ: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="font-title text-step-5 text-white uppercase tracking-tight-title leading-[0.8] mb-12"
                        >
                            CONNECT.
                        </motion.h2>
                    </div>

                    {/* Structural Footer */}
                    <div className="border-t border-border pt-12 pb-8 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline w-full">
                            <div className="md:col-span-12 lg:col-span-7">
                                <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                                    DARSHIT LAGDHIR // ARCHITECTURAL INDEX
                                </span>
                            </div>

                            <div className="md:col-span-12 lg:col-span-4 lg:col-start-9 flex justify-end gap-12 lg:gap-16">
                                {[
                                    { name: "GITHUB", url: "https://github.com/darshit-lagdhir" },
                                    { name: "LINKEDIN", url: "https://linkedin.com/in/darshit-lagdhir" }
                                ].map((l, i) => (
                                    <motion.a
                                        key={i}
                                        href={l.url}
                                        whileHover={{ scale: 1.1, translateZ: 20 }}
                                        target="_blank"
                                        className="font-wide text-step-0 text-white uppercase tracking-micro hover:text-muted transition-all duration-300 font-bold block"
                                    >
                                        {l.name}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
