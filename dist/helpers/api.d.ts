import { z } from 'zod';
export declare const ApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodOptional<z.ZodUnknown>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    error?: string | undefined;
    data?: unknown;
}, {
    success: boolean;
    error?: string | undefined;
    data?: unknown;
}>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export interface ApiClientConfig {
    baseUrl: string;
    timeout?: number;
    headers?: Record<string, string>;
}
export declare class ApiClient {
    private config;
    constructor(config: ApiClientConfig);
    private fetchWithTimeout;
    get<T>(endpoint: string): Promise<ApiResponse>;
    post<T>(endpoint: string, body: unknown): Promise<ApiResponse>;
}
