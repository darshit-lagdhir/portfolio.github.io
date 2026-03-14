import ProjectDocumentation from "@/components/projects/ProjectDocumentation";
import { projects } from "@/data/projects";
import { getProjectBySlug } from "@/lib/utils";

/**
 * GENERATE STATIC PARAMS
 * Pre-renders all project slugs at build time for high-performance static delivery.
 */
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * DYNAMIC PROJECT ROUTE
 * Resolves project metadata by slug and renders the documentation layer.
 * If the system identity cannot be verified, it triggers a recovery exception.
 */
export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    // We throw a specific error instead of notFound() to allow error.tsx 
    // to render the requested "system does not exist" message.
    throw new Error("The system you tried to access does not exist.");
  }

  return <ProjectDocumentation project={project} />;
}
