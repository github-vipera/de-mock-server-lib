import { LoggerTransport } from "../logging/LoggerTransport";
export interface ServerConfiguration {
    port: number;
    isMockEnabled?: boolean;
    useAsyncMockResponse?: boolean;
    mockModulePath?: string;
    connectionTimeout?: number;
    serverUrl?: string;
    libraryLoaderPath?: string;
    localDBPath?: string;
    liveReload?: boolean;
    liveReloadPath?: string;
    loggerTransport?: LoggerTransport;
}
export interface ServerManager {
    start(config: ServerConfiguration): any;
    stop(): any;
    clear(): any;
}
export declare class ServerManagerFactory {
    static createServerManager(): ServerManager;
}
