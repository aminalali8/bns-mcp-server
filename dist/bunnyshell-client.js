export class BunnyshellClient {
    constructor(token) {
        this.baseUrl = 'https://api.bunnyshell.com/v1';
        this.token = token;
    }
    async request(path, options = {}) {
        const response = await fetch(`${this.baseUrl}${path}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    async listProjects() {
        return this.request('/projects');
    }
    async getProject(projectId) {
        return this.request(`/projects/${projectId}`);
    }
}
//# sourceMappingURL=bunnyshell-client.js.map