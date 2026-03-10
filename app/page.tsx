import Hero from "@/components/hero/Hero";
import Mindset from "@/components/about/Mindset";
import SystemModules from "@/components/projects/SystemModules";
import Capabilities from "@/components/shared/Capabilities";
import About from "@/components/about/About";
import TerminalContact from "@/components/contact/TerminalContact";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* PHASE 2: HERO SECTION (IDENTITY LAYER) */}
      <div className="system-container">
        <Hero />
      </div>

      {/* PHASE 3: SYSTEM IDENTITY SECTION (PHILOSOPHY) */}
      <div className="system-container">
        <Mindset />
      </div>

      {/* PHASE 4: SYSTEMS (PROJECTS) SECTION */}
      <div className="system-container">
        <SystemModules />
      </div>

      {/* PHASE 5: ENGINEERING CAPABILITIES SECTION */}
      <div className="system-container">
        <Capabilities />
      </div>

      {/* PHASE 6: ABOUT SECTION */}
      <div className="system-container">
        <About />
      </div>

      {/* PHASE 7: CONTACT INTERFACE (TERMINAL) */}
      <div className="system-container">
        <TerminalContact />
      </div>

      {/* FOOTER METADATA */}
      <footer className="py-sys-48 border-t border-border-dim opacity-20">
        <div className="system-container flex justify-between items-center">
          <div className="type-metadata text-[0.5rem]">
            &copy; {new Date().getFullYear()} DARSHIT_LAGDHIR // ARCHITECTURAL_MANIFEST_V2
          </div>
          <div className="type-metadata text-[0.5rem]">
            LATENCY: 0.04MS // BUFFER: 1024KB
          </div>
        </div>
      </footer>

      {/* Visual Anchor Metadata */}
      <div className="fixed bottom-sys-32 left-sys-32 pointer-events-none z-50">
        <div className="type-metadata opacity-10 text-[0.5rem] bg-bg-primary/80 backdrop-blur-sm p-1 eng-bracket">
          COORDS: 12.97°N 77.59°E // BENGALURU_SYSTEMS
        </div>
      </div>
    </main>
  );
}
