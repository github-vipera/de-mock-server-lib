"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by enrico on 09/08/17.
 */
var ServiceBridge = (function () {
    function ServiceBridge() {
        this.serviceMap = {};
    }
    /**
     * get service
     * @param name
     * @returns {any}
     */
    ServiceBridge.prototype.getService = function (name) {
        return this.serviceMap[name];
    };
    /**
     * set service
     * @param name
     * @param service
     */
    ServiceBridge.prototype.addService = function (name, service) {
        this.serviceMap[name] = service;
    };
    ServiceBridge.createNew = function () {
        return new ServiceBridge();
    };
    return ServiceBridge;
}());
exports.ServiceBridge = ServiceBridge;
//# sourceMappingURL=ServiceBridge.js.map