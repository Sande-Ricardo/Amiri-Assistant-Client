'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CopyToClipboardButtonProps {
  /** The text content to copy to the clipboard */
  content: string;
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text to clipboard', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 border ${
        isCopied
          ? 'bg-emerald-950/70 text-emerald-400 border-emerald-800/60 hover:bg-emerald-900/80'
          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-slate-100'
      }`}
      aria-label="Copy proposal to clipboard"
    >
      {isCopied ? (
        <>
          <Check className="h-4 w-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
};
