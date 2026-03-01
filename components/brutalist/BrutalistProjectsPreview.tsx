"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const projects = [
    {
        name: "MoveX",
        slug: "/movex",
        descriptor: "SECURE BACKEND LOGISTICS ARCHITECTURE",
        index: "01"
    },
    {
        name: "UIDAI SYSTEM",
        slug: "/uidai",
        descriptor: "ADVISORY INTELLIGENCE PATTERN DETECTION",
        index: "02"
    },
    {
        name: "POLYGLOT FFI",
        slug: "/pfcv",
        descriptor: "CROSS-LANGUAGE CONTRACT VERIFIER",
        index: "03"
    }
];

function SpatialProjectCard({ project }: { project: any }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { damping: 40, stiffness: 200 });
    const mouseYSpring = useSpring(y, { damping: 40, stiffness: 200 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
    const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
    const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            className="group relative spatial-card border-t border-border first:border-t-0 p-12 md:p-24 hover:bg-white/5 transition-all duration-700 overflow-hidden cursor-pointer animate-spatial-breath"
        >
            <Link href={project.slug} className="grid grid-cols-1 md:grid-cols-12 items-center gap-12 relative z-10 block w-full">

                {/* PROJECT NAME (PHASE 4: SPATIAL SLAB) */}
                <div className="md:col-span-8">
                    <motion.h3
                        style={{ translateZ: 80 }}
                        className="font-title text-step-3 text-white uppercase tracking-tight-title group-hover:scale-105 transition-transform duration-700 origin-left"
                    >
                        {project.name}
                    </motion.h3>
                </div>

                {/* DESCRIPTOR (PHASE 4: DEPTH VOLUME) */}
                <div className="md:col-span-4 flex flex-col justify-center items-end text-right">
                    <motion.div style={{ translateZ: 40 }} className="flex flex-col gap-4">
                        <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                            // SYSTEM {project.index}
                        </span>
                        <p className="font-body text-step-0 text-muted font-light leading-relaxed max-w-[25ch]">
                            {project.descriptor}
                        </p>
                    </motion.div>
                </div>

                {/* PROJECT SHADOW / GLOW (PHASE 7: LIGHT REACTIVE) */}
                <motion.div
                    style={{
                        x: shadowX,
                        y: shadowY,
                        translateZ: -40,
                        opacity: 0
                    }}
                    className="absolute inset-0 bg-radial-glow group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                />
            </Link>
        </motion.div>
    );
}

export default function BrutalistProjectsPreview() {
    return (
        <section className="spatial-section perspective-1000" id="projects">
            <div className="grid-layout">
                {/* Identification Label (Grid Zone 1) */}
                <div className="col-span-12 mb-16 lg:mb-24">
                    <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                        03 SYSTEMS ARCHIVE
                    </span>
                </div>

                {/* Structural Entry Catalog (PHASE 4: REINVENTION) */}
                <div className="col-span-12 flex flex-col">
                    {projects.map((p, i) => (
                        <SpatialProjectCard key={i} project={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
