import { BunnyshellTools } from './bunnyshell.js';
export declare const tools: (import("zod").ZodObject<{
    name: import("zod").ZodLiteral<"list_projects">;
    description: import("zod").ZodLiteral<"List all Bunnyshell projects">;
}, "strip", import("zod").ZodTypeAny, {
    name: "list_projects";
    description: "List all Bunnyshell projects";
}, {
    name: "list_projects";
    description: "List all Bunnyshell projects";
}> | import("zod").ZodObject<{
    name: import("zod").ZodLiteral<"get_project">;
    description: import("zod").ZodLiteral<"Get details of a specific Bunnyshell project">;
    parameters: import("zod").ZodObject<{
        projectId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        projectId: string;
    }, {
        projectId: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
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
}> | import("zod").ZodObject<{
    name: import("zod").ZodLiteral<"create_project">;
    description: import("zod").ZodLiteral<"Create a new Bunnyshell project">;
    parameters: import("zod").ZodObject<{
        name: import("zod").ZodString;
        organization: import("zod").ZodString;
        settings: import("zod").ZodOptional<import("zod").ZodObject<{
            defaultBranch: import("zod").ZodOptional<import("zod").ZodString>;
            autoDeploy: import("zod").ZodOptional<import("zod").ZodBoolean>;
            resourceLimits: import("zod").ZodOptional<import("zod").ZodObject<{
                environments: import("zod").ZodOptional<import("zod").ZodNumber>;
                components: import("zod").ZodOptional<import("zod").ZodNumber>;
                cpu: import("zod").ZodOptional<import("zod").ZodString>;
                memory: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
}, "strip", import("zod").ZodTypeAny, {
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
}> | import("zod").ZodObject<{
    name: import("zod").ZodLiteral<"list_environments">;
    description: import("zod").ZodLiteral<"List all Bunnyshell environments">;
}, "strip", import("zod").ZodTypeAny, {
    name: "list_environments";
    description: "List all Bunnyshell environments";
}, {
    name: "list_environments";
    description: "List all Bunnyshell environments";
}> | import("zod").ZodObject<{
    name: import("zod").ZodLiteral<"get_environment">;
    description: import("zod").ZodLiteral<"Get details of a specific Bunnyshell environment">;
    parameters: import("zod").ZodObject<{
        environmentId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        environmentId: string;
    }, {
        environmentId: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
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
}> | import("zod").ZodObject<{
    name: import("zod").ZodLiteral<"create_environment">;
    description: import("zod").ZodLiteral<"Create a new Bunnyshell environment">;
    parameters: import("zod").ZodObject<{
        name: import("zod").ZodString;
        project: import("zod").ZodString;
        variables: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
        settings: import("zod").ZodOptional<import("zod").ZodObject<{
            autoDeploy: import("zod").ZodOptional<import("zod").ZodBoolean>;
            branch: import("zod").ZodOptional<import("zod").ZodString>;
            domain: import("zod").ZodOptional<import("zod").ZodString>;
            ssl: import("zod").ZodOptional<import("zod").ZodBoolean>;
            resources: import("zod").ZodOptional<import("zod").ZodObject<{
                cpu: import("zod").ZodOptional<import("zod").ZodString>;
                memory: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }>>;
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
}, "strip", import("zod").ZodTypeAny, {
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
}> | import("zod").ZodObject<{
    name: import("zod").ZodLiteral<"list_components">;
    description: import("zod").ZodLiteral<"List all components in a Bunnyshell environment">;
    parameters: import("zod").ZodObject<{
        environmentId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        environmentId: string;
    }, {
        environmentId: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
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
}> | import("zod").ZodObject<{
    name: import("zod").ZodLiteral<"get_component">;
    description: import("zod").ZodLiteral<"Get details of a specific Bunnyshell component">;
    parameters: import("zod").ZodObject<{
        componentId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        componentId: string;
    }, {
        componentId: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
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
}> | import("zod").ZodObject<{
    name: import("zod").ZodLiteral<"create_component">;
    description: import("zod").ZodLiteral<"Create a new Bunnyshell component">;
    parameters: import("zod").ZodObject<{
        name: import("zod").ZodString;
        type: import("zod").ZodString;
        environment: import("zod").ZodString;
        variables: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
        settings: import("zod").ZodOptional<import("zod").ZodObject<{
            replicas: import("zod").ZodOptional<import("zod").ZodNumber>;
            resources: import("zod").ZodOptional<import("zod").ZodObject<{
                cpu: import("zod").ZodOptional<import("zod").ZodString>;
                memory: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }>>;
            ports: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                containerPort: import("zod").ZodNumber;
                servicePort: import("zod").ZodNumber;
                protocol: import("zod").ZodString;
            }, "strip", import("zod").ZodTypeAny, {
                containerPort: number;
                servicePort: number;
                protocol: string;
            }, {
                containerPort: number;
                servicePort: number;
                protocol: string;
            }>, "many">>;
            healthCheck: import("zod").ZodOptional<import("zod").ZodObject<{
                path: import("zod").ZodString;
                port: import("zod").ZodNumber;
                interval: import("zod").ZodNumber;
                timeout: import("zod").ZodNumber;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
}, "strip", import("zod").ZodTypeAny, {
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
}>)[];
export { BunnyshellTools };
