import { z } from 'zod';
import { BunnyshellClient } from './bunnyshell.js';
export declare const CliCommandSchema: z.ZodObject<{
    command: z.ZodString;
    description: z.ZodString;
    options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    command: string;
    description: string;
    options?: Record<string, string> | undefined;
}, {
    command: string;
    description: string;
    options?: Record<string, string> | undefined;
}>;
export type CliCommand = z.infer<typeof CliCommandSchema>;
interface CliConfig {
    bunnyshellClient: BunnyshellClient;
    commands: Array<{
        name: string;
        description: string;
        options?: Record<string, string>;
    }>;
}
export declare class Cli {
    private config;
    constructor(config: CliConfig);
    listEnvironments(): Promise<void>;
    listProjects(): Promise<void>;
    getEnvironment(id: string): Promise<void>;
    getProject(id: string): Promise<void>;
    private parseArgs;
    executeCommand(command: string, options: Record<string, string>): Promise<void>;
    private showHelp;
    start(args: string[]): Promise<void>;
}
export {};
