"use client";

import { useEffect } from "react";

export function WarmupProvider({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    const warmupApi = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        await fetch(`${baseUrl}/ping`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });
      } catch {
        // Silently swallow network errors and timeouts to prevent blocking UI
      }
    };

    warmupApi();
  }, []);

  return <>{children}</>;
}
