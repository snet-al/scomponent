export default class Model {
    constructor() {
        this.translateFields = {};
    }
    factory(data) {
        if (!data) {
            return;
        }
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let rawData = data[key];
                key = this.translate(key);
                if (this.hasOwnProperty(key) || typeof rawData !== 'undefined') {
                    let goDeep = this[key] instanceof Model;
                    if (goDeep) {
                        this[key].factory(rawData);
                    }
                    ;
                    this[key] = rawData;
                }
            }
        }
    }
    translate(key) {
        if (!this.translateFields || !this.translateFields[key]) {
            return key;
        }
        return this.translateFields[key];
    }
    setTranslateField(obj) {
        this.translateFields = obj;
    }
}
