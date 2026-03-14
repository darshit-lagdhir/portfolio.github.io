import ProjectDocumentation from "@/components/projects/ProjectDocumentation";
import { projects } from "@/data/projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UIDAI Advisory System",
  description: "A data analysis advisory system for Aadhaar enrollment patterns, emphasizing ethical design and human-in-the-loop decision making.",
};

export default function UIDAIPage() {
  const project = projects.find(p => p.slug === "uidai")!;
  
  return <ProjectDocumentation project={project} />;
}
