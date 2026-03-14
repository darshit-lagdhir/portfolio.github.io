"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { identity } from "@/data/identity";
import { cn, formatLabel, unslugify } from "@/lib/utils";
import SectionDivider from "@/components/shared/SectionDivider";

const SELECTABLE_COMMANDS = [
  { id: "about", label: "about", action: "FETCH_IDENTITY" },
  { id: "projects", label: "projects", action: "LIST_SYSTEMS" },
  { id: "github", label: "github", action: "OPEN_SOURCE" },
  { id: "linkedin", label: "linkedin", action: "CONNECT_NODE" },
  { id: "contact", label: "contact", action: "GET_CHANNELS" },
];

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
    await new Promise(resolve => setTimeout(resolve, 400));

    let response = "";
    switch (cmdId) {
      case "about":
        response = `${identity.name}\n${identity.headline}\n\nExploration Focus: ${identity.short_identity}`;
        break;
      case "projects":
        response = "SYSTEM_MANIFEST [ACTIVE_NODES]:\n\n- MoveX: Logistics management system built with Node.js and PostgreSQL.\n- PFCV: Cross-language FFI verification pipeline investigating runtime safety.\n- UIDAI Advisory: Data pattern analysis system for Aadhaar enrollment datasets.";
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
        response = identity.section_transitions.toContact;
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
    <div className="w-full relative">
      <SectionDivider 
        label="09_CONTACT" 
        description={identity.section_transitions.toContact}
      />

      <div className="grid-12">
        <div className="col-span-12 lg:col-span-8">
            <div className="mb-sys-96 text-left space-y-6">
            <div className="flex items-center gap-3 mb-2 opacity-30 text-accent">
              <div className="w-1 h-1 bg-current rounded-full" />
              <span className="type-metadata text-[0.4rem] tracking-[0.3em] font-mono">CONNECTION_READY</span>
            </div>
            <h2 className="type-h1 uppercase tracking-tighter">Initiate_Discovery_</h2>
            <p className="type-body text-base text-text-secondary max-w-xl opacity-50 leading-relaxed font-medium">
              You have reached the end of the architectural manifest. Use the command panel below to interact with the system and initiate contact.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="module-frame relative overflow-hidden !p-0 bg-transparent border-dashed"
          >
            {/* TERMINAL HEADER */}
            <div className="bg-bg-secondary border-b border-border-dim px-8 py-6 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-1.5 h-1.5 bg-accent-dim rounded-full" />
                <div className="type-metadata text-[0.4rem] opacity-20 tracking-[0.4em] font-mono uppercase">
                  CON_INTERFACE_v2.1 // {new Date().getFullYear()}
                </div>
              </div>
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-accent opacity-10" />
                <div className="w-1 h-3 bg-accent opacity-20" />
                <div className="w-1 h-3 bg-accent opacity-30" />
              </div>
            </div>

            {/* TERMINAL CONTENT */}
            <div
              ref={scrollRef}
              className="p-10 h-[400px] overflow-y-auto bg-bg-primary/50"
            >
              <div className="space-y-6 font-mono text-[0.75rem] leading-relaxed">
                {history.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "whitespace-pre-wrap flex gap-6",
                      line.type === 'input' ? "text-accent" : "text-text-secondary"
                    )}
                  >
                    <span className="opacity-20 shrink-0">
                      {line.type === 'input' ? 'λ' : '»'}
                    </span>
                    <span className={cn(
                      line.type === 'input' ? "font-bold tracking-tight opacity-90" : "font-medium opacity-60"
                    )}>
                      {line.content}
                    </span>
                  </motion.div>
                ))}

                {isProcessing && (
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-accent/60 flex gap-6"
                   >
                    <span className="opacity-20 shrink-0">λ</span>
                    <span>{formatLabel("HANDSHAKE_INITIATED // RESOLVING_ENDPOINT_")}</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* COMMAND SELECTION PANEL */}
            <div className="bg-bg-secondary border-t border-border-dim p-8 md:p-12">
              <div className="type-metadata text-[0.5rem] mb-8 opacity-40 tracking-[0.4em] flex items-center gap-4 text-text-secondary font-bold">
                 <div className="w-1 h-3 bg-accent" />
                 SELECT_COMMAND_PAYLOAD
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {SELECTABLE_COMMANDS.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd.id, cmd.label)}
                    disabled={isProcessing}
                    className="module-frame group flex items-center justify-between !p-6 relative transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-1 focus-visible:ring-accent md:hover:translate-x-1 hover:bg-accent/5"
                  >
                    <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity">
                       <div className="arch-marker scale-[0.3]" />
                    </div>
                     <div className="flex items-center gap-4">
                      <span className="text-accent opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">λ</span>
                      <span className="type-nav text-[0.7rem] font-bold group-hover:text-text-primary transition-colors">
                        {formatLabel(cmd.label)}
                      </span>
                    </div>
                    <span className="type-metadata text-[0.4rem] opacity-30 group-hover:opacity-100 transition-opacity">
                      {cmd.action}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* DECORATIVE SCANLINE */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-scanlines animate-scanline" />
          </motion.div>

          <footer className="mt-sys-96 text-center space-y-6">
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
