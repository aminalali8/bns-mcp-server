import { z } from 'zod';
import {
  BunnyshellApiConfig,
  BunnyshellApiResponse,
  IBunnyshellClient,
  BunnyshellApiError,
  BunnyshellValidationError,
  Environment,
  Project,
  Component,
  CreateEnvironmentRequest,
  UpdateEnvironmentRequest,
  CreateProjectRequest,
  UpdateProjectRequest,
  CreateComponentRequest,
  UpdateComponentRequest,
  ListEnvironmentsResponse,
  ListProjectsResponse,
  ListComponentsResponse,
  BunnyshellLogConfig,
  BunnyshellMockConfig,
} from '../types/bunnyshell.js';

export class BunnyshellClient implements IBunnyshellClient {
  private config: Required<BunnyshellApiConfig>;

  constructor(config: BunnyshellApiConfig) {
    this.config = {
      timeout: 5000,
      retries: 3,
      retryDelay: 1000,
      logging: {
        level: 'info',
        logRequests: false,
        logResponses: false,
        logErrors: true,
      },
      mock: {
        enabled: false,
        delay: 0,
        responses: {},
        errors: {},
      },
      ...config,
    };
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async fetchWithRetry(
    url: string,
    options: RequestInit,
    retryCount = 0
  ): Promise<Response> {
    try {
      return await this.fetchWithTimeout(url, options);
    } catch (error) {
      if (retryCount < this.config.retries) {
        await this.sleep(this.config.retryDelay * (retryCount + 1));
        return this.fetchWithRetry(url, options, retryCount + 1);
      }
      throw error;
    }
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'X-Auth-Token': this.config.authToken,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<BunnyshellApiResponse<T>> {
    const data = await response.json() as unknown;
    
    if (!response.ok) {
      throw new BunnyshellApiError(
        (data as { message?: string })?.message || 'Unknown error',
        response.status,
        data
      );
    }

    return {
      success: true,
      data: data as T,
    };
  }

  private validateRequest<T>(data: unknown, schema: z.ZodSchema<T>): T {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BunnyshellValidationError('Invalid request data', error.errors);
      }
      throw error;
    }
  }

  // Project Operations
  async listProjects(): Promise<BunnyshellApiResponse<ListProjectsResponse>> {
    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/projects?per_page=1000`,
      { method: 'GET' }
    );

    return this.handleResponse<ListProjectsResponse>(response);
  }

  async getProject(id: string): Promise<BunnyshellApiResponse<Project>> {
    if (!id) {
      throw new BunnyshellValidationError('Project ID is required');
    }

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/projects/${id}`,
      { method: 'GET' }
    );

    return this.handleResponse<Project>(response);
  }

  async createProject(data: CreateProjectRequest): Promise<BunnyshellApiResponse<Project>> {
    this.validateRequest(data, z.object({
      name: z.string().min(1),
      organization: z.string().min(1),
      settings: z.any().optional(),
    }));

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/projects`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );

    return this.handleResponse<Project>(response);
  }

  async updateProject(id: string, data: UpdateProjectRequest): Promise<BunnyshellApiResponse<Project>> {
    if (!id) {
      throw new BunnyshellValidationError('Project ID is required');
    }

    this.validateRequest(data, z.object({
      name: z.string().min(1).optional(),
      settings: z.any().optional(),
    }));

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/projects/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    return this.handleResponse<Project>(response);
  }

  async deleteProject(id: string): Promise<BunnyshellApiResponse<void>> {
    if (!id) {
      throw new BunnyshellValidationError('Project ID is required');
    }

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/projects/${id}`,
      { method: 'DELETE' }
    );

    return this.handleResponse<void>(response);
  }

  // Environment Operations
  async listEnvironments(): Promise<BunnyshellApiResponse<ListEnvironmentsResponse>> {
    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/environments?per_page=1000`,
      { method: 'GET' }
    );

    return this.handleResponse<ListEnvironmentsResponse>(response);
  }

  async getEnvironment(id: string): Promise<BunnyshellApiResponse<Environment>> {
    if (!id) {
      throw new BunnyshellValidationError('Environment ID is required');
    }

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/environments/${id}`,
      { method: 'GET' }
    );

    return this.handleResponse<Environment>(response);
  }

  async createEnvironment(data: CreateEnvironmentRequest): Promise<BunnyshellApiResponse<Environment>> {
    this.validateRequest(data, z.object({
      name: z.string().min(1),
      project: z.string().min(1),
      variables: z.record(z.string()).optional(),
      settings: z.any().optional(),
    }));

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/environments`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );

    return this.handleResponse<Environment>(response);
  }

  async updateEnvironment(id: string, data: UpdateEnvironmentRequest): Promise<BunnyshellApiResponse<Environment>> {
    if (!id) {
      throw new BunnyshellValidationError('Environment ID is required');
    }

    this.validateRequest(data, z.object({
      name: z.string().min(1).optional(),
      variables: z.record(z.string()).optional(),
      settings: z.any().optional(),
    }));

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/environments/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    return this.handleResponse<Environment>(response);
  }

  async deleteEnvironment(id: string): Promise<BunnyshellApiResponse<void>> {
    if (!id) {
      throw new BunnyshellValidationError('Environment ID is required');
    }

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/environments/${id}`,
      { method: 'DELETE' }
    );

    return this.handleResponse<void>(response);
  }

  async deployEnvironment(id: string): Promise<BunnyshellApiResponse<void>> {
    if (!id) {
      throw new BunnyshellValidationError('Environment ID is required');
    }

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/environments/${id}/deploy`,
      { method: 'POST' }
    );

    return this.handleResponse<void>(response);
  }

  async undeployEnvironment(id: string): Promise<BunnyshellApiResponse<void>> {
    if (!id) {
      throw new BunnyshellValidationError('Environment ID is required');
    }

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/environments/${id}/undeploy`,
      { method: 'POST' }
    );

    return this.handleResponse<void>(response);
  }

  // Component Operations
  async listComponents(environmentId: string): Promise<BunnyshellApiResponse<ListComponentsResponse>> {
    if (!environmentId) {
      throw new BunnyshellValidationError('Environment ID is required');
    }

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/environments/${environmentId}/components?per_page=1000`,
      { method: 'GET' }
    );

    return this.handleResponse<ListComponentsResponse>(response);
  }

  async getComponent(id: string): Promise<BunnyshellApiResponse<Component>> {
    if (!id) {
      throw new BunnyshellValidationError('Component ID is required');
    }

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/components/${id}`,
      { method: 'GET' }
    );

    return this.handleResponse<Component>(response);
  }

  async createComponent(data: CreateComponentRequest): Promise<BunnyshellApiResponse<Component>> {
    this.validateRequest(data, z.object({
      name: z.string().min(1),
      type: z.string().min(1),
      environment: z.string().min(1),
      variables: z.record(z.string()).optional(),
      settings: z.any().optional(),
    }));

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/components`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );

    return this.handleResponse<Component>(response);
  }

  async updateComponent(id: string, data: UpdateComponentRequest): Promise<BunnyshellApiResponse<Component>> {
    if (!id) {
      throw new BunnyshellValidationError('Component ID is required');
    }

    this.validateRequest(data, z.object({
      name: z.string().min(1).optional(),
      variables: z.record(z.string()).optional(),
      settings: z.any().optional(),
    }));

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/components/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    return this.handleResponse<Component>(response);
  }

  async deleteComponent(id: string): Promise<BunnyshellApiResponse<void>> {
    if (!id) {
      throw new BunnyshellValidationError('Component ID is required');
    }

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/components/${id}`,
      { method: 'DELETE' }
    );

    return this.handleResponse<void>(response);
  }

  async restartComponent(id: string): Promise<BunnyshellApiResponse<void>> {
    if (!id) {
      throw new BunnyshellValidationError('Component ID is required');
    }

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/components/${id}/restart`,
      { method: 'POST' }
    );

    return this.handleResponse<void>(response);
  }

  async getComponentLogs(id: string, options?: { lines?: number; follow?: boolean }): Promise<BunnyshellApiResponse<string>> {
    if (!id) {
      throw new BunnyshellValidationError('Component ID is required');
    }

    this.validateRequest(options, z.object({
      lines: z.number().positive().optional(),
      follow: z.boolean().optional(),
    }));

    const queryParams = new URLSearchParams();
    if (options?.lines) queryParams.append('lines', options.lines.toString());
    if (options?.follow) queryParams.append('follow', 'true');

    const response = await this.fetchWithRetry(
      `${this.config.baseUrl}/components/${id}/logs?${queryParams}`,
      { method: 'GET' }
    );

    return this.handleResponse<string>(response);
  }
} 