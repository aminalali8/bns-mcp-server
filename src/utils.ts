import { exec as execCallback } from "child_process";
import { promisify } from "util";

const exec = promisify(execCallback);

// Store temporary token if provided during session
let sessionToken: string | undefined = undefined;

/**
 * Result of a command execution
 */
export interface CommandResult {
  success: boolean;
  stdout: string;
  stderr: string;
  needsToken?: boolean;
}

/**
 * Execute a Bunnyshell CLI command
 * 
 * @param command The command to execute (without 'bns' prefix)
 * @param options Additional command options
 * @returns Promise with stdout and stderr
 */
export async function execBnsCommand(
  command: string, 
  options: { json?: boolean; nonInteractive?: boolean; token?: string } = { json: true, nonInteractive: true }
): Promise<{ stdout: string; stderr: string; needsToken?: boolean }> {
  try {
    // Check for token in options, session, or environment
    const tokenFromOptions = options.token;
    const envToken = process.env.BNS_API_KEY;
    const tokenToUse = tokenFromOptions || sessionToken || envToken;
    
    // If no token is available, return a special response
    if (!tokenToUse) {
      console.log("No Bunnyshell API token found");
      return {
        stdout: "",
        stderr: "Bunnyshell API token is required but not provided. Please provide a token.",
        needsToken: true
      };
    }
    
    // If we have a token from options, save it for the session
    if (tokenFromOptions && !sessionToken) {
      sessionToken = tokenFromOptions;
    }
    
    let fullCommand = `bns ${command}`;
    fullCommand += ` --token ${tokenToUse}`;
    
    if (options.json) {
      fullCommand += " --output json";
    }
    
    if (options.nonInteractive) {
      fullCommand += " --non-interactive";
    }
    
    console.log(`Executing: ${fullCommand}`);
    return await exec(fullCommand);
  } catch (error) {
    console.error(`Error executing command: ${error}`);
    // Properly type the error
    const typedError = error as Error;
    return {
      stdout: "",
      stderr: typedError.message || "Unknown error occurred"
    };
  }
}

/**
 * Format command output into a readable text form
 * 
 * @param stdout Standard output from command
 * @param stderr Standard error from command
 * @param command The original command executed
 * @param needsToken Whether a token is required
 * @returns Formatted string for presentation
 */
export function formatOutput(stdout: string, stderr: string, command: string, needsToken?: boolean): string {
  let output = "";
  
  if (needsToken) {
    output += "### Authentication Required\n";
    output += "A Bunnyshell API token is required to execute this command.\n\n";
    output += "Please provide your API token using the format:\n";
    output += "```\ntoken: YOUR_API_TOKEN_HERE\n```\n\n";
    return output;
  }
  
  if (stdout) {
    try {
      // Try to parse and prettify JSON output
      const parsedOutput = JSON.parse(stdout);
      output += `### Command Output\n\`\`\`json\n${JSON.stringify(parsedOutput, null, 2)}\n\`\`\`\n\n`;
    } catch (e) {
      // If it's not valid JSON, just display as is
      output += `### Command Output\n\`\`\`\n${stdout}\n\`\`\`\n\n`;
    }
  }
  
  if (stderr) {
    output += `### Errors\n\`\`\`\n${stderr}\n\`\`\`\n\n`;
  }
  
  if (!stdout && !stderr) {
    output += "No output returned from the command.\n\n";
  }
  
  output += `Command executed: \`bns ${command}\``;
  
  return output;
}

/**
 * Parse JSON response from Bunnyshell CLI
 * 
 * @param stdout Command output
 * @returns Parsed object or null if parsing failed
 */
export function parseJsonResponse<T>(stdout: string): T | null {
  try {
    return JSON.parse(stdout) as T;
  } catch (e) {
    console.error("Failed to parse JSON response:", e);
    return null;
  }
}

/**
 * General error handler function
 * 
 * @param error Error object
 * @returns Error message for display
 */
export function handleError(error: any): string {
  const errorMessage = error?.message || "Unknown error occurred";
  console.error("Error:", errorMessage);
  return `An error occurred: ${errorMessage}`;
}

/**
 * Extract token from user message if present
 * 
 * @param message The user message that might contain a token
 * @returns The extracted token or undefined
 */
export function extractTokenFromMessage(message: string): string | undefined {
  const tokenMatch = message.match(/token:\s*([^\s]+)/i);
  if (tokenMatch && tokenMatch[1]) {
    return tokenMatch[1];
  }
  return undefined;
}

/**
 * Execute a Bunnyshell CLI command
 * 
 * @param args Command arguments
 * @param token Optional API token to use
 * @returns Command result
 */
export async function runBnsCommand(args: string[], token?: string): Promise<CommandResult> {
  // Check for token in parameter, session, or environment
  const providedToken = token || sessionToken || process.env.BNS_API_KEY;
  
  // If no token is available, return a special response
  if (!providedToken) {
    console.log("No Bunnyshell API token found");
    return {
      success: false,
      stdout: "",
      stderr: "Bunnyshell API token is required but not provided. Please provide a token.",
      needsToken: true
    };
  }
  
  // If we have a token parameter, save it for the session
  if (token && !sessionToken) {
    sessionToken = token;
  }
  
  try {
    let command = `bns ${args.join(" ")}`;
    command += ` --token ${providedToken} --non-interactive`;
    
    const { stdout, stderr } = await exec(command);
    return {
      success: true,
      stdout,
      stderr
    };
  } catch (error) {
    // Properly type the error
    const typedError = error as Error;
    return {
      success: false,
      stdout: "",
      stderr: typedError.message || "Unknown error occurred"
    };
  }
}

/**
 * Get or set the session token
 * 
 * @param token Optional token to set
 * @returns The current session token
 */
export function setSessionToken(token?: string): string | undefined {
  if (token !== undefined) {
    sessionToken = token;
  }
  return sessionToken;
} 