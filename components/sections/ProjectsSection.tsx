"use client";

import Container from "@/components/layout/Container";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { motionConfig } from "@/lib/motion";

export default function ProjectsSection() {
    const sorted = [...projects].sort((a, b) => a.tier - b.tier);

    return (
        <section id="projects" className="py-20">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                        duration: motionConfig.medium,
                        ease: motionConfig.ease,
                    }}
                >
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                        Selected Systems
                    </h2>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sorted.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
