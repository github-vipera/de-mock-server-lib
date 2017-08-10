'use babel';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_persist_1 = require("node-persist");
var NativeStorageConfig = (function () {
    function NativeStorageConfig() {
    }
    return NativeStorageConfig;
}());
exports.NativeStorageConfig = NativeStorageConfig;
var NativeStorageImp = (function () {
    function NativeStorageImp(conf) {
        node_persist_1.initSync({
            dir: conf.dbPath,
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf8',
            logging: false,
            continuous: true,
            interval: false,
            ttl: false,
        });
    }
    NativeStorageImp.prototype.getItem = function (key, success, fail) {
        node_persist_1.getItem(key).then(function (value) {
            if (value) {
                success(value);
            }
            else {
                success(null);
            }
        }, function (err) {
            console.error(err);
            success(null);
        });
    };
    NativeStorageImp.prototype.setItem = function (key, value, success, fail) {
        node_persist_1.setItem(key, value).then(function () {
            success();
        }, function (err) {
            fail(err);
        });
    };
    NativeStorageImp.prototype.deleteItem = function (key, success, fail) {
        node_persist_1.removeItem(key).then(function () {
            success();
        }, function (err) {
            console.error(err);
            fail(err);
        });
    };
    NativeStorageImp.prototype.clear = function (success, fail) {
        node_persist_1.clear().then(function () {
            success();
        }, function (err) {
            fail(err);
        });
    };
    return NativeStorageImp;
}());
var NativeStorageFactory = (function () {
    function NativeStorageFactory() {
    }
    NativeStorageFactory.getNativeStorage = function (config) {
        return new NativeStorageImp(config);
    };
    return NativeStorageFactory;
}());
exports.NativeStorageFactory = NativeStorageFactory;
//# sourceMappingURL=NativeStorage.js.map