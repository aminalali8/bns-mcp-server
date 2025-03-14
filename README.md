# MCP Server with Bunnyshell Integration

This is a Model Context Protocol (MCP) server that provides tools for interacting with Bunnyshell resources.

## Features

- List, create, and manage Bunnyshell projects
- List, create, and manage Bunnyshell environments
- List, create, and manage Bunnyshell components
- Configurable logging with different levels and formats
- CORS support
- Rate limiting
- Environment variable configuration
- Graceful shutdown handling
- Error handling and logging

## Prerequisites

- Node.js 16 or later
- npm 7 or later
- A Bunnyshell API token

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your configuration:
```env
# Server Configuration
PORT=3000
HOST=localhost
LOG_LEVEL=info

# Bunnyshell Configuration
BUNNYSHELL_TOKEN=your_token_here

# CORS Configuration
CORS_ENABLED=true
CORS_ORIGIN=*

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

## Usage

1. Start the server:
```bash
npm start
```

2. The server will start on the configured host and port (default: http://localhost:3000)

3. Available tools:
   - `bunnyshell`: Interact with Bunnyshell resources
     - List projects
     - Get project details
     - Create projects
     - List environments
     - Get environment details
     - Create environments
     - List components
     - Get component details
     - Create components

## Development

1. Build the project:
```bash
npm run build
```

2. Run tests:
```bash
npm test
```

3. Run in development mode:
```bash
npm run dev
```

## Configuration

The server can be configured using environment variables or the `.env` file:

### Server Configuration
- `PORT`: Server port (default: 3000)
- `HOST`: Server host (default: localhost)
- `LOG_LEVEL`: Logging level (debug, info, warn, error)

### Bunnyshell Configuration
- `BUNNYSHELL_TOKEN`: Your Bunnyshell API token

### CORS Configuration
- `CORS_ENABLED`: Enable/disable CORS (default: true)
- `CORS_ORIGIN`: Allowed origin (default: *)

### Rate Limiting
- `RATE_LIMIT_ENABLED`: Enable/disable rate limiting (default: true)
- `RATE_LIMIT_MAX_REQUESTS`: Maximum requests per window (default: 100)
- `RATE_LIMIT_WINDOW_MS`: Rate limit window in milliseconds (default: 900000)

## Error Handling

The server includes comprehensive error handling:
- Uncaught exceptions
- Unhandled promise rejections
- API errors
- Validation errors
- Configuration errors

All errors are logged with appropriate severity levels and details.

## Logging

The server uses a custom logger with the following features:
- Different log levels (debug, info, warn, error)
- Timestamp support
- JSON and text formatting options
- Configurable output format

## License

MIT 