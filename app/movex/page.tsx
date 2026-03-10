import ProjectDocumentation from "@/components/projects/ProjectDocumentation";
import { projects } from "@/data/projects";

export default function MoveXPage() {
  const project = projects.find(p => p.slug === "movex")!;
  
  return <ProjectDocumentation project={project} />;
}

