import { MotifRequest, MotifResponse } from "../MotifModels";
import { ServerConfiguration } from "../ServerManager";
/**
 * Created by enrico on 08/08/17.
 */
export interface MotifConnector {
    sendRequest(motifRequest: MotifRequest): Promise<MotifResponse>;
    clear(): void;
}
export declare class MotifConnectorFactory {
    static createConnector(config: ServerConfiguration): MotifConnector;
}
