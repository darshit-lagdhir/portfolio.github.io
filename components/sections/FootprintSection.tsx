"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { motionConfig, sectionReveal, staggerItem } from "@/lib/motion";

const repos = [
    {
        name: "courier-management-system",
        description:
            "Modular CLI system with role-driven workflows, layered command routing, and file-based persistence built in C.",
        tech: "C · Modular CLI",
        url: "https://github.com/darshitlagdhir",
    },
    {
        name: "student-record-engine",
        description:
            "Structured data engine with CRUD operations, binary storage, and in-memory indexing for efficient record retrieval.",
        tech: "C++ · File I/O",
        url: "https://github.com/darshitlagdhir",
    },
    {
        name: "inventory-control-system",
        description:
            "Backend inventory management applying Repository, Factory, and Service Layer patterns with transactional semantics.",
        tech: "Java · OOP Patterns",
        url: "https://github.com/darshitlagdhir",
    },
];

export default function FootprintSection() {
    return (
        <SectionWrapper id="footprint" surface>
            <motion.div {...sectionReveal}>
                <SectionHeading>Engineering Footprint</SectionHeading>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div {...sectionReveal}>
                    <p className="text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-md">
                        Public repositories reflect the same discipline applied in this
                        portfolio — structured commits, modular organization, and clear
                        documentation. Code is written to be read, not just executed.
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
                    {repos.map((repo) => (
                        <motion.a
                            key={repo.name}
                            variants={staggerItem}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-4 transition-colors duration-200 hover:border-neutral-400 dark:hover:border-neutral-600"
                        >
                            <h3 className="text-sm font-medium font-mono">
                                {repo.name}
                            </h3>
                            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {repo.description}
                            </p>
                            <p className="mt-2 text-xs text-neutral-500">{repo.tech}</p>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
