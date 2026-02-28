"use client";

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import ArchitectureDiagram from "@/components/ui/ArchitectureDiagram";
import TiltCard from "@/components/ui/TiltCard";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { motionConfig, sectionReveal, staggerItem } from "@/lib/motion";

export default function ProjectsSection() {
    const sorted = [...projects].sort((a, b) => a.tier - b.tier);
    const flagship = sorted[0];
    const rest = sorted.slice(1);

    return (
        <section id="projects" className="py-28">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div {...sectionReveal}>
                    <SectionHeading number="03" systemLabel="SYS-03">Selected Systems</SectionHeading>
                </motion.div>

                {/* Flagship */}
                <motion.div {...sectionReveal} className="mt-12">
                    <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
                        Flagship Implementation
                    </p>
                    <TiltCard className="rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-6 md:p-8 hover:border-neutral-500 dark:hover:border-neutral-500 transition-colors duration-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold leading-snug">
                                    {flagship.title}
                                </h3>
                                <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                                    {flagship.shortDescription}
                                </p>
                                <p className="mt-4 text-xs text-neutral-500">
                                    {flagship.techStack.join(" · ")}
                                </p>

                                <div className="mt-6 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60">
                                    <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
                                        Why This System Matters
                                    </p>
                                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                                        Demonstrates structured command parsing, layered architecture
                                        separation, and file-based persistence strategy under
                                        procedural C constraints — without external frameworks.
                                    </p>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-4">
                                    <Link
                                        href={`/projects/${flagship.slug}`}
                                        className="text-sm font-medium underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-200 transition-colors"
                                    >
                                        View Case Study →
                                    </Link>
                                    {flagship.githubUrl && (
                                        <a
                                            href={flagship.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium font-mono underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-200 transition-colors"
                                        >
                                            View Repository →
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col justify-between">
                                {flagship.diagramLayers && (
                                    <ArchitectureDiagram
                                        layers={flagship.diagramLayers}
                                        caption="System layer overview"
                                    />
                                )}
                                {flagship.architectureLayers && (
                                    <div className="mt-4">
                                        <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                                            Architecture Layers
                                        </p>
                                        <ul className="space-y-2">
                                            {flagship.architectureLayers.map((layer) => (
                                                <li
                                                    key={layer.name}
                                                    className="text-sm text-neutral-600 dark:text-neutral-400 flex gap-2"
                                                >
                                                    <span className="text-neutral-300 dark:text-neutral-700 shrink-0">—</span>
                                                    {layer.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Supporting Systems */}
                {rest.length > 0 && (
                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={motionConfig.viewport}
                        transition={{ staggerChildren: motionConfig.stagger }}
                        className="mt-10"
                    >
                        <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
                            Supporting Systems
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {rest.map((project) => (
                                <motion.div key={project.slug} variants={staggerItem}>
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
