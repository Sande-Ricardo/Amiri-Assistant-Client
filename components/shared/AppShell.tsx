'use client';

import React, { useState } from 'react';
import { AppView } from '@/types/proposal.types';
import { ProposalForm } from '@/components/proposal-form/ProposalForm';
import { ProposalFormInput } from '@/lib/validation';

export function AppShell() {
  const [currentView, setCurrentView] = useState<AppView>('idle');
  const [requestId, setRequestId] = useState<string | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const getStatusBadgeClass = (view: AppView) => {
    switch (view) {
      case 'idle':
        return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'submitting':
      case 'polling':
        return 'bg-blue-950/70 text-blue-400 border-blue-800/60 animate-pulse';
      case 'completed':
        return 'bg-emerald-950/70 text-emerald-400 border-emerald-800/60';
      case 'failed':
        return 'bg-red-950/70 text-red-400 border-red-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg tracking-wider text-slate-100 uppercase">
                Amiri
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                B2B Proposal Assistant
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-mono px-3 py-1 rounded-full border transition-all duration-300 ${getStatusBadgeClass(
                currentView
              )}`}
            >
              STATE: {currentView.toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center">
        {/* Placeholder slot for active view component */}
        <div className="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
          {currentView === 'idle' && (
            <div className="py-2">
              <h2 className="text-xl font-semibold text-slate-200 mb-2 text-center">
                New Proposal Request
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 text-center">
                Provide your client's name and requirements to generate a customized commercial proposal.
              </p>
              <div className="max-w-xl mx-auto">
                <ProposalForm
                  onSubmit={(data: ProposalFormInput) => {
                    console.log('Form submitted with data:', data);
                    setCurrentView('submitting');
                  }}
                />
              </div>
            </div>
          )}

          {currentView === 'submitting' && (
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                Submitting Proposal Request...
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                Sending initial request to multi-agent backend.
              </p>
              <button
                onClick={() => {
                  setRequestId('req-mock-12345');
                  setCurrentView('polling');
                }}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                Simulate Transition to Polling
              </button>
            </div>
          )}

          {currentView === 'polling' && (
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                Processing Workflow...
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-2">
                Polling execution state for Request ID:{' '}
                <span className="font-mono text-indigo-300">{requestId}</span>
              </p>
              <p className="text-slate-500 text-xs max-w-md mx-auto mb-6">
                LoadingView / Agent Workflow Graph will render here.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setCurrentView('completed')}
                  className="px-4 py-2 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  Simulate Completion
                </button>
                <button
                  onClick={() => {
                    setErrorDetail('Multi-agent pipeline execution failed at Node: Requirement Analysis.');
                    setCurrentView('failed');
                  }}
                  className="px-4 py-2 text-xs font-medium rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
                >
                  Simulate Failure
                </button>
              </div>
            </div>
          )}

          {currentView === 'completed' && (
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-emerald-400 mb-2">
                Proposal Generated Successfully
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                ResultView markdown viewer and action buttons will render here.
              </p>
              <button
                onClick={() => {
                  setRequestId(null);
                  setErrorDetail(null);
                  setCurrentView('idle');
                }}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                Create New Proposal
              </button>
            </div>
          )}

          {currentView === 'failed' && (
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-red-400 mb-2">
                Pipeline Error Encountered
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-4">
                ErrorBoundaryView component will render here.
              </p>
              {errorDetail && (
                <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-lg max-w-lg mx-auto text-xs text-red-300 font-mono mb-6">
                  {errorDetail}
                </div>
              )}
              <button
                onClick={() => {
                  setErrorDetail(null);
                  setCurrentView('idle');
                }}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                Reset and Try Again
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Amiri Assistant Client &mdash; Multi-Agent B2B Proposal Engine</span>
          <span className="font-mono text-slate-600">v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
