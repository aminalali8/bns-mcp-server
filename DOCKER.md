# Bunnyshell MCP Server Docker Setup

This document explains how to run the Bunnyshell MCP Server using Docker.

## Overview

The Bunnyshell MCP Server Docker image is based on the official `bunnyshell/cli` Alpine Linux image, which provides a lightweight base with the Bunnyshell CLI pre-installed.

> **Note:** The Dockerfile overrides the default entrypoint of the `bunnyshell/cli` image to allow running Node.js commands directly instead of passing them as arguments to the `bns` CLI.
>
> The server is started in the background and the container is kept alive with a tail process, ensuring the container doesn't exit and the server remains accessible.

## Prerequisites

- Docker and Docker Compose installed on your system
- Bunnyshell API key
- Bunnyshell organization ID

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/bns-mcp.git
   cd bns-mcp
   ```

2. Create a `.env` file with your Bunnyshell credentials:
   ```bash
   echo "BNS_API_KEY=your_api_key_here" > .env
   echo "BNS_ORGANIZATION=your_organization_id_here" >> .env
   ```

3. Build and start the container:
   ```bash
   docker-compose up -d
   ```

## Configuration for Claude Desktop

The MCP server needs to be registered with Claude Desktop to work. There are two ways to configure this:

### Option 1: Configure Claude Desktop directly

1. Open Claude Desktop
2. Go to Settings > MCP Servers
3. Add a new server with these details:
   - Name: `bunnyshell-mcp`
   - Command: `docker`
   - Args: `["exec", "-i", "bns-mcp-server", "node", "src/dist/index.js"]`

### Option 2: Use the volume mount

The Docker configuration includes a volume that maps to Claude Desktop's configuration directory. After running the container at least once, you can:

1. Stop Claude Desktop
2. Edit `~/.claude-dev/config.json` to add:
   ```json
   {
     "mcpServers": {
       "bunnyshell-mcp": {
         "command": "docker",
         "args": ["exec", "-i", "bns-mcp-server", "node", "src/dist/index.js"]
       }
     }
   }
   ```
3. Restart Claude Desktop

## Usage

Once configured:

1. Open Claude Desktop
2. Start a new conversation
3. Click the "+" button to add an attachment
4. Select "Connect to MCP Server"
5. Choose "bunnyshell-mcp" from the list

You should now be able to use all the Bunnyshell capabilities through Claude.

## Container Architecture

The Docker container is set up as follows:

1. The MCP server is started in the background as a child process
2. A `tail -f /dev/null` process runs in the foreground to keep the container alive
3. When Claude needs to communicate with the MCP server, it exec's into the container with a new Node process

This approach ensures the container stays running indefinitely while allowing Claude to interact with the server as needed.

## Accessing Bunnyshell CLI in the Container

Even though the container runs our Node.js server by default, you can still use the Bunnyshell CLI inside the container:

```bash
docker exec -it bns-mcp-server bns --help
```

## Troubleshooting

If you encounter issues:

- Check container logs: `docker logs bns-mcp-server`
- Verify the container is running: `docker ps`
- Ensure your API key has the necessary permissions
- Restart the container: `docker-compose restart`

### Server Process Issues

If you need to debug the MCP server process itself:

```bash
# Check if the Node.js process is running in the container
docker exec bns-mcp-server ps aux | grep node

# Check the server logs directly
docker exec bns-mcp-server tail -f /app/logs/server.log

# Restart the server without restarting the container
docker exec bns-mcp-server pkill node && docker exec -d bns-mcp-server node /app/src/dist/index.js
```

## Advanced Configuration

### Custom Bunnyshell CLI Configuration

To use custom Bunnyshell CLI configuration:

1. Stop the container: `docker-compose down`
2. Create a directory for configuration: `mkdir -p bunnyshell-config`
3. Place your configuration files in this directory
4. Update the docker-compose.yml to mount this directory:
   ```yaml
   volumes:
     - ./bunnyshell-config:/root/.bunnyshell
   ```
5. Restart the container: `docker-compose up -d` 