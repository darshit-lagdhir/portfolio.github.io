"use client";

import { motion } from "framer-motion";

export default function BrutalistContact() {
    return (
        <section className="min-h-[80vh] w-full bg-[#050505] border-t border-neutral-900 border-dashed flex flex-col justify-center py-40 overflow-hidden relative snap-start">
            <div className="absolute top-10 right-10 z-0 text-right">
                <span className="font-heading text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-2">SECT // 05</span>
            </div>

            <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-12 grid grid-cols-4 md:grid-cols-12 gap-x-6 items-center flex-grow">
                <div className="col-span-4 md:col-span-12 flex flex-col items-center">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="font-title text-[clamp(6rem,18vw,26rem)] leading-[0.8] text-white uppercase tracking-tighter hover:italic transition-transform duration-[1500ms] cursor-default select-none text-center"
                    >
                        CONNECT.
                    </motion.h2>
                </div>
            </div>

            {/* Footer Component inside Contact Section */}
            <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-12 mt-40">
                <div className="grid grid-cols-4 md:grid-cols-12 gap-x-6 gap-y-12 items-baseline border-t border-neutral-900 pt-10">
                    <div className="col-span-4 md:col-span-4 lg:col-span-3">
                        <span className="font-body text-[10px] md:text-sm text-neutral-600 uppercase tracking-widest">
                            © {new Date().getFullYear()} / DARSHIT LAGDHIR
                        </span>
                    </div>

                    <div className="col-span-2 md:col-start-9 md:col-span-2 text-right md:text-left">
                        <a href="https://github.com/darshit-lagdhir" target="_blank" className="font-heading text-xs uppercase tracking-[0.5em] text-neutral-400 hover:text-white transition-colors duration-300">
                            GITHUB
                        </a>
                    </div>

                    <div className="col-span-2 md:col-start-11 md:col-span-2 text-right">
                        <a href="https://linkedin.com/in/darshit-lagdhir" target="_blank" className="font-heading text-xs uppercase tracking-[0.5em] text-neutral-400 hover:text-white transition-colors duration-300">
                            LINKEDIN
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
