import { z } from 'zod';
import { BunnyshellClient } from './bunnyshell';
import { Environment, Project } from '../types/bunnyshell';

// CLI command schema
export const CliCommandSchema = z.object({
  command: z.string(),
  description: z.string(),
  options: z.record(z.string()).optional(),
});

export type CliCommand = z.infer<typeof CliCommandSchema>;

// CLI configuration
export interface CliConfig {
  bunnyshellClient: BunnyshellClient;
  commands: CliCommand[];
}

// CLI class for handling command-line interactions
export class Cli {
  private config: CliConfig;

  constructor(config: CliConfig) {
    this.config = config;
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
    const cmd = this.config.commands.find(c => c.command === command);
    
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
          await this.handleEnvironments(options);
          break;
        case 'projects':
          await this.handleProjects(options);
          break;
        case 'environment':
          await this.handleEnvironment(options);
          break;
        case 'project':
          await this.handleProject(options);
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
    console.log('\nAvailable commands:');
    this.config.commands.forEach(cmd => {
      console.log(`  ${cmd.command.padEnd(15)} - ${cmd.description}`);
      if (cmd.options) {
        console.log('    Options:');
        Object.entries(cmd.options).forEach(([key, desc]) => {
          console.log(`      --${key}: ${desc}`);
        });
      }
    });
    console.log();
  }

  // Handle environments command
  private async handleEnvironments(options: Record<string, string>): Promise<void> {
    const page = options.page ? parseInt(options.page) : undefined;
    const perPage = options.perPage ? parseInt(options.perPage) : undefined;

    const response = await this.config.bunnyshellClient.listEnvironments({ page, perPage });
    if (response.success && response.data) {
      console.log('\nEnvironments:');
      response.data.environments.forEach(env => {
        console.log(`  ${env.name} (${env.id})`);
        console.log(`    Status: ${env.status}`);
        console.log(`    Project: ${env.project}`);
        console.log(`    Created: ${new Date(env.createdAt).toLocaleString()}`);
        console.log();
      });
      console.log(`Total: ${response.data.total}`);
    } else {
      console.error('Failed to list environments:', response.error);
    }
  }

  // Handle projects command
  private async handleProjects(options: Record<string, string>): Promise<void> {
    const page = options.page ? parseInt(options.page) : undefined;
    const perPage = options.perPage ? parseInt(options.perPage) : undefined;

    const response = await this.config.bunnyshellClient.listProjects({ page, perPage });
    if (response.success && response.data) {
      console.log('\nProjects:');
      response.data.projects.forEach(project => {
        console.log(`  ${project.name} (${project.id})`);
        console.log(`    Organization: ${project.organization}`);
        console.log(`    Created: ${new Date(project.createdAt).toLocaleString()}`);
        console.log();
      });
      console.log(`Total: ${response.data.total}`);
    } else {
      console.error('Failed to list projects:', response.error);
    }
  }

  // Handle single environment command
  private async handleEnvironment(options: Record<string, string>): Promise<void> {
    const id = options.id;
    if (!id) {
      console.error('Environment ID is required. Use --id=<environment-id>');
      return;
    }

    const response = await this.config.bunnyshellClient.getEnvironment(id);
    if (response.success && response.data) {
      const env = response.data;
      console.log('\nEnvironment Details:');
      console.log(`  Name: ${env.name}`);
      console.log(`  ID: ${env.id}`);
      console.log(`  Status: ${env.status}`);
      console.log(`  Project: ${env.project}`);
      console.log(`  Created: ${new Date(env.createdAt).toLocaleString()}`);
      console.log(`  Updated: ${new Date(env.updatedAt).toLocaleString()}`);
    } else {
      console.error('Failed to get environment:', response.error);
    }
  }

  // Handle single project command
  private async handleProject(options: Record<string, string>): Promise<void> {
    const id = options.id;
    if (!id) {
      console.error('Project ID is required. Use --id=<project-id>');
      return;
    }

    const response = await this.config.bunnyshellClient.getProject(id);
    if (response.success && response.data) {
      const project = response.data;
      console.log('\nProject Details:');
      console.log(`  Name: ${project.name}`);
      console.log(`  ID: ${project.id}`);
      console.log(`  Organization: ${project.organization}`);
      console.log(`  Created: ${new Date(project.createdAt).toLocaleString()}`);
      console.log(`  Updated: ${new Date(project.updatedAt).toLocaleString()}`);
    } else {
      console.error('Failed to get project:', response.error);
    }
  }

  // Start the CLI
  async start(args: string[]): Promise<void> {
    const { command, options } = this.parseArgs(args);
    await this.executeCommand(command, options);
  }
} 