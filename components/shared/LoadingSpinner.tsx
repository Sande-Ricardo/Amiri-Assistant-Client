import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingSpinnerProps {
  /** Optional additional Tailwind classes for styling */
  className?: string;
  /** Optional size in pixels (default: 16) */
  size?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className = '',
  size = 16,
}) => {
  return (
    <Loader2
      size={size}
      className={`animate-spin ${className}`}
      aria-label="Loading..."
    />
  );
};
