import { z } from 'zod';

// Logger configuration schema
export const loggerConfigSchema = z.object({
  level: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  format: z.enum(['json', 'text']).default('text'),
  timestamp: z.boolean().default(true),
});

export type LoggerConfig = z.infer<typeof loggerConfigSchema>;

export class Logger {
  private config: LoggerConfig;
  private levels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor(config: LoggerConfig) {
    this.config = loggerConfigSchema.parse(config);
  }

  private shouldLog(level: keyof typeof this.levels): boolean {
    return this.levels[level] >= this.levels[this.config.level];
  }

  private formatMessage(level: string, message: string, ...args: unknown[]): string {
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

  debug(message: string, ...args: unknown[]): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, ...args));
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, ...args));
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, ...args));
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, ...args));
    }
  }
} 