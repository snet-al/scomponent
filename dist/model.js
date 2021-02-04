"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model = /** @class */ (function () {
    function Model() {
        this.translateFields = {};
    }
    Model.prototype.factory = function (data) {
        if (!data) {
            return;
        }
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var rawData = data[key];
                key = this.translate(key);
                if (this.hasOwnProperty(key) || typeof rawData !== 'undefined') {
                    var goDeep = this[key] instanceof Model;
                    if (goDeep) {
                        this[key].factory(rawData);
                    }
                    ;
                    this[key] = rawData;
                }
            }
        }
    };
    Model.prototype.translate = function (key) {
        if (!this.translateFields || !this.translateFields[key]) {
            return key;
        }
        return this.translateFields[key];
    };
    Model.prototype.setTranslateField = function (obj) {
        this.translateFields = obj;
    };
    return Model;
}());
exports.default = Model;
