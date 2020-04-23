import Model from './model';
import Store from './store';


interface PersonI {
    name?: string;
    age?: number;
    address?: string ;
}
class Person extends Model<PersonI> {

}

// create person one;
const personData1: PersonI = {name:'name surname',age: 30, address:'grono strasse 1 berlin'}
const person1 = new Person(personData1);
console.log(person1);

// create person two;

const personData2: PersonI = {name:'name2 surname',age: 32, address:'grono strasse 2 berlin'}
const person2 = new Person(personData2);

//create store with both persons

let numbers = new Store<any>(person1);
numbers.add(person2);
let allPersons = numbers.getStore();
console.log('store collection type person',allPersons);







