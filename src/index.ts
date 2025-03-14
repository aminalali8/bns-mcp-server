import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { config } from 'dotenv';
import { BunnyshellClient } from './bunnyshell-client.js';
import { serverConfigSchema, defaultConfig, bunnyshellConfig } from './config.js';
import { Logger } from './utils/logger.js';

// Load environment variables from .env file
config();

const logger = new Logger({ level: 'info' });

const listProjectsSchema = {};
const getProjectSchema = { projectId: z.string() };

type GetProjectParams = { projectId: string };

const server = new McpServer({
  name: 'mcp-server',
  version: '1.0.0'
});

let bunnyshellClient: BunnyshellClient | null = null;

server.tool('list_projects', 'List all Bunnyshell projects', listProjectsSchema, async () => {
  if (!bunnyshellClient) {
    throw new Error('Bunnyshell client not initialized');
  }
  const result = await bunnyshellClient.listProjects();
  return {
    content: [{
      type: 'text',
      text: JSON.stringify(result.items, null, 2)
    }]
  };
});

server.tool('get_project', 'Get a Bunnyshell project by ID', getProjectSchema, async (params: GetProjectParams) => {
  if (!bunnyshellClient) {
    throw new Error('Bunnyshell client not initialized');
  }
  const result = await bunnyshellClient.getProject(params.projectId);
  return {
    content: [{
      type: 'text',
      text: JSON.stringify(result, null, 2)
    }]
  };
});

async function main() {
  const token = process.env.BUNNYSHELL_TOKEN;
  if (!token) {
    logger.error('BUNNYSHELL_TOKEN environment variable is required. Make sure it is set in your .env file.');
    process.exit(1);
  }

  bunnyshellClient = new BunnyshellClient(token);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  process.on('SIGINT', () => {
    server.close();
    process.exit(0);
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    server.close();
    process.exit(1);
  });
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
