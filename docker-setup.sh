#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Bunnyshell MCP Server Docker Setup${NC}"
echo "====================================\n"

echo -e "${YELLOW}This setup uses the official bunnyshell/cli Alpine Linux-based image.${NC}\n"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker and try again.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose and try again.${NC}"
    exit 1
fi

# Ask for Bunnyshell API key if not set
if [ -z "$BNS_API_KEY" ]; then
    read -p "Enter your Bunnyshell API key: " BNS_API_KEY
    if [ -z "$BNS_API_KEY" ]; then
        echo -e "${RED}API key is required.${NC}"
        exit 1
    fi
fi

# Ask for Bunnyshell organization ID if not set
if [ -z "$BNS_ORGANIZATION" ]; then
    read -p "Enter your Bunnyshell organization ID: " BNS_ORGANIZATION
    if [ -z "$BNS_ORGANIZATION" ]; then
        echo -e "${RED}Organization ID is required.${NC}"
        exit 1
    fi
fi

# Create .env file
echo -e "${YELLOW}Creating .env file...${NC}"
cat > .env << EOF
BNS_API_KEY=$BNS_API_KEY
BNS_ORGANIZATION=$BNS_ORGANIZATION
EOF

# Build and start the container
echo -e "${YELLOW}Building and starting the Alpine Linux-based Docker container...${NC}"
docker-compose up -d --build

# Check if container is running
if [ $? -eq 0 ] && [ "$(docker ps -q -f name=bns-mcp-server)" ]; then
    echo -e "\n${GREEN}Container is running successfully!${NC}"
    
    # Set up Claude Desktop config
    CLAUDE_CONFIG_DIR="$HOME/.claude-dev"
    CLAUDE_CONFIG_FILE="$CLAUDE_CONFIG_DIR/config.json"
    
    if [ ! -d "$CLAUDE_CONFIG_DIR" ]; then
        echo -e "\n${YELLOW}Creating Claude Desktop config directory...${NC}"
        mkdir -p "$CLAUDE_CONFIG_DIR"
    fi
    
    if [ ! -f "$CLAUDE_CONFIG_FILE" ]; then
        echo -e "\n${YELLOW}Creating Claude Desktop config file...${NC}"
        cat > "$CLAUDE_CONFIG_FILE" << EOF
{
  "mcpServers": {
    "bunnyshell-mcp": {
      "command": "docker",
      "args": ["exec", "-i", "bns-mcp-server", "node", "src/dist/index.js"]
    }
  }
}
EOF
    else
        echo -e "\n${YELLOW}Claude Desktop config file already exists. Please add the following configuration manually:${NC}"
        echo ""
        echo '{
  "mcpServers": {
    "bunnyshell-mcp": {
      "command": "docker",
      "args": ["exec", "-i", "bns-mcp-server", "node", "src/dist/index.js"]
    }
  }
}'
    fi
    
    echo -e "\n${GREEN}Setup complete!${NC}"
    echo -e "1. Start or restart Claude Desktop"
    echo -e "2. Start a new conversation with Claude"
    echo -e "3. Click '+' to add an attachment and select 'Connect to MCP server'"
    echo -e "4. Choose 'bunnyshell-mcp' from the list of servers"
    echo -e "5. Ask Claude to help you manage your Bunnyshell resources\n"
    
    echo -e "For more details, see the ${YELLOW}DOCKER.md${NC} file."
else
    echo -e "\n${RED}Failed to start container. Check the logs with:${NC} docker-compose logs"
    exit 1
fi 