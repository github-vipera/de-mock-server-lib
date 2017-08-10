import { MotifConnector } from "./MotifConnector";
import { MotifRequest, MotifResponse } from "../MotifModels";
import { ServerConfiguration } from "../ServerManager";
import { ServiceBridge } from "../../services/ServiceBridge";
/**
 * Created by enrico on 08/08/17.
 */
export declare class MockConnector implements MotifConnector {
    private mockFilePath;
    private mockStub;
    private libraryLoader;
    private useAsyncResponse;
    private fileWatcher;
    constructor(mockFilePath: string, config: ServerConfiguration);
    init(config: ServerConfiguration): void;
    private reloadAll(path, config);
    private loadLibraryLoader(config);
    sendRequest(motifRequest: MotifRequest): Promise<MotifResponse>;
    clear(): void;
    private createServiceBridge(config);
}
export interface MockApp {
    appName(): string;
    appDomain(): string;
    appStarted(): Function;
    [serviceName: string]: any;
}
export declare type LibraryLoader = (reload, bridge: ServiceBridge) => void;
