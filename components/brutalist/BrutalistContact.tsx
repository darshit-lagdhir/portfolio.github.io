"use client";

import { motion } from "framer-motion";

export default function BrutalistContact() {
    return (
        <section className="min-h-screen w-full bg-[#050505] border-t border-neutral-900 border-dashed flex flex-col justify-center py-40 overflow-hidden relative snap-start px-8 md:px-12 xl:px-32">
            {/* Micro Label - Section Marker */}
            <div className="absolute top-10 right-10 z-0 text-right">
                <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-600 block mb-2 font-bold">SECT // 04</span>
            </div>

            <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-4 md:grid-cols-12 gap-x-6 items-center flex-grow">
                <div className="col-span-4 md:col-span-12 flex flex-col items-center select-none">
                    {/* Primary Contact Headline - Aalto Display (step-5) */}
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="font-title text-step-5 leading-none text-white uppercase tracking-tight-title hover:italic transition-transform duration-[1500ms] cursor-default text-center"
                    >
                        CONNECT.
                    </motion.h2>
                </div>
            </div>

            {/* Footer Component - Unified Typography */}
            <div className="w-full max-w-screen-2xl mx-auto mt-40 border-t border-neutral-900 pt-16">
                <div className="grid grid-cols-4 md:grid-cols-12 gap-x-6 gap-y-12 items-baseline">

                    {/* Year Label - HK Grotesk Wide (step--1) */}
                    <div className="col-span-4 md:col-span-4 lg:col-span-3">
                        <span className="font-body text-step--1 text-neutral-600 uppercase tracking-micro">
                            © {new Date().getFullYear()} / DARSHIT LAGDHIR
                        </span>
                    </div>

                    {/* Links - HK Grotesk Wide (step-0) */}
                    <div className="col-span-2 md:col-start-9 md:col-span-2 text-right md:text-left">
                        <a href="https://github.com/darshit-lagdhir" target="_blank" className="font-heading text-step-0 uppercase tracking-micro text-neutral-400 link-precision transition-colors duration-200">
                            GITHUB
                        </a>
                    </div>

                    <div className="col-span-2 md:col-start-11 md:col-span-2 text-right">
                        <a href="https://linkedin.com/in/darshit-lagdhir" target="_blank" className="font-heading text-step-0 uppercase tracking-micro text-neutral-400 link-precision transition-colors duration-200">
                            LINKEDIN
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
