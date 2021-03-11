import Model from './model'
import Store from './store'

class Person extends Model {
  private static instance: Person = new Person()
  id: number = 0
  age: number = 0
  name: string = ''
  address: string = ''
  lastName: string = ''
  details: Store<Person> = new Store<Person>(Person, { last_name: 'lastName' })

  public constructor() {
    super()
    this.setTranslateField({
      last_name: 'lastName',
    })
  }

  public static getInstance(): Person {
    return this.instance
  }
}

// create person one;
const personData1: any = {
  name: 'name surname',
  age: 30,
  address: 'grono strasse 1 berlin',
  last_name: 'last-Name',
  details: [{
    name: 'Test',
    age: 12,
    address: 'hcbdhcbdjhcdhc',
    last_name: 'Test',
  }]
}
// const person1 = Person.getInstance()
// person1.factory(personData1)
// console.log(person1)

let storeOfPersons = new Store<Person>(Person, { last_name: 'lastName' })

// storeOfPersons.add({})
// storeOfPersons.add(personData1)
storeOfPersons.add({
  name: 'name2 surname',
  age: 32,
  last_name: 'last-Name-2',
  address: 'grono strasse 2 berlin',
  details: [
    {
      name: 'name2 surname',
      age: 20,
      address: 'grono strasse 2 berlin',
      last_name: 'last-Name-2',
    },
    {
      name: 'name3 surname',
      age: 10,
      address: 'grono strasse 3 berlin',
      last_name: 'last-Name-3',
    }
  ],
})
// storeOfPersons.add([person1, { name: 'bledi', last_name: 'Shehu' }])

// console.log(storeOfPersons.getStore())
console.log(storeOfPersons.getAt(0))

class MyStore extends Store<Person> {
  private static instance: MyStore = new MyStore()
  primaryKey = 'id'
  private constructor() {
    super(Person, {})
  }

  public static getInstance(): MyStore {
    return MyStore.instance
  }
}

let st2 = MyStore.getInstance()

st2.add([{ name: 'bledi' }, { name: 'test' }])

// console.log(st2.findItem('name', 'bledid')?.name)
// console.log(st2.getStore())
