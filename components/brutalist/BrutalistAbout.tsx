"use client";

import { motion } from "framer-motion";

const aboutBlocks = [
    {
        statement: "Systems from the inside out.",
        details: "I focus on understanding how components interact before optimizing individual parts."
    },
    {
        statement: "Logic-first engineering.",
        details: "Aesthetics matter, but foundation dictates scale. True performance begins below the surface."
    },
    {
        statement: "Break. Debug. Rebuild.",
        details: "Testing theories against real-world friction. Constant refinement demands controlled failure."
    },
    {
        statement: "Simple. Efficient. Readable.",
        details: "Code that scales is code that communicates clearly. Unnecessary complexity is a liability."
    }
];

export default function BrutalistAbout() {
    return (
        <section className="min-h-screen w-full bg-[#050505] flex flex-col justify-center py-40 overflow-hidden relative border-t border-neutral-900 border-dashed snap-start">
            <div className="absolute top-10 right-10 z-0">
                <span className="font-heading text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-2">SECT // 02</span>
            </div>

            <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-12 flex flex-col gap-32">
                {aboutBlocks.map((block, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, margin: "-100px" }}
                            key={i}
                            className="w-full grid grid-cols-4 md:grid-cols-12 gap-x-6 gap-y-12 items-start"
                        >
                            {/* Left-aligned statement if Even, Right-aligned if Odd */}
                            <div className={`col-span-4 md:col-span-7 ${isEven ? "md:col-start-1" : "md:col-start-6 md:text-right"}`}>
                                <h2 className="font-title text-[clamp(3.5rem,7vw,10rem)] leading-[0.9] text-neutral-100 uppercase tracking-tighter">
                                    {block.statement}
                                </h2>
                            </div>

                            {/* Paragraph opposite to statement */}
                            <div className={`col-span-4 md:col-span-4 flex flex-col gap-4 mt-4 ${isEven ? "md:col-start-9" : "md:col-start-1 md:row-start-1"}`}>
                                <div className={`w-12 h-px bg-neutral-700 ${isEven ? "" : "md:ml-auto"}`} />
                                <p className={`font-body text-xl md:text-2xl text-neutral-400 font-light leading-snug tracking-wide ${isEven ? "max-w-[30ch]" : "max-w-[30ch] md:ml-auto md:text-right"}`}>
                                    {block.details}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
