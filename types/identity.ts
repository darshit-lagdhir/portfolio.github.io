export interface HeroIdentity {
    hero_title: string;
    hero_subtitle: string;
    hero_description: string;
}

export interface AboutNarrative {
    about_intro: string;
    about_learning_context: string;
}

export interface WorkflowStep {
    title: string;
    description: string;
}

export interface CapabilityGroup {
    category: string;
    description: string;
    items: string[];
    projects?: string[];
}

export interface ExplorationArea {
    title: string;
    description: string;
}

export interface ContactLinks {
    github_url: string;
    linkedin_url: string;
    email: string;
    resume_url: string;
}

export interface DiscoveryHint {
    label: string;
    description: string;
}

export interface Identity {
    name: string;
    headline: string;
    short_identity: string;
    hero_identity: HeroIdentity;
    about: AboutNarrative;
    learning_workflow: WorkflowStep[];
    capabilities: CapabilityGroup[];
    exploration_focus: ExplorationArea[];
    contact: ContactLinks;
    final_reflection: string;
    section_transitions: Record<string, string>;
    discovery_hints: Record<string, DiscoveryHint>;
    
    // Legacy support fields for minor consistency
    university?: string;
    degree?: string;
    location?: string;
}
