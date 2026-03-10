export default function Home() {
  return (
    <main className="system-container py-spacing-sys-128 min-h-screen">
      
      {/* PHASE 5: IDENTITY STATEMENT STRUCTURE */}
      <section className="mb-spacing-sys-192 mt-spacing-sys-64">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-10">
            <div className="flex items-center gap-spacing-sys-12 mb-spacing-sys-48">
              <span className="status-dot active" />
              <div className="type-metadata">
                <span className="eng-bracket">SESSION_01</span>
                <span>SYSTEMS_ENGINEER // DARSHIT_LAGDHIR</span>
              </div>
            </div>
            
            <h1 className="type-identity mb-spacing-sys-64">
              ARCHITECTING <br />
              <span className="text-secondary">SYSTEMS_THAT_ENDURE</span>
            </h1>

            <div className="grid-12">
              <div className="col-span-12 md:col-span-7">
                <p className="type-body text-xl md:text-2xl leading-relaxed mb-spacing-sys-48 text-primary">
                  Building high-performance digital environments through the lens of systems thinking, structural integrity, and architectural precision. Focused on the convergence of low-latency engineering and intentional human interface design.
                </p>
                <div className="flex flex-wrap gap-spacing-sys-24">
                  <button className="btn-primary">EXPLORE_SYSTEMS</button>
                  <button className="btn-primary opacity-40">VIEW_DOCUMENTATION</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 6: SECTION HEADING SYSTEM */}
      <section className="mb-spacing-sys-192">
        <div className="section-divider" data-label="01_CORE_SPECIALIZATIONS">
          <span className="divider-label">01_CORE_SPECIALIZATIONS</span>
        </div>

        <div className="grid-12">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="type-h1 mb-spacing-sys-24">CAPABILITIES_</h2>
            <p className="type-label mb-spacing-sys-48">TECHNICAL_PRIMITIVES_V2.4</p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-spacing-sys-64">
              <div>
                <h3 className="type-emphasis mb-spacing-sys-16">SYSTEMS_ARCHITECTURE</h3>
                <p className="type-body opacity-80">
                  Designing scalable infrastructure and modular application layers with a focus on decoupling and reliable state management.
                </p>
              </div>
              <div>
                <h3 className="type-emphasis mb-spacing-sys-16">PERFORMANCE_PROFILE</h3>
                <p className="type-body opacity-80">
                  Optimizing critical render paths, minimizing memory footprints, and ensuring millisecond-exact interaction feedback.
                </p>
              </div>
              <div>
                <h3 className="type-emphasis mb-spacing-sys-16">INTEROP_DYNAMICS</h3>
                <p className="type-body opacity-80">
                  Managing complex data flow between polyglot environments and high-concurrency event pipelines.
                </p>
              </div>
              <div>
                <h3 className="type-emphasis mb-spacing-sys-16">INTERFACE_LOGIC</h3>
                <p className="type-body opacity-80">
                  Translating engineering constraints into clean, logical, and performant user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Metadata Anchor */}
      <div className="fixed bottom-spacing-sys-32 left-spacing-sys-32 pointer-events-none">
        <div className="type-metadata opacity-20">
          <span>COORDS: 23°N 72°E</span>
          <span>//</span>
          <span>LATENCY: 0.04MS</span>
        </div>
      </div>

    </main>
  );
}
