# Bunnyshell MCP Server

A Model Context Protocol (MCP) server implementation for interfacing with the Bunnyshell platform through its CLI.

## Overview

This project creates an MCP server that enables AI assistants (like Claude) to interact with the Bunnyshell platform using the Bunnyshell CLI (`bns`). The server provides:

- **Resources**: Static and dynamic data about Bunnyshell entities and capabilities
- **Prompts**: Structured templates for common Bunnyshell operations
- **Tools**: Executable functions that interface with the `bns` CLI

## Architecture Plan

### 1. Basic Server Setup

- Initialize TypeScript project with MCP SDK
- Create basic server configuration
- Set up stdio transport for local communication
- Enable resource, prompt, and tool capabilities

### 2. Resources Implementation

#### Static Resources

- `bunnyshell://overview`: General information about Bunnyshell
- `bunnyshell://commands`: List of available `bns` commands
- `bunnyshell://workflows`: Common workflows and best practices

#### Resource Templates

- `bunnyshell://environments/{environmentId}`: Environment details
- `bunnyshell://projects/{projectId}`: Project information
- `bunnyshell://components/{componentId}`: Component details
- `bunnyshell://templates/{templateId}`: Template information

### 3. Prompts Implementation

- **Environment Creation**: Guide for creating new environments
- **Component Deployment**: Steps for deploying components
- **Troubleshooting**: Common issues and resolutions
- **Remote Development**: Guide for remote development setup

### 4. Tools Implementation

#### Organization & Project Management
- `list-organizations`: List all organizations
- `list-projects`: List all projects in an organization
- `create-project`: Create a new project
- `delete-project`: Delete a project

#### Environment Management
- `list-environments`: List environments in a project
- `create-environment`: Create an environment from a template
- `delete-environment`: Delete an environment
- `start-environment`: Start an environment
- `stop-environment`: Stop an environment

#### Component Operations
- `list-components`: List components in an environment
- `deploy-component`: Deploy a component
- `debug-component`: Debug a component
- `ssh-component`: SSH into a component

#### Variable & Secret Management
- `list-variables`: List environment variables
- `create-variable`: Create an environment variable
- `list-secrets`: List secrets
- `create-secret`: Create a secret

#### Remote Development
- `start-remote-dev`: Start remote development
- `port-forward`: Set up port forwarding

## Implementation Phases

### Phase 1: Core Resources
- Set up project structure
- Implement static resources
- Add basic resource templates

### Phase 2: Essential Tools
- Implement high-priority CLI tools
- Create handlers for listing/viewing entities
- Add environment management tools

### Phase 3: Advanced Features
- Add remaining tools
- Implement prompts
- Polish error handling
- Improve documentation

### Phase 4: Testing & Optimization
- Test with Claude and other MCP clients
- Refine user experience
- Optimize performance

## Usage (Future)

1. Install the MCP server
2. Configure Claude Desktop to use the server
3. Start a conversation with Claude and attach the Bunnyshell MCP resource
4. Ask Claude to perform Bunnyshell operations

## Development

### Prerequisites
- Node.js and npm
- Bunnyshell CLI (`bns`) properly configured
- Claude Desktop (for testing)

### Getting Started
```bash
# Clone the repository
git clone https://github.com/your-username/bns-mcp.git
cd bns-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Add to Claude Desktop configuration
# Edit ~/.claude-dev/config.json
```

## License

[MIT License](LICENSE)
