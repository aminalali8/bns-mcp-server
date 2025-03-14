import { z } from 'zod';
import { BunnyshellClient } from '../helpers/bunnyshell.js';
import {
  Project,
  Environment,
  Component,
  CreateProjectRequest,
  CreateEnvironmentRequest,
  CreateComponentRequest,
  ListEnvironmentsResponse,
  ListProjectsResponse,
  BunnyshellError,
} from '../types/bunnyshell.js';

// Tool Schemas
export const ListProjectsToolSchema = z.object({
  name: z.literal('list_projects'),
  description: z.literal('List all Bunnyshell projects'),
});

export const GetProjectToolSchema = z.object({
  name: z.literal('get_project'),
  description: z.literal('Get details of a specific Bunnyshell project'),
  parameters: z.object({
    projectId: z.string().describe('The ID of the project to get'),
  }),
});

export const CreateProjectToolSchema = z.object({
  name: z.literal('create_project'),
  description: z.literal('Create a new Bunnyshell project'),
  parameters: z.object({
    name: z.string().describe('Name of the project'),
    organization: z.string().describe('Organization ID'),
    settings: z.object({
      defaultBranch: z.string().optional(),
      autoDeploy: z.boolean().optional(),
      resourceLimits: z.object({
        environments: z.number().optional(),
        components: z.number().optional(),
        cpu: z.string().optional(),
        memory: z.string().optional(),
      }).optional(),
    }).optional(),
  }),
});

export const ListEnvironmentsToolSchema = z.object({
  name: z.literal('list_environments'),
  description: z.literal('List all Bunnyshell environments'),
});

export const GetEnvironmentToolSchema = z.object({
  name: z.literal('get_environment'),
  description: z.literal('Get details of a specific Bunnyshell environment'),
  parameters: z.object({
    environmentId: z.string().describe('The ID of the environment to get'),
  }),
});

export const CreateEnvironmentToolSchema = z.object({
  name: z.literal('create_environment'),
  description: z.literal('Create a new Bunnyshell environment'),
  parameters: z.object({
    name: z.string().describe('Name of the environment'),
    project: z.string().describe('Project ID'),
    variables: z.record(z.string()).optional(),
    settings: z.object({
      autoDeploy: z.boolean().optional(),
      branch: z.string().optional(),
      domain: z.string().optional(),
      ssl: z.boolean().optional(),
      resources: z.object({
        cpu: z.string().optional(),
        memory: z.string().optional(),
      }).optional(),
    }).optional(),
  }),
});

export const ListComponentsToolSchema = z.object({
  name: z.literal('list_components'),
  description: z.literal('List all components in a Bunnyshell environment'),
  parameters: z.object({
    environmentId: z.string().describe('The ID of the environment to list components from'),
  }),
});

export const GetComponentToolSchema = z.object({
  name: z.literal('get_component'),
  description: z.literal('Get details of a specific Bunnyshell component'),
  parameters: z.object({
    componentId: z.string().describe('The ID of the component to get'),
  }),
});

export const CreateComponentToolSchema = z.object({
  name: z.literal('create_component'),
  description: z.literal('Create a new Bunnyshell component'),
  parameters: z.object({
    name: z.string().describe('Name of the component'),
    type: z.string().describe('Type of the component'),
    environment: z.string().describe('Environment ID'),
    variables: z.record(z.string()).optional(),
    settings: z.object({
      replicas: z.number().optional(),
      resources: z.object({
        cpu: z.string().optional(),
        memory: z.string().optional(),
      }).optional(),
      ports: z.array(z.object({
        containerPort: z.number(),
        servicePort: z.number(),
        protocol: z.string(),
      })).optional(),
      healthCheck: z.object({
        path: z.string(),
        port: z.number(),
        interval: z.number(),
        timeout: z.number(),
      }).optional(),
    }).optional(),
  }),
});

// Tool Types
export type ListProjectsTool = z.infer<typeof ListProjectsToolSchema>;
export type GetProjectTool = z.infer<typeof GetProjectToolSchema>;
export type CreateProjectTool = z.infer<typeof CreateProjectToolSchema>;
export type ListEnvironmentsTool = z.infer<typeof ListEnvironmentsToolSchema>;
export type GetEnvironmentTool = z.infer<typeof GetEnvironmentToolSchema>;
export type CreateEnvironmentTool = z.infer<typeof CreateEnvironmentToolSchema>;
export type ListComponentsTool = z.infer<typeof ListComponentsToolSchema>;
export type GetComponentTool = z.infer<typeof GetComponentToolSchema>;
export type CreateComponentTool = z.infer<typeof CreateComponentToolSchema>;

export type BunnyshellTool =
  | ListProjectsTool
  | GetProjectTool
  | CreateProjectTool
  | ListEnvironmentsTool
  | GetEnvironmentTool
  | CreateEnvironmentTool
  | ListComponentsTool
  | GetComponentTool
  | CreateComponentTool;

// Tool Handlers
export class BunnyshellTools {
  private client: BunnyshellClient;

  constructor(client: BunnyshellClient) {
    this.client = client;
  }

  async handleTool(tool: BunnyshellTool): Promise<unknown> {
    switch (tool.name) {
      case 'list_projects':
        return this.handleListProjects();
      case 'get_project':
        return this.handleGetProject(tool.parameters.projectId);
      case 'create_project':
        return this.handleCreateProject(tool.parameters);
      case 'list_environments':
        return this.handleListEnvironments();
      case 'get_environment':
        return this.handleGetEnvironment(tool.parameters.environmentId);
      case 'create_environment':
        return this.handleCreateEnvironment(tool.parameters);
      case 'list_components':
        return this.handleListComponents(tool.parameters.environmentId);
      case 'get_component':
        return this.handleGetComponent(tool.parameters.componentId);
      case 'create_component':
        return this.handleCreateComponent(tool.parameters);
      default:
        throw new Error(`Unknown tool: ${(tool as any).name}`);
    }
  }

  private async handleListProjects(): Promise<Project[]> {
    const response = await this.client.listProjects();
    return response.data?.items || [];
  }

  private async handleGetProject(projectId: string): Promise<Project> {
    const response = await this.client.getProject(projectId);
    return response.data!;
  }

  private async handleCreateProject(data: CreateProjectRequest): Promise<Project> {
    const response = await this.client.createProject(data);
    return response.data!;
  }

  private async handleListEnvironments(): Promise<Environment[]> {
    const response = await this.client.listEnvironments();
    return response.data?.items || [];
  }

  private async handleGetEnvironment(environmentId: string): Promise<Environment> {
    const response = await this.client.getEnvironment(environmentId);
    return response.data!;
  }

  private async handleCreateEnvironment(data: CreateEnvironmentRequest): Promise<Environment> {
    const response = await this.client.createEnvironment(data);
    return response.data!;
  }

  private async handleListComponents(environmentId: string): Promise<Component[]> {
    const response = await this.client.listComponents(environmentId);
    return response.data?.items || [];
  }

  private async handleGetComponent(componentId: string): Promise<Component> {
    const response = await this.client.getComponent(componentId);
    return response.data!;
  }

  private async handleCreateComponent(data: CreateComponentRequest): Promise<Component> {
    const response = await this.client.createComponent(data);
    return response.data!;
  }
} 