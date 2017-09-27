import {MotifConnector} from "./MotifConnector";
import {MotifRequest, MotifResponse} from "../MotifModels";
import {ServerConfiguration} from "../ServerManager";
import {ServiceBridge} from "../../services/ServiceBridge";
import {NativeStorage} from "../../services/storage/NativeStorage";
import {NativeStorageFactory} from "../../services/storage/NativeStorage";
import {DEStorageFactory} from "../../services/storage/DEStorage";
const reload = require('require-reload')(require);
const chokidar = require('chokidar');

//global declare
declare let Controller
/**
 * Created by enrico on 08/08/17.
 */
export class MockConnector implements MotifConnector{

    private mockFilePath:string;
    private mockStub:MockApp;
    private libraryLoader:LibraryLoader;
    private useAsyncResponse:boolean
    private fileWatcher:any
    constructor(mockFilePath:string,config:ServerConfiguration){
        this.mockFilePath = mockFilePath;
        this.useAsyncResponse = config.useAsyncMockResponse;
        this.init(config);
    }

    init(config:ServerConfiguration){
        let moduleValue = reload(this.mockFilePath);
        if(!Controller || !Controller.mock ){
            throw new Error("Load module fail: Controller is undefined or Controller.mock is undefined");
        }
        this.mockStub = Controller.mock;
        this.loadLibraryLoader(config);
        this.mockStub.appStarted();
        console.log("Load module for %s - %s ",this.mockStub.appDomain(),this.mockStub.appName());
        if(config.liveReload && !this.fileWatcher){
            this.fileWatcher = chokidar.watch(config.liveReloadPath || this.mockFilePath, 'file', {
                ignored: /[\/\\]\./,
                persistent: true
            });
            this.fileWatcher.on('change', path => this.reloadAll(path,config));
        }
    }

    private reloadAll(path:string,config:ServerConfiguration){
        console.log("Reload....")
        Controller = null;
        this.mockStub = null;
        this.libraryLoader = null;
        this.init(config);
        console.log("Reload done....")
    }

    private loadLibraryLoader(config:ServerConfiguration) {
        if(!config.libraryLoaderPath){
            return
        }
        const serviceBridge:ServiceBridge = this.createServiceBridge(config);
        this.libraryLoader=reload(config.libraryLoaderPath);
        this.libraryLoader(reload,serviceBridge);
    }



     sendRequest(motifRequest:MotifRequest):Promise<MotifResponse> {
        return new Promise((resolve,reject) => {
            let srv = motifRequest.req.srv;
            let op = motifRequest.req.op;
            let service=this.mockStub[srv];
            if(!service){
                throw new Error("SERVICE_NOT_FOUND");
            }
            let serviceOperation= service[op];
            if(!serviceOperation){
                throw new Error("OPERATION_NOT_FOUND");
            }
            if(this.useAsyncResponse){
                serviceOperation(motifRequest,resolve,reject);
            }else{
                let result:MotifResponse = serviceOperation(motifRequest);
                if(!result){
                    throw new Error("NULL_RESULT");
                }
                resolve(result);
            }

        });

    }

    clear():void {
        Controller = null;
        this.mockStub = null;
        this.libraryLoader = null;
        if(this.fileWatcher){
            this.fileWatcher.close();
            this.fileWatcher = null;
        }
    }


    private createServiceBridge(config:ServerConfiguration):ServiceBridge {
        const serviceBridge:ServiceBridge= ServiceBridge.createNew();
        let localStorage = DEStorageFactory.getDEStorage();
        serviceBridge.addService('localStorage',localStorage);
        if(config.localDBPath){
            console.log("load db service");
            let dbstorage:NativeStorage = NativeStorageFactory.getNativeStorage({ dbPath:config.localDBPath});
            serviceBridge.addService('nativeStorage',dbstorage);
        }
        return serviceBridge;
    }
}

export interface MockApp {
    appName():string
    appDomain():string
    appStarted():Function
    [serviceName:string]:any
}

export type LibraryLoader  = (reload,bridge:ServiceBridge) => void;
