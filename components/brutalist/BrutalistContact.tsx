"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useScene } from "@/context/SceneContext";

// PHASE 1: CENTRAL MOTION CONTROLLER
const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

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
    const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], mode === 'depth' ? [2.5, 0, 0, -2.5] : [1, 0, 0, -1]);

    return (
        <section
            onPointerEnter={() => setActiveSection("contact")}
            ref={sectionRef}
            className="spatial-section relative flex items-center justify-center section-tone-shift tone-02"
            id="contact"
        >
            <motion.div
                style={{ rotateX, transformStyle: "preserve-3d" }}
                className="w-full relative z-10"
            >
                <div className="grid-poster py-24 flex flex-col lg:flex-row gap-16 items-end">

                    {/* PHASE 3: LEFT-DOMINANT LAYOUT */}
                    <div className="flex-1 flex flex-col items-start gap-12">
                        <div className="flex flex-col gap-6 items-start">
                            <span className="text-micro font-bold text-muted border-l border-white/20 pl-6 h-4 flex items-center">SECTION_ID_05</span>
                            <h2 className="text-large text-white flex flex-col italic first-letter:not-italic select-none pointer-events-none border-b border-white/5 pb-10 w-full text-highlight-sweep">
                                SYSTEM_TERMINAL // SYNC
                            </h2>
                        </div>

                        <p className="text-small text-muted font-light tracking-wide max-w-[42ch]">
                            Terminal session remains active for integration protocols. Select a transmission node to establish contact.
                        </p>
                    </div>

                    {/* PHASE 5: HEAVY PANEL V3 (CONTACT NODES) */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10 w-full">
                        {contactLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setIsHovered(i)}
                                onMouseLeave={() => setIsHovered(null)}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.8, ease: GLOBAL_EASE }}
                                className={`heavy-panel btn-signature signature-bracket elastic-micro light-beam-pass p-8 md:p-10 flex flex-col justify-between h-48 md:h-56 transition-all duration-500 relative group overflow-hidden ${mode === 'minimal' ? 'hover:bg-[#0c0c0c]' : 'mat-matte'}`}
                            >
                                <span className="text-micro font-bold text-muted group-hover:text-white transition-all opacity-40">
                                    {link.label}
                                </span>

                                <span className="text-medium text-white tracking-widest italic first-letter:not-italic group-hover:tracking-tighter transition-all duration-700">
                                    {link.value}
                                </span>

                                {/* PHASE 9: RIM HIGHLIGHT */}
                                <div className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-100 transition-opacity rim-highlight" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* PHASE 8: INTERACTIVE NEGATIVE SPACE (AMBIENT OBJECTS) */}
            <div className="absolute bottom-12 right-12 flex flex-col gap-4 opacity-10">
                <div className="w-[1px] h-20 bg-white" />
                <span className="text-micro rotate-90 origin-bottom-left absolute -bottom-10 left-4">EOT_TRANSMISSION</span>
            </div>
        </section>
    );
}
