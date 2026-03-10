import ProjectDocumentation from "@/components/projects/ProjectDocumentation";
import { projects } from "@/data/projects";

export default function UIDAIPage() {
  const project = projects.find(p => p.slug === "uidai")!;
  
  return <ProjectDocumentation project={project} />;
}
