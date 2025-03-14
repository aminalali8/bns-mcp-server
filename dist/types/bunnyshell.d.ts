import { z } from 'zod';
export declare class BunnyshellError extends Error {
    code?: string | undefined;
    status?: number | undefined;
    details?: unknown | undefined;
    constructor(message: string, code?: string | undefined, status?: number | undefined, details?: unknown | undefined);
}
export declare class BunnyshellApiError extends BunnyshellError {
    status: number;
    details?: unknown | undefined;
    constructor(message: string, status: number, details?: unknown | undefined);
}
export declare class BunnyshellValidationError extends BunnyshellError {
    constructor(message: string, details?: unknown);
}
export declare const BunnyshellApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodOptional<z.ZodUnknown>;
    error: z.ZodOptional<z.ZodObject<{
        message: z.ZodString;
        code: z.ZodOptional<z.ZodString>;
        details: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code?: string | undefined;
        details?: unknown;
    }, {
        message: string;
        code?: string | undefined;
        details?: unknown;
    }>>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    error?: {
        message: string;
        code?: string | undefined;
        details?: unknown;
    } | undefined;
    data?: unknown;
}, {
    success: boolean;
    error?: {
        message: string;
        code?: string | undefined;
        details?: unknown;
    } | undefined;
    data?: unknown;
}>;
export type BunnyshellApiResponse<T> = z.infer<typeof BunnyshellApiResponseSchema> & {
    data?: T;
};
export interface ListResponse<T> {
    items: T[];
}
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
export interface BunnyshellMockConfig {
    enabled?: boolean;
    delay?: number;
    responses?: Record<string, unknown>;
    errors?: Record<string, Error>;
}
export interface BunnyshellApiConfig {
    baseUrl: string;
    authToken: string;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    logging?: BunnyshellLogConfig;
    mock?: BunnyshellMockConfig;
}
export interface ListEnvironmentsResponse extends ListResponse<Environment> {
}
export interface ListProjectsResponse extends ListResponse<Project> {
}
export interface ListComponentsResponse extends ListResponse<Component> {
}
export interface IBunnyshellClient {
    listProjects(): Promise<BunnyshellApiResponse<ListProjectsResponse>>;
    getProject(id: string): Promise<BunnyshellApiResponse<Project>>;
    createProject(data: CreateProjectRequest): Promise<BunnyshellApiResponse<Project>>;
    updateProject(id: string, data: UpdateProjectRequest): Promise<BunnyshellApiResponse<Project>>;
    deleteProject(id: string): Promise<BunnyshellApiResponse<void>>;
    listEnvironments(): Promise<BunnyshellApiResponse<ListEnvironmentsResponse>>;
    getEnvironment(id: string): Promise<BunnyshellApiResponse<Environment>>;
    createEnvironment(data: CreateEnvironmentRequest): Promise<BunnyshellApiResponse<Environment>>;
    updateEnvironment(id: string, data: UpdateEnvironmentRequest): Promise<BunnyshellApiResponse<Environment>>;
    deleteEnvironment(id: string): Promise<BunnyshellApiResponse<void>>;
    deployEnvironment(id: string): Promise<BunnyshellApiResponse<void>>;
    undeployEnvironment(id: string): Promise<BunnyshellApiResponse<void>>;
    listComponents(environmentId: string): Promise<BunnyshellApiResponse<ListComponentsResponse>>;
    getComponent(id: string): Promise<BunnyshellApiResponse<Component>>;
    createComponent(data: CreateComponentRequest): Promise<BunnyshellApiResponse<Component>>;
    updateComponent(id: string, data: UpdateComponentRequest): Promise<BunnyshellApiResponse<Component>>;
    deleteComponent(id: string): Promise<BunnyshellApiResponse<void>>;
    restartComponent(id: string): Promise<BunnyshellApiResponse<void>>;
    getComponentLogs(id: string, options?: {
        lines?: number;
        follow?: boolean;
    }): Promise<BunnyshellApiResponse<string>>;
}
