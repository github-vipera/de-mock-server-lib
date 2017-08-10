import construct = Reflect.construct;
import {MotifConnector} from "./MotifConnector";
import {MotifRequest, MotifResponse} from "../MotifModels";
const unirest = require('unirest');
/**
 * Created by enrico on 08/08/17.
 */
export class HttpConnector implements MotifConnector{
    private url:string;

    sendRequest(motifRequest:MotifRequest):Promise<MotifResponse> {
        return new Promise<MotifResponse>((resolve:(request:MotifResponse) => void,reject) => {
            unirest.post(this.url)
                .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
                .send(motifRequest)
                .end((response) => {
                    console.log("MOTIF Response : " + JSON.stringify(response.body));
                    resolve(response.body);
                });
        });
    }

    constructor(url:string){
        this.url=url;
    }

    clear():void {
        this.url = null;
    }

}