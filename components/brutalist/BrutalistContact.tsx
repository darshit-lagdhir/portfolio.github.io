"use client";

import { motion } from "framer-motion";
import { useScene } from "@/context/SceneContext";
import { useState } from "react";

const GLOBAL_EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];

export default function BrutalistContact() {
    const { setActiveSection } = useScene();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section
            id="contact"
            onPointerEnter={() => setActiveSection("contact")}
            className="relative min-h-[80vh] flex flex-col items-center justify-center px-[5vw] py-40 bg-white border-t border-black text-black"
        >
            <div className="flex flex-col items-center text-center gap-12 w-full max-w-[1800px] mx-auto">

                {/* MASSIVE CONNECT — PHASE 3 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: GLOBAL_EASE }}
                    className="flex flex-col items-center gap-6"
                >
                    <span className="text-micro font-bold tracking-[1em] text-black">04_TERMINATION</span>
                    <h2 className="text-massive-mini md:text-massive text-black italic tracking-tighter uppercase leading-none font-heading font-extrabold pr-4 overflow-hidden">
                        <motion.span
                            initial={{ y: "110%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: GLOBAL_EASE }}
                            className="block"
                        >
                            CONNECT
                        </motion.span>
                    </h2>
                </motion.div>

                {/* EMAIL INTERACTION — PHASE 3 */}
                <motion.div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: GLOBAL_EASE }}
                    className="relative py-12 px-6 border border-black/5 group cursor-none"
                >
                    <a
                        href="mailto:darshit.lagdhir@gmail.com"
                        className={`
                            text-medium md:text-large text-black font-ui font-extrabold transition-all duration-700
                            ${isHovered ? "tracking-[0.1em]" : "tracking-tighter"}
                        `}
                    >
                        DARSHIT.LAGDHIR@GMAIL.COM
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
                        { label: "TW", link: "https://twitter.com/dl_darshit" },
                        { label: "TG", link: "https://t.me/ghalib_shayar" }
                    ].map((social, i) => (
                        <motion.a
                            key={social.label}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 1 + i * 0.1 }}
                            className="text-micro font-bold tracking-[0.4em] hover:text-black/40 transition-all uppercase"
                        >
                            {social.label}
                        </motion.a>
                    ))}
                </div>

            </div>

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
