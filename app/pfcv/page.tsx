import ProjectDocumentation from "@/components/projects/ProjectDocumentation";
import { projects } from "@/data/projects";

export default function PFCVPage() {
  const project = projects.find(p => p.slug === "pfcv")!;
  
  return <ProjectDocumentation project={project} />;
}
