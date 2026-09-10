'use client';

import React from 'react';
import { Check } from 'lucide-react';

export type NodeState = 'complete' | 'active' | 'pending';

export interface AgentNodeIndicatorProps {
  /** The display label for this agent step */
  label: string;
  /** Custom icon component to render inside the node indicator */
  icon?: React.ReactNode;
  /** Current state of this workflow step */
  state: NodeState;
  /** Whether this is the last step in the stepper, omitting the bottom connecting line */
  isLast?: boolean;
}

export const AgentNodeIndicator: React.FC<AgentNodeIndicatorProps> = ({
  label,
  icon,
  state,
  isLast = false,
}) => {
  return (
    <div className="relative flex items-start gap-4">
      {/* Icon & Connecting Line Column */}
      <div className="flex flex-col items-center">
        {/* Circle Container */}
        <div
          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-all duration-300 ${
            state === 'complete'
              ? 'border-emerald-500/50 bg-emerald-950/70 text-emerald-400 shadow-sm shadow-emerald-900/40 ring-1 ring-emerald-500/20'
              : state === 'active'
              ? 'border-blue-500/50 bg-blue-950/70 text-blue-400 shadow-md shadow-blue-900/50 ring-2 ring-blue-500/30 animate-pulse'
              : 'border-slate-800 bg-slate-900/60 text-slate-500'
          }`}
        >
          {state === 'complete' ? (
            <Check className="h-5 w-5 text-emerald-400 stroke-[2.5]" />
          ) : (
            icon
          )}
        </div>

        {/* Vertical Connecting Line */}
        {!isLast && (
          <div
            className={`w-0.5 min-h-[32px] flex-1 transition-colors duration-300 ${
              state === 'complete' ? 'bg-emerald-500/50' : 'bg-slate-800'
            }`}
          />
        )}
      </div>

      {/* Label Content Column */}
      <div className="pt-2 pb-6">
        <p
          className={`text-sm font-medium transition-colors duration-300 ${
            state === 'complete'
              ? 'text-slate-200'
              : state === 'active'
              ? 'text-blue-300 font-semibold'
              : 'text-slate-500'
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  );
};
