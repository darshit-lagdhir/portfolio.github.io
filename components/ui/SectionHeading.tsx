interface SectionHeadingProps {
    children: React.ReactNode;
    as?: "h1" | "h2" | "h3";
    number?: string;
}

export default function SectionHeading({ children, as: Tag = "h2", number }: SectionHeadingProps) {
    const sizes = {
        h1: "text-3xl md:text-4xl",
        h2: "text-3xl md:text-4xl",
        h3: "text-xl md:text-2xl",
    };

    return (
        <div className="flex items-baseline gap-4">
            {number && (
                <span className="text-xs font-mono text-neutral-300 dark:text-neutral-700 tracking-wider">
                    {number}
                </span>
            )}
            <Tag className={`${sizes[Tag]} font-semibold tracking-tight`}>
                {children}
            </Tag>
        </div>
    );
}
