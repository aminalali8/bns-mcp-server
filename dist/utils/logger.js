import { z } from 'zod';
// Logger configuration schema
export const loggerConfigSchema = z.object({
    level: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    format: z.enum(['json', 'text']).default('text'),
    timestamp: z.boolean().default(true),
});
export class Logger {
    constructor(options = {}) {
        this.levels = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
        };
        this.level = options.level || 'info';
        this.config = loggerConfigSchema.parse({
            level: this.level,
            format: 'text',
            timestamp: true,
        });
    }
    shouldLog(level) {
        return this.levels[level] >= this.levels[this.level];
    }
    formatMessage(level, message, ...args) {
        const timestamp = this.config.timestamp ? `[${new Date().toISOString()}] ` : '';
        const formattedMessage = args.length > 0 ? message.replace(/%[sdifoO%]/g, () => String(args.shift())) : message;
        if (this.config.format === 'json') {
            return JSON.stringify({
                timestamp: new Date().toISOString(),
                level,
                message: formattedMessage,
                ...(args.length > 0 && { args }),
            });
        }
        return `${timestamp}[${level.toUpperCase()}] ${formattedMessage}`;
    }
    log(level, ...args) {
        if (this.shouldLog(level)) {
            console[level](...args);
        }
    }
    debug(...args) {
        this.log('debug', ...args);
    }
    info(...args) {
        this.log('info', ...args);
    }
    warn(...args) {
        this.log('warn', ...args);
    }
    error(...args) {
        this.log('error', ...args);
    }
}
//# sourceMappingURL=logger.js.map