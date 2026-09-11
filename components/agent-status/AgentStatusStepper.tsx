'use client';

import React from 'react';
import { AgentNodeIndicator, NodeState } from './AgentNodeIndicator';
import { ProposalStatus } from '@/types/api.types';
import {
  FileSearch,
  Layers,
  Calculator,
  PenTool,
  ShieldCheck,
  Loader2
} from 'lucide-react';

export interface AgentStatusStepperProps {
  currentNode: string | null;
  status: ProposalStatus;
}

const WORKFLOW_STEPS = [
  { id: 'requirements_analysis', label: 'Analyzing Requirements', Icon: FileSearch },
  { id: 'solution_architecture', label: 'Designing Architecture', Icon: Layers },
  { id: 'pricing_strategy', label: 'Formulating Pricing', Icon: Calculator },
  { id: 'proposal_drafting', label: 'Drafting Proposal', Icon: PenTool },
  { id: 'quality_review', label: 'Quality Review', Icon: ShieldCheck },
];

export const AgentStatusStepper: React.FC<AgentStatusStepperProps> = ({
  currentNode,
  status,
}) => {
  const currentIndex = WORKFLOW_STEPS.findIndex((step) => step.id === currentNode);

  // Fallback for unrecognized node during active processing
  const isUnrecognizedNode =
    currentNode !== null &&
    currentIndex === -1 &&
    (status === 'processing' || status === 'pending');

  if (isUnrecognizedNode) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
        <p className="text-sm font-medium">Processing your request...</p>
        <p className="text-xs text-slate-500 mt-2">Executing custom workflow step...</p>
      </div>
    );
  }

  const getNodeState = (index: number): NodeState => {
    if (status === 'completed') return 'complete';

    if (currentIndex !== -1) {
      if (index < currentIndex) return 'complete';
      if (index === currentIndex) return 'active';
      return 'pending';
    }

    // If currentNode is null or unrecognized (but not processing), default to pending
    return 'pending';
  };

  return (
    <div className="w-full max-w-md mx-auto py-6">
      <div className="flex flex-col">
        {WORKFLOW_STEPS.map((step, index) => {
          const isLast = index === WORKFLOW_STEPS.length - 1;
          const nodeState = getNodeState(index);

          return (
            <AgentNodeIndicator
              key={step.id}
              label={step.label}
              icon={<step.Icon className="h-4 w-4" />}
              state={nodeState}
              isLast={isLast}
            />
          );
        })}
      </div>
    </div>
  );
};
