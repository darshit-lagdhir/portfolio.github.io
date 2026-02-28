"use client";

import Container from "@/components/layout/Container";
import { motion } from "framer-motion";
import { motionConfig } from "@/lib/motion";

const layers = [
    {
        title: "Core Programming Foundations",
        description:
            "Building structured logic at the language level — memory-aware design, algorithmic reasoning, and data structure selection driven by problem constraints rather than convenience.",
        technologies: ["C", "C++", "Java", "Python"],
    },
    {
        title: "Backend & System Logic",
        description:
            "Designing modular server-side flows with clear request lifecycles, role-based access control, and separation between routing, business logic, and data access layers.",
        technologies: ["Node.js", "Express", "API Design Patterns"],
    },
    {
        title: "Data & Storage Architecture",
        description:
            "Schema design with normalization awareness, structured persistence strategies, and deliberate selection between relational and document-based models based on access patterns.",
        technologies: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    },
    {
        title: "Frontend & Interface Systems",
        description:
            "Component structuring, state management, and UI-data mapping with focus on clarity and maintainability over visual complexity.",
        technologies: ["React", "TypeScript", "HTML", "CSS", "Bootstrap"],
    },
    {
        title: "Infrastructure & Cloud",
        description:
            "Deployment workflows, environment configuration, and structured exploration of scalable cloud services with a focus on understanding operational fundamentals.",
        technologies: ["Google Cloud", "CI/CD Basics", "Environment Setup"],
    },
    {
        title: "Tooling & Workflow",
        description:
            "Version control discipline, atomic commit practices, modular project organization, and development environment efficiency as daily engineering habits.",
        technologies: ["Git", "GitHub", "VS Code"],
    },
];

export default function SkillsSection() {
    return (
        <section id="skills" className="py-20 bg-neutral-100/40 dark:bg-neutral-900/20">
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
                        System Capabilities
                    </h2>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {layers.map((layer) => (
                            <div
                                key={layer.title}
                                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-6 transition-colors duration-200 hover:border-neutral-400 dark:hover:border-neutral-600"
                            >
                                <h3 className="text-lg font-medium">{layer.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-md">
                                    {layer.description}
                                </p>
                                <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
                                    {layer.technologies.join(" · ")}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
