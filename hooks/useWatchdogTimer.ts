import { useEffect } from 'react';
import { env } from '@/config/env';

export function useWatchdogTimer(isActive: boolean, onTimeout: () => void) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isActive) {
      timeoutId = setTimeout(() => {
        onTimeout();
      }, env.NEXT_PUBLIC_POLLING_TIMEOUT_MS);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isActive, onTimeout]);
}
