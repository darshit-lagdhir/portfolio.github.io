"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useScene } from "@/context/SceneContext";
import { useState, useEffect, useRef } from "react";

const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

// TEXT SCRAMBLE HOOK — PHASE 4
const useScramble = (text: string, active: boolean) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_//";

    useEffect(() => {
        if (!active) return;
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(prev => prev.split("").map((_, i) => {
                if (i < iteration) return text[i];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [active, text]);

    return display;
};

export default function BrutalistContact() {
    const { setActiveSection } = useScene();
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const inView = useInView(containerRef, { amount: 0.1 });
    const scrambledTitle = useScramble("CONNECT_PROTOCOL", inView);

    // PHASE 9 STEP 3: SECTION BREATHING
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const breathPadding = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["8rem", "10rem", "10rem", "8rem"]);

    return (
        <section
            ref={containerRef}
            id="contact"
            onPointerEnter={() => setActiveSection("contact")}
            className="relative min-h-[90vh] flex flex-col items-center justify-center px-[5vw] bg-white text-black"
        >
            {/* INSET SHADOW BOUNDARY — PHASE 4 (STEP 13) */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />

            {/* PHASE 10 STEP 8: GHOST TEXT BACKDROP */}
            <span className="ghost-text text-[25vw] font-heading font-black leading-none bottom-[10%] right-[-5%] text-black">
                CONNECT
            </span>

            <motion.div style={{ paddingTop: breathPadding, paddingBottom: breathPadding }} className="flex flex-col items-center justify-center w-full relative z-10">

                <div className="flex flex-col items-center text-center gap-12 w-full max-w-[1800px] mx-auto relative z-10">

                    {/* MASSIVE CONNECT — PHASE 4 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: GLOBAL_EASE }}
                        className="flex flex-col items-center gap-6"
                    >
                        <span className="text-micro font-bold tracking-[1em] text-black/40">04_TERMINATION</span>
                        <h2 className="text-massive-mini md:text-massive text-black italic tracking-tighter uppercase leading-none font-heading font-extrabold pr-4 overflow-hidden">
                            <motion.span
                                initial={{ y: "110%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2, ease: GLOBAL_EASE }}
                                className="block"
                            >
                                {scrambledTitle.split('_')[0]}
                            </motion.span>
                        </h2>
                    </motion.div>

                    {/* EMAIL INTERACTION — PHASE 3 + PHASE 11 STEP 9: BUTTON TENSION */}
                    <motion.div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scaleY: 0.97 }}
                        whileTap={{ scale: 0.95 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4, ease: GLOBAL_EASE, scale: { type: "spring", stiffness: 400, damping: 15 } }}
                        className="relative py-12 px-6 border border-black/5 group cursor-none"
                    >
                        <a
                            href="mailto:darshitlagdhir@gmail.com"
                            className={`
                            text-medium md:text-large text-black font-ui font-extrabold transition-all duration-700
                            ${isHovered ? "tracking-[0.1em]" : "tracking-tighter"}
                        `}
                        >
                            DARSHITLAGDHIR@GMAIL.COM
                        </a>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isHovered ? 1 : 0 }}
                            className="absolute bottom-10 left-6 right-6 h-[4px] bg-black origin-left"
                        />
                    </motion.div>

                    <div className="flex gap-16 mt-12">
                        {[
                            { label: "GH", link: "https://github.com/darshit-lagdhir" },
                            { label: "LI", link: "https://www.linkedin.com/in/darshitlagdhir/" },
                        ].map((social, i) => (
                            <motion.a
                                key={social.label}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                                className="text-micro font-bold tracking-[0.4em] hover:text-black/40 transition-all uppercase"
                            >
                                {social.label}
                            </motion.a>
                        ))}
                    </div>

                </div>
            </motion.div>

            {/* EXIT CUE — PHASE 3 */}
            <div className="absolute bottom-12 flex flex-col items-center gap-6 w-[200px]">
                <div className="w-px h-12 bg-black opacity-20" />
                <span className="text-micro font-bold tracking-[1.2em] text-black">EOT</span>
            </div>

            {/* CORNER ACCENTS (TIER 3) — PHASE 3 */}
            <div className="absolute top-0 right-0 w-[5vw] h-[5vw] border-l border-b border-black opacity-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-r border-t border-black opacity-10 pointer-events-none" />

        </section>
    );
}
