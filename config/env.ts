/// <reference types="node" />

export interface EnvConfig {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_POLLING_INTERVAL_MS: number;
  NEXT_PUBLIC_POLLING_TIMEOUT_MS: number;
}

export const env: EnvConfig = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  NEXT_PUBLIC_POLLING_INTERVAL_MS: Number(process.env.NEXT_PUBLIC_POLLING_INTERVAL_MS) || 4000,
  NEXT_PUBLIC_POLLING_TIMEOUT_MS: Number(process.env.NEXT_PUBLIC_POLLING_TIMEOUT_MS) || 180000,
};

