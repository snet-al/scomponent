import Model from './model';
import Store from './store';


interface PersonI {
    id?:number;
    name?: string;
    lastName?: string;
    age?: number;
    address?: string;

}

 class Person extends Model{
    private static instance: PersonI = new Person()
    id: number = 0
    age: number = 0
    name: string = ''
    address: string = ''
    lastName:string = '';

    public static getInstance(): PersonI {
      return Person.instance
    }
}

// create person one;
const personData1: any = {name:'name surname',age: 30, address:'grono strasse 1 berlin', last_name:'last-Name'}
const person1 = new Person();
person1.setTranslateField({last_name:'lastName'});
person1.factory(personData1)
console.log(person1);








