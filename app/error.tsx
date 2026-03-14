"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * GLOBAL ERROR BOUNDARY
 * Handles runtime rendering failures and invalid route resolution.
 * Provides separate paths for system state recovery and origin return.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for diagnostic tracking
    console.error("SYSTEM_FAILURE_DETECTED:", error);
  }, [error]);

  const isInvalidSystem = error.message === "The system you tried to access does not exist.";

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center p-sys-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg border border-accent/30 bg-bg-secondary p-sys-32 relative overflow-hidden"
      >
        {/* Visual indicator of system warning */}
        <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
        
        <div className="type-metadata text-[0.6rem] text-accent mb-sys-16 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          {isInvalidSystem ? "ROUTING_FAILURE" : "FATAL_EXCEPTION_THROWN"}
        </div>
        
        <h2 className="type-h2 mb-sys-24 text-white">
          {isInvalidSystem ? "IDENTITY_NOT_FOUND_" : "SYSTEM_STATE_CORRUPTED_"}
        </h2>
        
        <div className="type-body text-sm text-text-secondary mb-sys-32 font-mono p-4 bg-black/40 border border-border-dim rounded">
          {error.message || "An unexpected runtime anomaly occurred causing rendering failure."}
          {error.digest && <div className="mt-2 text-text-muted">Digest: {error.digest}</div>}
        </div>

        <div className="flex flex-col gap-4">
          {!isInvalidSystem && (
            <button
              onClick={() => reset()}
              className="btn-primary w-full justify-center"
            >
              REBOOT_SYSTEM_STATE
            </button>
          )}
          
          <button
            onClick={() => window.location.href = '/'}
            className="type-nav text-[0.7rem] text-text-muted hover:text-white transition-colors py-2 border border-transparent hover:border-border-dim inline-flex items-center justify-center gap-2"
          >
            ← RETURN_TO_BASE_ORIGIN
          </button>
        </div>
        
        <div className="absolute -bottom-16 -right-16 opacity-[0.03] select-none pointer-events-none">
          <span className="type-display text-[8rem]">{isInvalidSystem ? "404" : "ERR"}</span>
        </div>
      </motion.div>
    </div>
  );
}
