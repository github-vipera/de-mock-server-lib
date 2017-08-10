import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as bodyParser from "body-parser";
import {MotifRequest, MotifResponse} from "./MotifModels";
import {MotifConnector, MotifConnectorFactory} from "./connectors/MotifConnector";
export interface ServerConfiguration{
    port:number
    isMockEnabled?:boolean
    useAsyncMockResponse?:boolean
    mockModulePath?:string
    connectionTimeout?:number
    serverUrl?:string
    libraryLoaderPath?:string,
    localDBPath?:string
}

export interface ServerManager{
    start(config:ServerConfiguration)
    stop()
    clear()
}

class ServerManagerImpl implements ServerManager{
    private static nextSocketId:number = 0;
    app:express.Application;
    http:any
    connector:MotifConnector;
    sockets = {};
    test:number = 0;
    constructor(){}
    public start(config:ServerConfiguration) {
        if(!this.app){
            this.initExpressApp();
        }
        if(!this.connector){
            this.initConnector(config);
        }
        this.http = require('http').Server(this.app);
        this.http.on('connection',  (socket) => {
            // Add a newly connected socket
            var socketId = ServerManagerImpl.nextSocketId++;
            this.sockets[socketId] = socket;
            console.log('socket', socketId, 'opened');

            // Remove the socket when it closes
            socket.on('close',  () => {
                console.log('socket', socketId, 'closed');
                delete this.sockets[socketId];
            });

            socket.setTimeout(config.connectionTimeout || 10000);
        });

        this.http.listen(config.port, () => {
            console.log(("App is running at http://localhost:%d "), config.port)
        });
    }
    public stop():Promise<any> {
        return new Promise((resolve,reject) => {
            if(this.http){
                this.http.close(() => {
                    console.log("closed");
                    resolve();
                })

                for (let socketId in this.sockets) {
                    //console.log('socket', socketId, 'destroyed');
                    this.sockets[socketId].destroy();
                }
                this.sockets = {}
            }
        });
    }

    public async clear() {
        await this.stop();
        this.app = null;
    }

    private initExpressApp() {
        console.log("initExpressApp");
        this.app=express();
        this.app.use(bodyParser.json());
        this.app.post('/json',this.handleIncomingRequest.bind(this))
    }

    /**
     * Handle incoming request
     * @param req
     * @param res
     * @param next
     */
    private  handleIncomingRequest(req: Request, res: Response, next: NextFunction){
        console.log("handleIncomingRequest");
        let motifRequest:MotifRequest = this.getMotifRequest(req);
        console.log('motifRequest:',motifRequest);
        this.processRequest(motifRequest, req,res);
    }

    private processRequest(motifRequest:MotifRequest, req: Request, res: Response) {
        this.connector.sendRequest(motifRequest).then((motifResponse:MotifResponse) => {
            console.log("Send %s to client",JSON.stringify(motifResponse));
            res.send(motifResponse);
            res.end();
        }, (err) => {
            console.error("err:",err);
            this.sendError(err,res);
        }).catch((err) => {
            console.error("err:",err);
            this.sendError(err,res);
        });
    }

    private sendError(err,res:Response){
        res.send(this.createErorResponse(err));
        res.end();
    }

    private getMotifRequest(request: Request):MotifRequest{
        return request.body;
    }

    private initConnector(config:ServerConfiguration) {
        console.log("initProcessor");
        this.connector = MotifConnectorFactory.createConnector(config);
    }

    private createErorResponse(err:any,message?:string):Object {
        return {
            'ERROR_CODE':'GENERIC_MOCK_ERROR',
            'ERROR_MESSAGE': message || 'An error has occurred'
        };
    }

}

export class ServerManagerFactory {
    public static createServerManager():ServerManager{
        return new ServerManagerImpl();
    }
}