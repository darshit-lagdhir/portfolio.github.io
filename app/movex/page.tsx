import ProjectDocumentation from "@/components/projects/ProjectDocumentation";
import { projects } from "@/data/projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MoveX Logistics System",
  description: "An operational backend architecture exploring role-based workflows, session isolation, and shipment state coordination.",
};

export default function MoveXPage() {
  const project = projects.find(p => p.slug === "movex")!;
  
  return <ProjectDocumentation project={project} />;
}
