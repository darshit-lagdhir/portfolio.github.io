import Link from "next/link";
import { Project } from "@/types/project";
import TiltCard from "@/components/ui/TiltCard";

interface ProjectCardProps {
    project: Project;
    flagship?: boolean;
}

export default function ProjectCard({ project, flagship }: ProjectCardProps) {
    return (
        <TiltCard
            className={`rounded-lg border bg-white dark:bg-neutral-900/50 p-6 transition-colors duration-200 flex flex-col justify-between h-full ${flagship
                    ? "border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500"
                    : "border-neutral-200/70 dark:border-neutral-800/70 hover:border-neutral-400 dark:hover:border-neutral-600"
                }`}
        >
            <div>
                {flagship && (
                    <span className="text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 block">
                        Flagship System
                    </span>
                )}
                <h3 className={`font-medium leading-snug ${flagship ? "text-xl" : "text-lg"}`}>
                    {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-lg">
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
        </TiltCard>
    );
}
