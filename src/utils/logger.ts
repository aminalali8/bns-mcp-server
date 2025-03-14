import { z } from 'zod';

// Logger configuration schema
export const loggerConfigSchema = z.object({
  level: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  format: z.enum(['json', 'text']).default('text'),
  timestamp: z.boolean().default(true),
});

export type LoggerConfig = z.infer<typeof loggerConfigSchema>;

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerOptions {
  level?: LogLevel;
}

export class Logger {
  private config: LoggerConfig;
  private levels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };
  private level: LogLevel;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || 'info';
    this.config = loggerConfigSchema.parse({
      level: this.level,
      format: 'text',
      timestamp: true,
    });
  }

  private shouldLog(level: keyof typeof this.levels): boolean {
    return this.levels[level] >= this.levels[this.level];
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

  private log(level: LogLevel, ...args: any[]) {
    if (this.shouldLog(level)) {
      console[level](...args);
    }
  }

  debug(...args: any[]) {
    this.log('debug', ...args);
  }

  info(...args: any[]) {
    this.log('info', ...args);
  }

  warn(...args: any[]) {
    this.log('warn', ...args);
  }

  error(...args: any[]) {
    this.log('error', ...args);
  }
} 