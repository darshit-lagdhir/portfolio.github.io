"use client";

import Container from "@/components/layout/Container";
import { motion } from "framer-motion";
import { motionConfig } from "@/lib/motion";

const pillars = [
    {
        title: "Systems Thinking",
        body: "I prioritize understanding how components relate to each other before optimizing individual parts. Structure dictates stability — if the architecture is clear, the implementation follows naturally.",
    },
    {
        title: "Practical Execution",
        body: "I build for constraints, not for ideals. Every decision weighs tradeoffs between complexity, time, and maintainability. Working software that handles real scenarios matters more than theoretical perfection.",
    },
    {
        title: "Structured Growth",
        body: "I explore cloud infrastructure, applied AI/ML, and security not as trends to chase, but as layers to understand deliberately. Each new domain is approached with the same discipline as core engineering.",
    },
    {
        title: "Simplicity & Efficiency",
        body: "Good software should be readable, minimal, and effective. Unnecessary abstraction adds fragility. I write code that future developers — including myself — can understand without documentation archaeology.",
    },
];

export default function PhilosophySection() {
    return (
        <section id="philosophy" className="py-20">
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
                        Engineering Philosophy
                    </h2>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pillars.map((pillar) => (
                            <div
                                key={pillar.title}
                                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-6 transition-colors duration-200 hover:border-neutral-400 dark:hover:border-neutral-600"
                            >
                                <h3 className="text-lg font-medium">{pillar.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-md">
                                    {pillar.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
