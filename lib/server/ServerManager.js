"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var MotifConnector_1 = require("./connectors/MotifConnector");
var cors = require('cors');
var ServerManagerImpl = (function () {
    function ServerManagerImpl() {
        this.sockets = {};
        this.test = 0;
    }
    ServerManagerImpl.prototype.start = function (config) {
        var _this = this;
        if (!this.app) {
            this.initExpressApp();
        }
        if (!this.connector) {
            this.initConnector(config);
        }
        this.http = require('http').Server(this.app);
        this.http.on('connection', function (socket) {
            // Add a newly connected socket
            var socketId = ServerManagerImpl.nextSocketId++;
            _this.sockets[socketId] = socket;
            console.log('socket', socketId, 'opened');
            // Remove the socket when it closes
            socket.on('close', function () {
                console.log('socket', socketId, 'closed');
                delete _this.sockets[socketId];
            });
            socket.setTimeout(config.connectionTimeout || 10000);
        });
        this.http.listen(config.port, function () {
            console.log(("App is running at http://localhost:%d "), config.port);
        });
    };
    ServerManagerImpl.prototype.stop = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.http) {
                _this.http.close(function () {
                    console.log("closed");
                    resolve();
                });
                for (var socketId in _this.sockets) {
                    //console.log('socket', socketId, 'destroyed');
                    _this.sockets[socketId].destroy();
                }
                _this.sockets = {};
            }
        });
    };
    ServerManagerImpl.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stop()];
                    case 1:
                        _a.sent();
                        this.app = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    ServerManagerImpl.prototype.initExpressApp = function () {
        console.log("initExpressApp");
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.post('/json', this.handleIncomingRequest.bind(this));
    };
    /**
     * Handle incoming request
     * @param req
     * @param res
     * @param next
     */
    ServerManagerImpl.prototype.handleIncomingRequest = function (req, res, next) {
        console.log("handleIncomingRequest");
        var motifRequest = this.getMotifRequest(req);
        console.log('motifRequest:', motifRequest);
        this.processRequest(motifRequest, req, res);
    };
    ServerManagerImpl.prototype.processRequest = function (motifRequest, req, res) {
        var _this = this;
        this.connector.sendRequest(motifRequest).then(function (motifResponse) {
            console.log("Send %s to client", JSON.stringify(motifResponse));
            res.send(motifResponse);
            res.end();
        }, function (err) {
            console.error("err:", err);
            _this.sendError(err, res);
        }).catch(function (err) {
            console.error("err:", err);
            _this.sendError(err, res);
        });
    };
    ServerManagerImpl.prototype.sendError = function (err, res) {
        res.send(this.createErorResponse(err));
        res.end();
    };
    ServerManagerImpl.prototype.getMotifRequest = function (request) {
        return request.body;
    };
    ServerManagerImpl.prototype.initConnector = function (config) {
        console.log("initProcessor");
        this.connector = MotifConnector_1.MotifConnectorFactory.createConnector(config);
    };
    ServerManagerImpl.prototype.createErorResponse = function (err, message) {
        return {
            'ERROR_CODE': 'GENERIC_MOCK_ERROR',
            'ERROR_MESSAGE': message || 'An error has occurred'
        };
    };
    return ServerManagerImpl;
}());
ServerManagerImpl.nextSocketId = 0;
var ServerManagerFactory = (function () {
    function ServerManagerFactory() {
    }
    ServerManagerFactory.createServerManager = function () {
        return new ServerManagerImpl();
    };
    return ServerManagerFactory;
}());
exports.ServerManagerFactory = ServerManagerFactory;
//# sourceMappingURL=ServerManager.js.map