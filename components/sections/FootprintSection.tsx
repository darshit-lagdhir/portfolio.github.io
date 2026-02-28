"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { motionConfig, sectionReveal, staggerItem } from "@/lib/motion";

const featured = projects.filter((p) => p.githubUrl && p.tier === 1);

export default function FootprintSection() {
    return (
        <SectionWrapper id="footprint" surface>
            <motion.div {...sectionReveal}>
                <SectionHeading number="04">Engineering Footprint</SectionHeading>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div {...sectionReveal}>
                    <p className="text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-md">
                        Public repositories reflect the same discipline applied here —
                        structured commits, modular organization, readable code.
                    </p>
                    <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
                        Active contributor since 2023
                    </p>
                </motion.div>

                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={motionConfig.viewport}
                    transition={{ staggerChildren: motionConfig.stagger }}
                    className="space-y-4"
                >
                    {featured.map((repo) => (
                        <motion.a
                            key={repo.slug}
                            variants={staggerItem}
                            href={repo.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-4 transition-colors duration-200 hover:border-neutral-400 dark:hover:border-neutral-600"
                        >
                            <h3 className="text-sm font-medium font-mono">
                                {repo.githubRepoName}
                            </h3>
                            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {repo.shortDescription}
                            </p>
                            <p className="mt-2 text-xs text-neutral-500">
                                {repo.techStack.join(" · ")}
                            </p>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
