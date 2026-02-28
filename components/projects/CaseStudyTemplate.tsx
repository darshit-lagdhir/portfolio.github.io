"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContentBlock from "@/components/ui/ContentBlock";
import ArchitectureDiagram from "@/components/ui/ArchitectureDiagram";
import { motion } from "framer-motion";
import { motionConfig, sectionReveal } from "@/lib/motion";
import { Project } from "@/types/project";
import { identity } from "@/data/identity";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-6 md:gap-12 py-10">
            <div>
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 sticky top-24">
                    {title}
                </h3>
            </div>
            <div className="text-sm leading-[1.7] text-neutral-600 dark:text-neutral-400 max-w-2xl">
                {children}
            </div>
        </section>
    );
}

function Divider() {
    return <hr className="border-neutral-200/50 dark:border-neutral-800/50" />;
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
                        <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-[1.7] max-w-3xl">
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
                                            className="rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/20 p-5"
                                        >
                                            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                {layer.name}
                                            </h4>
                                            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-[1.7]">
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

                    {project.detailedDecisions && project.detailedDecisions.length > 0 && (
                        <>
                            <Section title="Design Decisions & Alternatives Considered">
                                <div className="space-y-6">
                                    {project.detailedDecisions.map((d, i) => (
                                        <div key={i} className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-5 py-1">
                                            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{d.decision}</h4>
                                            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-[1.7]">
                                                {d.why}
                                            </p>
                                            <div className="mt-4 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-neutral-800/50 rounded-md p-4 text-xs">
                                                <p className="font-mono text-neutral-500 mb-1">Alternative Considered:</p>
                                                <p className="text-neutral-700 dark:text-neutral-300 mb-3">{d.alternative}</p>
                                                <p className="font-mono text-neutral-500 mb-1">Why Rejected:</p>
                                                <p className="text-neutral-700 dark:text-neutral-300">{d.rejectedReason}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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

                    {project.ifRebuildingToday && project.ifRebuildingToday.length > 0 && (
                        <>
                            <Section title="If I Rebuilt This Today">
                                <div className="space-y-4">
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        Reflecting on constraints and growth, these are the immediate architectural shifts I would introduce:
                                    </p>
                                    <ul className="space-y-3">
                                        {project.ifRebuildingToday.map((item, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="mt-1 text-neutral-400 dark:text-neutral-600 text-xs font-mono shrink-0">→</span>
                                                <span className="text-neutral-600 dark:text-neutral-400">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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

                    {(project.githubUrl || identity.resume) && (
                        <div className="mt-24 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                            <p className="text-sm italic text-neutral-500 dark:text-neutral-500 mb-8 max-w-xl leading-relaxed">
                                Code prioritizes clarity and structural separation over compactness. Modular organization is enforced throughout.
                            </p>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-10">
                                {project.githubUrl && (
                                    <div>
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

                                {identity.resume && (
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                                            Professional Profile
                                        </p>
                                        <a
                                            href={identity.resume}
                                            className="inline-block px-5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700/50 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                        >
                                            View Resume
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}
