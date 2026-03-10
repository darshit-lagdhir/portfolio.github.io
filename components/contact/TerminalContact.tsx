"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { identity } from "@/data/identity";

const COMMANDS = [
  { cmd: "help", desc: "List all available commands" },
  { cmd: "link --linkedin", desc: "Open LinkedIn profile" },
  { cmd: "link --github", desc: "Open GitHub profile" },
  { cmd: "mail", desc: "Initialize mail client" },
  { cmd: "clear", desc: "Clear terminal history" },
  { cmd: "exit", desc: "Close interface connection" }
];

export default function TerminalContact() {
  const [history, setHistory] = useState<string[]>(["Connection established...", "Type 'help' for instructions."]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response = "";

    switch (cmd) {
      case "help":
        response = COMMANDS.map(c => `${c.cmd.padEnd(15)} - ${c.desc}`).join("\n");
        break;
      case "link --linkedin":
        window.open(identity.linkedin, "_blank");
        response = "Redirecting to LinkedIn...";
        break;
      case "link --github":
        window.open(identity.github, "_blank");
        response = "Redirecting to GitHub...";
        break;
      case "mail":
        window.location.href = `mailto:${identity.email}`;
        response = `Opening mail client for ${identity.email}...`;
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        response = "Connection terminated. Refresh to reconnect.";
        break;
      default:
        response = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, `> ${input}`, response]);
    setInput("");
  };

  return (
    <section className="py-sys-128 pb-sys-256">
      <div className="section-divider" data-label="05_CONNECTION_INTERFACE">
        <span className="divider-label">05_CONNECTION_INTERFACE</span>
      </div>

      <div className="grid-12">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <div className="border border-border-dim bg-bg-secondary overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-bg-primary border-b border-border-dim px-4 py-2 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-900/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-900/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-900/40" />
              </div>
              <div className="type-metadata text-[0.5rem] opacity-40">DARSHIT_SHELL_V1.0.4</div>
            </div>

            {/* Terminal Content */}
            <div 
              ref={scrollRef}
              className="p-6 h-[400px] overflow-y-auto font-mono text-sm type-body scrollbar-thin"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <div className="space-y-2 whitespace-pre-wrap">
                {history.map((line, i) => (
                  <div key={i} className={line.startsWith(">") ? "text-accent" : "opacity-60"}>
                    {line}
                  </div>
                ))}
              </div>

              <form onSubmit={handleCommand} className="flex mt-4 items-center">
                <span className="text-accent mr-2">&lambda;</span>
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-grow text-primary type-body h-full"
                  autoFocus
                  placeholder="enter command..."
                />
              </form>
            </div>
          </div>

          <div className="mt-sys-48 flex justify-center gap-sys-32 opacity-40">
            <a href={identity.github} target="_blank" className="type-nav hover:text-accent transition-colors">GITHUB</a>
            <a href={identity.linkedin} target="_blank" className="type-nav hover:text-accent transition-colors">LINKEDIN</a>
            <a href={`mailto:${identity.email}`} className="type-nav hover:text-accent transition-colors">EMAIL</a>
          </div>
        </div>
      </div>
    </section>
  );
}
