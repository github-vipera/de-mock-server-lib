import { MotifConnector } from "./MotifConnector";
import { MotifRequest, MotifResponse } from "../MotifModels";
/**
 * Created by enrico on 08/08/17.
 */
export declare class HttpConnector implements MotifConnector {
    private url;
    sendRequest(motifRequest: MotifRequest): Promise<MotifResponse>;
    constructor(url: string);
    clear(): void;
}
