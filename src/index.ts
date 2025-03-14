import 'dotenv/config';
import { McpServer } from '@modelcontextprotocol/sdk';
import { BunnyshellClient } from './helpers/bunnyshell';
import { BunnyshellTools } from './tools';
import { serverConfigSchema, defaultConfig, bunnyshellConfig } from './config';
import { Logger } from './utils/logger';

async function main() {
  const logger = new Logger({
    level: defaultConfig.logLevel,
    format: 'text',
    timestamp: true,
  });

  try {
    // Validate configuration
    const config = serverConfigSchema.parse(defaultConfig);

    if (!config.bunnyshellToken) {
      throw new Error('Bunnyshell token is required. Set BUNNYSHELL_TOKEN environment variable.');
    }

    logger.info('Starting MCP server...');

    // Initialize Bunnyshell client
    const bunnyshellClient = new BunnyshellClient({
      ...bunnyshellConfig,
      authToken: config.bunnyshellToken,
    });

    // Initialize Bunnyshell tools
    const bunnyshellTools = new BunnyshellTools(bunnyshellClient);

    // Create MCP server
    const server = new McpServer({
      port: config.port,
      host: config.host,
      tools: {
        bunnyshell: bunnyshellTools,
      },
      cors: config.cors.enabled ? {
        origin: config.cors.origin,
      } : undefined,
      rateLimit: config.rateLimit.enabled ? {
        max: config.rateLimit.maxRequests,
        windowMs: config.rateLimit.windowMs,
      } : undefined,
    });

    // Start server
    await server.start();

    logger.info('MCP server running at http://%s:%d', config.host, config.port);
    logger.info('Available tools:');
    logger.info('- bunnyshell: Interact with Bunnyshell resources');

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('Shutting down...');
      await server.stop();
      process.exit(0);
    });

    // Handle uncaught errors
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught exception: %s', error.message);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled rejection at %s: %s', promise, reason);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server: %s', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
