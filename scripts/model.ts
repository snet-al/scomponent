export default class Model<T> {
    private model: T;

    constructor(properties: T) {
  
        this.assing(properties);
    }

    assing(prop: T): void {
        for (let key in prop){        
            if (prop.hasOwnProperty(key))
            {
                let value = prop[key];

                if (typeof value !== "undefined"){
                    (<any>this)[key] = value;   
                }
            }
        }
    }
}
