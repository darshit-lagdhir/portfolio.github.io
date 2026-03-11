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

export interface DeepDive {
    type: "DEBUGGING" | "REDESIGN" | "OPTIMIZATION" | "DISCOVERY";
    title: string;
    content: string;
}

export interface ExperimentNote {
    title: string;
    content: string;
}

export interface AuthorityLayer {
    complexityScore: number; // 1-10
    architectureDepth: string;
    researchFocus: string;
    primaryDomain: string;
    experimentationAreas: string[];
    deepDives?: DeepDive[];
    experimentationNotes?: ExperimentNote[];
    recurringPatterns?: string[];
}

export interface Project {
    slug: string;
    title: string;
    shortDescription: string;
    techStack: string[]; 
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
    diagram?: ProjectDiagram; 
    evolution?: EvolutionStep[]; 
    architectureDecisions?: DesignDecision[]; 
    tradeoffs?: DesignTradeoff[]; 
    decisions?: string[]; 
    detailedDecisions?: {
        decision: string;
        why: string;
        alternative: string;
        rejectedReason: string;
    }[];
    limitations?: string[];
    ifRebuildingToday?: string[];
    performance?: string;
    future?: ProjectChallenge[]; 
    storyFlow?: StoryStep[]; 
    githubRepoName?: string;
    githubUrl?: string;
    status: "COMPLETE" | "DEVELOPMENT" | string;
    domains?: string[]; 
    authority?: AuthorityLayer; // Phase 31: Credibility Layer
}

export interface EngineeringDomain {
    id: string;
    name: string;
    description: string;
    relatedDomains: string[]; // IDs of connected domains for visualization
}
