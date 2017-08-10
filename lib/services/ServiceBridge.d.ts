/**
 * Created by enrico on 09/08/17.
 */
export declare class ServiceBridge {
    private serviceMap;
    /**
     * get service
     * @param name
     * @returns {any}
     */
    getService(name: string): any;
    /**
     * set service
     * @param name
     * @param service
     */
    addService(name: any, service: any): void;
    static createNew(): ServiceBridge;
}
