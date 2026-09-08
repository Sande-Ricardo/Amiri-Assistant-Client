import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { env } from '@/config/env';
import { ProposalStatusResponse, ApiError } from '@/types/api.types';

export function useProposalStatus(requestId: string | null) {
  const query = useQuery<ProposalStatusResponse, ApiError>({
    queryKey: ['proposalStatus', requestId],
    queryFn: async () => {
      if (!requestId) throw new Error('No requestId provided');
      return apiClient.get<ProposalStatusResponse>(`/api/v1/proposals/${requestId}/status`);
    },
    enabled: !!requestId,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data && (data.status === 'completed' || data.status === 'failed')) {
        return false;
      }
      return env.NEXT_PUBLIC_POLLING_INTERVAL_MS;
    },
    retry: (failureCount, error) => {
      if (error.status && error.status >= 400 && error.status < 500) {
        return false; // Do not retry on client errors
      }
      return failureCount < 3;
    },
  });

  const isTerminalStatus = query.data?.status === 'completed' || query.data?.status === 'failed';
  const isPolling = !!requestId && !isTerminalStatus && !query.isError;
  const isCompleted = query.data?.status === 'completed';
  const isFailed = query.data?.status === 'failed';

  return {
    ...query,
    isPolling,
    isCompleted,
    isFailed,
  };
}
