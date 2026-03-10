"use client";

import { motion } from "framer-motion";
import { identity } from "@/data/identity";

export default function About() {
  return (
    <section className="py-sys-128">
      <div className="section-divider" data-label="04_HUMAN_INTERFACE">
        <span className="divider-label">04_HUMAN_INTERFACE</span>
      </div>

      <div className="grid-12">
        <div className="col-span-12 lg:col-span-12">
          <h2 className="type-h1 mb-sys-64">CURIOSITY_DATA_STREAM</h2>
          
          <div className="grid-12">
            <div className="col-span-12 md:col-span-7">
              <div className="space-y-sys-32">
                <p className="type-body">
                  Based in {identity.location}, I am currently pursuing a BCA at {identity.university}. My approach to software development is rooted in a deep curiosity for how large-scale machines and digital systems operate under the surface.
                </p>
                <p className="type-body">
                  I don't just build features; I investigate architectures. Whether it's formalizing FFI contracts between polyglot environments or optimizing the state-management logic in logistics platforms, my focus is always on structural clarity and performance.
                </p>
                <p className="type-body">
                  Beyond the editor, I am a permanent student of system design and engineering culture. I value intentionality, minimal footprint, and the beauty of a well-documented API.
                </p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <div className="p-sys-32 border border-border-dim bg-bg-secondary sticky top-sys-96">
                <div className="type-label mb-sys-24">SYSTEM_DETAILS</div>
                <div className="space-y-6">
                  <div>
                    <div className="type-metadata text-[0.6rem] mb-1">LOCATION</div>
                    <div className="type-emphasis text-sm">{identity.location.toUpperCase()}</div>
                  </div>
                  <div>
                    <div className="type-metadata text-[0.6rem] mb-1">EDUCATION</div>
                    <div className="type-emphasis text-sm">{identity.university.toUpperCase()}</div>
                  </div>
                  <div>
                    <div className="type-metadata text-[0.6rem] mb-1">STATUS</div>
                    <div className="type-emphasis text-sm text-accent">OPEN_FOR_COLLABORATION</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
