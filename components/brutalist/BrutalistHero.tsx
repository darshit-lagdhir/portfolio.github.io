"use client";

import { motion } from "framer-motion";

export default function BrutalistHero() {
    return (
        <section className="min-h-screen w-full flex flex-col justify-center items-start pt-32 pb-20 px-8 md:px-12 bg-[#050505] overflow-hidden snap-start">
            <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-4 md:grid-cols-12 gap-x-6 z-10 relative">

                {/* Hero Main Content */}
                <div className="col-span-4 md:col-span-12 lg:col-span-10 xl:col-span-8 flex flex-col justify-center h-[70vh]">
                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="font-title text-[clamp(5rem,12vw,16rem)] leading-[0.85] text-white uppercase tracking-tighter"
                    >
                        DARSHIT<br />
                        LAGDHIR
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-16 flex items-center gap-12"
                    >
                        <p className="font-body text-xl md:text-3xl text-neutral-500 font-light tracking-wide max-w-[40ch]">
                            Systems from the inside out. Structural integrity over decorative facade.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-20 flex flex-wrap items-center gap-12"
                    >
                        <a href="#projects" className="font-heading text-xs md:text-sm uppercase tracking-widest text-[#050505] bg-white px-10 py-5 hover:bg-neutral-300 transition-colors border border-white">
                            View Systems
                        </a>
                        <a href="https://github.com/darshit-lagdhir" target="_blank" className="font-heading text-xs md:text-sm uppercase tracking-widest text-neutral-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
                            GitHub Codebase
                        </a>
                    </motion.div>
                </div>

                {/* Grid Structural Lines */}
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 col-span-2 col-start-11 pointer-events-none opacity-20">
                    <div className="h-[40vh] w-px bg-white mx-auto" />
                </div>
            </div>

            {/* Minimal Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
                <div className="w-full max-w-screen-2xl mx-auto h-full grid grid-cols-4 md:grid-cols-12 gap-x-6 px-8 md:px-12">
                    <div className="border-l border-white h-full" />
                    <div className="border-l border-white h-full hidden md:block" />
                    <div className="border-l border-white h-full hidden md:block" />
                    <div className="border-l border-white h-full hidden md:block" />
                    <div className="border-l border-white h-full hidden md:block" />
                    <div className="border-l border-white h-full hidden md:block" />
                    <div className="border-l border-white h-full hidden md:block" />
                    <div className="border-l border-white h-full hidden md:block" />
                    <div className="border-l border-white h-full hidden md:block" />
                    <div className="border-l border-white h-full hidden md:block" />
                    <div className="border-l border-white h-full hidden md:block" />
                    <div className="border-l border-white h-full hidden md:block" />
                </div>
            </div>
        </section>
    );
}
