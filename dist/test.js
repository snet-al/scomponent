import Model from './model';
class Person extends Model {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.age = 0;
        this.name = '';
        this.address = '';
        this.lastName = '';
    }
    static getInstance() {
        return Person.instance;
    }
}
Person.instance = new Person();
// create person one;
const personData1 = {
    name: 'name surname',
    age: 30,
    address: 'grono strasse 1 berlin',
    last_name: 'last-Name',
};
const person1 = new Person();
person1.setTranslateField({ last_name: 'lastName' });
person1.factory(personData1);
console.log(person1);
