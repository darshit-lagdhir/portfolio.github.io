export const motionConfig = {
    fast: 0.2,
    medium: 0.4,
    slow: 0.6,
    ease: [0.25, 0.1, 0.25, 1] as const,
    stagger: 0.06,
    viewport: { once: true, margin: "-80px" as const },
};

export const sectionReveal = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: motionConfig.viewport,
    transition: { duration: motionConfig.medium, ease: motionConfig.ease },
};

export const staggerContainer = {
    whileInView: { transition: { staggerChildren: motionConfig.stagger } },
    viewport: motionConfig.viewport,
};

export const staggerItem = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: motionConfig.medium, ease: motionConfig.ease },
};
