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
    show: { transition: { staggerChildren: 0.12 } },
};

const philosophies = [
    {
        number: "01",
        title: "Systems Thinking",
        body: "I understand component relationships before optimizing individual parts. Structure dictates stability — if the architecture is clear, implementation follows naturally.",
        principles: [
            "Understand relationships before optimizing parts",
            "Stability emerges from structural clarity",
            "Layered architecture reduces fragility",
        ],
    },
    {
        number: "02",
        title: "Practical Execution",
        body: "I build for constraints, not ideals. Every decision weighs tradeoffs between complexity, time, and maintainability. Working software that handles real scenarios matters more than theoretical perfection.",
        principles: [
            "Constraints drive better design decisions",
            "Ship working systems, then iterate",
            "Tradeoff awareness over blind optimization",
        ],
    },
    {
        number: "03",
        title: "Structured Growth",
        body: "I explore cloud infrastructure, applied AI/ML, and security not as trends to chase, but as layers to understand deliberately. Each domain is approached with the same discipline as core engineering.",
        principles: [
            "Depth over breadth in new domains",
            "Same discipline across every layer",
            "Deliberate exploration over trend-chasing",
        ],
    },
    {
        number: "04",
        title: "Simplicity & Efficiency",
        body: "Good software should be readable, minimal, and effective. Unnecessary abstraction adds fragility. I write code that future developers — including myself — can understand without documentation archaeology.",
        principles: [
            "Readable code over clever code",
            "Minimal abstraction, maximum clarity",
            "Build for the next developer",
        ],
    },
];

export default function PhilosophySection() {
    return (
        <SectionWrapper id="philosophy">
            <motion.div {...sectionReveal}>
                <SectionHeading number="01" systemLabel="SYS-01">Engineering Philosophy</SectionHeading>
            </motion.div>

            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={motionConfig.viewport}
                className="mt-14 max-w-2xl space-y-0"
            >
                {philosophies.map((p, i) => (
                    <motion.div key={p.number} variants={fadeUp}>
                        <div className="flex gap-6 py-10">
                            <span className="text-xs font-mono text-neutral-300 dark:text-neutral-700 pt-1 shrink-0">
                                {p.number}
                            </span>
                            <div className="border-l border-neutral-200/60 dark:border-neutral-800/60 pl-6">
                                <h3 className="text-lg font-semibold">{p.title}</h3>
                                <p className="mt-3 text-sm leading-[1.7] text-neutral-600 dark:text-neutral-400 max-w-xl">
                                    {p.body}
                                </p>
                                <ul className="mt-4 space-y-1.5">
                                    {p.principles.map((pr) => (
                                        <li
                                            key={pr}
                                            className="text-sm text-neutral-500 dark:text-neutral-500 flex gap-2"
                                        >
                                            <span className="text-neutral-300 dark:text-neutral-700 shrink-0">—</span>
                                            {pr}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {i < philosophies.length - 1 && (
                            <hr className="border-neutral-200/30 dark:border-neutral-800/30" />
                        )}
                    </motion.div>
                ))}
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-6 text-sm italic text-neutral-400 dark:text-neutral-600 max-w-2xl"
            >
                Good systems are intentional, not accidental.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-20 pt-8 border-t border-neutral-100 dark:border-neutral-900"
            >
                <h4 className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
                    Currently Focused On
                </h4>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li className="flex gap-3">
                        <span className="text-neutral-300 dark:text-neutral-700 font-mono text-xs mt-0.5">_</span>
                        Strengthening backend architecture and system design patterns
                    </li>
                    <li className="flex gap-3">
                        <span className="text-neutral-300 dark:text-neutral-700 font-mono text-xs mt-0.5">_</span>
                        Exploring cloud-native deployment patterns
                    </li>
                    <li className="flex gap-3">
                        <span className="text-neutral-300 dark:text-neutral-700 font-mono text-xs mt-0.5">_</span>
                        Studying infrastructure automation and CI/CD structuring
                    </li>
                </ul>
            </motion.div>
        </SectionWrapper>
    );
}
