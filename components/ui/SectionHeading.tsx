interface SectionHeadingProps {
    children: React.ReactNode;
    as?: "h1" | "h2" | "h3";
    number?: string;
    systemLabel?: string;
}

export default function SectionHeading({ children, as: Tag = "h2", number, systemLabel }: SectionHeadingProps) {
    const sizes = {
        h1: "text-3xl md:text-4xl",
        h2: "text-3xl md:text-4xl",
        h3: "text-xl md:text-2xl",
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-4">
                {number && (
                    <span className="text-xs font-mono text-neutral-300 dark:text-neutral-700 tracking-wider">
                        {number}
                    </span>
                )}
                <Tag className={`${sizes[Tag]} font-semibold tracking-tight text-neutral-900 dark:text-neutral-100`}>
                    {children}
                </Tag>
            </div>
            {systemLabel && (
                <span className="text-[10px] font-mono text-neutral-300 dark:text-neutral-700 border border-neutral-200/50 dark:border-neutral-800/50 px-2 py-0.5 rounded tracking-widest hidden sm:inline-block">
                    [ {systemLabel} ]
                </span>
            )}
        </div>
    );
}
