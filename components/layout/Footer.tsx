import Container from "@/components/layout/Container";
import { identity } from "@/data/identity";

export default function Footer() {
    return (
        <footer className="py-24 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
            <Container>
                <div className="max-w-3xl">
                    <h3 className="text-xl md:text-2xl font-semibold mb-6 text-neutral-900 dark:text-neutral-100">
                        Engineering Discussions
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                        If you're building systems that require structured thinking,
                        modular architecture, and disciplined implementation,
                        I am open to contributing to backend and systems-level engineering roles.
                    </p>

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm mb-12">
                        <a
                            href={`mailto:${identity.email}`}
                            className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-5 py-2 rounded-lg font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Discuss systems
                        </a>
                        <div className="flex gap-6 text-neutral-500">
                            <a
                                href={identity.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700"
                            >
                                GitHub
                            </a>
                            <a
                                href={identity.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700"
                            >
                                LinkedIn
                            </a>
                            <a
                                href={identity.resume}
                                className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700"
                            >
                                Resume
                            </a>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col md:flex-row md:items-center justify-between gap-6 text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            <span>{identity.name}</span>
                            <span>{identity.degree} · {identity.university}</span>
                        </div>
                        <div className="flex gap-6">
                            <span>{identity.location}</span>
                            <span>Last Updated 2026</span>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
