"use client";

import Container from "@/components/layout/Container";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { motionConfig, sectionReveal, staggerItem } from "@/lib/motion";

export default function ProjectsSection() {
    const sorted = [...projects].sort((a, b) => a.tier - b.tier);

    return (
        <section id="projects" className="py-20">
            <Container>
                <motion.div {...sectionReveal}>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                        Selected Systems
                    </h2>
                </motion.div>

                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={motionConfig.viewport}
                    transition={{ staggerChildren: motionConfig.stagger }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {sorted.map((project) => (
                        <motion.div key={project.slug} variants={staggerItem}>
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
