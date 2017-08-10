"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DEStorageImpl = (function () {
    function DEStorageImpl() {
        this.localStorageObj = {};
    }
    DEStorageImpl.prototype.set = function (key, value) {
        this.localStorageObj[key] = value;
    };
    DEStorageImpl.prototype.setObject = function (key, value) {
        this.set(key, JSON.stringify(value));
    };
    DEStorageImpl.prototype.get = function (key) {
        return this.localStorageObj[key];
    };
    DEStorageImpl.prototype.getObject = function (key) {
        var rawValue = this.get(key);
        if (rawValue == 'undefined') {
            return undefined;
        }
        if (rawValue) {
            return JSON.parse(rawValue);
        }
        return rawValue;
    };
    DEStorageImpl.prototype.remove = function (key) {
        delete this.localStorageObj[key];
    };
    DEStorageImpl.prototype.clear = function () {
        this.localStorageObj = {};
    };
    DEStorageImpl.prototype.getLength = function () {
        return Object.keys(this.localStorageObj).length;
    };
    DEStorageImpl.prototype.printAllData = function () {
        var _this = this;
        Object.keys(this.localStorageObj).forEach(function (i) {
            console.log(i + ": " + _this.get(i));
        });
    };
    return DEStorageImpl;
}());
var DEStorageFactory = (function () {
    function DEStorageFactory() {
    }
    DEStorageFactory.getDEStorage = function () {
        return new DEStorageImpl();
    };
    return DEStorageFactory;
}());
exports.DEStorageFactory = DEStorageFactory;
//# sourceMappingURL=DEStorage.js.map