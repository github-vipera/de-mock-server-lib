"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unirest = require('unirest');
/**
 * Created by enrico on 08/08/17.
 */
var HttpConnector = (function () {
    function HttpConnector(url) {
        this.url = url;
    }
    HttpConnector.prototype.sendRequest = function (motifRequest) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            unirest.post(_this.url)
                .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
                .send(motifRequest)
                .end(function (response) {
                console.log("MOTIF Response : " + JSON.stringify(response.body));
                resolve(response.body);
            });
        });
    };
    HttpConnector.prototype.clear = function () {
        this.url = null;
    };
    return HttpConnector;
}());
exports.HttpConnector = HttpConnector;
//# sourceMappingURL=HttpConnector.js.map