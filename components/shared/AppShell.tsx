'use client';

import React, { useState } from 'react';
import { AppView } from '@/types/proposal.types';
import { ProposalForm } from '@/components/proposal-form/ProposalForm';
import { ProposalFormInput } from '@/lib/validation';
import { useGenerateProposal } from '@/hooks/useGenerateProposal';
import { useWatchdogTimer } from '@/hooks/useWatchdogTimer';
import { useProposalStatus } from '@/hooks/useProposalStatus';
import { AgentStatusStepper } from '@/components/agent-status/AgentStatusStepper';
import { MarkdownViewer } from '@/components/result-view/MarkdownViewer';
import { CopyToClipboardButton } from '@/components/result-view/CopyToClipboardButton';
import { ExportActions } from '@/components/result-view/ExportActions';
import { ErrorBoundaryView } from '@/components/shared/ErrorBoundaryView';

export function AppShell() {
  const [currentView, setCurrentView] = useState<AppView>('idle');
  const [requestId, setRequestId] = useState<string | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const { mutate } = useGenerateProposal();

  const { data: statusData, isError: statusIsError, error: statusError } = useProposalStatus(
    currentView === 'polling' ? requestId : null
  );

  React.useEffect(() => {
    if (currentView !== 'polling' || !statusData) return;
    
    if (statusData.status === 'completed') {
      setCurrentView('completed');
    } else if (statusData.status === 'failed') {
      setErrorDetail(statusData.error_detail || 'Pipeline execution failed on the server.');
      setCurrentView('failed');
    }
  }, [currentView, statusData]);

  React.useEffect(() => {
    if (currentView === 'polling' && statusIsError) {
      setErrorDetail(statusError?.message || 'Network error while polling status.');
      setCurrentView('failed');
    }
  }, [currentView, statusIsError, statusError]);

  useWatchdogTimer(currentView === 'polling', () => {
    setRequestId(null);
    setErrorDetail('This is taking longer than expected. The backend may still be processing — you can check back later or try again.');
    setCurrentView('failed');
  });

  const handleProposalSubmit = (data: ProposalFormInput) => {
    setCurrentView('submitting');
    mutate(data, {
      onSuccess: (response) => {
        setRequestId(response.request_id);
        setCurrentView('polling');
      },
      onError: (error) => {
        setErrorDetail(error.message);
        setCurrentView('failed');
      },
    });
  };

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
            <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center shadow-lg shadow-indigo-500/20 bg-slate-900 border border-slate-700">
              <img src="/logo.jpg" alt="Amiri Logo" className="w-full h-full object-cover" />
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
                <ProposalForm onSubmit={handleProposalSubmit} />
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
            <div className="text-center py-8 flex flex-col items-center">
              <div className="w-16 h-16 rounded-xl overflow-hidden mb-6 shadow-lg shadow-indigo-500/20 animate-pulse border border-slate-700">
                <img src="/logo.jpg" alt="Amiri Logo" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                Processing Workflow...
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
                Polling execution state for Request ID:{' '}
                <span className="font-mono text-indigo-300">{requestId}</span>
              </p>
              
              <AgentStatusStepper 
                currentNode={statusData?.current_node ?? null} 
                status={statusData?.status ?? 'pending'} 
              />
            </div>
          )}

          {currentView === 'completed' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <h2 className="text-xl font-semibold text-emerald-400">
                  Proposal Generated Successfully
                </h2>
                
                <div className="flex flex-wrap items-center gap-3">
                  <CopyToClipboardButton content={statusData?.proposal_markdown || ''} />
                  <ExportActions content={statusData?.proposal_markdown || ''} />
                  
                  <button
                    onClick={() => {
                      setRequestId(null);
                      setErrorDetail(null);
                      setCurrentView('idle');
                    }}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
                  >
                    New Proposal
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-950/50 p-6 rounded-lg border border-slate-800/60 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <MarkdownViewer content={statusData?.proposal_markdown || ''} />
              </div>
            </div>
          )}

          {currentView === 'failed' && (
            <ErrorBoundaryView
              errorDetail={errorDetail}
              onReset={() => {
                setErrorDetail(null);
                setCurrentView('idle');
              }}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Amiri Logo" className="w-4 h-4 opacity-50 grayscale rounded-sm" />
            <span>Amiri Assistant Client &mdash; Multi-Agent B2B Proposal Engine</span>
          </div>
          <span className="font-mono text-slate-600">v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
