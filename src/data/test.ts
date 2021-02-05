import Model from './model'
import Store from './store'

class Person extends Model {
  private static instance: Person = new Person()
  id: number = 0
  age: number = 0
  name: string = ''
  address: string = ''
  lastName: string = ''

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
}
const person1 = Person.getInstance()
person1.factory(personData1)
//console.log(person1)

let storeOfPersons = new Store<Person>(Person, { last_name: 'lastName' })

storeOfPersons.add({})
storeOfPersons.add(personData1)
storeOfPersons.add({
  name: 'name2 surname',
  age: 32,
  address: 'grono strasse 2 berlin',
  last_name: 'last-Name-2',
})
storeOfPersons.add([person1, { name: 'bledi', last_name: 'Shehu' }])

//console.log(storeOfPersons.getStore())
//console.log(storeOfPersons.getAt(1))

class MyStore extends Store<Person> {
  private static instance: MyStore = new MyStore()

  private constructor() {
    super(Person)
  }

  public static getInstance(): MyStore {
    return MyStore.instance
  }
}

let st2 = MyStore.getInstance()

st2.add({})

console.log(st2)
