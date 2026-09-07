import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { GenerateProposalRequest, GenerateProposalResponse, ApiError } from '@/types/api.types';

export function useGenerateProposal() {
  return useMutation<GenerateProposalResponse, ApiError, GenerateProposalRequest>({
    mutationFn: async (payload: GenerateProposalRequest) => {
      return apiClient.post<GenerateProposalResponse>('/api/v1/proposals/generate', payload);
    },
  });
}
