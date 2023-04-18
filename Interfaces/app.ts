//INTERFACES
//interfaces are place where types are defined and initialised
//we cannot add default values to interfaces XXXXname:string = "umer"XXXX
//THis is basically for building a blueprint like structure to use it later
interface Person {
  readonly name: string;
  age: number;

  greet(phrase: string): void;
}

//We can use the above interface to type check anything and make sure everything
//follows our conventions
//-------------------------------------------------------------------------------
//INTERFACE WITH NORMAL VARIABLES
let user1: Person;
user1 = {
  name: "umer",
  age: 23,
  greet(phrase: string): void {
    console.log("welcome" + phrase);
  },
};

user1.greet("umer");
//-------------------------------------------------------------------------------
// INTERFACE WITH CLASSES

//with interfaces we can use multiple interfaces together for classes
class Human implements Person {
  name: string;
  age: number;

  constructor(n: string) {
    this.name = n;
    this.age = 9;
  }

  greet(phrase: string): void {
    console.log(this.name);
    console.log(phrase);
  }
}
//-------------------------------------------------------------------------------
