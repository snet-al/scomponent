import Model from './model'
import Store from './store'

class Person extends Model {
  private static instance: Person = new Person()
  id: number = 0
  age: number = 0
  name: string = ''
  address: string = ''
  lastName: string = ''

  public static getInstance(): Person {
    return Person.instance
  }
}

// create person one;
const personData1: any = {
  name: 'name surname',
  age: 30,
  address: 'grono strasse 1 berlin',
  last_name: 'last-Name',
}
const person1 = Person.getInstance().setTranslateField({
  last_name: 'lastName',
})
person1.factory(personData1)
//console.log(person1)

let storeOfPersons = new Store<Person>({ last_name: 'lastName' })

//storeOfPersons.add({})
//storeOfPersons.add(personData1)
storeOfPersons.add({
  name: 'name2 surname',
  age: 32,
  address: 'grono strasse 2 berlin',
  last_name: 'last-Name-2',
})

console.log(storeOfPersons.getStore())
