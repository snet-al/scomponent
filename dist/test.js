"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var store_1 = require("./store");
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 0;
        _this.age = 0;
        _this.name = '';
        _this.address = '';
        _this.lastName = '';
        return _this;
    }
    Person.getInstance = function () {
        return Person.instance;
    };
    Person.instance = new Person();
    return Person;
}(model_1.default));
// create person one;
var personData1 = {
    name: 'name surname',
    age: 30,
    address: 'grono strasse 1 berlin',
    last_name: 'last-Name',
};
var person1 = new Person();
person1.setTranslateField({ last_name: 'lastName' });
person1.factory(personData1);
//console.log(person1)
var storeOfPersons = new store_1.default();
storeOfPersons.add({});
storeOfPersons.add(personData1);
storeOfPersons.add({
    name: 'name2 surname',
    age: 32,
    address: 'grono strasse 2 berlin',
    last_name: 'last-Name-2',
});
console.log(storeOfPersons.getStore());
