"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { motionConfig, sectionReveal, staggerItem } from "@/lib/motion";

export default function ProjectsSection() {
    const sorted = [...projects].sort((a, b) => a.tier - b.tier);
    const flagship = sorted[0];
    const rest = sorted.slice(1);

    return (
        <section id="projects" className="pt-28 pb-20">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div {...sectionReveal}>
                    <SectionHeading number="03">Selected Systems</SectionHeading>
                </motion.div>

                {/* Flagship project — full width */}
                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={motionConfig.viewport}
                    transition={{ staggerChildren: motionConfig.stagger }}
                    className="mt-12"
                >
                    <motion.div variants={staggerItem}>
                        <ProjectCard project={flagship} flagship />
                    </motion.div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {rest.map((project) => (
                            <motion.div key={project.slug} variants={staggerItem}>
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
