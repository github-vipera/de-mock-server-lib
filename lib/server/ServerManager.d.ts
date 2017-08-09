export interface ServerConfiguration {
    port: number;
    isMockEnabled?: boolean;
    mockModulePath?: string;
    connectionTimeout?: number;
    serverUrl?: string;
    libraryLoaderPath?: string;
    localDBPath?: string;
}
export interface ServerManager {
    start(config: ServerConfiguration): any;
    stop(): any;
    clear(): any;
}
export declare class ServerManagerFactory {
    static createServerManager(): ServerManager;
}
