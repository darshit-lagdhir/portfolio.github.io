"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { identity } from "@/data/identity";
import { cn } from "../../lib/utils";
import SectionDivider from "@/components/shared/SectionDivider";

const SELECTABLE_COMMANDS = [
  { id: "github", label: "connect github", action: "OPEN_GITHUB" },
  { id: "linkedin", label: "open linkedin", action: "OPEN_LINKEDIN" },
  { id: "message", label: "send message", action: "INIT_MAIL" },
  { id: "resume", label: "download resume", action: "FETCH_RESUME" },
];

export default function TerminalContact() {
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string }[]>([
    { type: 'output', content: "SYSTEM_INITIALIZED: IDENTITY_VERIFIED" },
    { type: 'output', content: "Awaiting human input. Select a command to proceed." }
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

    // Add input to history
    setHistory(prev => [...prev, { type: 'input', content: label }]);

    // Simulated processing delay optimization
    await new Promise(resolve => setTimeout(resolve, 200));

    let response = "";
    switch (cmdId) {
      case "github":
        window.open(identity.github, "_blank");
        response = `Handshake established with git_node. Accessing source_manifest.\n--> STATUS: REDIRECT_SUCCESS [${identity.github}]\nIDENTITY_LOG: Exploring Darshit's architectural evolution.`;
        break;
      case "linkedin":
        window.open(identity.linkedin, "_blank");
        response = `Mapping professional connection route. Handshaking with identity_node.\n--> STATUS: REDIRECT_SUCCESS [${identity.linkedin}]\nIDENTITY_LOG: Proceeding to LinkedIn viewport.`;
        break;
      case "message":
        const emailUrl = `mailto:${identity.email}`;
        setTimeout(() => {
          window.location.href = emailUrl;
        }, 0);
        response = `Initializing encrypted mail stream. Resolving endpoint: ${identity.email}\n--> STATUS: WAITING_FOR_PAYLOAD\nIDENTITY_LOG: Awaiting technical transmission.`;
        break;
      case "resume":
        window.open(identity.resume, "_blank");
        response = `Fetching architectural credentials. Decrypting spec_document.\n--> STATUS: REDIRECT_SUCCESS [${identity.resume}]\nIDENTITY_LOG: Documentation verified. Prepare for analysis.`;
        break;
      default:
        response = "ERROR: UNKNOWN_COMMAND_ID [CODE_404]";
    }

    setHistory(prev => [...prev, { type: 'output', content: response }]);
    setIsProcessing(false);
  };

  return (
    <div className="w-full relative">
      <SectionDivider label="08_CONNECTION_INTERFACE" />

      <div className="grid-12">
        <div className="col-span-12 lg:col-span-8">
          <div className="mb-sys-48 text-left">
            <h2 className="type-h1">INITIATE_CONNECTION_</h2>
            <p className="type-body opacity-60 max-w-xl">
              You have reached the end of the architectural manifest. Use the command panel below to interact with the system and initiate contact.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="module-frame relative overflow-hidden shadow-2xl !p-0"
          >
            {/* TERMINAL HEADER */}
            <div className="bg-bg-primary/50 backdrop-blur-md border-b border-border-dim px-6 py-3 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="arch-marker scale-50 opacity-40" />
                <div className="type-metadata text-[0.45rem] opacity-30 tracking-widest font-mono">
                  CON_INTERFACE_v2.0
                </div>
              </div>
              <div className="flex gap-2 opacity-20">
                <div className="w-1 h-3 bg-accent" />
                <div className="w-1 h-3 bg-accent" />
                <div className="w-1 h-3 bg-accent" />
              </div>
            </div>

            {/* TERMINAL CONTENT */}
            <div
              ref={scrollRef}
              className="p-8 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-border-dim bg-black/20"
            >
              <div className="space-y-4 font-mono text-[0.8rem] leading-relaxed">
                {history.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "whitespace-pre-wrap",
                      line.type === 'input' ? "text-accent" : "text-text-secondary"
                    )}
                  >
                    {line.type === 'input' && <span className="mr-3 opacity-50">&lambda;</span>}
                    {line.content}
                  </motion.div>
                ))}

                {isProcessing && (
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-accent"
                  >
                    &lambda; EXECUTING_PROCESS...
                  </motion.div>
                )}
              </div>
            </div>

            {/* COMMAND SELECTION PANEL */}
            <div className="bg-bg-primary/30 border-t border-border-dim p-8">
              <div className="type-metadata text-[0.5rem] mb-6 opacity-30 tracking-[0.2em] flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-accent" />
                 AVAILABLE_ACTIONS
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SELECTABLE_COMMANDS.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd.id, cmd.label)}
                    disabled={isProcessing}
                    className="module-frame group flex items-center justify-between !p-5 relative transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 md:hover:translate-x-1"
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="arch-marker scale-[0.3]" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-accent group-hover:translate-x-1 transition-transform">&lambda;</span>
                      <span className="type-nav text-[0.7rem]">{cmd.label.toUpperCase()}</span>
                    </div>
                    <span className="type-metadata text-[0.4rem] opacity-20 group-hover:opacity-100 transition-opacity">
                      {cmd.action}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* DECORATIVE SCANLINE */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-scanlines animate-scanline" />
          </motion.div>

          <div className="mt-sys-64 text-center opacity-20">
            <div className="type-metadata text-[0.5rem]">END_OF_MANIFEST // ALL_SYSTEMS_OPERATIONAL</div>
          </div>
        </div>
      </div>
    </div>
  );
}
