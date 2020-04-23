

export  default class store<T> {
  private data: T[];

  constructor(...elements: T[]) {
      this.data = elements;
  }

  add(t: T) {
      this.data.push(t);
  }

  remove(t: T) {
      let index = this.data.indexOf(t);
      if (index > -1) {
          this.data.splice(index, 1);
      }
  }

  getStore(): T[] {
      return this.data;
  }
}

console.log()

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