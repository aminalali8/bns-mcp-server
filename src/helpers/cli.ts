import { z } from 'zod';
import { exec } from 'child_process';
import { BunnyshellClient } from './bunnyshell.js';
import {
  Environment,
  Project,
  ListEnvironmentsResponse,
  ListProjectsResponse,
} from '../types/bunnyshell.js';

// CLI command schema
export const CliCommandSchema = z.object({
  command: z.string(),
  description: z.string(),
  options: z.record(z.string()).optional(),
});

export type CliCommand = z.infer<typeof CliCommandSchema>;

// CLI configuration
interface CliConfig {
  bunnyshellClient: BunnyshellClient;
  commands: Array<{
    name: string;
    description: string;
    options?: Record<string, string>;
  }>;
}

// CLI class for handling command-line interactions
export class Cli {
  constructor(private config: CliConfig) {}

  async listEnvironments() {
    try {
      const response = await this.config.bunnyshellClient.listEnvironments();
      if (!response.data?.items) {
        console.error('No data received from API');
        return;
      }
      console.log('\nEnvironments:');
      response.data.items.forEach((env: Environment) => {
        console.log(`- ${env.name} (${env.id})`);
      });
      console.log(`\nTotal: ${response.data.items.length}`);
    } catch (error) {
      console.error('Error listing environments:', error);
    }
  }

  async listProjects() {
    try {
      const response = await this.config.bunnyshellClient.listProjects();
      if (!response.data?.items) {
        console.error('No data received from API');
        return;
      }
      console.log('\nProjects:');
      response.data.items.forEach((project: Project) => {
        console.log(`- ${project.name} (${project.id})`);
      });
      console.log(`\nTotal: ${response.data.items.length}`);
    } catch (error) {
      console.error('Error listing projects:', error);
    }
  }

  async getEnvironment(id: string) {
    try {
      const response = await this.config.bunnyshellClient.getEnvironment(id);
      if (!response.data) {
        console.error('No data received from API');
        return;
      }
      console.log('\nEnvironment Details:');
      console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Error getting environment:', error);
    }
  }

  async getProject(id: string) {
    try {
      const response = await this.config.bunnyshellClient.getProject(id);
      if (!response.data) {
        console.error('No data received from API');
        return;
      }
      console.log('\nProject Details:');
      console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Error getting project:', error);
    }
  }

  // Parse command line arguments
  private parseArgs(args: string[]): { command: string; options: Record<string, string> } {
    const command = args[0] || '';
    const options: Record<string, string> = {};

    for (let i = 1; i < args.length; i++) {
      const arg = args[i];
      if (arg.startsWith('--')) {
        const [key, value] = arg.slice(2).split('=');
        options[key] = value || 'true';
      }
    }

    return { command, options };
  }

  // Execute a command
  async executeCommand(command: string, options: Record<string, string>): Promise<void> {
    const cmd = this.config.commands.find(c => c.name === command);
    
    if (!cmd) {
      console.error(`Unknown command: ${command}`);
      this.showHelp();
      return;
    }

    try {
      switch (command) {
        case 'help':
          this.showHelp();
          break;
        case 'environments':
          await this.listEnvironments();
          break;
        case 'projects':
          await this.listProjects();
          break;
        case 'environment':
          await this.getEnvironment(options.id);
          break;
        case 'project':
          await this.getProject(options.id);
          break;
        default:
          console.error(`Unimplemented command: ${command}`);
      }
    } catch (error) {
      console.error(`Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Show help information
  private showHelp(): void {
    console.log('\nAvailable Commands:');
    this.config.commands.forEach((c) => {
      console.log(`  ${c.name}: ${c.description}`);
    });
    console.log();
  }

  // Start the CLI
  async start(args: string[]): Promise<void> {
    const { command, options } = this.parseArgs(args);
    await this.executeCommand(command, options);
  }
} 