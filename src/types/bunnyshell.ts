import { z } from 'zod';

// Error Types
export class BunnyshellError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'BunnyshellError';
  }
}

export class BunnyshellApiError extends BunnyshellError {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message, 'API_ERROR', status, details);
    this.name = 'BunnyshellApiError';
  }
}

export class BunnyshellValidationError extends BunnyshellError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', undefined, details);
    this.name = 'BunnyshellValidationError';
  }
}

// Base API Response Schema
export const BunnyshellApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.object({
    message: z.string(),
    code: z.string().optional(),
    details: z.unknown().optional(),
  }).optional(),
});

export type BunnyshellApiResponse<T> = z.infer<typeof BunnyshellApiResponseSchema> & {
  data?: T;
};

// Response Types
export interface ListResponse<T> {
  items: T[];
}

// Common Types
export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
  totalPages: number;
}

// Component Types
export interface Component {
  id: string;
  name: string;
  type: string;
  status: string;
  environment: string;
  createdAt: string;
  updatedAt: string;
  variables?: Record<string, string>;
  settings?: ComponentSettings;
}

export interface ComponentSettings {
  replicas?: number;
  resources?: {
    cpu?: string;
    memory?: string;
  };
  ports?: Array<{
    containerPort: number;
    servicePort: number;
    protocol: string;
  }>;
  healthCheck?: {
    path: string;
    port: number;
    interval: number;
    timeout: number;
  };
}

export interface CreateComponentRequest {
  name: string;
  type: string;
  environment: string;
  variables?: Record<string, string>;
  settings?: ComponentSettings;
}

export interface UpdateComponentRequest {
  name?: string;
  variables?: Record<string, string>;
  settings?: ComponentSettings;
}

// Environment Types
export interface Environment {
  id: string;
  name: string;
  status: string;
  project: string;
  createdAt: string;
  updatedAt: string;
  variables?: Record<string, string>;
  settings?: EnvironmentSettings;
  components?: Component[];
}

export interface EnvironmentSettings {
  autoDeploy?: boolean;
  branch?: string;
  domain?: string;
  ssl?: boolean;
  resources?: {
    cpu?: string;
    memory?: string;
  };
}

export interface CreateEnvironmentRequest {
  name: string;
  project: string;
  variables?: Record<string, string>;
  settings?: EnvironmentSettings;
}

export interface UpdateEnvironmentRequest {
  name?: string;
  variables?: Record<string, string>;
  settings?: EnvironmentSettings;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  organization: string;
  createdAt: string;
  updatedAt: string;
  settings?: ProjectSettings;
  environments?: Environment[];
}

export interface ProjectSettings {
  defaultBranch?: string;
  autoDeploy?: boolean;
  resourceLimits?: {
    environments?: number;
    components?: number;
    cpu?: string;
    memory?: string;
  };
}

export interface CreateProjectRequest {
  name: string;
  organization: string;
  settings?: ProjectSettings;
}

export interface UpdateProjectRequest {
  name?: string;
  settings?: ProjectSettings;
}

// Logging Types
export interface BunnyshellLogger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}

export interface BunnyshellLogConfig {
  level?: 'debug' | 'info' | 'warn' | 'error';
  logger?: BunnyshellLogger;
  logRequests?: boolean;
  logResponses?: boolean;
  logErrors?: boolean;
}

// Rate Limiting Types
export interface BunnyshellRateLimitConfig {
  maxRequestsPerMinute?: number;
  maxRequestsPerHour?: number;
  maxConcurrentRequests?: number;
  queueSize?: number;
}

// Testing Types
export interface BunnyshellMockConfig {
  enabled?: boolean;
  delay?: number;
  responses?: Record<string, unknown>;
  errors?: Record<string, Error>;
}

// API Client Configuration
export interface BunnyshellApiConfig {
  baseUrl: string;
  authToken: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  logging?: BunnyshellLogConfig;
  rateLimit?: BunnyshellRateLimitConfig;
  mock?: BunnyshellMockConfig;
}

// API Endpoints Response Types
export interface ListEnvironmentsResponse extends ListResponse<Environment> {}
export interface ListProjectsResponse extends ListResponse<Project> {}
export interface ListComponentsResponse extends ListResponse<Component> {}

// API Client Interface
export interface IBunnyshellClient {
  // Project Operations
  listProjects(): Promise<BunnyshellApiResponse<ListProjectsResponse>>;
  getProject(id: string): Promise<BunnyshellApiResponse<Project>>;
  createProject(data: CreateProjectRequest): Promise<BunnyshellApiResponse<Project>>;
  updateProject(id: string, data: UpdateProjectRequest): Promise<BunnyshellApiResponse<Project>>;
  deleteProject(id: string): Promise<BunnyshellApiResponse<void>>;

  // Environment Operations
  listEnvironments(): Promise<BunnyshellApiResponse<ListEnvironmentsResponse>>;
  getEnvironment(id: string): Promise<BunnyshellApiResponse<Environment>>;
  createEnvironment(data: CreateEnvironmentRequest): Promise<BunnyshellApiResponse<Environment>>;
  updateEnvironment(id: string, data: UpdateEnvironmentRequest): Promise<BunnyshellApiResponse<Environment>>;
  deleteEnvironment(id: string): Promise<BunnyshellApiResponse<void>>;
  deployEnvironment(id: string): Promise<BunnyshellApiResponse<void>>;
  undeployEnvironment(id: string): Promise<BunnyshellApiResponse<void>>;

  // Component Operations
  listComponents(environmentId: string): Promise<BunnyshellApiResponse<ListComponentsResponse>>;
  getComponent(id: string): Promise<BunnyshellApiResponse<Component>>;
  createComponent(data: CreateComponentRequest): Promise<BunnyshellApiResponse<Component>>;
  updateComponent(id: string, data: UpdateComponentRequest): Promise<BunnyshellApiResponse<Component>>;
  deleteComponent(id: string): Promise<BunnyshellApiResponse<void>>;
  restartComponent(id: string): Promise<BunnyshellApiResponse<void>>;
  getComponentLogs(id: string, options?: { lines?: number; follow?: boolean }): Promise<BunnyshellApiResponse<string>>;
} 