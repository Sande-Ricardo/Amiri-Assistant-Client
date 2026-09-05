'use client';

import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proposalFormSchema, ProposalFormInput } from '@/lib/validation';
import { ProposalFormProps } from './ProposalForm.types';

export function ProposalForm({ onSubmit }: ProposalFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProposalFormInput>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      client_name: '',
      raw_requirements: '',
    },
  });

  const rawRequirements = watch('raw_requirements') || '';
  const charCount = rawRequirements.length;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { ref: registerRef, ...rawRequirementsRegister } = register('raw_requirements');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(120, textareaRef.current.scrollHeight)}px`;
    }
  }, [rawRequirements]);

  const getCounterColorClass = (count: number) => {
    if (count === 0) return 'text-slate-500';
    if (count < 50) return 'text-amber-400';
    if (count > 7500) return 'text-amber-400';
    if (count > 8000) return 'text-red-400 font-semibold';
    return 'text-slate-400';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
      <div>
        <label htmlFor="client_name" className="block text-sm font-medium text-slate-300 mb-1">
          Client Name
        </label>
        <input
          id="client_name"
          type="text"
          placeholder="e.g., Acme Corporation"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-slate-100 placeholder-slate-500"
          {...register('client_name')}
        />
        {errors.client_name && (
          <p className="mt-1 text-sm text-red-400">{errors.client_name.message}</p>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="raw_requirements" className="block text-sm font-medium text-slate-300">
            Raw Requirements
          </label>
          <span className={`text-xs font-mono transition-colors ${getCounterColorClass(charCount)}`}>
            {charCount} / 8000 {charCount > 0 && charCount < 50 ? '(min 50)' : ''}
          </span>
        </div>
        <textarea
          id="raw_requirements"
          rows={5}
          placeholder="Paste meeting notes, emails, or bullet points describing the client's needs..."
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-slate-100 placeholder-slate-500 overflow-hidden min-h-[120px]"
          {...rawRequirementsRegister}
          ref={(e) => {
            registerRef(e);
            textareaRef.current = e;
          }}
        />
        {errors.raw_requirements && (
          <p className="mt-1 text-sm text-red-400">{errors.raw_requirements.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? 'Submitting...' : 'Generate Proposal'}
      </button>
    </form>
  );
}

