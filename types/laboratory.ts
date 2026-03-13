export type InvestigationStatus = 'investigating' | 'completed' | 'ongoing';

export interface LaboratoryInvestigation {
    investigation_id: string;
    title: string;
    description: string;
    context: string;
    insight: string;
    related_domains: string[];
    related_projects?: string[];
    status: InvestigationStatus;
}
