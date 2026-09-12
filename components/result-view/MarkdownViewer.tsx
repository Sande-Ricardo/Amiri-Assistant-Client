'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

export interface MarkdownViewerProps {
  /** The raw markdown string to be rendered */
  content: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <article className="w-full">
      <div className="prose prose-slate prose-invert max-w-none break-words">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
};
