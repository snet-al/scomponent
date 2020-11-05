export default class Model {
  private translateFields = {};

  public factory(data: Object): any {
    if (!data) {
      return;
    }
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let rawData = data[key];
        key = this.translate(key);
        if (this.hasOwnProperty(key) || typeof rawData !== "undefined") {
          let goDeep = this[key] instanceof Model;
          if (goDeep) {
            this[key].factory(rawData);
          }
          (<any>this)[key] = rawData;
        }
      }
    }
  }

  public translate(key: string) {
    if (!this.translateFields || !this.translateFields[key]) {
      return key;
    }
    return this.translateFields[key];
  }

  public setTranslateField(obj: object) {
    this.translateFields = obj;
  }
}
