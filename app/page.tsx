export default function Home() {
  return (
    <div className="system-container min-h-screen py-spacing-sys-128 flex flex-col justify-center">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-10">
          <div className="flex items-center gap-spacing-sys-12 mb-spacing-sys-32">
            <span className="status-dot" />
            <span className="type-label">SYSTEM_STATUS: OPERATIONAL</span>
          </div>
          
          <h1 className="type-identity mb-spacing-sys-48">
            ENGINEERING <br />
            <span className="text-secondary">PORTFOLIO_V2</span>
          </h1>
          
          <div className="section-divider" data-label="01_ARCHITECTURE">
            <span className="divider-label">01_ARCHITECTURE</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-spacing-sys-64 mb-spacing-sys-96">
            <div>
              <p className="type-body max-w-lg mb-spacing-sys-32">
                Baseline reset complete. Current environment established with a 12-column modular grid and Engineering Dark palette. Focusing on technical clarity and absolute structural precision.
              </p>
              <div className="flex gap-spacing-sys-24">
                <button className="btn-primary">CORE_SYSTEMS</button>
                <button className="btn-primary opacity-40">DOCUMENTATION</button>
              </div>
            </div>
            
            <div className="flex flex-col justify-end space-y-4">
              <div className="type-label flex items-center justify-between border-b border-border-dim pb-2">
                <span>LATENCY</span>
                <span className="text-accent">0.02ms</span>
              </div>
              <div className="type-label flex items-center justify-between border-b border-border-dim pb-2">
                <span>BANDWIDTH</span>
                <span className="text-accent">UNLIMITED</span>
              </div>
              <div className="type-label flex items-center justify-between border-b border-border-dim pb-2">
                <span>VERSION</span>
                <span className="text-accent">2.4.0-STABLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual Anchor for Grid */}
      <div className="fixed bottom-spacing-sys-32 right-spacing-sys-32 pointer-events-none opacity-20">
        <span className="type-emphasis text-[10rem] leading-none">V2</span>
      </div>
    </div>
  );
}


