import {MotifRequest, ProcessorCallback, MotifResponse} from "../MotifModels";
import {ServerConfiguration} from "../ServerManager";
import {MockConnector} from "./MockConnector";
import {HttpConnector} from "./HttpConnector";
/**
 * Created by enrico on 08/08/17.
 */
export interface MotifConnector {
    sendRequest(motifRequest:MotifRequest):Promise<MotifResponse>
    clear():void
}

export class MotifConnectorFactory {
    public static createConnector(config:ServerConfiguration):MotifConnector{
        if(config.isMockEnabled){
            return new MockConnector(config.mockModulePath,config);
        }
        return new HttpConnector(config.serverUrl,config);
    }
}