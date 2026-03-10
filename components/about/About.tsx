"use client";

import { motion } from "framer-motion";
import { identity } from "@/data/identity";
import { cn } from "../../lib/utils";

const NARRATIVE_BEATS = [
  {
    label: "01_ORIGIN",
    title: "SYSTEM_CURIOSITY",
    content: `Based in ${identity.location}, I am currently pursuing a ${identity.degree} at ${identity.university}. My approach to software development is rooted in a deep curiosity for how large-scale machines and digital systems operate under the surface.`
  },
  {
    label: "02_OBJECTIVE",
    title: "ARCHITECTURAL_FOCUS",
    content: "I don't just build features; I investigate architectures. Whether it's formalizing FFI contracts between polyglot environments or optimizing state-management logic in logistics platforms, my focus is always on structural clarity and performance."
  },
  {
    label: "03_ETHOS",
    title: "ENGINEERING_CULTURE",
    content: "Beyond the editor, I am a permanent student of system design and engineering culture. I value intentionality, minimal footprint, and the beauty of a well-documented API. Reliability is not an afterthought; it is the primary deliverable."
  }
];

export default function About() {
  return (
    <div className="w-full relative">
      {/* SECTION HEADER */}
      <div className="section-divider" data-label="04_HUMAN_INTERFACE">
        <span className="divider-label">04_HUMAN_INTERFACE</span>
      </div>

      <div className="grid-12 items-start gap-y-sys-64">
        {/* NARRATIVE COLUMN */}
        <div className="col-span-12 lg:col-span-7 space-y-sys-96">
          <div className="mb-sys-64">
            <h2 className="type-h1 mb-sys-24">NARRATIVE_STREAM_</h2>
            <p className="type-body opacity-50 max-w-xl">
              A high-precision look at the intellectual background and learning trajectory of the engineer.
            </p>
          </div>

          <div className="space-y-sys-64">
            {NARRATIVE_BEATS.map((beat, index) => (
              <motion.div 
                key={beat.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group relative pl-sys-32 border-l border-border-dim"
              >
                {/* Active Beat Indicator */}
                <div className="absolute top-0 left-[-1px] w-[1px] h-0 bg-accent group-hover:h-full transition-all duration-700" />
                
                <div className="type-label text-accent mb-2">{beat.label}</div>
                <h3 className="type-emphasis text-xl mb-4 tracking-tighter">{beat.title}</h3>
                <p className="type-body leading-relaxed text-text-secondary">
                  {beat.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DETAILS COLUMN (STICKY TELEMETRY) */}
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-border-dim bg-bg-secondary p-sys-32 lg:sticky lg:top-sys-128"
          >
            <div className="type-label mb-sys-32 border-b border-border-dim pb-4">HUMAN_TELEMETRY</div>
            
            <div className="space-y-sys-32">
              <TelemetryItem label="CURRENT_LOCATION" value={identity.location.toUpperCase()} />
              <TelemetryItem label="ACADEMIC_TRACK" value={`${identity.degree} @ ${identity.university.toUpperCase()}`} />
              <TelemetryItem label="SYSTEM_STATUS" value="READY_FOR_DEPLOYMENT" accent />
              <TelemetryItem label="INTERACTION_AVAIL" value="OPEN_FOR_COLLABORATION" accent />
            </div>

            {/* Diagnostic Data Blobs */}
            <div className="mt-sys-48 pt-sys-32 border-t border-border-dim opacity-20">
              <div className="type-metadata text-[0.4rem] leading-tight font-mono">
                PACKET_SIZE: 1024KB <br />
                ENCRYPTION: AES-256 <br />
                LATENCY: 0.04MS <br />
                UPTIME: 100%
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TelemetryItem({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="type-metadata text-[0.55rem] mb-1 opacity-40">{label}</div>
      <div className={cn(
        "type-emphasis text-sm tracking-tight",
        accent ? "text-accent" : "text-text-primary"
      )}>
        {value}
      </div>
    </div>
  );
}
