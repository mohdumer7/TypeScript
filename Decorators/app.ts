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

//----------------------------------------------------------------------------------------

// returning a class in the decorator
//whenever we return from decorator it will always replace the old function
function WithTemplate1(template: string, hookId: string) {
  console.log("Templetising");
  return function (Originalconstructor: any) {
    const hookEl = document.querySelector(hookId);
    const p = new Originalconstructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
    return class extends Originalconstructor {
      constructor() {
        super();
      }
    };
  };
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
//AutoBind Decorator

function AutoBind(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      //this is always object in getter
      const boundfn = originalMethod.bind(this);
      return boundfn;
    },
  };
  return adjustedDescriptor;
}

class Printer {
  message = "This Works..!";

  @AutoBind
  showmessage() {
    console.log(this.message);
  }
}
const p = new Printer();

const button = document.querySelector("button")!;
// button.addEventListener("click", p.showmessage);

//----------------------------------------------------------------------------------------

// Decorators for Validation

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registeredValiators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValiators[target.constructor.name] = {
    ...registeredValiators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValiators[target.constructor.name] = {
    ...registeredValiators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValiators[obj.constructor.name];
  console.log(objValidatorConfig);
  if (!objValidatorConfig) {
    return true;
  }
  for (const prop in objValidatorConfig) {
    for (const validator in objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          return !!obj[prop];
        case "positive":
          return obj[prop] > 0;
      }
    }
  }
  return true;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.getElementById("course")!;
courseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;
  const title = titleEl.value;
  const price = +priceEl.value;
  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    throw new Error("Invalid Details");
  }
  console.log(createdCourse);
});
