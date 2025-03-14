import { z } from 'zod';
import { BunnyshellApiError, BunnyshellValidationError, } from '../types/bunnyshell.js';
export class BunnyshellClient {
    constructor(config) {
        this.config = {
            timeout: 5000,
            retries: 3,
            retryDelay: 1000,
            logging: {
                level: 'info',
                logRequests: false,
                logResponses: false,
                logErrors: true,
            },
            mock: {
                enabled: false,
                delay: 0,
                responses: {},
                errors: {},
            },
            ...config,
        };
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async fetchWithRetry(url, options, retryCount = 0) {
        try {
            return await this.fetchWithTimeout(url, options);
        }
        catch (error) {
            if (retryCount < this.config.retries) {
                await this.sleep(this.config.retryDelay * (retryCount + 1));
                return this.fetchWithRetry(url, options, retryCount + 1);
            }
            throw error;
        }
    }
    async fetchWithTimeout(url, options) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), this.config.timeout);
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'X-Auth-Token': this.config.authToken,
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });
            clearTimeout(id);
            return response;
        }
        catch (error) {
            clearTimeout(id);
            throw error;
        }
    }
    async handleResponse(response) {
        const data = await response.json();
        if (!response.ok) {
            throw new BunnyshellApiError(data?.message || 'Unknown error', response.status, data);
        }
        return {
            success: true,
            data: data,
        };
    }
    validateRequest(data, schema) {
        try {
            return schema.parse(data);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                throw new BunnyshellValidationError('Invalid request data', error.errors);
            }
            throw error;
        }
    }
    // Project Operations
    async listProjects() {
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/projects?per_page=1000`, { method: 'GET' });
        return this.handleResponse(response);
    }
    async getProject(id) {
        if (!id) {
            throw new BunnyshellValidationError('Project ID is required');
        }
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/projects/${id}`, { method: 'GET' });
        return this.handleResponse(response);
    }
    async createProject(data) {
        this.validateRequest(data, z.object({
            name: z.string().min(1),
            organization: z.string().min(1),
            settings: z.any().optional(),
        }));
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/projects`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return this.handleResponse(response);
    }
    async updateProject(id, data) {
        if (!id) {
            throw new BunnyshellValidationError('Project ID is required');
        }
        this.validateRequest(data, z.object({
            name: z.string().min(1).optional(),
            settings: z.any().optional(),
        }));
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        return this.handleResponse(response);
    }
    async deleteProject(id) {
        if (!id) {
            throw new BunnyshellValidationError('Project ID is required');
        }
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/projects/${id}`, { method: 'DELETE' });
        return this.handleResponse(response);
    }
    // Environment Operations
    async listEnvironments() {
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/environments?per_page=1000`, { method: 'GET' });
        return this.handleResponse(response);
    }
    async getEnvironment(id) {
        if (!id) {
            throw new BunnyshellValidationError('Environment ID is required');
        }
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/environments/${id}`, { method: 'GET' });
        return this.handleResponse(response);
    }
    async createEnvironment(data) {
        this.validateRequest(data, z.object({
            name: z.string().min(1),
            project: z.string().min(1),
            variables: z.record(z.string()).optional(),
            settings: z.any().optional(),
        }));
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/environments`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return this.handleResponse(response);
    }
    async updateEnvironment(id, data) {
        if (!id) {
            throw new BunnyshellValidationError('Environment ID is required');
        }
        this.validateRequest(data, z.object({
            name: z.string().min(1).optional(),
            variables: z.record(z.string()).optional(),
            settings: z.any().optional(),
        }));
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/environments/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        return this.handleResponse(response);
    }
    async deleteEnvironment(id) {
        if (!id) {
            throw new BunnyshellValidationError('Environment ID is required');
        }
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/environments/${id}`, { method: 'DELETE' });
        return this.handleResponse(response);
    }
    async deployEnvironment(id) {
        if (!id) {
            throw new BunnyshellValidationError('Environment ID is required');
        }
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/environments/${id}/deploy`, { method: 'POST' });
        return this.handleResponse(response);
    }
    async undeployEnvironment(id) {
        if (!id) {
            throw new BunnyshellValidationError('Environment ID is required');
        }
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/environments/${id}/undeploy`, { method: 'POST' });
        return this.handleResponse(response);
    }
    // Component Operations
    async listComponents(environmentId) {
        if (!environmentId) {
            throw new BunnyshellValidationError('Environment ID is required');
        }
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/environments/${environmentId}/components?per_page=1000`, { method: 'GET' });
        return this.handleResponse(response);
    }
    async getComponent(id) {
        if (!id) {
            throw new BunnyshellValidationError('Component ID is required');
        }
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/components/${id}`, { method: 'GET' });
        return this.handleResponse(response);
    }
    async createComponent(data) {
        this.validateRequest(data, z.object({
            name: z.string().min(1),
            type: z.string().min(1),
            environment: z.string().min(1),
            variables: z.record(z.string()).optional(),
            settings: z.any().optional(),
        }));
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/components`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return this.handleResponse(response);
    }
    async updateComponent(id, data) {
        if (!id) {
            throw new BunnyshellValidationError('Component ID is required');
        }
        this.validateRequest(data, z.object({
            name: z.string().min(1).optional(),
            variables: z.record(z.string()).optional(),
            settings: z.any().optional(),
        }));
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/components/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        return this.handleResponse(response);
    }
    async deleteComponent(id) {
        if (!id) {
            throw new BunnyshellValidationError('Component ID is required');
        }
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/components/${id}`, { method: 'DELETE' });
        return this.handleResponse(response);
    }
    async restartComponent(id) {
        if (!id) {
            throw new BunnyshellValidationError('Component ID is required');
        }
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/components/${id}/restart`, { method: 'POST' });
        return this.handleResponse(response);
    }
    async getComponentLogs(id, options) {
        if (!id) {
            throw new BunnyshellValidationError('Component ID is required');
        }
        this.validateRequest(options, z.object({
            lines: z.number().positive().optional(),
            follow: z.boolean().optional(),
        }));
        const queryParams = new URLSearchParams();
        if (options?.lines)
            queryParams.append('lines', options.lines.toString());
        if (options?.follow)
            queryParams.append('follow', 'true');
        const response = await this.fetchWithRetry(`${this.config.baseUrl}/components/${id}/logs?${queryParams}`, { method: 'GET' });
        return this.handleResponse(response);
    }
}
//# sourceMappingURL=bunnyshell.js.map