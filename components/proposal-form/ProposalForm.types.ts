import { ProposalFormInput } from '@/lib/validation';

export interface ProposalFormProps {
  onSubmit: (data: ProposalFormInput) => void;
}
