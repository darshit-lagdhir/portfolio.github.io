"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const projects = [
    {
        name: "MoveX",
        slug: "/movex",
        descriptor: "Secure Backend Logistics Architecture"
    },
    {
        name: "UIDAI SYSTEM",
        slug: "/uidai",
        descriptor: "Advisory Intelligence Pattern Detection"
    },
    {
        name: "POLYGLOT FFI",
        slug: "/pfcv",
        descriptor: "Cross-Language Contract Verifier"
    }
];

export default function BrutalistProjectsPreview() {
    return (
        <section className="relative w-full bg-[#050505] snap-start" id="projects">
            <div className="absolute top-10 right-10 z-10 hidden md:block">
                <span className="font-heading text-xs uppercase tracking-[0.5em] text-neutral-600">SECT // 03</span>
            </div>

            {/* Horizontal Scroll Track Wrapper */}
            <div className="w-full h-screen overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory hide-scroll border-t border-b border-neutral-900 border-dashed relative z-0">
                {projects.map((project, i) => (
                    <div
                        key={i}
                        className="w-full h-full flex-shrink-0 snap-start flex justify-center items-center py-20 px-8 relative"
                    >
                        <div className="w-full h-full max-w-screen-2xl grid grid-cols-4 md:grid-cols-12 gap-x-6 gap-y-12 content-center items-end py-20 group relative border border-transparent hover:border-neutral-900 overflow-hidden p-8 md:p-12 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            {/* Accent Background Overlay */}
                            <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 pointer-events-none" />

                            <div className="col-span-4 md:col-span-12 lg:col-span-10 z-10">
                                <span className="font-heading text-[10px] md:text-sm tracking-[0.5em] text-neutral-500 uppercase block mb-8">
                                    SYS // 0{i + 1}
                                </span>

                                <h3 className="font-title text-[clamp(4.5rem,12vw,16rem)] leading-[0.85] text-white uppercase tracking-tighter transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.01] transform origin-left">
                                    {project.name}
                                </h3>

                                <p className="font-body text-xl md:text-4xl text-neutral-400 font-light mt-12 mb-20 tracking-wide max-w-[40ch]">
                                    {project.descriptor}
                                </p>

                                <Link href={project.slug} className="font-heading text-xs md:text-sm uppercase tracking-widest text-[#050505] bg-white px-10 py-5 inline-block hover:bg-neutral-300 transition-colors border border-white">
                                    Enter System
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .hide-scroll::-webkit-scrollbar {
                    display: none;
                }
                .hide-scroll {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
