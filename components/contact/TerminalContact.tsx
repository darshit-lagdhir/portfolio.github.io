"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { identity } from "@/data/identity";
import { cn, formatLabel } from "@/lib/utils";
import SectionDivider from "@/components/shared/SectionDivider";

const SELECTABLE_COMMANDS = [
  { id: "about", label: "about", action: "FETCH_IDENTITY" },
  { id: "projects", label: "projects", action: "LIST_MANIFEST" },
  { id: "github", label: "github", action: "OPEN_SOURCE" },
  { id: "linkedin", label: "linkedin", action: "CONNECT_NODE" },
  { id: "contact", label: "contact", action: "GET_CHANNELS" },
];

function TypewriterText({ text, onComplete, delay = 0 }: { text: string; onComplete?: () => void; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay + Math.random() * 30); // Jittered typing speed
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, delay, onComplete]);

  return (
    <span className="relative inline">
      {displayedText}
      {index < text.length && (
        <span className="inline-block w-2 h-4 bg-accent ml-1 align-middle animate-pulse" />
      )}
    </span>
  );
}

export default function TerminalContact() {
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string }[]>([
    { type: 'output', content: "SYSTEM_INITIALIZED: IDENTITY_VERIFIED" },
    { type: 'output', content: "Awaiting input. Select a command or type 'help' to proceed." }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  const executeCommand = async (cmdId: string, label: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    setHistory(prev => [...prev, { type: 'input', content: label }]);
    await new Promise(resolve => setTimeout(resolve, 400)); // Calibrated handshake delay

    let response = "";
    switch (cmdId) {
      case "about":
        response = `${identity.name}\n${identity.headline}\n\n${identity.short_identity}`;
        break;
      case "projects":
        response = `SYSTEM_MANIFEST [ACTIVE_NODES]:\n\n- MoveX: I build this to explore backend logistics and role-based coordination.\n- PFCV: I am investigating cross-language boundaries and memory safety with Clang.\n- UIDAI Advisory: I developed this to explore responsible data analysis and advisory design.`;
        break;
      case "github":
        window.open(identity.contact.github_url, "_blank");
        response = `Handshake established with git_node. Redirecting to source repositories.\nSTATUS: REDIRECT_SUCCESS [${identity.contact.github_url}]`;
        break;
      case "linkedin":
        window.open(identity.contact.linkedin_url, "_blank");
        response = `Mapping professional connection route. Handshaking with identity_node.\nSTATUS: REDIRECT_SUCCESS [${identity.contact.linkedin_url}]`;
        break;
      case "contact":
        response = "I am open to discussing system architecture, backend development, or debugging complex failures. Reach out via Email or LinkedIn.";
        break;
      case "help":
        response = "AVAILABLE_COMMANDS:\n- about: Display developer identity\n- projects: List core system modules\n- github: Access source code repositories\n- linkedin: Open professional connection node\n- contact: View communication options";
        break;
      default:
        response = "ERROR: UNKNOWN_COMMAND_ID [CODE_404]. Type 'help' for available commands.";
    }

    setHistory(prev => [...prev, { type: 'output', content: response }]);
    setIsProcessing(false);
  };

  return (
    <div className="w-full relative pb-sys-160 md:pb-0">
      <SectionDivider 
        label="09_CONTACT" 
        description={identity.section_transitions.toContact}
      />

      <div className="grid-12">
        <div className="col-span-full lg:col-span-8">
            <div className="mb-sys-96 text-left space-y-sys-24">
            <div className="relative mb-sys-12 opacity-30 text-accent flex items-center">
              <div className="absolute -left-6 status-dot active" />
              <span className="type-metadata text-[0.4rem] tracking-[0.3em] font-mono">CONNECTION_READY</span>
            </div>
            <h3 className="type-h1 uppercase tracking-tighter text-wrap-balance hyphens-auto">Initiate_Discovery_</h3>
            <p className="type-body text-base text-text-secondary max-w-xl opacity-50 leading-relaxed font-medium">
              You have reached the end of the architectural manifest. Use the command panel below to interact with the system and initiate contact.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="module-frame relative overflow-hidden !p-0 bg-transparent border-dashed hover:shadow-none hover:transform-none"
          >
            {/* TERMINAL HEADER */}
            <div className="bg-bg-secondary border-b border-border-dim px-sys-32 py-sys-24 flex items-center justify-between">
              <div className="flex gap-sys-16 items-center">
                <div className="status-dot opacity-40" />
                <div className="type-metadata text-[0.4rem] opacity-20 tracking-[0.4em] font-mono uppercase">
                  CON_INTERFACE_v2.1 // {new Date().getFullYear()}
                </div>
              </div>
              <div className="flex gap-sys-4">
                <div className="w-1 h-3 bg-accent opacity-10" />
                <div className="w-1 h-3 bg-accent opacity-20" />
                <div className="w-1 h-3 bg-accent opacity-30" />
              </div>
            </div>

            {/* TERMINAL CONTENT */}
            <div
              ref={scrollRef}
              className="p-sys-16 md:p-sys-48 h-[350px] md:h-[450px] overflow-y-auto bg-bg-primary/40 scrollbar-hide scroll-smooth"
            >
              <div className="space-y-sys-24 font-mono text-[0.8rem] leading-relaxed">
                {history.map((line, i) => (
                  <div
                    key={i}
                    className={cn(
                      "whitespace-pre-wrap break-words flex gap-sys-12 md:gap-sys-16 items-start",
                      line.type === 'input' ? "text-accent" : "text-text-secondary"
                    )}
                  >
                    <span className="opacity-30 shrink-0 select-none font-mono">
                      {line.type === 'input' ? 'λ' : '»'}
                    </span>
                    <span className={cn(
                      "flex-1 font-mono tracking-normal leading-relaxed min-w-0",
                      line.type === 'input' ? "font-bold opacity-100" : "opacity-80"
                    )}>
                      {i === history.length - 1 && line.type === 'output' ? (
                        <TypewriterText text={line.content} />
                      ) : (
                        <span className="inline whitespace-pre-wrap break-words">{line.content}</span>
                      )}
                    </span>
                  </div>
                ))}

                {!isProcessing && (
                  <div className="flex gap-sys-12 md:gap-sys-16 items-start text-accent">
                    <span className="opacity-30 shrink-0 select-none font-mono">λ</span>
                    <motion.div 
                      className="w-[8px] h-[15px] bg-accent mt-[1px]"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: (v) => v > 0.5 ? 1 : 0 }}
                    />
                  </div>
                )}

                {isProcessing && (
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-accent/60 flex gap-sys-24"
                   >
                    <span className="opacity-20 shrink-0">λ</span>
                    <span>{formatLabel("HANDSHAKE_INITIATED // RESOLVING_ENDPOINT_")}</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* COMMAND SELECTION PANEL */}
            <div className="bg-bg-secondary border-t border-border-dim p-sys-16 md:p-sys-48">
              <div className="type-metadata text-[0.5rem] mb-sys-32 opacity-40 tracking-[0.4em] flex items-center gap-sys-16 text-text-secondary font-bold">
                 <div className="w-1 h-[8px] bg-accent" />
                 SELECT_COMMAND_PAYLOAD
              </div>
              <div className="grid-12 gap-y-sys-16">
                {SELECTABLE_COMMANDS.map((cmd) => (
                  <motion.button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd.id, cmd.label)}
                    whileTap={{ scale: 0.98 }}
                    disabled={isProcessing}
                    aria-label={`Execute command: ${cmd.label}`}
                    className="module-frame group flex items-center justify-between !p-sys-16 relative text-left disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-1 focus-visible:ring-accent transform md:hover:translate-x-1 hover:bg-accent/5 hover:border-accent/40 min-w-0 overflow-hidden col-span-full md:col-span-6 transition-all duration-300 ease-in-out"
                  >
                    <div className="absolute top-sys-8 right-sys-8">
                       <div className={cn(
                         "arch-marker scale-[0.4] transition-all duration-300",
                         "opacity-20 scale-75 group-hover:opacity-100 group-hover:scale-100"
                       )} />
                    </div>
                     <div className="flex items-center gap-sys-12 shrink-0">
                      <span className="text-accent opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all font-mono">λ</span>
                      <span className="type-nav text-[0.7rem] font-bold group-hover:text-accent transition-colors">
                        {formatLabel(cmd.label)}
                      </span>
                    </div>
                    <span className="type-metadata text-[0.35rem] text-text-muted group-hover:text-accent group-hover:opacity-100 transition-all truncate pl-4">
                      {cmd.action}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* DECORATIVE SCANLINE */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-scanlines animate-scanline" />
          </motion.div>

          <footer className="mt-sys-96 text-center space-y-sys-24">
            <div className="w-[1px] h-12 bg-border-dim mx-auto opacity-30" />
            <div className="type-metadata text-[0.55rem] tracking-[0.5em] opacity-40 uppercase">
               SYSTEM_OFFLINE // DARSHIT_SYSTEMS_2026
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
