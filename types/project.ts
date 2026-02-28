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

export interface Project {
    slug: string;
    title: string;
    shortDescription: string;
    techStack: string[];
    tier: 1 | 2 | 3;
    overview?: string;
    problem?: string;
    constraints?: string[];
    engineeringFocus?: string;
    technicalMeta?: TechnicalMeta;
    diagramLayers?: { label: string }[];
    architectureLayers?: ArchitectureLayer[];
    architecture?: string;
    decisions?: string[];
    tradeoffs?: string[];
    limitations?: string[];
    performance?: string;
    future?: string[];
    githubRepoName?: string;
    githubUrl?: string;
}
