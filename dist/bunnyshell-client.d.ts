export declare class BunnyshellClient {
    private token;
    private baseUrl;
    constructor(token: string);
    private request;
    listProjects(): Promise<{
        items: any[];
    }>;
    getProject(projectId: string): Promise<any>;
}
