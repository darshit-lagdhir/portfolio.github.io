"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { motionConfig, sectionReveal } from "@/lib/motion";

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: motionConfig.medium, ease: motionConfig.ease },
    },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const layers = [
    {
        number: "01",
        title: "Core Programming",
        description:
            "Structured logic design, algorithmic reasoning, and memory-aware implementation driven by problem constraints.",
        tech: "C · C++ · Java · Python",
        emphasis: true,
    },
    {
        number: "02",
        title: "Backend & System Logic",
        description:
            "Modular server flows with clear request lifecycles, role-based access control, and separated business logic layers.",
        tech: "Node.js · Express · REST Patterns",
        emphasis: true,
    },
    {
        number: "03",
        title: "Data & Storage",
        description:
            "Schema design with normalization awareness, structured persistence, and deliberate selection between relational and document models.",
        tech: "MySQL · PostgreSQL · MongoDB · SQLite",
        emphasis: false,
    },
    {
        number: "04",
        title: "Interface Layer",
        description:
            "Component structuring, state management, and UI-data mapping with focus on clarity over visual complexity.",
        tech: "React · TypeScript · HTML · CSS",
        emphasis: false,
    },
    {
        number: "05",
        title: "Infrastructure",
        description:
            "Deployment workflows, environment configuration, and structured exploration of cloud services with operational focus.",
        tech: "Google Cloud · CI/CD · Environment Setup",
        emphasis: false,
    },
    {
        number: "06",
        title: "Tooling Discipline",
        description:
            "Version control discipline, atomic commits, modular project organization, and development environment efficiency.",
        tech: "Git · GitHub · VS Code",
        emphasis: false,
    },
];

export default function SkillsSection() {
    return (
        <SectionWrapper id="skills" surface>
            <motion.div {...sectionReveal}>
                <SectionHeading number="02" systemLabel="SYS-02">Engineering Layers</SectionHeading>
                <p className="mt-3 text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
                    Principles shape structure. Stacked by architecture, not trend.
                </p>
            </motion.div>

            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={motionConfig.viewport}
                className="mt-14 max-w-3xl"
            >
                {layers.map((layer, i) => (
                    <motion.div key={layer.number} variants={fadeUp}>
                        <div className={`flex gap-6 ${layer.emphasis ? "py-8" : "py-6"}`}>
                            <div className="flex flex-col items-center shrink-0 w-6">
                                <span className="text-xs font-mono text-neutral-300 dark:text-neutral-700">
                                    {layer.number}
                                </span>
                                {i < layers.length - 1 && (
                                    <div className="flex-1 w-px mt-2 bg-neutral-200/60 dark:bg-neutral-800/60" />
                                )}
                            </div>
                            <div className="pb-1">
                                <h3 className={`font-semibold ${layer.emphasis ? "text-lg" : "text-base"}`}>
                                    {layer.title}
                                </h3>
                                <p className="mt-2 text-sm leading-[1.7] text-neutral-600 dark:text-neutral-400 max-w-lg">
                                    {layer.description}
                                </p>
                                <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-500">
                                    {layer.tech}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
}
