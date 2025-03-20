import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { execBnsCommand, formatOutput, extractTokenFromMessage, setSessionToken } from "./utils.js";

/**
 * Sets up all Bunnyshell-related tools for the MCP server
 */
export function setupTools(server: McpServer): void {
  // Authentication tool
  server.tool(
    "set-token",
    {
      token: z.string().describe("Bunnyshell API token")
    },
    async ({ token }) => {
      // Store token for future use
      setSessionToken(token);
      
      console.log("Token set successfully");
      
      return {
        content: [
          { 
            type: "text", 
            text: "✅ Bunnyshell API token has been set successfully. You can now use other Bunnyshell commands without specifying the token again."
          }
        ]
      };
    }
  );
  
  // Organization Management Tools
  setupOrganizationTools(server);
  
  // Project Management Tools
  setupProjectTools(server);
  
  // Environment Management Tools
  setupEnvironmentTools(server);
  
  // Component Management Tools
  setupComponentTools(server);
  
  // Variable & Secret Management Tools
  setupVariableTools(server);
  
  // Remote Development Tools
  setupRemoteDevTools(server);
}

/**
 * Sets up organization management tools
 */
function setupOrganizationTools(server: McpServer): void {
  // List organizations
  server.tool(
    "list-organizations",
    {
      filter: z.string().optional().describe("Filter expression for organizations"),
      limit: z.number().optional().describe("Maximum number of items to return")
    },
    async ({ filter, limit }) => {
      let command = "organizations list";
      
      // Extract token if provided in filter
      const tokenFromFilter = filter ? extractTokenFromMessage(filter) : undefined;
      
      // If we got a token from the filter, set it as the session token
      if (tokenFromFilter) {
        setSessionToken(tokenFromFilter);
      }
      
      if (limit) {
        command += ` --limit ${limit}`;
      }
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
}

/**
 * Sets up project management tools
 */
function setupProjectTools(server: McpServer): void {
  // List projects
  server.tool(
    "list-projects",
    {
      organization: z.string().optional().describe("Organization ID"),
      filter: z.string().optional().describe("Filter expression"),
      limit: z.number().optional().describe("Maximum number of items to return")
    },
    async ({ organization, filter, limit }) => {
      let command = "projects list";
      
      if (organization) {
        command += ` --organization ${organization}`;
      }
      
      if (filter) {
        command += ` --filter "${filter}"`;
      }
      
      if (limit) {
        command += ` --limit ${limit}`;
      }
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
  
  // Create project
  server.tool(
    "create-project",
    {
      name: z.string().describe("Project name"),
      organization: z.string().describe("Organization ID"),
      description: z.string().optional().describe("Project description")
    },
    async ({ name, organization, description }) => {
      let command = `projects create --name "${name}" --organization ${organization}`;
      
      if (description) {
        command += ` --description "${description}"`;
      }
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
  
  // Delete project
  server.tool(
    "delete-project",
    {
      project: z.string().describe("Project ID to delete")
    },
    async ({ project }) => {
      const command = `projects delete ${project}`;
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
}

/**
 * Sets up environment management tools
 */
function setupEnvironmentTools(server: McpServer): void {
  // List environments
  server.tool(
    "list-environments",
    {
      project: z.string().optional().describe("Project ID"),
      filter: z.string().optional().describe("Filter expression"),
      limit: z.number().optional().describe("Maximum number of items to return")
    },
    async ({ project, filter, limit }) => {
      let command = "environments list";
      
      if (project) {
        command += ` --project ${project}`;
      }
      
      if (filter) {
        command += ` --filter "${filter}"`;
      }
      
      if (limit) {
        command += ` --limit ${limit}`;
      }
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
  
  // Create environment
  server.tool(
    "create-environment",
    {
      name: z.string().describe("Environment name"),
      project: z.string().describe("Project ID"),
      template: z.string().describe("Template ID"),
      branch: z.string().optional().describe("Git branch")
    },
    async ({ name, project, template, branch }) => {
      let command = `environments create --name "${name}" --project ${project} --template ${template}`;
      
      if (branch) {
        command += ` --branch "${branch}"`;
      }
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
  
  // Start environment
  server.tool(
    "start-environment",
    {
      environment: z.string().describe("Environment ID to start")
    },
    async ({ environment }) => {
      const command = `environments start ${environment}`;
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
  
  // Stop environment
  server.tool(
    "stop-environment",
    {
      environment: z.string().describe("Environment ID to stop")
    },
    async ({ environment }) => {
      const command = `environments stop ${environment}`;
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
  
  // Delete environment
  server.tool(
    "delete-environment",
    {
      environment: z.string().describe("Environment ID to delete")
    },
    async ({ environment }) => {
      const command = `environments delete ${environment}`;
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
}

/**
 * Sets up component management tools
 */
function setupComponentTools(server: McpServer): void {
  // List components
  server.tool(
    "list-components",
    {
      environment: z.string().optional().describe("Environment ID"),
      filter: z.string().optional().describe("Filter expression"),
      limit: z.number().optional().describe("Maximum number of items to return")
    },
    async ({ environment, filter, limit }) => {
      let command = "components list";
      
      if (environment) {
        command += ` --environment ${environment}`;
      }
      
      if (filter) {
        command += ` --filter "${filter}"`;
      }
      
      if (limit) {
        command += ` --limit ${limit}`;
      }
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
  
  // Deploy component
  server.tool(
    "deploy-component",
    {
      component: z.string().describe("Component ID to deploy")
    },
    async ({ component }) => {
      const command = `components deploy ${component}`;
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
  
  // Debug component
  server.tool(
    "debug-component",
    {
      component: z.string().describe("Component ID to debug")
    },
    async ({ component }) => {
      const command = `debug component ${component}`;
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
  
  // SSH into component
  server.tool(
    "ssh-component",
    {
      component: z.string().describe("Component ID to SSH into")
    },
    async ({ component }) => {
      // This just returns the command to use since we can't actually SSH in this context
      return {
        content: [
          { 
            type: "text", 
            text: `To SSH into the component, run this command in your terminal:\n\n\`bns ssh ${component}\`\n\nNote: This command can't be executed through the MCP server directly as it requires interactive terminal access.`
          }
        ]
      };
    }
  );
}

/**
 * Sets up variable and secret management tools
 */
function setupVariableTools(server: McpServer): void {
  // List variables
  server.tool(
    "list-variables",
    {
      environment: z.string().optional().describe("Environment ID"),
      filter: z.string().optional().describe("Filter expression"),
      limit: z.number().optional().describe("Maximum number of items to return")
    },
    async ({ environment, filter, limit }) => {
      let command = "variables list";
      
      if (environment) {
        command += ` --environment ${environment}`;
      }
      
      if (filter) {
        command += ` --filter "${filter}"`;
      }
      
      if (limit) {
        command += ` --limit ${limit}`;
      }
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
  
  // Create variable
  server.tool(
    "create-variable",
    {
      name: z.string().describe("Variable name"),
      value: z.string().describe("Variable value"),
      environment: z.string().describe("Environment ID"),
      isSecret: z.boolean().optional().describe("Whether this is a secret"),
      component: z.string().optional().describe("Component ID (if component-specific)")
    },
    async ({ name, value, environment, isSecret, component }) => {
      let command = `variables create --name "${name}" --value "${value}" --environment ${environment}`;
      
      if (isSecret) {
        command += " --secret";
      }
      
      if (component) {
        command += ` --component ${component}`;
      }
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
  
  // List secrets
  server.tool(
    "list-secrets",
    {
      environment: z.string().optional().describe("Environment ID"),
      filter: z.string().optional().describe("Filter expression"),
      limit: z.number().optional().describe("Maximum number of items to return")
    },
    async ({ environment, filter, limit }) => {
      let command = "secrets list";
      
      if (environment) {
        command += ` --environment ${environment}`;
      }
      
      if (filter) {
        command += ` --filter "${filter}"`;
      }
      
      if (limit) {
        command += ` --limit ${limit}`;
      }
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
}

/**
 * Sets up remote development tools
 */
function setupRemoteDevTools(server: McpServer): void {
  // Start remote development
  server.tool(
    "start-remote-dev",
    {
      component: z.string().describe("Component ID to start remote development on")
    },
    async ({ component }) => {
      const command = `remote-development start --component ${component}`;
      
      const { stdout, stderr, needsToken } = await execBnsCommand(command, { token: setSessionToken() });
      
      return {
        content: [
          { 
            type: "text", 
            text: formatOutput(stdout, stderr, command, needsToken)
          }
        ]
      };
    }
  );
  
  // Port forward
  server.tool(
    "port-forward",
    {
      mapping: z.string().describe("Port mapping (e.g., 8080:80)"),
      component: z.string().describe("Component ID")
    },
    async ({ mapping, component }) => {
      // This just returns the command to use since port-forwarding is a long-running process
      return {
        content: [
          { 
            type: "text", 
            text: `To set up port forwarding, run this command in your terminal:\n\n\`bns port-forward add ${mapping} --component ${component}\`\n\nNote: This command can't be executed through the MCP server directly as it's a long-running process.`
          }
        ]
      };
    }
  );
} 