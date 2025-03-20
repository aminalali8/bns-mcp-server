import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { runBnsCommand } from "./utils.js";

/**
 * Sets up all Bunnyshell-related resources for the MCP server
 */
export function setupResources(server: McpServer): void {
  // Static resources
  setupStaticResources(server);
  
  // Resource templates
  setupResourceTemplates(server);
}

/**
 * Sets up static resources with fixed content
 */
function setupStaticResources(server: McpServer): void {
  // Overview of Bunnyshell
  server.resource(
    "overview",
    "bunnyshell://overview",
    async (uri) => ({
      contents: [{
        uri: uri.href,
        text: `
# Bunnyshell Platform Overview

Bunnyshell is a platform that enables easy environment creation and management for development teams. 
Key features include:

- Environment-as-a-Service (EaaS) 
- Environment management for dev, staging, and production
- Kubernetes-based deployments
- Remote development capabilities
- CI/CD integration

The Bunnyshell CLI (bns) provides command-line access to all Bunnyshell functionality.
        `.trim()
      }]
    })
  );
  
  // Commands reference
  server.resource(
    "commands",
    "bunnyshell://commands",
    async (uri) => ({
      contents: [{
        uri: uri.href,
        text: `
# Bunnyshell CLI Commands

## Resource Commands
- organizations - Manage organizations
- projects - Manage projects
- environments - Manage environments
- components - Manage components
- variables - Manage environment variables
- secrets - Manage secrets
- templates - Manage templates
- k8s-clusters - Manage Kubernetes cluster integrations
- container-registries - Manage container registry integrations
- project-variables - Manage project variables
- variables-groups - Manage grouped environment variables
- events - Track events
- pipeline - Manage pipelines

## Utility Commands
- debug - Debug a component
- git - Git operations
- port-forward - Set up port forwarding
- remote-development - Remote development operations
- ssh - SSH into running containers
        `.trim()
      }]
    })
  );
  
  // Common workflows
  server.resource(
    "workflows",
    "bunnyshell://workflows",
    async (uri) => ({
      contents: [{
        uri: uri.href,
        text: `
# Common Bunnyshell Workflows

## Creating and Managing a New Environment
1. Create a project (if needed)
2. Create an environment from a template
3. Start the environment
4. Deploy components
5. Access the running services

## Remote Development
1. Configure a remote development component
2. Start remote development session
3. Set up port forwarding
4. Connect to the remote container
5. Make and test changes

## CI/CD Pipeline Integration
1. Define pipeline configuration
2. Connect to your Git repository
3. Configure triggers
4. Set up deployment stages
5. Monitor deployment events
        `.trim()
      }]
    })
  );
}

/**
 * Sets up resource templates for dynamic content
 */
function setupResourceTemplates(server: McpServer): void {
  // Environment details
  server.resource(
    "environment-details",
    new ResourceTemplate("bunnyshell://environments/{environmentId}", { 
      list: async () => {
        try {
          const result = await runBnsCommand(["environments", "list"]);
          // Return formatted resources in the expected format
          return {
            resources: [
              {
                uri: "bunnyshell://environments/env-123",
                name: "Sample Environment 1",
                description: "Sample environment for development"
              },
              {
                uri: "bunnyshell://environments/env-456",
                name: "Sample Environment 2",
                description: "Sample environment for testing"
              }
            ]
          };
        } catch (error) {
          console.error("Error fetching environments:", error);
          return { resources: [] };
        }
      }
    }),
    async (uri, params) => {
      const { environmentId } = params;
      // This would normally call the Bunnyshell CLI to get actual data
      // For now, we'll return mock data
      
      // In a real implementation, we would run:
      // const output = await execCommand(`bns environments view ${environmentId} --output json`);
      // const data = JSON.parse(output);
      
      return {
        contents: [{
          uri: uri.href,
          text: `
# Environment: ${environmentId}

Status: Running
Created: 2023-09-15
Project: demo-project

## Components
- web-frontend
- api-backend
- database

## URLs
- https://${environmentId}-web.demo-project.bunnyshell.com
- https://${environmentId}-api.demo-project.bunnyshell.com
          `.trim()
        }]
      };
    }
  );
  
  // Project information
  server.resource(
    "project-details",
    new ResourceTemplate("bunnyshell://projects/{projectId}", { 
      list: async () => {
        try {
          const result = await runBnsCommand(["projects", "list"]);
          // Return formatted resources in the expected format
          return {
            resources: [
              {
                uri: "bunnyshell://projects/proj-123",
                name: "Sample Project 1",
                description: "Main development project"
              },
              {
                uri: "bunnyshell://projects/proj-456",
                name: "Sample Project 2",
                description: "Testing project"
              }
            ]
          };
        } catch (error) {
          console.error("Error fetching projects:", error);
          return { resources: [] };
        }
      }
    }),
    async (uri, params) => {
      const { projectId } = params;
      // This would normally call the Bunnyshell CLI to get actual data
      return {
        contents: [{
          uri: uri.href,
          text: `
# Project: ${projectId}

Organization: demo-org
Created: 2023-08-01

## Environments
- dev
- staging
- production

## Variables
- 5 environment variables
- 3 secrets
          `.trim()
        }]
      };
    }
  );
  
  // Component details
  server.resource(
    "component-details",
    new ResourceTemplate("bunnyshell://components/{componentId}", { 
      list: async () => {
        try {
          const result = await runBnsCommand(["components", "list"]);
          // Return formatted resources in the expected format
          return {
            resources: [
              {
                uri: "bunnyshell://components/comp-123",
                name: "Sample Component 1",
                description: "Frontend component"
              },
              {
                uri: "bunnyshell://components/comp-456",
                name: "Sample Component 2",
                description: "Backend component"
              }
            ]
          };
        } catch (error) {
          console.error("Error fetching components:", error);
          return { resources: [] };
        }
      }
    }),
    async (uri, params) => {
      const { componentId } = params;
      return {
        contents: [{
          uri: uri.href,
          text: `
# Component: ${componentId}

Type: Service
Environment: demo-env
Status: Running
Image: nginx:latest

## Endpoints
- http://localhost:8080 -> 80/TCP

## Resources
- CPU: 0.5
- Memory: 512Mi
- Storage: 1Gi
          `.trim()
        }]
      };
    }
  );
  
  // Template information
  server.resource(
    "template-details",
    new ResourceTemplate("bunnyshell://templates/{templateId}", { 
      list: async () => {
        try {
          const result = await runBnsCommand(["templates", "list"]);
          // Return formatted resources in the expected format
          return {
            resources: [
              {
                uri: "bunnyshell://templates/tmpl-123",
                name: "Sample Template 1",
                description: "MERN stack template"
              },
              {
                uri: "bunnyshell://templates/tmpl-456",
                name: "Sample Template 2",
                description: "LAMP stack template"
              }
            ]
          };
        } catch (error) {
          console.error("Error fetching templates:", error);
          return { resources: [] };
        }
      }
    }),
    async (uri, params) => {
      const { templateId } = params;
      return {
        contents: [{
          uri: uri.href,
          text: `
# Template: ${templateId}

Type: Application
Visibility: Public
Created: 2023-07-10

## Components
- frontend
- backend
- database

## Technology Stack
- Node.js
- PostgreSQL
- Docker
          `.trim()
        }]
      };
    }
  );
} 