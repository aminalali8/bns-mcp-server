import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// Import our modules
import { setupResources } from "./resources.js";
import { setupPrompts } from "./prompts.js";
import { setupTools } from "./tools.js";
// Create an MCP server for Bunnyshell
const server = new McpServer({
    name: "BunnyshellMCP",
    version: "1.0.0"
});
// Setup all capabilities
setupResources(server);
setupPrompts(server);
setupTools(server);
// Log server startup
console.log("Bunnyshell MCP Server starting...");
// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
console.log("Bunnyshell MCP Server connected");
// Prevent the Node.js process from exiting
process.stdin.resume();
// Handle termination signals gracefully
process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down...');
    process.exit(0);
});
process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down...');
    process.exit(0);
});
// Log to show the server is ready and listening
console.log("Bunnyshell MCP Server is running and waiting for connections...");
