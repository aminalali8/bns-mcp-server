FROM bunnyshell/cli:latest

# Set working directory
WORKDIR /app

# Install Node.js and npm using Alpine's package manager
RUN apk update && \
    apk add --no-cache nodejs npm && \
    apk add --no-cache procps

# Copy package files
COPY src/package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY src/ ./src/
COPY setup.sh ./

# Make setup script executable
RUN chmod +x setup.sh

# Build TypeScript code
RUN cd src && npm run build

# Expose any required ports (if needed in the future)
# EXPOSE 8080

# Set environment variables
ENV NODE_ENV=production

# Override the bunnyshell/cli ENTRYPOINT to use shell
ENTRYPOINT []

# Create a startup script
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'echo "Starting Bunnyshell MCP Server..."' >> /start.sh && \
    echo 'cd /app' >> /start.sh && \
    echo 'node src/dist/index.js > /app/server.log 2>&1 &' >> /start.sh && \
    echo 'NODE_PID=$!' >> /start.sh && \
    echo 'echo "Node.js server started with PID: $NODE_PID"' >> /start.sh && \
    echo 'echo "To view logs, use: docker exec CONTAINER_NAME cat /app/server.log"' >> /start.sh && \
    echo '# Keep container running' >> /start.sh && \
    echo 'echo "Container will remain running. Use Ctrl+C to stop."' >> /start.sh && \
    echo 'tail -f /dev/null' >> /start.sh && \
    chmod +x /start.sh

# Run the startup script
CMD ["/start.sh"] 