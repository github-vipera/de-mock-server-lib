"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockConnector_1 = require("./MockConnector");
var HttpConnector_1 = require("./HttpConnector");
var MotifConnectorFactory = (function () {
    function MotifConnectorFactory() {
    }
    MotifConnectorFactory.createConnector = function (config) {
        if (config.isMockEnabled) {
            return new MockConnector_1.MockConnector(config.mockModulePath, config);
        }
        return new HttpConnector_1.HttpConnector(config.serverUrl);
    };
    return MotifConnectorFactory;
}());
exports.MotifConnectorFactory = MotifConnectorFactory;
//# sourceMappingURL=MotifConnector.js.map