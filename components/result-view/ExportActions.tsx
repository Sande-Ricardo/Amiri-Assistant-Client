'use client';

import React, { useState } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ExportActionsProps {
  /** The raw markdown string to be exported */
  content: string;
  /** Optional filename for the downloaded file */
  filename?: string;
  /** The ID of the HTML element to capture for PDF generation */
  pdfTargetId?: string;
}

export const ExportActions: React.FC<ExportActionsProps> = ({
  content,
  filename = 'amiri_proposal',
  pdfTargetId = 'proposal-content',
}) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadMarkdown = () => {
    try {
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.md`;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate or download Markdown file', error);
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById(pdfTargetId);
    if (!element) {
      console.error(`Element with id ${pdfTargetId} not found.`);
      return;
    }

    try {
      setIsGeneratingPdf(true);
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        logging: false 
      });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${filename}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={handleDownloadMarkdown}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-900/20"
        aria-label="Download proposal as Markdown"
      >
        <Download className="h-4 w-4" />
        <span>Download .md</span>
      </button>

      <button
        onClick={handleDownloadPDF}
        disabled={isGeneratingPdf}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-slate-900/20"
        aria-label="Download proposal as PDF"
      >
        {isGeneratingPdf ? (
          <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
        ) : (
          <FileText className="h-4 w-4 text-indigo-400" />
        )}
        <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download .pdf'}</span>
      </button>
    </div>
  );
};
