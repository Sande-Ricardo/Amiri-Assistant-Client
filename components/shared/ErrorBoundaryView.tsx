'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export interface ErrorBoundaryViewProps {
  /** The specific error message to display */
  errorDetail: string | null;
  /** Callback to trigger a reset/retry action */
  onReset: () => void;
}

export const ErrorBoundaryView: React.FC<ErrorBoundaryViewProps> = ({
  errorDetail,
  onReset,
}) => {
  return (
    <div 
      className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-300"
      role="alert" 
      aria-live="assertive"
    >
      <div className="h-16 w-16 bg-red-950/50 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-950/20">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-red-400 mb-3 tracking-tight">
        Pipeline Error Encountered
      </h2>
      
      <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
        We encountered an unexpected issue while processing your request. Please check the details below or try again.
      </p>

      {errorDetail && (
        <div className="w-full max-w-lg mb-8 text-left">
          <div className="bg-red-950/40 border border-red-900/60 rounded-xl p-4 shadow-sm shadow-red-900/10">
            <h3 className="text-xs font-semibold text-red-300 uppercase tracking-wider mb-2">Error Details</h3>
            <p className="text-sm text-red-200 font-mono break-words whitespace-pre-wrap">
              {errorDetail}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={onReset}
        className="px-6 py-2.5 text-sm font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        Try Again
      </button>
    </div>
  );
};
