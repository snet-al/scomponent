

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