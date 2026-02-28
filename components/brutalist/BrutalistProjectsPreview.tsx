"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
    const ease = [0.16, 1, 0.3, 1] as const;
    return (
        <section className="relative w-full bg-[#050505] snap-start py-40 overflow-hidden border-t border-neutral-900 border-dashed" id="projects">
            {/* Micro Label - Section Marker */}
            <div className="absolute top-10 right-10 z-10 hidden md:block">
                <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-600 block mb-2 font-bold">SECT // 02</span>
            </div>

            <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-12 xl:px-32 flex flex-col gap-60">
                {projects.map((project, i) => (
                    <div
                        key={i}
                        className="w-full h-full flex-shrink-0 flex flex-col justify-center items-center py-20 px-8 relative border border-neutral-900 bg-layered overflow-hidden transition-all duration-300 group hover:border-neutral-700"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, ease: ease }}
                            viewport={{ once: true }}
                            className="w-full h-full max-w-screen-2xl mx-auto grid grid-cols-4 md:grid-cols-12 gap-x-6 gap-y-12 content-center items-end py-20 relative"
                        >
                            {/* Project Header - Micro Label Style */}
                            <div className="col-span-4 md:col-span-12 lg:col-span-10 z-10 flex flex-col gap-10">
                                <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-500 block mb-8 transition-colors duration-200 group-hover:text-neutral-400">
                                    SYS // 0{i + 1}
                                </span>

                                {/* Title - Magazine Cover Aesthetic */}
                                <h3 className="font-title text-step-5 leading-tight-title text-white uppercase tracking-tight-title transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                                    {project.name}
                                </h3>

                                {/* Descriptor - Space Grotesk Neutral */}
                                <p className="font-body text-step-2 text-neutral-400 font-light mt-12 mb-20 tracking-wide max-w-[40ch] leading-tight transition-colors duration-200 group-hover:text-neutral-300">
                                    {project.descriptor}
                                </p>

                                {/* Action Link - HK Grotesk Wide Uppercase Wide Tracking */}
                                <Link
                                    href={project.slug}
                                    className="font-heading text-step-0 uppercase tracking-micro text-white link-precision pb-2 inline-block max-w-fit"
                                >
                                    Enter System
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
}
