"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function SystemModules() {
  return (
    <section className="py-sys-128">
      <div className="section-divider" data-label="02_CORE_SYSTEMS">
        <span className="divider-label">02_CORE_SYSTEMS</span>
      </div>

      <div className="grid-12 mb-sys-64">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="type-h1 mb-sys-24">ENGINEERED_SOLUTIONS_</h2>
          <p className="type-body max-w-xl">
            A selection of functional systems exploring complex logic, memory safety, and modular scalability.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sys-32">
        {projects.map((project, index) => (
          <Link key={project.slug} href={`/${project.slug}`}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border border-border-dim p-sys-32 bg-bg-secondary hover:border-accent transition-colors relative overflow-hidden h-full flex flex-col"
            >
              {/* Architectural accent */}
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <span className="type-metadata text-[0.5rem]">MOD_00{index + 1}</span>
              </div>
              
              <div className="type-label mb-sys-16 text-accent">PROJECT_SYSTEM</div>
              <h3 className="type-h2 mb-sys-24 group-hover:translate-x-2 transition-transform">{project.title.toUpperCase()}</h3>
              <p className="type-body text-sm mb-sys-48 flex-grow">
                {project.shortDescription}
              </p>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-sys-24">
                  {project.techStack.map(tech => (
                    <span key={tech} className="type-metadata text-[0.6rem] bg-bg-primary px-2 py-1 border border-border-dim">
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </div>
                <div className="type-nav text-xs flex items-center gap-2 group-hover:text-accent transition-colors">
                  VIEW_SYSTEM_SPEC <span className="translate-y-[-1px]">&rarr;</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
