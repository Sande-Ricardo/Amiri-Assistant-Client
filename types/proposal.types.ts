import { ProposalStatus } from './api.types';

export type AppView = 'idle' | 'submitting' | 'polling' | 'completed' | 'failed';

export interface ProposalFormValues {
  client_name: string;
  raw_requirements: string;
}

export interface AgentNode {
  id: string;
  label: string;
  description: string;
}

export { type ProposalStatus };
