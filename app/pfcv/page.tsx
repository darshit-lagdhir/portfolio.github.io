import ProjectDocumentation from "@/components/projects/ProjectDocumentation";
import { projects } from "@/data/projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polyglot FFI Verifier (PFCV)",
  description: "A systems engineering research prototype exploring cross-language safety at FFI boundaries between high-level runtimes and native code.",
};

export default function PFCVPage() {
  const project = projects.find(p => p.slug === "pfcv")!;
  
  return <ProjectDocumentation project={project} />;
}
