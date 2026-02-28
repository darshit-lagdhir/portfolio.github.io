"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { identity } from "@/data/identity";
import { projects } from "@/data/projects";
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
    show: { transition: { staggerChildren: 0.1 } },
};

const featured = projects.filter((p) => p.githubUrl && p.tier === 1);

const signals = [
    { label: "Commit Discipline", detail: "Atomic, descriptive commits with clear intent" },
    { label: "Modular Organization", detail: "Separated concerns, clean file structure" },
    { label: "Readable Code", detail: "Written for future developers, not just compilers" },
];

export default function FootprintSection() {
    return (
        <SectionWrapper id="footprint" surface>
            <motion.div {...sectionReveal}>
                <SectionHeading number="04">Engineering Footprint</SectionHeading>
            </motion.div>

            <div className="mt-14 max-w-3xl">
                {/* Philosophy statement */}
                <motion.div {...sectionReveal}>
                    <p className="text-sm md:text-base leading-[1.8] text-neutral-600 dark:text-neutral-400">
                        Repositories are not project dumps. They reflect the same structural
                        discipline applied in this portfolio — every commit intentional,
                        every module separated, every file named for clarity.
                    </p>
                </motion.div>

                {/* Engineering signals */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={motionConfig.viewport}
                    className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
                >
                    {signals.map((s) => (
                        <motion.div key={s.label} variants={fadeUp}>
                            <p className="text-sm font-medium">{s.label}</p>
                            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500 leading-relaxed">
                                {s.detail}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Repositories */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={motionConfig.viewport}
                    className="mt-12 space-y-0"
                >
                    <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
                        Public Repositories
                    </p>
                    {featured.map((repo, i) => (
                        <motion.a
                            key={repo.slug}
                            variants={fadeUp}
                            href={repo.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-6 py-5 group"
                        >
                            <span className="text-xs font-mono text-neutral-300 dark:text-neutral-700 pt-0.5 shrink-0">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="flex-1 border-b border-neutral-100 dark:border-neutral-900 pb-5">
                                <h3 className="text-sm font-medium font-mono group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                                    {repo.githubRepoName}
                                    <span className="ml-2 text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-500 transition-colors">→</span>
                                </h3>
                                <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">
                                    {repo.shortDescription}
                                </p>
                                <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-600">
                                    {repo.techStack.join(" · ")}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Profile link */}
                <motion.div {...sectionReveal} className="mt-8">
                    <a
                        href={identity.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-200 transition-colors"
                    >
                        View full profile on GitHub →
                    </a>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
