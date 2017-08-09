"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceBridge_1 = require("../../services/ServiceBridge");
var NativeStorage_1 = require("../../services/storage/NativeStorage");
var DEStorage_1 = require("../../services/storage/DEStorage");
/**
 * Created by enrico on 08/08/17.
 */
var MockConnector = (function () {
    function MockConnector(mockFilePath, config) {
        this.mockFilePath = mockFilePath;
        this.init(config);
    }
    MockConnector.prototype.init = function (config) {
        var moduleValue = require(this.mockFilePath);
        if (!Controller || !Controller.mock) {
            throw new Error("Load module fail: Controller is undefined or Controller.mock is undefined");
        }
        this.mockStub = Controller.mock;
        this.loadLibraryLoader(config);
        this.mockStub.appStarted();
        console.log("Load module for %s - %s ", this.mockStub.appDomain(), this.mockStub.appName());
    };
    MockConnector.prototype.loadLibraryLoader = function (config) {
        if (!config.libraryLoaderPath) {
            return;
        }
        var serviceBridge = this.createServiceBridge(config);
        this.libraryLoader = require(config.libraryLoaderPath);
        this.libraryLoader(null, serviceBridge);
    };
    MockConnector.prototype.sendRequest = function (motifRequest) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var srv = motifRequest.req.srv;
            var op = motifRequest.req.op;
            var service = _this.mockStub[srv];
            if (!service) {
                throw new Error("SERVICE_NOT_FOUND");
            }
            var serviceOperation = service[op];
            if (!serviceOperation) {
                throw new Error("OPERATION_NOT_FOUND");
            }
            var result = serviceOperation(motifRequest);
            if (!result) {
                throw new Error("NULL_RESULT");
            }
            resolve(result);
        });
    };
    MockConnector.prototype.clear = function () {
        Controller = null;
        this.mockStub = null;
        this.libraryLoader = null;
    };
    MockConnector.prototype.createServiceBridge = function (config) {
        var serviceBridge = ServiceBridge_1.ServiceBridge.createNew();
        var localStorage = DEStorage_1.DEStorageFactory.getDEStorage();
        serviceBridge.addService('localStorage', localStorage);
        if (config.localDBPath) {
            console.log("load db service");
            var dbstorage = NativeStorage_1.NativeStorageFactory.getNativeStorage({ dbPath: config.localDBPath });
            serviceBridge.addService('nativeStorage', dbstorage);
        }
        return serviceBridge;
    };
    return MockConnector;
}());
exports.MockConnector = MockConnector;
//# sourceMappingURL=MockConnector.js.map