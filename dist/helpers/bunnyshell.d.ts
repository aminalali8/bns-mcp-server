import { BunnyshellApiConfig, BunnyshellApiResponse, IBunnyshellClient, Environment, Project, Component, CreateEnvironmentRequest, UpdateEnvironmentRequest, CreateProjectRequest, UpdateProjectRequest, CreateComponentRequest, UpdateComponentRequest, ListEnvironmentsResponse, ListProjectsResponse, ListComponentsResponse } from '../types/bunnyshell.js';
export declare class BunnyshellClient implements IBunnyshellClient {
    private config;
    constructor(config: BunnyshellApiConfig);
    private sleep;
    private fetchWithRetry;
    private fetchWithTimeout;
    private handleResponse;
    private validateRequest;
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
