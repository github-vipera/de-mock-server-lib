"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsoleTransport = (function () {
    function ConsoleTransport() {
    }
    ConsoleTransport.prototype.trace = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.trace(message, optionalParams);
    };
    ConsoleTransport.prototype.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.debug(message, optionalParams);
    };
    ConsoleTransport.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.log(message, optionalParams);
    };
    ConsoleTransport.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.warn(message, optionalParams);
    };
    ConsoleTransport.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.error(message, optionalParams);
    };
    return ConsoleTransport;
}());
exports.ConsoleTransport = ConsoleTransport;
//# sourceMappingURL=ConsoleTransport.js.map