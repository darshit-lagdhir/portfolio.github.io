export interface ArchitectureLayer {
    name: string;
    description: string;
}

export interface TechnicalMeta {
    systemType: string;
    architectureStyle: string;
    storageType: string;
    authType?: string;
}

export interface TechGroup {
    role: string;
    items: string[];
}

export interface ProjectChallenge {
    title: string;
    description: string;
}

export interface InternalComponent {
    name: string;
    description: string;
}

export interface DiagramNode {
    id: string;
    label: string;
    description: string;
    type: "service" | "database" | "pipeline" | "interface" | "logic" | "client";
    responsibilities?: string[];
    tech?: string[];
}

export interface DiagramConnection {
    from: string;
    to: string;
    label?: string;
}

export interface ProjectDiagram {
    nodes: DiagramNode[];
    connections: DiagramConnection[];
    layout: "layered" | "pipeline";
}

export interface EvolutionStep {
    milestone: string;
    description: string;
    date?: string;
}

export interface DesignDecision {
    title: string;
    problem: string;
    approach: string;
    reasoning: string;
    alternatives?: string[];
}

export interface DesignTradeoff {
    title: string;
    description: string;
    impact: "PERFORMANCE" | "MAINTAINABILITY" | "SIMPLICITY" | "SCALABILITY";
}

export interface StoryStep {
    id: string;
    title: string;
    description: string;
    activeNodes: string[]; // IDs of diagram nodes to highlight
}

export interface Project {
    slug: string;
    title: string;
    shortDescription: string;
    techStack: string[]; // Keep for legacy/summary
    techGroups?: TechGroup[];
    tier: 1 | 2 | 3;
    overview: string;
    problem: string;
    constraints?: string[];
    engineeringFocus?: string;
    technicalMeta?: TechnicalMeta;
    architecture: string;
    architectureLayers?: ArchitectureLayer[];
    internalComponents?: InternalComponent[];
    challenges?: ProjectChallenge[];
    diagram?: ProjectDiagram; // Visualization layer
    evolution?: EvolutionStep[]; // New story timeline
    architectureDecisions?: DesignDecision[]; // Detailed 'Why'
    tradeoffs?: DesignTradeoff[]; // Engineering compromises
    decisions?: string[]; // Legacy
    detailedDecisions?: {
        decision: string;
        why: string;
        alternative: string;
        rejectedReason: string;
    }[];
    limitations?: string[];
    ifRebuildingToday?: string[];
    performance?: string;
    future?: ProjectChallenge[]; // Changed to structured objects
    storyFlow?: StoryStep[]; // Phase 27: System Runtime Story
    githubRepoName?: string;
    githubUrl?: string;
    status: "COMPLETE" | "DEVELOPMENT" | string;
    domains?: string[]; // IDs of engineering domains
}

export interface EngineeringDomain {
    id: string;
    name: string;
    description: string;
    relatedDomains: string[]; // IDs of connected domains for visualization
}
