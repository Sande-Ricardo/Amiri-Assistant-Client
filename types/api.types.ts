export type ProposalStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface GenerateProposalRequest {
  client_name: string;
  raw_requirements: string;
}

export interface GenerateProposalResponse {
  request_id: string;
}

export interface ProposalStatusResponse {
  status: ProposalStatus;
  current_node: string | null;
  proposal_markdown: string | null;
  error_detail: string | null;
}

export class ApiError extends Error {
  public status: number;
  public details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}
