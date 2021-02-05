import Model from './model'

export default class store<T extends Model> {
  private data: T[] = []
  private translateFields: any = {}
  private model: any

  constructor(model?: any, translateFields?: any) {
    this.model = model || Model
    this.translateFields = translateFields || {}
  }

  add(t: any): void {
    if (!(t instanceof Array)) {
      t = [t]
    }
    t.forEach((el: any) => {
      if (el instanceof this.model) {
        this.data.push(el)
      } else {
        let a = new this.model()
        a.setTranslateField(this.translateFields)
        a.factory(el)
      }
    })
  }

  remove(t: T): void {
    let index = this.data.indexOf(t)
    if (index > -1) {
      this.data.splice(index, 1)
    }
  }

  removeAll(): void {
    this.data = []
  }

  removeAt(index: number): void {
    if (index < this.data.length && index >= -this.data.length) {
      this.data.splice(index, 1)
    }
  }

  removeMultiple(indexes: number[]): void {
    if (indexes.length <= this.data.length) {
      const sorted = indexes.sort(function (a, b) {
        return b - a
      })
      const unique = new Set(sorted)

      unique.forEach((index) => {
        if (index < this.data.length) {
          this.data.splice(index, 1)
        }
      })
    }
  }

  sort(compareCondition: string | number, sortOrder = 'asc'): any {
    for (let i = 0, len = this.data.length; i < len - 1; i++) {
      for (let j = i + 1, len = this.data.length; j < len; j++) {
        if (sortOrder === 'asc') {
          if (this.data[i][compareCondition] > this.data[j][compareCondition]) {
            ;[this.data[i], this.data[j]] = [this.data[j], this.data[i]]
          }
        } else {
          if (this.data[i][compareCondition] < this.data[j][compareCondition]) {
            ;[this.data[i], this.data[j]] = [this.data[j], this.data[i]]
          }
        }
      }
    }
    return this
  }

  findItem(key: string, value: any) {
    let item = {}
    for (let i = 0, len = this.data.length; i < len; i++) {
      item[this.data[i][key]] = this.data[i]
    }
    return item[value]
  }

  findIndex(key: string, value: any) {
    return this.data.findIndex((item) => item[key] === value)
  }

  filterBy(key: string, value: any) {
    return this.data.filter(function (item) {
      return item[key] === value
    })
  }

  getStore(): T[] {
    return this.data
  }

  getAt(index: number) {
    if (index > this.data.length) {
      return
    }
    return this.data[index]
  }
}

// export default class Store {

//     public model: model;
//     public data: any[]  = [];
//     public indices: any[]  = [];
//     public original: any[] = [];
//     public filtered: any[] = [];

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
