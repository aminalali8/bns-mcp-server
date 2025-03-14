import { z } from 'zod';

// Server configuration schema
export const serverConfigSchema = z.object({
  port: z.number().default(3000),
  host: z.string().default('localhost'),
  bunnyshellToken: z.string(),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  cors: z.object({
    enabled: z.boolean().default(true),
    origin: z.string().default('*'),
  }).default({}),
  rateLimit: z.object({
    enabled: z.boolean().default(true),
    maxRequests: z.number().default(100),
    windowMs: z.number().default(15 * 60 * 1000), // 15 minutes
  }).default({}),
});

// Default configuration
export const defaultConfig = {
  port: 3000,
  host: 'localhost',
  bunnyshellToken: process.env.BUNNYSHELL_TOKEN || '',
  logLevel: 'info' as const,
  cors: {
    enabled: true,
    origin: '*',
  },
  rateLimit: {
    enabled: true,
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
};

// Bunnyshell API configuration
export const bunnyshellConfig = {
  baseUrl: 'https://api.bunnyshell.com/v1',
  timeout: 5000,
  retries: 3,
  retryDelay: 1000,
}; 