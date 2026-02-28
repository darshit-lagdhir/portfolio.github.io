"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContentBlock from "@/components/ui/ContentBlock";
import ArchitectureDiagram from "@/components/ui/ArchitectureDiagram";
import { motion } from "framer-motion";
import { motionConfig, sectionReveal } from "@/lib/motion";
import { Project } from "@/types/project";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: motionConfig.medium, ease: motionConfig.ease }}
            className="mt-16"
        >
            <SectionHeading as="h3">{title}</SectionHeading>
            <div className="mt-4">
                <ContentBlock>{children}</ContentBlock>
            </div>
        </motion.div>
    );
}

function Divider() {
    return <hr className="mt-16 border-neutral-200/60 dark:border-neutral-800/60" />;
}

export default function CaseStudyTemplate({ project }: { project: Project }) {
    return (
        <section className="py-20">
            <Container>
                <div className="max-w-3xl">
                    <Link
                        href="/#projects"
                        className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                    >
                        ← Back to Systems
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: motionConfig.medium, ease: motionConfig.ease }}
                        className="mt-10"
                    >
                        {project.technicalMeta?.systemType && (
                            <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
                                {project.technicalMeta.systemType}
                            </p>
                        )}
                        <SectionHeading as="h1">{project.title}</SectionHeading>
                        <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400">
                            {project.shortDescription}
                        </p>
                        <p className="mt-4 text-xs text-neutral-500">
                            {project.techStack.join(" · ")}
                        </p>
                        {project.engineeringFocus && (
                            <div className="mt-6 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60">
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">Engineering Focus:</span> {project.engineeringFocus}
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {project.technicalMeta && (
                        <motion.div
                            {...sectionReveal}
                            className="mt-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-5"
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                                <div>
                                    <span className="block text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">System Type</span>
                                    <span className="text-neutral-800 dark:text-neutral-200 font-medium">{project.technicalMeta.systemType}</span>
                                </div>
                                <div>
                                    <span className="block text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">Architecture</span>
                                    <span className="text-neutral-800 dark:text-neutral-200 font-medium">{project.technicalMeta.architectureStyle}</span>
                                </div>
                                <div>
                                    <span className="block text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">Storage</span>
                                    <span className="text-neutral-800 dark:text-neutral-200 font-medium">{project.technicalMeta.storageType}</span>
                                </div>
                                {project.technicalMeta.authType && (
                                    <div>
                                        <span className="block text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">Access Control</span>
                                        <span className="text-neutral-800 dark:text-neutral-200 font-medium">{project.technicalMeta.authType}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {project.overview && (
                        <>
                            <Section title="Project Overview">
                                <p>{project.overview}</p>
                            </Section>
                            <Divider />
                        </>
                    )}

                    {project.problem && (
                        <>
                            <Section title="Problem Context">
                                <p>{project.problem}</p>
                            </Section>
                            <Divider />
                        </>
                    )}

                    {project.constraints && project.constraints.length > 0 && (
                        <>
                            <Section title="Constraints & Assumptions">
                                <ul className="space-y-3">
                                    {project.constraints.map((c, i) => (
                                        <li key={i} className="flex gap-3">
                                            <span className="mt-1 text-neutral-400 dark:text-neutral-600 text-xs font-mono shrink-0">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span>{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Section>
                            <Divider />
                        </>
                    )}

                    {project.architectureLayers && project.architectureLayers.length > 0 && (
                        <>
                            <Section title="System Architecture">
                                {project.diagramLayers && (
                                    <ArchitectureDiagram
                                        layers={project.diagramLayers}
                                        caption="High-level system architecture overview"
                                    />
                                )}
                                <div className="mt-2 space-y-4">
                                    {project.architectureLayers.map((layer) => (
                                        <div
                                            key={layer.name}
                                            className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-4"
                                        >
                                            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                {layer.name}
                                            </h4>
                                            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                {layer.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                            <Divider />
                        </>
                    )}

                    {!project.architectureLayers && project.architecture && (
                        <>
                            <Section title="System Architecture">
                                <p>{project.architecture}</p>
                            </Section>
                            <Divider />
                        </>
                    )}

                    {project.decisions && project.decisions.length > 0 && (
                        <>
                            <Section title="Key Design Decisions">
                                <ul className="space-y-3">
                                    {project.decisions.map((d, i) => (
                                        <li key={i} className="flex gap-3">
                                            <span className="mt-1 text-neutral-400 dark:text-neutral-600 text-xs font-mono shrink-0">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span>{d}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Section>
                            <Divider />
                        </>
                    )}

                    {project.tradeoffs && project.tradeoffs.length > 0 && (
                        <>
                            <Section title="Tradeoffs">
                                <ul className="space-y-3">
                                    {project.tradeoffs.map((t, i) => (
                                        <li key={i} className="flex gap-3">
                                            <span className="mt-1 text-neutral-400 dark:text-neutral-600 text-xs font-mono shrink-0">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Section>
                            <Divider />
                        </>
                    )}

                    {project.limitations && project.limitations.length > 0 && (
                        <>
                            <Section title="Limitations">
                                <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
                                    {project.limitations.map((l, i) => (
                                        <li key={i} className="flex gap-3">
                                            <span className="mt-1 text-neutral-400 dark:text-neutral-600 text-xs font-mono shrink-0">—</span>
                                            <span>{l}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Section>
                            <Divider />
                        </>
                    )}

                    {project.performance && (
                        <>
                            <Section title="Performance & Optimization">
                                <p>{project.performance}</p>
                            </Section>
                            <Divider />
                        </>
                    )}

                    {project.future && project.future.length > 0 && (
                        <Section title="Future Improvements">
                            <ul className="space-y-3">
                                {project.future.map((f, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className="mt-1 text-neutral-400 dark:text-neutral-600 text-xs font-mono shrink-0">→</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    {project.githubUrl && (
                        <div className="mt-24 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                            <p className="text-sm italic text-neutral-500 dark:text-neutral-500 mb-8 max-w-xl leading-relaxed">
                                Code prioritizes clarity and structural separation over compactness. Modular organization is enforced throughout.
                            </p>
                            <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                                Source Repository
                            </p>
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 group"
                            >
                                <span className="text-sm font-medium font-mono text-neutral-900 border-b border-neutral-400 dark:text-neutral-100 dark:border-neutral-600 group-hover:border-neutral-900 dark:group-hover:border-neutral-200 transition-colors">
                                    {project.githubRepoName}
                                </span>
                                <span className="text-neutral-400 dark:text-neutral-500 group-hover:translate-x-1 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-all">
                                    →
                                </span>
                            </a>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}
