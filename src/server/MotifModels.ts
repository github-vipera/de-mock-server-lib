/**
 * Created by enrico on 07/08/17.
 */
export interface MotifRequest {
    req:{
        app:string
        dom:string,
        srv:string,
        op:string,
        sid?:string,
        header:Object
    }
}

export interface MotifResponse {
    res:{
        header:{
            app: string,
            dom: string,
            srv: string,
            op: string,
            sid?: string,
            err?:any,
            [propName: string]: any;
        }
    }
}
export type ProcessorCallback = (response:MotifResponse) => void


export interface RequestProcessor {
    processRequest(request:MotifRequest,callback:ProcessorCallback):void
}