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
    id: string; // Internal project_id
    name: string; // Display name
    slug: string; // URL slug
    route_path: string; // Routing metadata (e.g. /movex)
    shortDescription: string;
    longDescription: string;
    category: "Operational Backend System" | "Verification Pipeline" | "Advisory Data Analysis System" | string;
    techStack: string[];
    techGroups?: TechGroup[];
    status: "Completed" | "Active Development" | "Hackathon Project" | string;
    learningOutcomes: string[];
    tier: 1 | 2 | 3;
    
    // Core Engineering Data
    engineeringFocus?: string;
    technicalMeta?: TechnicalMeta;
    architecture_nodes: DiagramNode[];
    architecture_connections: DiagramConnection[];
    development_story: StoryStep[];
    
    // Legacy / Deep Dive Fields (Preserved for component compatibility where needed)
    problem: string;
    constraints?: string[];
    challenges?: ProjectChallenge[];
    evolution?: EvolutionStep[]; 
    architectureDecisions?: DesignDecision[]; 
    tradeoffs?: DesignTradeoff[]; 
    authority?: AuthorityLayer; 
    internalComponents?: InternalComponent[];
    future?: ProjectChallenge[];

    // Internal UI hints
    layout: "layered" | "pipeline";
    domains?: string[];
}

export interface EngineeringDomain {
    id: string;
    name: string;
    description: string;
    relatedDomains: string[]; 
    relatedTech?: string[];
    relatedProjects?: string[];
}
