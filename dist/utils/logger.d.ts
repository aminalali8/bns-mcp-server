import { z } from 'zod';
export declare const loggerConfigSchema: z.ZodObject<{
    level: z.ZodDefault<z.ZodEnum<["debug", "info", "warn", "error"]>>;
    format: z.ZodDefault<z.ZodEnum<["json", "text"]>>;
    timestamp: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    level: "debug" | "info" | "warn" | "error";
    format: "json" | "text";
    timestamp: boolean;
}, {
    level?: "debug" | "info" | "warn" | "error" | undefined;
    format?: "json" | "text" | undefined;
    timestamp?: boolean | undefined;
}>;
export type LoggerConfig = z.infer<typeof loggerConfigSchema>;
type LogLevel = 'debug' | 'info' | 'warn' | 'error';
interface LoggerOptions {
    level?: LogLevel;
}
export declare class Logger {
    private config;
    private levels;
    private level;
    constructor(options?: LoggerOptions);
    private shouldLog;
    private formatMessage;
    private log;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
export {};
