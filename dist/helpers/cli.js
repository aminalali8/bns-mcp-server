import { z } from 'zod';
// CLI command schema
export const CliCommandSchema = z.object({
    command: z.string(),
    description: z.string(),
    options: z.record(z.string()).optional(),
});
// CLI class for handling command-line interactions
export class Cli {
    constructor(config) {
        this.config = config;
    }
    async listEnvironments() {
        try {
            const response = await this.config.bunnyshellClient.listEnvironments();
            if (!response.data?.items) {
                console.error('No data received from API');
                return;
            }
            console.log('\nEnvironments:');
            response.data.items.forEach((env) => {
                console.log(`- ${env.name} (${env.id})`);
            });
            console.log(`\nTotal: ${response.data.items.length}`);
        }
        catch (error) {
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
            response.data.items.forEach((project) => {
                console.log(`- ${project.name} (${project.id})`);
            });
            console.log(`\nTotal: ${response.data.items.length}`);
        }
        catch (error) {
            console.error('Error listing projects:', error);
        }
    }
    async getEnvironment(id) {
        try {
            const response = await this.config.bunnyshellClient.getEnvironment(id);
            if (!response.data) {
                console.error('No data received from API');
                return;
            }
            console.log('\nEnvironment Details:');
            console.log(JSON.stringify(response.data, null, 2));
        }
        catch (error) {
            console.error('Error getting environment:', error);
        }
    }
    async getProject(id) {
        try {
            const response = await this.config.bunnyshellClient.getProject(id);
            if (!response.data) {
                console.error('No data received from API');
                return;
            }
            console.log('\nProject Details:');
            console.log(JSON.stringify(response.data, null, 2));
        }
        catch (error) {
            console.error('Error getting project:', error);
        }
    }
    // Parse command line arguments
    parseArgs(args) {
        const command = args[0] || '';
        const options = {};
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
    async executeCommand(command, options) {
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
        }
        catch (error) {
            console.error(`Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    // Show help information
    showHelp() {
        console.log('\nAvailable Commands:');
        this.config.commands.forEach((c) => {
            console.log(`  ${c.name}: ${c.description}`);
        });
        console.log();
    }
    // Start the CLI
    async start(args) {
        const { command, options } = this.parseArgs(args);
        await this.executeCommand(command, options);
    }
}
//# sourceMappingURL=cli.js.map