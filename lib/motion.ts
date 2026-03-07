export const motionConfig = {
    fast: 0.3,
    medium: 0.5,
    slow: 0.8,
    cinematic: [0.16, 1, 0.3, 1] as const,
    stagger: 0.08,
    viewport: { once: true, margin: "-100px" as const },
};

// Mask Reveal for Headlines (reveals from below with clip-path)
export const maskReveal = {
    initial: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 40, opacity: 0 },
    whileInView: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, opacity: 1 },
    transition: { duration: 1.2, ease: motionConfig.cinematic },
};

// Subtle Scale Up & Fade (Cinematic entry)
export const scaleReveal = {
    initial: { opacity: 0, scale: 0.96, filter: "blur(10px)" },
    whileInView: { opacity: 1, scale: 1, filter: "blur(0px)" },
    transition: { duration: 1, ease: motionConfig.cinematic },
};

// Standard Glide reveal upgrade
export const sectionReveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: motionConfig.viewport,
    transition: { duration: motionConfig.medium, ease: motionConfig.cinematic },
};

export const staggerContainer = {
    whileInView: { transition: { staggerChildren: motionConfig.stagger } },
    viewport: motionConfig.viewport,
};

export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: motionConfig.medium, ease: motionConfig.cinematic },
};
// PHASE 34: INTERACTION PHYSICS TOKENS
export const PHYSICS = {
    PRESSURE: { type: "spring", stiffness: 600, damping: 30, mass: 0.5 } as const,
    ELEVATION: { type: "spring", stiffness: 400, damping: 25, mass: 1 } as const,
    MAGNETIC: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 } as const,
    RELAX: { type: "spring", stiffness: 100, damping: 20 } as const,
    TENSION: { type: "spring", stiffness: 200, damping: 15, mass: 1 } as const
};

export const pressureFeedback = {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98, y: 1 },
    transition: PHYSICS.PRESSURE
};

export const elevationFeedback = {
    whileHover: { y: -8, scale: 1.01, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" },
    transition: PHYSICS.ELEVATION
};
