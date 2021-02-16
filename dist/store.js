"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store = /** @class */ (function () {
    function store() {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        this.data = elements.map(function (el) {
            var a = new Object();
            a.factory(el);
            return a;
        });
    }
    store.prototype.add = function (t) {
        var a = new Object();
        this.data.push(a.factory(t));
        return a;
    };
    store.prototype.remove = function (t) {
        var index = this.data.indexOf(t);
        if (index > -1) {
            this.data.splice(index, 1);
        }
    };
    store.prototype.removeAll = function () {
        this.data = [];
    };
    store.prototype.removeAt = function (index) {
        if (index < this.data.length && index >= -this.data.length) {
            this.data.splice(index, 1);
        }
    };
    store.prototype.removeMultiple = function (indexes) {
        var _this = this;
        if (indexes.length <= this.data.length) {
            var sorted = indexes.sort(function (a, b) {
                return b - a;
            });
            var unique = new Set(sorted);
            unique.forEach(function (index) {
                if (index < _this.data.length) {
                    _this.data.splice(index, 1);
                }
            });
        }
    };
    store.prototype.sort = function (compareCondition, sortOrder) {
        var _a, _b;
        if (sortOrder === void 0) { sortOrder = 'asc'; }
        for (var i = 0, len = this.data.length; i < len - 1; i++) {
            for (var j = i + 1, len_1 = this.data.length; j < len_1; j++) {
                if (sortOrder === 'asc') {
                    if (this.data[i][compareCondition] > this.data[j][compareCondition]) {
                        ;
                        _a = [this.data[j], this.data[i]], this.data[i] = _a[0], this.data[j] = _a[1];
                    }
                }
                else {
                    if (this.data[i][compareCondition] < this.data[j][compareCondition]) {
                        ;
                        _b = [this.data[j], this.data[i]], this.data[i] = _b[0], this.data[j] = _b[1];
                    }
                }
            }
        }
        return this.data;
    };
    store.prototype.findItem = function (key, value) {
        var item = {};
        for (var i = 0, len = this.data.length; i < len; i++) {
            item[this.data[i][key]] = this.data[i];
        }
        return item[value];
    };
    store.prototype.findIndex = function (key, value) {
        return this.data.findIndex(function (item) { return item[key] === value; });
    };
    store.prototype.filterBy = function (key, value) {
        return this.data.filter(function (item) {
            return item[key] === value;
        });
    };
    store.prototype.getStore = function () {
        return this.data;
    };
    store.prototype.getAt = function (index) {
        if (index > this.data.length) {
            return;
        }
        return this.data[index];
    };
    return store;
}());
exports.default = store;
console.log();
// export default class Store {
//     public model: model;
//     public data: any[]  = [];
//     public indices: any[]  = [];
//     public original: any[] = [];
//     public filtered: any[] = [];
//     constructor(config: any) {
//         //to do
//     }
//     public removeAt (index: number) {
//         if (index < this.data.length && index >= 0) {
//             this.data.splice(index, 1);
//         }
//         this.original = this.data;
//     }
//     public removeAll () {
//         this.data = [];
//         this.original = [];
//     };
//     public getAt (index: number) {
//         return this.data[index];
//     };
//     public average (fieldName:string) : undefined | number{
//         let canCalculate = false;
//         for (let i in this.fields) {
//           if (this.fields[i].name == fieldName) {
//             if (this.fields[i].type == "int" || this.fields[i].type == "float") {
//               canCalculate = true;
//             } else {
//               return undefined;
//             }
//           }
//         }
//         if (!canCalculate || this.data.length == 0) {
//           return undefined;
//         }
//         let sum = 0;
//         for (var i in this.data) {
//           sum += this.data[i].data[fieldName];
//         }
//         return sum / this.data.length;
//       };
// }
