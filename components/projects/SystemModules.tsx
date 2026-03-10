"use client";

import { projects } from "@/data/projects";
import SystemModule from "./SystemModule";

export default function SystemModules() {
  return (
    <div className="w-full">
      {/* SECTION HEADER LAYER */}
      <div className="section-divider" data-label="02_ENGINEERING_SYSTEMS">
        <span className="divider-label">02_ENGINEERING_SYSTEMS</span>
      </div>

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
        {projects.map((project, index) => (
          <SystemModule 
            key={project.slug} 
            project={project} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
}
