export class BunnyshellClient {
  private token: string;
  private baseUrl = 'https://api.bunnyshell.com/v1';

  constructor(token: string) {
    this.token = token;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
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
    return this.request<{ items: any[] }>('/projects');
  }

  async getProject(projectId: string) {
    return this.request<any>(`/projects/${projectId}`);
  }
} 