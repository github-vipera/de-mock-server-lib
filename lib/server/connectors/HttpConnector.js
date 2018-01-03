"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsoleTransport_1 = require("../../logging/ConsoleTransport");
var unirest = require('unirest');
/**
 * Created by enrico on 08/08/17.
 */
var HttpConnector = (function () {
    function HttpConnector(url, config) {
        this.url = url;
        this.initLogger(config);
    }
    HttpConnector.prototype.sendRequest = function (motifRequest) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            unirest.post(_this.url)
                .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
                .send(motifRequest)
                .end(function (response) {
                _this.logger.info("MOTIF Response : " + JSON.stringify(response.body));
                resolve(response.body);
            });
        });
    };
    HttpConnector.prototype.clear = function () {
        this.url = null;
    };
    HttpConnector.prototype.initLogger = function (config) {
        if (config.loggerTransport) {
            this.logger = config.loggerTransport;
        }
        else {
            this.logger = new ConsoleTransport_1.ConsoleTransport();
        }
    };
    return HttpConnector;
}());
exports.HttpConnector = HttpConnector;
//# sourceMappingURL=HttpConnector.js.map