import { z } from 'zod';
export declare const serverConfigSchema: z.ZodObject<{
    port: z.ZodDefault<z.ZodNumber>;
    host: z.ZodDefault<z.ZodString>;
    bunnyshellToken: z.ZodOptional<z.ZodString>;
    logLevel: z.ZodDefault<z.ZodEnum<["debug", "info", "warn", "error"]>>;
    cors: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        origin: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        origin: string;
    }, {
        enabled?: boolean | undefined;
        origin?: string | undefined;
    }>>;
    rateLimit: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        maxRequests: z.ZodDefault<z.ZodNumber>;
        windowMs: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        maxRequests: number;
        windowMs: number;
    }, {
        enabled?: boolean | undefined;
        maxRequests?: number | undefined;
        windowMs?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    port: number;
    host: string;
    logLevel: "debug" | "info" | "warn" | "error";
    cors: {
        enabled: boolean;
        origin: string;
    };
    rateLimit: {
        enabled: boolean;
        maxRequests: number;
        windowMs: number;
    };
    bunnyshellToken?: string | undefined;
}, {
    port?: number | undefined;
    host?: string | undefined;
    bunnyshellToken?: string | undefined;
    logLevel?: "debug" | "info" | "warn" | "error" | undefined;
    cors?: {
        enabled?: boolean | undefined;
        origin?: string | undefined;
    } | undefined;
    rateLimit?: {
        enabled?: boolean | undefined;
        maxRequests?: number | undefined;
        windowMs?: number | undefined;
    } | undefined;
}>;
export declare const defaultConfig: {
    port: number;
    host: string;
    bunnyshellToken: string | undefined;
    logLevel: "info";
    cors: {
        enabled: boolean;
        origin: string;
    };
    rateLimit: {
        enabled: boolean;
        maxRequests: number;
        windowMs: number;
    };
};
export declare const bunnyshellConfig: {
    baseUrl: string;
    timeout: number;
    retries: number;
    retryDelay: number;
};
