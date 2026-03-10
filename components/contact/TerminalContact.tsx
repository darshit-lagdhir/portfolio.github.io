"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { identity } from "@/data/identity";
import { cn } from "../../lib/utils";

const COMMANDS = [
  { cmd: "help", desc: "List all available diagnostic commands" },
  { cmd: "bio", desc: "Download biological profile summary" },
  { cmd: "links", desc: "Map all outgoing communication nodes" },
  { cmd: "contact", desc: "Initialize secure mail protocol" },
  { cmd: "status", desc: "Check system health and core metrics" },
  { cmd: "clear", desc: "Purge terminal local history" },
];

export default function TerminalContact() {
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string }[]>([
    { type: 'output', content: "INITIALIZING_CONNECTION_V2.0.4..." },
    { type: 'output', content: "IDENTITY_VERIFIED: DARSHIT_LAGDHIR" },
    { type: 'output', content: "TYPE 'help' TO BEGIN..." }
  ]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', content: input }] as any;
    
    let response = "";

    switch (cmd) {
      case "help":
        response = "AVAILABLE_COMMANDS:\n\n" + COMMANDS.map(c => `${c.cmd.padEnd(12)} - ${c.desc}`).join("\n");
        break;
      case "bio":
        response = `PROFILE_SUMMARY:\nNAME: ${identity.name}\nLOC: ${identity.location}\nEDU: ${identity.university}\nFOCUS: SYSTEMS_ARCHITECTURE\nOBJ: BUILDING_ENGINES_THAT_ENDURE`;
        break;
      case "links":
        response = `OUTGOING_NODES:\nGITHUB:   ${identity.github}\nLINKEDIN: ${identity.linkedin}\nRESUME:   ${identity.resume}`;
        break;
      case "contact":
        window.location.href = `mailto:${identity.email}`;
        response = `INITIALIZING_MAIL_PROTOCOL_FOR: ${identity.email}\nREDIRECTING...`;
        break;
      case "status":
        response = `SYSTEM_HEALTH:\nCPU: NOMINAL\nMEM: OPTIMIZED\nLATENCY: 0.04ms\nUPTIME: 100%\nSTATUS: ACTIVE_FOR_COLLABORATION`;
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        response = `COMMAND_NOT_FOUND: ${cmd}. TYPE 'help' FOR DIAGNOSTIC LIST.`;
    }

    setHistory([...newHistory, { type: 'output', content: response }]);
    setInput("");
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className="w-full relative">
      <div className="section-divider" data-label="05_CONNECTION_INTERFACE">
        <span className="divider-label">05_CONNECTION_INTERFACE</span>
      </div>

      <div className="grid-12">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={cn(
                "relative border border-border-dim bg-bg-secondary overflow-hidden transition-all duration-300 shadow-2xl",
                isFocused ? "border-accent ring-1 ring-accent/20" : ""
            )}
            onClick={focusInput}
          >
            {/* TERMINAL HEADER */}
            <div className="bg-bg-primary border-b border-border-dim px-6 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>
              <div className="type-metadata text-[0.5rem] opacity-30 tracking-widest font-mono">
                DARSHIT_LAGDHIR_SHELL v2.0.4
              </div>
              <div className="w-12 h-1 bg-border-dim/20 rounded-full" />
            </div>

            {/* TERMINAL CONTENT */}
            <div 
              ref={scrollRef}
              className="p-8 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-border-dim"
            >
              <div className="space-y-4 font-mono text-[0.8rem] leading-relaxed">
                {history.map((line, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                        "whitespace-pre-wrap",
                        line.type === 'input' ? "text-accent" : "text-text-secondary"
                    )}
                  >
                    {line.type === 'input' && <span className="mr-3 opacity-50">&lambda;</span>}
                    {line.content}
                  </motion.div>
                ))}
              </div>

              {/* INPUT LINE */}
              <form onSubmit={handleCommand} className="flex mt-6 items-center">
                <span className="text-accent mr-3 animate-pulse">&lambda;</span>
                <input 
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="bg-transparent border-none outline-none flex-grow text-text-primary font-mono text-[0.8rem] caret-accent"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
            </div>

            {/* DECORATIVE SCANLINE */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-scanlines animate-scanline" />
          </motion.div>

          {/* QUICK LINKS */}
          <div className="mt-sys-64 flex justify-between items-center px-4">
            <div className="flex gap-sys-32">
                <a href={identity.github} target="_blank" className="type-nav text-[0.6rem] hover:text-accent transition-colors">GITHUB_REF</a>
                <a href={identity.linkedin} target="_blank" className="type-nav text-[0.6rem] hover:text-accent transition-colors">LINKEDIN_REF</a>
            </div>
            <div className="type-metadata text-[0.5rem] opacity-20">ENCRYPTED_COMMS_ACTIVE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
