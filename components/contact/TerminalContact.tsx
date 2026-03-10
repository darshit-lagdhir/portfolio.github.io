"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { identity } from "@/data/identity";
import { cn } from "../../lib/utils";

const SELECTABLE_COMMANDS = [
  { id: "github", label: "connect github", action: "OPEN_GITHUB" },
  { id: "linkedin", label: "open linkedin", action: "OPEN_LINKEDIN" },
  { id: "message", label: "send message", action: "INIT_MAIL" },
  { id: "resume", label: "download resume", action: "FETCH_RESUME" },
];

export default function TerminalContact() {
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string }[]>([
    { type: 'output', content: "GATEWAY_INITIALIZED: CONNECTION_STABLE" },
    { type: 'output', content: "SELECT_COMMAND_TO_PROCEED..." }
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

    // Simulated processing delay
    await new Promise(resolve => setTimeout(resolve, 600));

    let response = "";
    switch (cmdId) {
      case "github":
        window.open(identity.github, "_blank");
        response = `REDIRECTING_TO_EXTERNAL_NODE: ${identity.github}\nSTATUS: DISPATCHED`;
        break;
      case "linkedin":
        window.open(identity.linkedin, "_blank");
        response = `REDIRECTING_TO_EXTERNAL_NODE: ${identity.linkedin}\nSTATUS: DISPATCHED`;
        break;
      case "message":
        window.location.href = `mailto:${identity.email}`;
        response = `INITIALIZING_MAIL_PROTOCOL_FOR: ${identity.email}\nSTATUS: ACTIVE`;
        break;
      case "resume":
        window.open(identity.resume, "_blank");
        response = `FETCHING_DOC_PATH: ${identity.resume}\nSTATUS: DOWNLOADING`;
        break;
      default:
        response = "ERROR: UNKNOWN_ACTION_REQUESTED";
    }

    setHistory(prev => [...prev, { type: 'output', content: response }]);
    setIsProcessing(false);
  };

  return (
    <div className="w-full relative">
      <div className="section-divider" data-label="05_CONNECTION_INTERFACE">
        <span className="divider-label">05_CONNECTION_INTERFACE</span>
      </div>

      <div className="grid-12">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <div className="mb-sys-48 text-center lg:text-left">
            <h2 className="type-h1 mb-sys-16">INITIATE_CONNECTION_</h2>
            <p className="type-body opacity-60 max-w-xl mx-auto lg:mx-0">
                You have reached the end of the architectural manifest. Use the command panel below to interact with the system and initiate contact.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative border border-border-dim bg-bg-secondary overflow-hidden shadow-2xl"
          >
            {/* TERMINAL HEADER */}
            <div className="bg-bg-primary border-b border-border-dim px-6 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-border-dim opacity-30" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-dim opacity-30" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-dim opacity-30" />
              </div>
              <div className="type-metadata text-[0.5rem] opacity-30 tracking-widest font-mono">
                CON_INTERFACE_v2.0
              </div>
              <div className="w-12 h-1 bg-border-dim/10 rounded-full" />
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
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-accent"
                  >
                    &lambda; EXECUTING_PROCESS...
                  </motion.div>
                )}
              </div>
            </div>

            {/* COMMAND SELECTION PANEL */}
            <div className="bg-bg-primary border-t border-border-dim p-6">
              <div className="type-metadata text-[0.5rem] mb-4 opacity-30 tracking-[0.2em]">AVAILABLE_ACTIONS</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SELECTABLE_COMMANDS.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd.id, cmd.label)}
                    disabled={isProcessing}
                    className="group flex items-center justify-between px-4 py-3 border border-border-dim hover:border-accent/50 hover:bg-accent/5 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 md:hover:translate-x-1"
                  >
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
