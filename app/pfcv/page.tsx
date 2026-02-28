"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PFCVSystemPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen w-full bg-[#050505] text-neutral-50 px-8 py-32 md:px-12 xl:px-32 relative"
        >
            <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-4 md:grid-cols-12 gap-x-6 gap-y-12">
                <div className="col-span-4 md:col-span-12 mb-20 border-b border-neutral-900 pb-10">
                    <Link href="/" className="font-heading text-[10px] md:text-sm uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                        ← RETURN / INDEX
                    </Link>
                </div>

                {/* Title & Mission Statement */}
                <div className="col-span-4 md:col-span-8 lg:col-span-8 mb-32">
                    <span className="font-heading text-[10px] md:text-sm uppercase tracking-[0.5em] text-neutral-600 block mb-12">SYSTEM CORE // 01</span>
                    <h1 className="font-title text-[clamp(4.5rem,10vw,12rem)] leading-[0.85] text-white uppercase tracking-tighter mb-12">
                        Polyglot<br />FFI Verifier
                    </h1>
                    <p className="font-body text-xl md:text-2xl text-neutral-400 font-light leading-snug tracking-wide max-w-[65ch]">
                        Enforcing absolute memory safety boundaries across foreign function boundaries. Generating type-secure bindings between natively incompatible languages via unified intermediate representation.
                    </p>
                </div>

                {/* Pipeline Visual Concept */}
                <div className="col-span-4 md:col-span-12 mb-32 border-y border-neutral-900 py-10 relative bg-[#050505]">
                    <span className="absolute top-4 left-4 font-heading text-[10px] uppercase tracking-widest text-neutral-700 ml-4 mb-12 block z-10">
                        THE PIPELINE // 02
                    </span>

                    <div className="flex w-full items-center justify-between pb-8 pt-20 overflow-x-auto gap-12 px-8 no-scrollbar scroll-smooth">
                        {["AST PARSER", "TYPE ANALYSIS", "IR SYNTHESIS", "LIFETIME CHECKS", "OWNERSHIP VERIFICATION", "C++ GENERATION", "RUST BINARY", "RUNTIME SHIELD"].map((node, i) => (
                            <div key={i} className="flex items-center min-w-max">
                                <div className="font-title text-3xl md:text-5xl text-neutral-600 hover:text-white uppercase tracking-tighter transition-colors">
                                    {node}
                                </div>
                                {i !== 7 && (
                                    <span className="font-heading text-neutral-800 mx-10">→</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* IR Flow & Runtime Checks */}
                <div className="col-span-4 md:col-span-12 mb-32 grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-16">
                    <div className="col-span-1 md:col-span-6">
                        <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-12 border-b border-neutral-900 pb-4">IR SYNTHESIS // 03</span>
                        <h2 className="font-title text-[clamp(2rem,4vw,3rem)] uppercase tracking-tighter mb-8 leading-none">A universal grammar</h2>
                        <p className="font-body text-neutral-400 font-light text-lg leading-relaxed max-w-[55ch]">
                            By translating language-specific parsing syntax into a universal Intermediate Representation (IR), the system normalizes type definitions, constraints, and semantics. Checking memory semantics across the IR boundary guarantees cross-compilation validity without hardcoding arbitrary language permutations.
                        </p>
                    </div>

                    <div className="col-span-1 md:col-span-6">
                        <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-12 border-b border-neutral-900 pb-4">RUNTIME SHIELD // 04</span>
                        <h2 className="font-title text-[clamp(2rem,4vw,3rem)] uppercase tracking-tighter mb-8 leading-none">Execution validation</h2>
                        <p className="font-body text-neutral-400 font-light text-lg leading-relaxed max-w-[55ch]">
                            Static analysis cannot prevent external environment corruption. The verification pipeline synthesizes direct runtime enforcement boundaries wrapped within the FFI payload, intentionally panicking execution rather than allowing silent memory degradation across threads.
                        </p>
                    </div>
                </div>

                {/* Python Adapter Progress Note */}
                <div className="col-span-4 md:col-span-12 mb-32 bg-transparent border border-neutral-800 border-dashed p-8 md:p-12 relative overflow-hidden flex flex-col items-center text-center">
                    <span className="font-heading text-[10px] uppercase tracking-[0.5em] text-neutral-500 block mb-12">EXPERIMENTAL STATUS // ADAPTER</span>
                    <p className="font-body text-neutral-300 font-light text-xl md:text-2xl italic tracking-wide max-w-[65ch] relative z-10 leading-snug">
                        Python integration handler is heavily under construction. The bridging required to translate dynamic reference constraints into statically verified C++ headers introduces severe cyclic dependencies currently undergoing isolation testing.
                    </p>
                </div>

                {/* Exit */}
                <div className="col-span-4 md:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-neutral-900 pt-16 pb-32">
                    <div className="mb-12 md:mb-0">
                        <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-600 block mb-6">DEPLOYMENT // 05</span>
                        <p className="font-body text-neutral-500 font-light max-w-[50ch]">Core architecture validation.</p>
                    </div>
                    <a href="https://github.com/darshit-lagdhir/" target="_blank" className="font-title text-5xl md:text-7xl text-white uppercase tracking-tighter hover:text-neutral-500 transition-colors">
                        Review Code
                    </a>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </motion.div>
    );
}
