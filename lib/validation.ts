import { z } from 'zod';

export const proposalFormSchema = z.object({
  client_name: z
    .string()
    .min(2, { message: 'Client name must be between 2 and 120 characters.' })
    .max(120, { message: 'Client name must be between 2 and 120 characters.' }),
  raw_requirements: z
    .string()
    .min(50, { message: 'Please provide at least 50 characters of context for accurate proposal generation.' })
    .max(8000, { message: 'Please provide at least 50 characters of context for accurate proposal generation.' }),
});

export type ProposalFormInput = z.infer<typeof proposalFormSchema>;
