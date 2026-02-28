interface DiagramLayer {
    label: string;
}

interface ArchitectureDiagramProps {
    layers: DiagramLayer[];
    caption?: string;
}

export default function ArchitectureDiagram({ layers, caption }: ArchitectureDiagramProps) {
    return (
        <div className="my-8 flex flex-col items-center">
            <div className="w-full max-w-sm space-y-0">
                {layers.map((layer, i) => (
                    <div key={layer.label} className="flex flex-col items-center">
                        <div className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/60 px-4 py-3 text-center text-sm font-medium text-neutral-800 dark:text-neutral-200">
                            {layer.label}
                        </div>
                        {i < layers.length - 1 && (
                            <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-700" />
                        )}
                    </div>
                ))}
            </div>
            {caption && (
                <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500">
                    {caption}
                </p>
            )}
        </div>
    );
}
