import { z } from 'zod';
// Error Types
export class BunnyshellError extends Error {
    constructor(message, code, status, details) {
        super(message);
        this.code = code;
        this.status = status;
        this.details = details;
        this.name = 'BunnyshellError';
    }
}
export class BunnyshellApiError extends BunnyshellError {
    constructor(message, status, details) {
        super(message, 'API_ERROR', status, details);
        this.status = status;
        this.details = details;
        this.name = 'BunnyshellApiError';
    }
}
export class BunnyshellValidationError extends BunnyshellError {
    constructor(message, details) {
        super(message, 'VALIDATION_ERROR', undefined, details);
        this.name = 'BunnyshellValidationError';
    }
}
// Base API Response Schema
export const BunnyshellApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.unknown().optional(),
    error: z.object({
        message: z.string(),
        code: z.string().optional(),
        details: z.unknown().optional(),
    }).optional(),
});
//# sourceMappingURL=bunnyshell.js.map