# Setting Up the Bunnyshell MCP Server

This document explains how to set up and configure the Bunnyshell MCP Server for use with Claude Desktop.

## Prerequisites

1. Node.js (version 18+)
2. Bunnyshell CLI (`bns`) properly configured with your credentials
3. Claude Desktop app installed

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bns-mcp.git
   cd bns-mcp
   ```

2. Install dependencies:
   ```bash
   cd src
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Configuring Claude Desktop

1. Open Claude Desktop app
2. Go to Settings
3. Navigate to the Developer tab
4. Click "Edit Config" to open the configuration file

5. Add the following to your configuration file:
   ```json
   {
     "mcpServers": {
       "bunnyshell-mcp": {
         "command": "node",
         "args": ["/absolute/path/to/your/bns-mcp/src/dist/index.js"]
       }
     }
   }
   ```
   
   Replace `/absolute/path/to/your/bns-mcp/src/dist/index.js` with the actual absolute path to the compiled index.js file.

6. Save the file and restart Claude Desktop

## Usage

1. Start a new conversation with Claude
2. Click on the "+" button next to the message input field to add an attachment
3. Select "Connect to MCP server"
4. Choose "bunnyshell-mcp" from the list of servers

5. Now you can interact with Claude to manage your Bunnyshell resources. Here are some example prompts:

   - "Show me all my Bunnyshell projects"
   - "Create a new environment in project XYZ using template ABC"
   - "List all environments in my current project"
   - "Start environment ENV-123"
   - "Deploy component COMP-456"

## Troubleshooting

### Server Not Appearing in Claude

- Verify the path in the Claude configuration file is correct
- Make sure the server was built successfully (`npm run build`)
- Restart Claude Desktop after making configuration changes

### Permission Issues

- Ensure the Bunnyshell CLI is properly configured with valid credentials
- Run `bns configure verify` to check your authentication status
- Make sure you have the necessary permissions for the operations you're trying to perform

### Connection Issues

- Verify your internet connection
- Check if there are any Bunnyshell service outages
- Ensure your API token hasn't expired

## Advanced Configuration

### Updating Environment Variables

If you need to pass environment variables to the MCP server (such as custom Bunnyshell API credentials), you can add them to the configuration:

```json
{
  "mcpServers": {
    "bunnyshell-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/your/bns-mcp/src/dist/index.js"],
      "env": {
        "BNS_API_TOKEN": "your-token-here",
        "BNS_API_ENDPOINT": "custom-endpoint-if-needed"
      }
    }
  }
}
``` 