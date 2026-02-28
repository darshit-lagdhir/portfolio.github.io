import Link from "next/link";
import { Project } from "@/types/project";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-6 transition-colors duration-200 hover:border-neutral-400 dark:hover:border-neutral-600 flex flex-col justify-between">
            <div>
                {project.tier === 1 && (
                    <span className="text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 block">
                        Primary System
                    </span>
                )}
                <h3 className="text-lg font-medium leading-snug">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-md">
                    {project.shortDescription}
                </p>
                <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
                    {project.techStack.join(" · ")}
                </p>
            </div>
            <div className="mt-6">
                <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm font-medium underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-200 transition-colors"
                >
                    View System →
                </Link>
            </div>
        </div>
    );
}
