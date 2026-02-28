import Link from "next/link";
import { Project } from "@/types/project";
import TiltCard from "@/components/ui/TiltCard";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <TiltCard className="rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white dark:bg-neutral-900/50 p-6 transition-colors duration-200 hover:border-neutral-400 dark:hover:border-neutral-600 flex flex-col justify-between h-full">
            <div>
                <h3 className="text-lg font-medium leading-snug">{project.title}</h3>
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
