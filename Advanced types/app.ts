//INTERSECTION TYPES
type Admin = {
  name: string;
  previleges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};
//Intersection of two types to form one
type ElvatedEmployee = Admin & Employee;

//this could have also used by using the inheritence of two interfaces using extends

const e1: ElvatedEmployee = {
  name: "umer",
  previleges: ["admin"],
  startDate: new Date(),
};

//-------------------------------------------------------------------------------------

type Combinable = string | number;
type Numeric = number | boolean;

type universal = Combinable & Numeric;
//the universal type will now only be number as that is the only one intersecting

//-------------------------------------------------------------------------------------

//TYPE GAURDS
//helps in determining the type selected in runtime env to make sure some cases dont fail

function add(a: Combinable, b: Combinable) {
  //type gaurd using typeof
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

type UnkownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnkownEmployee) {
  //here you cant check iof the emp is type of Employee or Admin this is because
  //there are built in data types
  //use custom checks
  if ("previleges" in emp) {
    console.log("Name: " + emp.name);
  }
  if ("startDate" in emp) {
    console.log(emp.startDate);
  }
}

printEmployeeInformation(e1);

//-------------------------------------------------------------------------------------
//TYPE GAURD with CLASSES is done using instanceof

class Car {
  drive() {
    console.log("Driving...");
  }
}
class Truck {
  drive() {
    console.log("Driving a Truck..");
  }
  loadCargo() {
    console.log("Loading Cargo...");
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo();
  }
}
//-------------------------------------------------------------------------------------
//Discriminated Unions
//adding custom property to discriminate it between different classes or type
interface Bird {
  //this is just a string value of type
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  if ("flyingSpeed" in animal) {
    console.log("Moving with Speed" + animal.flyingSpeed);
  }
  let speed;
  switch (animal.type) {
    case "horse":
      speed = animal.runningSpeed;
      break;
    case "bird":
      speed = animal.flyingSpeed;
      break;
  }
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

//-------------------------------------------------------------------------------------

//TYPE CASTING
//change or force the type to be something
//typescript cannot dive inot DOM and find out if the type is valid
//the exclamation mark in the end makes sure the type is safe you can proceed
const paragraph = document.getElementById("message")!;

//type casting for HTML elements
const ele = <HTMLElement>document.getElementById("message")!;
//same as above
const ele1 = document.getElementById("message")! as HTMLElement;

//-------------------------------------------------------------------------------------
