"use client";

import { motion } from "framer-motion";
import { useScene } from "@/context/SceneContext";
import { useState } from "react";

const GLOBAL_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function BrutalistContact() {
    const { setActiveSection } = useScene();
    const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);

    const createRipple = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples(prev => [...prev, { x, y, id }]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== id));
        }, 1000);
    };

    return (
        <section
            id="contact"
            onPointerEnter={() => setActiveSection("contact")}
            className="relative min-h-[60vh] flex flex-col items-center justify-center px-[5vw] py-32 bg-background border-t border-white/5"
        >
            <div className="flex flex-col items-center text-center gap-12 max-w-[60ch]">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: GLOBAL_EASE }}
                    className="flex flex-col items-center gap-6"
                >
                    <span className="text-micro font-bold tracking-[0.8em] opacity-40">04_TERMINATION</span>
                    <h2 className="text-massive-mini text-white italic tracking-tight-title uppercase leading-none">
                        SESSION_SYNC
                    </h2>
                </motion.div>

                <p className="text-medium text-white/40 leading-relaxed italic max-w-[40ch]">
                    ESTABLISH CONNECTION FOR SYSTEM INTEGRATION OR ARCHITECTURAL INQUIRIES.
                </p>

                {/* EMAIL INTERACTION — PHASE 2 */}
                <motion.div
                    onClick={createRipple}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: GLOBAL_EASE }}
                    className="relative group p-8 md:p-12 border border-white/5 bg-white/[0.02] overflow-hidden cursor-none"
                >
                    <a
                        href="mailto:darshit.lagdhir@gmail.com"
                        className="text-medium md:text-large text-white tracking-widest font-bold group-hover:tracking-tighter transition-all duration-700 relative z-10"
                    >
                        DARSHIT.LAGDHIR@GMAIL.COM
                    </a>

                    {/* RIPPLE ENGINE — PHASE 2 */}
                    {ripples.map(ripple => (
                        <motion.span
                            key={ripple.id}
                            initial={{ scale: 0, opacity: 0.5 }}
                            animate={{ scale: 4, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{ left: ripple.x, top: ripple.y }}
                            className="absolute w-20 h-20 bg-white/20 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                        />
                    ))}

                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
                </motion.div>

                <div className="flex gap-12 mt-8">
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
                            whileInView={{ opacity: 0.3 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                            whileHover={{ opacity: 1, y: -2 }}
                            className="text-micro font-bold tracking-[0.4em] hover:text-white transition-all uppercase"
                        >
                            {social.label}
                        </motion.a>
                    ))}
                </div>

            </div>

            {/* EXIT CUE — PHASE 2 */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.2 }}
                transition={{ delay: 1, duration: 2 }}
                className="absolute bottom-12 flex flex-col items-center gap-6"
            >
                <div className="w-px h-12 bg-white/20" />
                <span className="text-micro font-bold tracking-[1em] text-white/50">EOT_TRANSMISSION</span>
            </motion.div>
        </section>
    );
}
