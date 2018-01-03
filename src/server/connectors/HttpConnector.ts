import construct = Reflect.construct;
import {MotifConnector} from "./MotifConnector";
import {MotifRequest, MotifResponse} from "../MotifModels";
import { LoggerTransport } from "../../logging/LoggerTransport";
import { ConsoleTransport } from "../../logging/ConsoleTransport";
import { ServerConfiguration } from "../ServerManager";
const unirest = require('unirest');
/**
 * Created by enrico on 08/08/17.
 */
export class HttpConnector implements MotifConnector{
    private url:string;
    private logger:LoggerTransport;

    sendRequest(motifRequest:MotifRequest):Promise<MotifResponse> {
        return new Promise<MotifResponse>((resolve:(request:MotifResponse) => void,reject) => {
            unirest.post(this.url)
                .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
                .send(motifRequest)
                .end((response) => {
                    this.logger.info("MOTIF Response : " + JSON.stringify(response.body));
                    resolve(response.body);
                });
        });
    }

    constructor(url:string,config:ServerConfiguration){
        this.url=url;
        this.initLogger(config);
    }

    clear():void {
        this.url = null;
    }

    private initLogger(config:ServerConfiguration){
        if(config.loggerTransport){
            this.logger = config.loggerTransport;
        }else{
            this.logger = new ConsoleTransport();
        }
    }

}