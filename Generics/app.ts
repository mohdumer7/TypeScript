//GENERICS
//Generic types are types connected to other types in forming a certain type.

//this means that an array of strings is defined
const names: Array<string> = [];

//array of strings or numbers
const names1: Array<string | number> = [];

//------------------------------------------------------------------------------

//promise Types
//it is a promise that will eventually return a string is what it means
//when it says Promise<string>
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("this is done");
  }, 2000);
});

//------------------------------------------------------------------------------
//generic function

// function merge(objA: object, objB: object) {
//   return Object.assign(objA, objB);
// }

//same as above but with generic types
//this means that the function is a type of T (object) and the same in params
//Here T and U are both the same things
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObjects = merge({ name: "umer" }, { age: 22 });
console.log(mergedObjects);
//prints:{name:"umer",age:22}

//------------------------------------------------------------------------------
//entending generics
interface Lengthy {
  length: number;
}

//an array will automatically will have "length" property
function countArray<T extends Lengthy>(element: T) {
  return element.length;
}

console.log(countArray([1, 2, 3, 45, 6]));

//------------------------------------------------------------------------------
//KEYOF
//specifically informing TS that U will be Type of key in the object T
function extractandConvert<T extends Object, U extends keyof T>(
  obj: object,
  key: string
) {
  return obj[key];
}

extractandConvert({ name: "umer" }, "name");

//------------------------------------------------------------------------------
// GENERIC CLASSES

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
const numberStorage = new DataStorage<number>();

textStorage.addItem("shoes");
//cant do this as only strings can be stored not numbers in thsi class
// textStorage.addItem(1);
numberStorage.addItem(1);
//------------------------------------------------------------------------------
