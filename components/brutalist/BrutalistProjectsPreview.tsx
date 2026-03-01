"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

const projects = [
    {
        name: "MoveX",
        slug: "/movex",
        descriptor: "SECURE BACKEND LOGISTICS ARCHITECTURE",
        index: "SYSTEM 01"
    },
    {
        name: "UIDAI SYSTEM",
        slug: "/uidai",
        descriptor: "ADVISORY INTELLIGENCE PATTERN DETECTION",
        index: "SYSTEM 02"
    },
    {
        name: "POLYGLOT FFI",
        slug: "/pfcv",
        descriptor: "CROSS-LANGUAGE CONTRACT VERIFIER",
        index: "SYSTEM 03"
    }
];

function SpatialProjectCard({ project, index, scrollYProgress }: { project: any, index: number, scrollYProgress: any }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // HEAVIER PROJECT STACK MOTION (PHASE 4: CINEMATIC WEIGHT)
    // Range is index * 0.15 etc. Based on 150vh.
    const startRange = index * 0.12;
    const endRange = startRange + 0.35;

    // Smooth, heavy interpolation (PHASE 4)
    const yStack = useTransform(scrollYProgress, [startRange, endRange], [0, -80]);
    const zStack = useTransform(scrollYProgress, [startRange, endRange], [0, -120]);
    const rotateXStack = useTransform(scrollYProgress, [startRange, endRange], [0, 8]);
    const opacityStack = useTransform(scrollYProgress, [startRange, endRange], [1, 0.4]);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // LESS SPRING, MORE WEIGHT (PHASE 4)
    const mouseXSpring = useSpring(x, { damping: 65, stiffness: 100 });
    const mouseYSpring = useSpring(y, { damping: 65, stiffness: 100 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]); // Reduced (PHASE 7)
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]); // Reduced (PHASE 7)

    // LIGHT AS ATMOSPHERE (PHASE 5)
    const sweepX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10%", "110%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                y: yStack,
                z: zStack,
                rotateX: isHovered ? rotateX : rotateXStack,
                rotateY: isHovered ? rotateY : 0,
                opacity: opacityStack,
                zIndex: index
            }}
            className="group relative spatial-card border border-border bg-background p-16 md:p-32 mb-[-6vh] md:mb-[-10vh] hover:border-white/10 transition-all duration-700 overflow-hidden cursor-pointer"
        >
            {/* ATMOSPHERIC LIGHT SWEEP (PHASE 5 & 8) */}
            <motion.div
                style={{ x: sweepX }}
                className="absolute inset-x-0 top-0 h-full w-[120px] bg-white/[0.03] skew-x-12 blur-2xl pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500"
            />

            <Link href={project.slug} className="grid grid-cols-1 md:grid-cols-12 items-center gap-12 relative z-10 block w-full">

                <div className="md:col-span-8 overflow-hidden">
                    <motion.div
                        style={{ translateZ: 100 }}
                        className="flex items-center gap-12"
                    >
                        <h3 className="font-title text-step-3 text-white uppercase tracking-tight-title group-hover:scale-[1.02] transition-all duration-500 origin-left text-physical italic first-letter:not-italic">
                            {project.name}
                        </h3>
                        {/* MICRO REACTION (PHASE 7) */}
                        <motion.span
                            animate={{ x: isHovered ? 15 : 0, opacity: isHovered ? 1 : 0 }}
                            className="text-white text-step-2 pointer-events-none italic"
                        >
                            &rarr;
                        </motion.span>
                    </motion.div>
                </div>

                <div className="md:col-span-4 flex flex-col justify-center items-end text-right">
                    <motion.div style={{ translateZ: 60 }} className="flex flex-col gap-5">
                        <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline">
                            // ARCHIVE {project.index}
                        </span>
                        <p className="font-body text-step-0 text-muted font-light leading-relaxed max-w-[28ch] group-hover:text-white transition-colors duration-500">
                            {project.descriptor}
                        </p>
                    </motion.div>
                </div>
            </Link>

            {/* ENVIRONMENTAL GLOW (PHASE 5) */}
            <motion.div
                style={{ translateZ: -80 }}
                className="absolute inset-0 bg-radial-glow group-hover:opacity-100 transition-all duration-700 pointer-events-none"
            />
        </motion.div>
    );
}

export default function BrutalistProjectsPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const scaleSection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);

    return (
        <section ref={sectionRef} className="spatial-section bg-black/20" id="projects">
            <motion.div style={{ scale: scaleSection }} className="grid-layout items-start morph-surface">

                <div className="col-span-12 mb-24 md:pl-[6%]">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-10%" }}
                        transition={{ duration: 1 }}
                        className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                    >
                        03 SYSTEMS ARCHIVE // CINEMATIC CORE
                    </motion.span>
                </div>

                {/* HEAVIER 3D PROJECT STACK (PHASE 4: CINEMATIC FLOW) */}
                <div className="col-span-12 flex flex-col md:pl-[6%] md:pr-[12%] stack-container">
                    {projects.map((p, i) => (
                        <SpatialProjectCard key={i} project={p} index={i} scrollYProgress={scrollYProgress} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
