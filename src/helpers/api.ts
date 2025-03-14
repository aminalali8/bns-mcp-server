import { z } from 'zod';

// Base API response type
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

// API client configuration
export interface ApiClientConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// API client class
export class ApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 5000,
      ...config,
    };
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse> {
    try {
      const response = await this.fetchWithTimeout(
        `${this.config.baseUrl}${endpoint}`,
        {
          method: 'GET',
          headers: this.config.headers,
        },
        this.config.timeout!
      );

      const data = await response.json();
      return ApiResponseSchema.parse({
        success: response.ok,
        data: data as T,
        error: response.ok ? undefined : data.message || 'Unknown error',
      });
    } catch (error) {
      return ApiResponseSchema.parse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse> {
    try {
      const response = await this.fetchWithTimeout(
        `${this.config.baseUrl}${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...this.config.headers,
          },
          body: JSON.stringify(body),
        },
        this.config.timeout!
      );

      const data = await response.json();
      return ApiResponseSchema.parse({
        success: response.ok,
        data: data as T,
        error: response.ok ? undefined : data.message || 'Unknown error',
      });
    } catch (error) {
      return ApiResponseSchema.parse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
} 