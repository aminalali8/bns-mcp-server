#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Bunnyshell MCP Server Setup${NC}"
echo "===============================\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js (version 18+) and try again.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
if [ "$(echo "$NODE_VERSION" | cut -d'.' -f1)" -lt 18 ]; then
    echo -e "${RED}Node.js version 18+ is required. Current version: $NODE_VERSION${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed. Please install npm and try again.${NC}"
    exit 1
fi

# Check if bns is installed
if ! command -v bns &> /dev/null; then
    echo -e "${RED}Bunnyshell CLI (bns) is not installed. Please install and configure it first.${NC}"
    echo "Visit: https://www.bunnyshell.com/docs/getting-started/cli"
    exit 1
fi

# Check bns configuration
echo -e "${YELLOW}Checking Bunnyshell CLI configuration...${NC}"
if ! bns configure verify &> /dev/null; then
    echo -e "${RED}Bunnyshell CLI is not properly configured. Please run 'bns configure' first.${NC}"
    exit 1
fi

# Install dependencies
echo -e "\n${YELLOW}Installing dependencies...${NC}"
npm install

# Build the project
echo -e "\n${YELLOW}Building the project...${NC}"
npm run build

# Find Claude Desktop config file
CLAUDE_CONFIG_DIR="$HOME/.claude-dev"
CLAUDE_CONFIG_FILE="$CLAUDE_CONFIG_DIR/config.json"

if [ ! -d "$CLAUDE_CONFIG_DIR" ]; then
    echo -e "\n${YELLOW}Creating Claude Desktop config directory...${NC}"
    mkdir -p "$CLAUDE_CONFIG_DIR"
fi

# Get absolute path to the server
ABSOLUTE_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/dist/index.js"

# Create or update Claude config
if [ ! -f "$CLAUDE_CONFIG_FILE" ]; then
    echo -e "\n${YELLOW}Creating Claude Desktop config file...${NC}"
    cat > "$CLAUDE_CONFIG_FILE" << EOF
{
  "mcpServers": {
    "bunnyshell-mcp": {
      "command": "node",
      "args": ["$ABSOLUTE_PATH"]
    }
  }
}
EOF
else
    echo -e "\n${YELLOW}Claude Desktop config file already exists. Please add the following configuration manually:${NC}"
    echo ""
    echo "{\"mcpServers\": {\"bunnyshell-mcp\": {\"command\": \"node\", \"args\": [\"$ABSOLUTE_PATH\"]}}}"
fi

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "Now you need to:"
echo -e "1. Start or restart Claude Desktop"
echo -e "2. Start a new conversation with Claude"
echo -e "3. Click '+' to add an attachment and select 'Connect to MCP server'"
echo -e "4. Choose 'bunnyshell-mcp' from the list of servers"
echo -e "5. Set your Bunnyshell API token using: token: YOUR_API_TOKEN"
echo -e "6. Start managing your Bunnyshell resources!\n"

echo -e "Example commands you can try:"
echo -e "- List your organizations"
echo -e "- List projects in an organization"
echo -e "- Create a new environment"
echo -e "- Deploy a component\n"

echo -e "For more details, see the ${YELLOW}README.md${NC} file." 