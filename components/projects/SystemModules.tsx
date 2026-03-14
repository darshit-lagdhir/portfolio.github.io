import { cn, getTierProjects } from "@/lib/utils";
import SystemModule from "./SystemModule";
import SectionDivider from "@/components/shared/SectionDivider";
import { identity } from "@/data/identity";
import DiscoveryHint from "@/components/shared/DiscoveryHint";

export default function SystemModules() {
  const tier1Projects = getTierProjects(1);

  return (
    <div className="w-full">
      <SectionDivider 
        label="03_SYSTEMS" 
        description={identity.section_transitions.toSystems}
      />

      <div className="grid-12 mb-sys-64">
        <div className="col-span-12 lg:col-span-10">
          <h2 className="type-h1">SYSTEM_PORTFOLIO_</h2>
          <p className="type-body text-lg max-w-2xl text-text-secondary">
            Modular architectures and high-assurance systems built to investigate performance constraints, formal security contracts, and state preservation.
          </p>
        </div>
      </div>

      {/* MODULE GRID LAYER */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sys-32">
        {tier1Projects.map((project, index) => (
          <SystemModule 
            key={project.slug} 
            project={project} 
            index={index} 
          />
        ))}
      </div>

      <div className="mt-sys-64 flex justify-end">
        <DiscoveryHint 
          label={identity.discovery_hints.toComparison.label} 
          href="#comparison"
          description={identity.discovery_hints.toComparison.description}
          orientation="right"
        />
      </div>
    </div>
  );
}
