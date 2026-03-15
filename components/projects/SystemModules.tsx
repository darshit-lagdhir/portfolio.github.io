"use client";
import { motion } from "framer-motion";
import { getTierProjects } from "@/lib/utils";
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
        <div className="col-span-full lg:col-span-10">
          <h3 className="type-h1 break-words hyphens-auto">SYSTEM_PORTFOLIO_</h3>
          <p className="type-body text-lg max-w-2xl text-text-secondary">
            Modular architectures and high-assurance systems built to investigate performance constraints, formal security contracts, and state preservation.
          </p>
        </div>
      </div>

      {/* MODULE GRID LAYER - Enforced row stretching */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="grid-12 gap-y-sys-48 auto-rows-fr"
      >
        {tier1Projects.map((project, index) => (
          <motion.div 
            key={project.slug} 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="col-span-full md:col-span-6 lg:col-span-4"
          >
            <SystemModule 
              project={project} 
              index={index} 
            />
          </motion.div>
        ))}
      </motion.div>

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
