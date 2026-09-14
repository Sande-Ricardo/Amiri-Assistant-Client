'use client';

import React from 'react';
import { Download } from 'lucide-react';

export interface ExportActionsProps {
  /** The raw markdown string to be exported */
  content: string;
  /** Optional filename for the downloaded file */
  filename?: string;
}

export const ExportActions: React.FC<ExportActionsProps> = ({
  content,
  filename = 'amiri_proposal.md',
}) => {
  const handleDownloadMarkdown = () => {
    try {
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate or download Markdown file', error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleDownloadMarkdown}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-900/20"
        aria-label="Download proposal as Markdown"
      >
        <Download className="h-4 w-4" />
        <span>Download .md</span>
      </button>
    </div>
  );
};
