/**
 * Created by enrico on 09/08/17.
 */
export class ServiceBridge {
    private serviceMap = {};

    /**
     * get service
     * @param name
     * @returns {any}
     */
    public getService(name:string){
        return this.serviceMap[name];
    }

    /**
     * set service
     * @param name
     * @param service
     */
    public addService(name,service){
        this.serviceMap[name] = service;
    }

    public static createNew():ServiceBridge{
        return new ServiceBridge();
    }
}