import { z } from 'zod';
import { BunnyshellClient } from '../helpers/bunnyshell.js';
export declare const ListProjectsToolSchema: z.ZodObject<{
    name: z.ZodLiteral<"list_projects">;
    description: z.ZodLiteral<"List all Bunnyshell projects">;
}, "strip", z.ZodTypeAny, {
    name: "list_projects";
    description: "List all Bunnyshell projects";
}, {
    name: "list_projects";
    description: "List all Bunnyshell projects";
}>;
export declare const GetProjectToolSchema: z.ZodObject<{
    name: z.ZodLiteral<"get_project">;
    description: z.ZodLiteral<"Get details of a specific Bunnyshell project">;
    parameters: z.ZodObject<{
        projectId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        projectId: string;
    }, {
        projectId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    name: "get_project";
    description: "Get details of a specific Bunnyshell project";
    parameters: {
        projectId: string;
    };
}, {
    name: "get_project";
    description: "Get details of a specific Bunnyshell project";
    parameters: {
        projectId: string;
    };
}>;
export declare const CreateProjectToolSchema: z.ZodObject<{
    name: z.ZodLiteral<"create_project">;
    description: z.ZodLiteral<"Create a new Bunnyshell project">;
    parameters: z.ZodObject<{
        name: z.ZodString;
        organization: z.ZodString;
        settings: z.ZodOptional<z.ZodObject<{
            defaultBranch: z.ZodOptional<z.ZodString>;
            autoDeploy: z.ZodOptional<z.ZodBoolean>;
            resourceLimits: z.ZodOptional<z.ZodObject<{
                environments: z.ZodOptional<z.ZodNumber>;
                components: z.ZodOptional<z.ZodNumber>;
                cpu: z.ZodOptional<z.ZodString>;
                memory: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                environments?: number | undefined;
                components?: number | undefined;
                cpu?: string | undefined;
                memory?: string | undefined;
            }, {
                environments?: number | undefined;
                components?: number | undefined;
                cpu?: string | undefined;
                memory?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            defaultBranch?: string | undefined;
            autoDeploy?: boolean | undefined;
            resourceLimits?: {
                environments?: number | undefined;
                components?: number | undefined;
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        }, {
            defaultBranch?: string | undefined;
            autoDeploy?: boolean | undefined;
            resourceLimits?: {
                environments?: number | undefined;
                components?: number | undefined;
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        organization: string;
        settings?: {
            defaultBranch?: string | undefined;
            autoDeploy?: boolean | undefined;
            resourceLimits?: {
                environments?: number | undefined;
                components?: number | undefined;
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        organization: string;
        settings?: {
            defaultBranch?: string | undefined;
            autoDeploy?: boolean | undefined;
            resourceLimits?: {
                environments?: number | undefined;
                components?: number | undefined;
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: "create_project";
    description: "Create a new Bunnyshell project";
    parameters: {
        name: string;
        organization: string;
        settings?: {
            defaultBranch?: string | undefined;
            autoDeploy?: boolean | undefined;
            resourceLimits?: {
                environments?: number | undefined;
                components?: number | undefined;
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
    };
}, {
    name: "create_project";
    description: "Create a new Bunnyshell project";
    parameters: {
        name: string;
        organization: string;
        settings?: {
            defaultBranch?: string | undefined;
            autoDeploy?: boolean | undefined;
            resourceLimits?: {
                environments?: number | undefined;
                components?: number | undefined;
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
    };
}>;
export declare const ListEnvironmentsToolSchema: z.ZodObject<{
    name: z.ZodLiteral<"list_environments">;
    description: z.ZodLiteral<"List all Bunnyshell environments">;
}, "strip", z.ZodTypeAny, {
    name: "list_environments";
    description: "List all Bunnyshell environments";
}, {
    name: "list_environments";
    description: "List all Bunnyshell environments";
}>;
export declare const GetEnvironmentToolSchema: z.ZodObject<{
    name: z.ZodLiteral<"get_environment">;
    description: z.ZodLiteral<"Get details of a specific Bunnyshell environment">;
    parameters: z.ZodObject<{
        environmentId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        environmentId: string;
    }, {
        environmentId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    name: "get_environment";
    description: "Get details of a specific Bunnyshell environment";
    parameters: {
        environmentId: string;
    };
}, {
    name: "get_environment";
    description: "Get details of a specific Bunnyshell environment";
    parameters: {
        environmentId: string;
    };
}>;
export declare const CreateEnvironmentToolSchema: z.ZodObject<{
    name: z.ZodLiteral<"create_environment">;
    description: z.ZodLiteral<"Create a new Bunnyshell environment">;
    parameters: z.ZodObject<{
        name: z.ZodString;
        project: z.ZodString;
        variables: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        settings: z.ZodOptional<z.ZodObject<{
            autoDeploy: z.ZodOptional<z.ZodBoolean>;
            branch: z.ZodOptional<z.ZodString>;
            domain: z.ZodOptional<z.ZodString>;
            ssl: z.ZodOptional<z.ZodBoolean>;
            resources: z.ZodOptional<z.ZodObject<{
                cpu: z.ZodOptional<z.ZodString>;
                memory: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            autoDeploy?: boolean | undefined;
            branch?: string | undefined;
            domain?: string | undefined;
            ssl?: boolean | undefined;
            resources?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        }, {
            autoDeploy?: boolean | undefined;
            branch?: string | undefined;
            domain?: string | undefined;
            ssl?: boolean | undefined;
            resources?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        project: string;
        settings?: {
            autoDeploy?: boolean | undefined;
            branch?: string | undefined;
            domain?: string | undefined;
            ssl?: boolean | undefined;
            resources?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
        variables?: Record<string, string> | undefined;
    }, {
        name: string;
        project: string;
        settings?: {
            autoDeploy?: boolean | undefined;
            branch?: string | undefined;
            domain?: string | undefined;
            ssl?: boolean | undefined;
            resources?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
        variables?: Record<string, string> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: "create_environment";
    description: "Create a new Bunnyshell environment";
    parameters: {
        name: string;
        project: string;
        settings?: {
            autoDeploy?: boolean | undefined;
            branch?: string | undefined;
            domain?: string | undefined;
            ssl?: boolean | undefined;
            resources?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
        variables?: Record<string, string> | undefined;
    };
}, {
    name: "create_environment";
    description: "Create a new Bunnyshell environment";
    parameters: {
        name: string;
        project: string;
        settings?: {
            autoDeploy?: boolean | undefined;
            branch?: string | undefined;
            domain?: string | undefined;
            ssl?: boolean | undefined;
            resources?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
        variables?: Record<string, string> | undefined;
    };
}>;
export declare const ListComponentsToolSchema: z.ZodObject<{
    name: z.ZodLiteral<"list_components">;
    description: z.ZodLiteral<"List all components in a Bunnyshell environment">;
    parameters: z.ZodObject<{
        environmentId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        environmentId: string;
    }, {
        environmentId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    name: "list_components";
    description: "List all components in a Bunnyshell environment";
    parameters: {
        environmentId: string;
    };
}, {
    name: "list_components";
    description: "List all components in a Bunnyshell environment";
    parameters: {
        environmentId: string;
    };
}>;
export declare const GetComponentToolSchema: z.ZodObject<{
    name: z.ZodLiteral<"get_component">;
    description: z.ZodLiteral<"Get details of a specific Bunnyshell component">;
    parameters: z.ZodObject<{
        componentId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        componentId: string;
    }, {
        componentId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    name: "get_component";
    description: "Get details of a specific Bunnyshell component";
    parameters: {
        componentId: string;
    };
}, {
    name: "get_component";
    description: "Get details of a specific Bunnyshell component";
    parameters: {
        componentId: string;
    };
}>;
export declare const CreateComponentToolSchema: z.ZodObject<{
    name: z.ZodLiteral<"create_component">;
    description: z.ZodLiteral<"Create a new Bunnyshell component">;
    parameters: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodString;
        environment: z.ZodString;
        variables: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        settings: z.ZodOptional<z.ZodObject<{
            replicas: z.ZodOptional<z.ZodNumber>;
            resources: z.ZodOptional<z.ZodObject<{
                cpu: z.ZodOptional<z.ZodString>;
                memory: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }>>;
            ports: z.ZodOptional<z.ZodArray<z.ZodObject<{
                containerPort: z.ZodNumber;
                servicePort: z.ZodNumber;
                protocol: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                containerPort: number;
                servicePort: number;
                protocol: string;
            }, {
                containerPort: number;
                servicePort: number;
                protocol: string;
            }>, "many">>;
            healthCheck: z.ZodOptional<z.ZodObject<{
                path: z.ZodString;
                port: z.ZodNumber;
                interval: z.ZodNumber;
                timeout: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                port: number;
                path: string;
                timeout: number;
                interval: number;
            }, {
                port: number;
                path: string;
                timeout: number;
                interval: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            resources?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            replicas?: number | undefined;
            ports?: {
                containerPort: number;
                servicePort: number;
                protocol: string;
            }[] | undefined;
            healthCheck?: {
                port: number;
                path: string;
                timeout: number;
                interval: number;
            } | undefined;
        }, {
            resources?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            replicas?: number | undefined;
            ports?: {
                containerPort: number;
                servicePort: number;
                protocol: string;
            }[] | undefined;
            healthCheck?: {
                port: number;
                path: string;
                timeout: number;
                interval: number;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        name: string;
        environment: string;
        settings?: {
            resources?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            replicas?: number | undefined;
            ports?: {
                containerPort: number;
                servicePort: number;
                protocol: string;
            }[] | undefined;
            healthCheck?: {
                port: number;
                path: string;
                timeout: number;
                interval: number;
            } | undefined;
        } | undefined;
        variables?: Record<string, string> | undefined;
    }, {
        type: string;
        name: string;
        environment: string;
        settings?: {
            resources?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            replicas?: number | undefined;
            ports?: {
                containerPort: number;
                servicePort: number;
                protocol: string;
            }[] | undefined;
            healthCheck?: {
                port: number;
                path: string;
                timeout: number;
                interval: number;
            } | undefined;
        } | undefined;
        variables?: Record<string, string> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: "create_component";
    description: "Create a new Bunnyshell component";
    parameters: {
        type: string;
        name: string;
        environment: string;
        settings?: {
            resources?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            replicas?: number | undefined;
            ports?: {
                containerPort: number;
                servicePort: number;
                protocol: string;
            }[] | undefined;
            healthCheck?: {
                port: number;
                path: string;
                timeout: number;
                interval: number;
            } | undefined;
        } | undefined;
        variables?: Record<string, string> | undefined;
    };
}, {
    name: "create_component";
    description: "Create a new Bunnyshell component";
    parameters: {
        type: string;
        name: string;
        environment: string;
        settings?: {
            resources?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            replicas?: number | undefined;
            ports?: {
                containerPort: number;
                servicePort: number;
                protocol: string;
            }[] | undefined;
            healthCheck?: {
                port: number;
                path: string;
                timeout: number;
                interval: number;
            } | undefined;
        } | undefined;
        variables?: Record<string, string> | undefined;
    };
}>;
export type ListProjectsTool = z.infer<typeof ListProjectsToolSchema>;
export type GetProjectTool = z.infer<typeof GetProjectToolSchema>;
export type CreateProjectTool = z.infer<typeof CreateProjectToolSchema>;
export type ListEnvironmentsTool = z.infer<typeof ListEnvironmentsToolSchema>;
export type GetEnvironmentTool = z.infer<typeof GetEnvironmentToolSchema>;
export type CreateEnvironmentTool = z.infer<typeof CreateEnvironmentToolSchema>;
export type ListComponentsTool = z.infer<typeof ListComponentsToolSchema>;
export type GetComponentTool = z.infer<typeof GetComponentToolSchema>;
export type CreateComponentTool = z.infer<typeof CreateComponentToolSchema>;
export type BunnyshellTool = ListProjectsTool | GetProjectTool | CreateProjectTool | ListEnvironmentsTool | GetEnvironmentTool | CreateEnvironmentTool | ListComponentsTool | GetComponentTool | CreateComponentTool;
export declare class BunnyshellTools {
    private client;
    constructor(client: BunnyshellClient);
    handleTool(tool: BunnyshellTool): Promise<unknown>;
    private handleListProjects;
    private handleGetProject;
    private handleCreateProject;
    private handleListEnvironments;
    private handleGetEnvironment;
    private handleCreateEnvironment;
    private handleListComponents;
    private handleGetComponent;
    private handleCreateComponent;
}
