/**
 * Sets up all Bunnyshell-related prompts for the MCP server
 */
export function setupPrompts(server) {
    // Environment creation prompt
    server.prompt("create-environment", "Guide for creating a new environment in Bunnyshell", async (extra) => {
        // Simpler prompt without parameters
        return {
            description: "Create a new Bunnyshell environment",
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: `# Creating a New Environment

I'll help you create a new environment in Bunnyshell. Please provide the following information:

1. Project ID: The ID of the project to create the environment in
2. Template ID: The ID of the template to use for the environment
3. Environment Name: A name for your new environment
4. Git Branch (optional): The Git branch to use

Once you provide these details, I'll guide you through the environment creation process.`
                    }
                }
            ]
        };
    });
    // Component deployment prompt
    server.prompt("deploy-component", "Guide for deploying a component in a Bunnyshell environment", async (extra) => {
        return {
            description: "Deploy a component",
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: `# Deploying a Component

I'll help you deploy a component in your Bunnyshell environment. Please provide the following information:

1. Environment ID: The ID of the environment containing the component
2. Component ID: The ID of the component to deploy

Once you provide these details, I'll guide you through the component deployment process.`
                    }
                }
            ]
        };
    });
    // Troubleshooting prompt
    server.prompt("troubleshoot", "Common issues and resolutions for Bunnyshell", async (extra) => {
        return {
            description: "Troubleshoot Bunnyshell issues",
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: `# Troubleshooting Bunnyshell Issues

I can help you troubleshoot common Bunnyshell issues. Please specify what type of issue you're experiencing:

1. Deployment issues (component fails to deploy, environment stuck in starting state, etc.)
2. Connection issues (cannot access endpoint, authentication problems, etc.)
3. Performance issues (slow response times, timeouts, etc.)

Once you tell me what type of issue you're having, I'll provide appropriate troubleshooting steps.`
                    }
                }
            ]
        };
    });
    // Remote development setup prompt
    server.prompt("setup-remote-dev", "Guide for setting up remote development with Bunnyshell", async (extra) => {
        return {
            description: "Set up remote development",
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: `# Setting Up Remote Development

I'll help you set up remote development for your Bunnyshell component. Please provide the following information:

1. Environment ID: The ID of the environment
2. Component ID: The ID of the component for remote development

Once you provide these details, I'll guide you through the remote development setup process.`
                    }
                }
            ]
        };
    });
    // Add a custom helper for environment creation workflow
    server.prompt("create-environment-workflow", "Detailed workflow for creating a Bunnyshell environment", async (extra) => {
        return {
            description: "Detailed workflow for creating an environment",
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: `# Detailed Environment Creation Workflow

To create a new environment in Bunnyshell, follow these steps:

## 1. Find your Project ID
\`\`\`
bns projects list
\`\`\`

## 2. Find an appropriate Template ID
\`\`\`
bns templates list
\`\`\`

## 3. Create the environment
\`\`\`
bns environments create --project PROJECT_ID --template TEMPLATE_ID --name "ENVIRONMENT_NAME"
\`\`\`

Optional: Add --branch "BRANCH_NAME" if you want to use a specific Git branch.

## 4. Start the environment
\`\`\`
bns environments start ENVIRONMENT_ID
\`\`\`

## 5. Check the environment status
\`\`\`
bns environments view ENVIRONMENT_ID
\`\`\`

Would you like me to help you execute any of these commands?`
                    }
                }
            ]
        };
    });
    // Add a custom helper for component deployment workflow
    server.prompt("deploy-component-workflow", "Detailed workflow for deploying a component in Bunnyshell", async (extra) => {
        return {
            description: "Detailed workflow for deploying a component",
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: `# Detailed Component Deployment Workflow

To deploy a component in Bunnyshell, follow these steps:

## 1. Find your Environment ID
\`\`\`
bns environments list
\`\`\`

## 2. Find your Component ID
\`\`\`
bns components list --environment ENVIRONMENT_ID
\`\`\`

## 3. Make sure the environment is running
\`\`\`
bns environments start ENVIRONMENT_ID
\`\`\`

## 4. Deploy the component
\`\`\`
bns components deploy COMPONENT_ID
\`\`\`

## 5. Check the deployment status
\`\`\`
bns components view COMPONENT_ID
\`\`\`

## 6. View the logs if needed
\`\`\`
bns components logs COMPONENT_ID
\`\`\`

Would you like me to help you execute any of these commands?`
                    }
                }
            ]
        };
    });
    // Add a custom helper for troubleshooting deployment issues
    server.prompt("troubleshoot-deployment", "Troubleshooting guide for Bunnyshell deployment issues", async (extra) => {
        return {
            description: "Troubleshooting guide for deployment issues",
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: `# Troubleshooting Deployment Issues

## Common Deployment Problems:

1. **Component fails to deploy**
   - Check component logs: \`bns components logs COMPONENT_ID\`
   - Verify container image exists
   - Check resource limits

2. **Environment stuck in starting state**
   - Check event logs: \`bns events list --filter "environment=ENV_ID"\`
   - Verify cluster connectivity
   - Check if quotas are exceeded

3. **Container crashes on startup**
   - View logs immediately after start: \`bns components logs COMPONENT_ID\`
   - Check for missing environment variables
   - Verify config files are properly mounted`
                    }
                }
            ]
        };
    });
    // Add a custom helper for troubleshooting connection issues
    server.prompt("troubleshoot-connection", "Troubleshooting guide for Bunnyshell connection issues", async (extra) => {
        return {
            description: "Troubleshooting guide for connection issues",
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: `# Troubleshooting Connection Issues

## Common Connection Problems:

1. **Cannot access component endpoint**
   - Verify component is running: \`bns components view COMPONENT_ID\`
   - Check if port forwarding is set up correctly
   - Verify network policies allow traffic

2. **Authentication issues with CLI**
   - Verify API token: \`bns configure verify\`
   - Check organization access permissions
   - Try regenerating API token

3. **Cannot connect to remote development environment**
   - Check remote development status: \`bns remote-development status\`
   - Verify SSH keys are properly configured
   - Check network connectivity`
                    }
                }
            ]
        };
    });
    // Add a custom helper for remote development workflow
    server.prompt("remote-dev-workflow", "Detailed workflow for setting up remote development", async (extra) => {
        return {
            description: "Detailed workflow for remote development",
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: `# Setting Up Remote Development

To set up remote development in Bunnyshell, follow these steps:

## 1. Find your Environment ID
\`\`\`
bns environments list
\`\`\`

## 2. Find your Component ID
\`\`\`
bns components list --environment ENVIRONMENT_ID
\`\`\`

## 3. Make sure the environment is running
\`\`\`
bns environments start ENVIRONMENT_ID
\`\`\`

## 4. Start remote development
\`\`\`
bns remote-development start --component COMPONENT_ID
\`\`\`

## 5. Set up port forwarding
\`\`\`
bns port-forward add LOCAL_PORT:REMOTE_PORT --component COMPONENT_ID
\`\`\`

Example: \`bns port-forward add 8080:80 --component COMPONENT_ID\`

## 6. Connect to the container
\`\`\`
bns ssh COMPONENT_ID
\`\`\`

## 7. When done, stop the session
\`\`\`
bns remote-development stop --component COMPONENT_ID
\`\`\`

Would you like me to help you execute any of these commands?`
                    }
                }
            ]
        };
    });
}
