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

# Check Docker version
DOCKER_VERSION=$(docker --version | cut -d' ' -f3 | cut -d'.' -f1)
if [ "$DOCKER_VERSION" -lt 20 ]; then
    echo -e "${RED}Docker version 20+ is required. Current version: $DOCKER_VERSION${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose and try again.${NC}"
    exit 1
fi

# Create Docker Compose file if it doesn't exist
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${YELLOW}Creating docker-compose.yml...${NC}"
    cat > docker-compose.yml << EOF
version: '3.8'
services:
  bns-mcp-server:
    build: .
    container_name: bns-mcp-server
    volumes:
      - .:/app
    environment:
      - NODE_ENV=production
    restart: unless-stopped
EOF
fi

# Create Dockerfile if it doesn't exist
if [ ! -f "Dockerfile" ]; then
    echo -e "${YELLOW}Creating Dockerfile...${NC}"
    cat > Dockerfile << EOF
FROM node:18-alpine

WORKDIR /app

# Install Bunnyshell CLI
RUN apk add --no-cache curl bash && \
    curl -fsSL https://raw.githubusercontent.com/bunnyshell/cli/main/install.sh | bash

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["node", "dist/index.js"]
EOF
fi

# Optional: Ask for API token
read -p "Would you like to add your Bunnyshell API token to the Docker configuration? (y/n): " ADD_TOKEN
if [[ "$ADD_TOKEN" =~ ^[Yy]$ ]]; then
    read -p "Enter your Bunnyshell API token: " API_TOKEN
    
    if [ ! -z "$API_TOKEN" ]; then
        # Add the token to the docker-compose.yml file
        echo -e "${YELLOW}Adding API token to docker-compose.yml...${NC}"
        sed -i'' -e 's/- NODE_ENV=production/- NODE_ENV=production\n      - BNS_API_KEY='"$API_TOKEN"'/' docker-compose.yml
        echo -e "${GREEN}API token added to docker-compose.yml.${NC}"
    else
        echo -e "${YELLOW}No token provided. You'll need to provide it during conversations with Claude.${NC}"
    fi
fi

# Build and start the container
echo -e "${YELLOW}Building and starting the Docker container...${NC}"
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
    
    # Create or update Claude config with or without token
    if [[ "$ADD_TOKEN" =~ ^[Yy]$ ]] && [ ! -z "$API_TOKEN" ]; then
        if [ ! -f "$CLAUDE_CONFIG_FILE" ]; then
            echo -e "\n${YELLOW}Creating Claude Desktop config file with API token...${NC}"
            cat > "$CLAUDE_CONFIG_FILE" << EOF
{
  "mcpServers": {
    "bunnyshell-mcp": {
      "command": "docker",
      "args": ["exec", "-i", "bns-mcp-server", "node", "dist/index.js"],
      "env": {
        "BNS_API_KEY": "$API_TOKEN"
      }
    }
  }
}
EOF
        else
            echo -e "\n${YELLOW}Claude Desktop config file already exists. Please add the following configuration manually:${NC}"
            echo ""
            echo "{
  \"mcpServers\": {
    \"bunnyshell-mcp\": {
      \"command\": \"docker\",
      \"args\": [\"exec\", \"-i\", \"bns-mcp-server\", \"node\", \"dist/index.js\"],
      \"env\": {
        \"BNS_API_KEY\": \"$API_TOKEN\"
      }
    }
  }
}"
        fi
    else
        if [ ! -f "$CLAUDE_CONFIG_FILE" ]; then
            echo -e "\n${YELLOW}Creating Claude Desktop config file...${NC}"
            cat > "$CLAUDE_CONFIG_FILE" << EOF
{
  "mcpServers": {
    "bunnyshell-mcp": {
      "command": "docker",
      "args": ["exec", "-i", "bns-mcp-server", "node", "dist/index.js"]
    }
  }
}
EOF
        else
            echo -e "\n${YELLOW}Claude Desktop config file already exists. Please add the following configuration manually:${NC}"
            echo ""
            echo "{
  \"mcpServers\": {
    \"bunnyshell-mcp\": {
      \"command\": \"docker\",
      \"args\": [\"exec\", \"-i\", \"bns-mcp-server\", \"node\", \"dist/index.js\"]
    }
  }
}"
        fi
    fi
    
    echo -e "\n${GREEN}Setup complete!${NC}"
    echo -e "Now you need to:"
    echo -e "1. Start or restart Claude Desktop"
    echo -e "2. Start a new conversation with Claude"
    echo -e "3. Click '+' to add an attachment and select 'Connect to MCP server'"
    echo -e "4. Choose 'bunnyshell-mcp' from the list of servers"
    if [[ ! "$ADD_TOKEN" =~ ^[Yy]$ ]] || [ -z "$API_TOKEN" ]; then
        echo -e "5. Set your Bunnyshell API token using: token: YOUR_API_TOKEN"
    fi
    echo -e "6. Start managing your Bunnyshell resources!\n"
    
    echo -e "Example commands you can try:"
    echo -e "- List your organizations"
    echo -e "- List projects in an organization"
    echo -e "- Create a new environment"
    echo -e "- Deploy a component\n"
    
    echo -e "For more details, see the ${YELLOW}README.md${NC} file."
else
    echo -e "\n${RED}Failed to start container. Check the logs with:${NC} docker-compose logs"
    exit 1
fi 