"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useScene } from "@/context/SceneContext";

const contactLinks = [
    { label: "TELEGRAM", value: "@darshit_lagdhir", link: "https://t.me/ghalib_shayar" },
    { label: "GITHUB", value: "github.com/darshit-lagdhir", link: "https://github.com/darshit-lagdhir" },
    { label: "EMAIL", value: "darshit.lagdhir@gmail.com", link: "mailto:darshit.lagdhir@gmail.com" },
    { label: "X / TWITTER", value: "@dl_darshit", link: "https://twitter.com/dl_darshit" }
];

export default function BrutalistContact() {
    const sectionRef = useRef<HTMLElement>(null);
    const { setActiveSection, mode } = useScene();
    const [isHovered, setIsHovered] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], mode === 'depth' ? [5, 0, 0, -5] : [3, 0, 0, -3]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

    return (
        <section
            onMouseOver={() => setActiveSection("contact")}
            ref={sectionRef}
            className="spatial-section relative overflow-hidden"
            id="contact"
        >
            <motion.div
                style={{ rotateX, opacity, transformStyle: "preserve-3d" }}
                className="grid-layout items-start relative z-10 morph-surface md:pl-[6%] lg:pl-[10%]"
            >
                <div className="col-span-12 mb-16">
                    <motion.span
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                        className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                    >
                        05 SYSTEM TERMINAL // CONNECT MODES
                    </motion.span>
                </div>

                <div className="col-span-12 md:col-span-10 lg:col-span-8 flex flex-col gap-10">
                    <h2 className="font-title text-step-3 md:text-step-5 text-white uppercase tracking-tight-title text-physical italic first-letter:not-italic">
                        READY FOR <br /> NEW CONTRACTS.
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                        {contactLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setIsHovered(i)}
                                onMouseLeave={() => setIsHovered(null)}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className={`group p-8 border border-border flex flex-col gap-3 transition-all duration-500 relative overflow-hidden ${mode === 'minimal' ? 'hover:border-white' : 'glass-panel hover:border-white/20'}`}
                            >
                                <span className="font-mono text-[9px] text-muted tracking-widest uppercase opacity-50 group-hover:text-white transition-colors">
                                    {link.label}
                                </span>
                                <span className="font-title text-step-1 text-white uppercase group-hover:tracking-wider transition-all duration-500">
                                    {link.value}
                                </span>

                                {/* HUD RIPPLE FEEDBACK (PHASE 4: LOCAL) */}
                                {isHovered === i && mode !== 'minimal' && (
                                    <motion.div
                                        layoutId="contact-hover"
                                        className="absolute inset-0 bg-white/5 pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="col-span-12 md:col-span-8 mt-24">
                    <p className="font-body text-step-0 text-muted font-light leading-relaxed max-w-[45ch]">
                        OUR SYSTEM IS BUILT FOR ADAPTIVE LOGISTICS AND FORMAL VERIFICATION. CONNECT FOR INTEGRATION PROTOCOLS.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
