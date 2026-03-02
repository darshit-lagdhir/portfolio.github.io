"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];

const projects = [
    {
        name: "MOVEX",
        slug: "/movex",
        descriptor: "SECURE_BACKEND_LOGISTICS",
        index: "01",
    },
    {
        name: "UIDAI_INTELLIGENCE",
        slug: "/uidai",
        descriptor: "PATTERN_DETECTION_SYSTEM",
        index: "02",
    },
    {
        name: "POLYGLOT_FFI",
        slug: "/pfcv",
        descriptor: "CROSS_LANGUAGE_VERIFIER",
        index: "03",
    }
];

function ProjectRow({ project, index }: { project: any, index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={project.slug} className="w-full h-full block">
            <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    w-full h-full p-20 flex flex-col justify-center gap-12 border-b border-black group transition-all duration-700
                    ${isHovered ? "bg-black text-white" : "bg-white text-black"}
                `}
            >
                <div className="flex justify-between items-end gap-12">
                    {/* LEFT AREA — TYPOGRAPHIC DOMINANCE */}
                    <div className="flex flex-col items-start gap-4">
                        <span className="text-micro font-bold tracking-[0.5em] opacity-40 group-hover:opacity-100 transition-opacity">
                            {project.index}_ARCHIVE
                        </span>
                        <h3 className="text-large md:text-massive-mini italic tracking-tight-title font-medium leading-[0.85] transition-all duration-700 group-hover:tracking-tighter">
                            {project.name}
                        </h3>
                    </div>

                    {/* RIGHT AREA — METADATA */}
                    <div className="hidden lg:flex flex-col items-end text-right gap-8 self-end pb-4">
                        <span className="text-micro font-bold tracking-[0.8em] opacity-10 group-hover:opacity-40 transition-opacity">
                            {project.descriptor}
                        </span>
                        <div className="w-20 h-[2px] bg-black group-hover:bg-white transition-colors duration-700" />
                    </div>
                </div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: GLOBAL_EASE }}
                    className="w-full h-[6px] bg-white origin-left mt-10"
                />
            </motion.div>
        </Link>
    );
}

export default function BrutalistProjectsPreview() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { setActiveSection } = useScene();

    return (
        <section
            ref={targetRef}
            id="projects"
            onPointerEnter={() => setActiveSection("projects")}
            className="relative min-h-screen bg-white" // WHITE SECTION — PHASE 3
        >
            {/* LARGE WHITE SECTION HEADING — PHASE 3 */}
            <div className="px-[5vw] py-40 border-b border-black">
                <div className="max-w-[1800px] mx-auto flex flex-col items-start gap-8">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 0.3, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: GLOBAL_EASE }}
                        className="text-micro font-bold tracking-[0.8em] text-black"
                    >
                        SELECTED_WORK_ARCHIVE
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: GLOBAL_EASE }}
                        className="text-massive-mini text-black italic tracking-tighter uppercase leading-[0.8] pr-[5vw] font-heading font-extrabold"
                    >
                        ARCHITECTURAL <br />
                        SYSTEMS_INDEX
                    </motion.h2>
                </div>
            </div>

            {/* FULL WIDTH PROJECT ROWS — PHASE 3 */}
            <div className="flex flex-col w-full h-full">
                {projects.map((p, i) => (
                    <ProjectRow key={i} project={p} index={i} />
                ))}
            </div>

            {/* WHITE SECTION EXIT CUE (TIER 3) */}
            <div className="w-full h-[20vh] bg-white border-t border-black flex items-center justify-center p-[5vw]">
                <div className="divider-h bg-black opacity-10" />
            </div>

        </section>
    );
}
