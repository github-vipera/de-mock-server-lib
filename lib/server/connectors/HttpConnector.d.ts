import { MotifConnector } from "./MotifConnector";
import { MotifRequest, MotifResponse } from "../MotifModels";
import { ServerConfiguration } from "../ServerManager";
/**
 * Created by enrico on 08/08/17.
 */
export declare class HttpConnector implements MotifConnector {
    private url;
    private logger;
    sendRequest(motifRequest: MotifRequest): Promise<MotifResponse>;
    constructor(url: string, config: ServerConfiguration);
    clear(): void;
    private initLogger(config);
}
