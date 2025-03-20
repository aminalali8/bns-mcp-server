# Bunnyshell MCP Server

A Model Context Protocol (MCP) server implementation for interfacing with the Bunnyshell platform through its CLI.

## Overview

This project creates an MCP server that enables AI assistants (like Claude) to interact with the Bunnyshell platform using the Bunnyshell CLI (`bns`). The server provides a set of tools for managing your Bunnyshell resources through natural language commands.

## Features

- **Organization Management**: List and navigate organizations
- **Project Management**: Create, list, and delete projects
- **Environment Management**: Create, list, start, stop, and delete environments
- **Component Operations**: Deploy, debug, and SSH into components
- **Variable & Secret Management**: Manage environment variables and secrets
- **Remote Development**: Start remote development sessions and set up port forwarding

## Prerequisites

- Node.js 18+ and npm
- Bunnyshell CLI (`bns`) installed and configured
- Claude Desktop
- Docker and Docker Compose (for Docker setup)

## Installation

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/bunnyshell/bns-mcp.git
cd bns-mcp
```

2. Run the setup script:
```bash
./setup.sh
```

### Docker Setup

1. Clone the repository:
```bash
git clone https://github.com/bunnyshell/bns-mcp.git
cd bns-mcp
```

2. Run the Docker setup script:
```bash
./docker-setup.sh
```

## Usage

1. Start or restart Claude Desktop
2. Start a new conversation with Claude
3. Click '+' to add an attachment and select 'Connect to MCP server'
4. Choose 'bunnyshell-mcp' from the list of servers
5. Set your Bunnyshell API token:
```
token: YOUR_API_TOKEN
```

### Example Commands

You can ask Claude to:

- "List my organizations"
- "Create a new project called 'MyProject' in organization ABC123"
- "List all environments in project XYZ789"
- "Start environment ENV123"
- "Deploy component COMP456"
- "Create a variable called 'DATABASE_URL' in environment ENV123"

## Development

### Project Structure

```
.
├── src/
│   ├── tools.ts       # Tool implementations
│   ├── utils.ts       # Utility functions
│   └── index.ts       # Server entry point
├── setup.sh          # Local setup script
├── docker-setup.sh   # Docker setup script
└── README.md         # Documentation
```

### Building

```bash
npm install
npm run build
```

### Running Tests

```bash
npm test
```

## Security

- API tokens are never stored in the code or configuration files
- Tokens can be provided via:
  - Command line options
  - Environment variable (BNS_API_KEY)
  - Session storage (temporary, in-memory only)
- Command logging omits sensitive information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT License](LICENSE)
