//DECORATORS
//It is a function we apply to something in a certain way

//the target here points to the constructor of our class and can be named anything
function Logger(target: Function) {
  console.log("Logging");
  console.log(target);
}

@Logger
class Person {
  name = "Max";

  constructor() {
    console.log("creating a person object");
  }
}
//----------------------------------------------------------------------------------------

//Decorator FACTORY
//means that can create custom output formats
function Logger1(logString: string) {
  console.log(logString);
  return function (target: Function) {
    console.log("Logging");
    console.log(target);
  };
}

@Logger1("LOGGING")
class Person1 {
  name = "Max";

  constructor() {
    console.log("creating a person object");
  }
}

//----------------------------------------------------------------------------------------
//ADDING HTML USING THE DECORATORS
function WithTemplate(template: string, hookId: string) {
  console.log("Templetising");
  return function (constructor: any) {
    const hookEl = document.querySelector(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}
// multiple decorators
//The decorators always run from bottom up/first the withtemplate then the logger
//But if is a Factory then its runs up to down
//factory and decorators are just when a function is returned then its factory
@Logger1("DECORATORS")
@WithTemplate("<h1>My Person</h1>", "body")
class Person2 {
  name = "umer";

  constructor() {
    console.log("creating a person object");
  }
}

//----------------------------------------------------------------------------------------
//Decorator Property

//now the target is not a constructor but it is a varible of the class it recieves
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
}

//the property descriptor tells you the description of the propert it is of
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("variable decorator");
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDecorator
) {
  console.log("Method decorator");
  console.log(descriptor);
}

class Person3 {
  @Log
  name1 = "umer";

  @Log2
  set name(val: string) {
    this.name1 = val;
  }

  constructor() {
    console.log("creating a person object");
  }
}

//----------------------------------------------------------------------------------------
