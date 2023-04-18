//classes
class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  //----------------------------------------------------------------------------
  //this
  //this is to tell typescript implicitly to bind this to the department
  //whuch means everytime someone tries to access this function they have to also
  //manually instantiate the department class using constructor params
  describe(this: Department) {
    console.log("My dept is" + this.name);
  }
}

const dept = new Department("Electrical");
console.log(dept.name);

//----------------------------------------------------------------------------

//example for this in  describe function
const host = new Department("Computers");
//Manually instantiating the department class using constructor params
const hostCopy = { name: "Dummy", employees: [], describe: host.describe };
console.log(hostCopy.describe());

//////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////

//private ,protected and public  class methods

class Department1 {
  // name: string;

  //once its private noone can modify it outside the class,but inside class you can
  private employees: string[] = [];

  //readonly allows you to never change the value even inside the class
  //once set through a constructor its donee
  private readonly id: string;

  //Protected method keeps the value private but allows other class to access it
  //the key difference is it dosent allow it to be accessed globally
  protected salary: number = 0;

  // constructor(n: string) {
  //   this.name = n;
  // }
  constructor(public name: string) {
    //this code below is directly handled in the constructor calling itself
    //so the double work is avoided
    // this.name = n;
    this.id = "1";
  }
  //----------------------------------------------------------------------------

  //if abstract is added make sure to add abstract label to the class definition
  //abstact class Department1 <---this must be written on Line 36
  // abstract describe(this: Department) :void

  describe(this: Department) {
    console.log("My dept is" + this.name);
  }

  //----------------------------------------------------------------------------
  //private and public class
  addEmployee(employee: string) {
    //becaue id is set to readonly i cannot changeits value
    // this.id = '3'
    this.employees.push(employee);
    this.salary = 1000;
  }

  printEmployeeInformation() {
    console.log(this.employees.length, "---->", this.employees);
  }
}

const department1 = new Department1("Electronics");
//this is possible as name si public
department1.name = "Mechanical";
//this cannot be modified as it is private method
//department1.employees[2] = "Mark"
//----------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////

//INHERITENCE
//can only inherit from one class
class ITDepartment extends Department1 {
  //----------------------------------------------------------------------------
  private lastReport: string;

  //getter and setter
  get mostRecentReport() {
    return "most recent report" + this.lastReport;
  }
  set mostRecentReport(val: string) {
    this.lastReport = val;
  }
  //----------------------------------------------------------------------------
  //you can use any method as STATIC and this can used anywhere without
  //instantiating the whole class
  static fiscalYear = 2020;
  static craeteEmployee(name: string) {
    return { name: name };
  }
  //----------------------------------------------------------------------------
  //inherit from the parent class calls super
  constructor(public name: string, public yearsOld: number) {
    //name is sent to the parent class
    //years old i a new class only for its own use case of the class
    super(name);
    this.lastReport = yearsOld.toString();
    //THIS IS NOT POSSIBLE FOR STATIC VALUES
    //because this is refrenced to this but static is detached to this
    //                   console.log(this.fiscalYear);
    //You can only use it like this
    console.log(ITDepartment.fiscalYear);
  }
  //----------------------------------------------------------------------------

  //method overriding
  addEmployee(employee: string): void {
    if (this.name === "umer") {
      // The salary is acccesible because it is protected in the Department class
      console.log(this.salary);
      // prints:0
      return;
    }
  }
}

const accounting = new ITDepartment("DCT", 8);

//this can access all the methods of its parents class
console.log(accounting.name);
//You dont have to call it like a function the getter works like a variable
console.log(accounting.mostRecentReport);
accounting.mostRecentReport = "99";
//STATIC method usage
//NoTICE that there is no new keywword used here as it is a static method
const employee1 = ITDepartment.craeteEmployee("umer");
console.log(employee1, ITDepartment.fiscalYear);
//----------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////

//ABSTRACT CLASSES
//helps in making BLUEPRINT methods in the Parent classes to be overwritten
class ITDepartment1 extends Department1 {
  //----------------------------------------------------------------------------
  constructor(public name: string, public yearsOld: number) {
    super(name);
  }
  //----------------------------------------------------------------------------
  //this describe method is also available on the Department1 which mean
  //METHOD OVERIDING
  //but sometimes we need to force them tooverride the method
  //then the same descibe class in the parent must be lablled abstact
  //such that anybody using our class anywhere has to at any cost overrirde
  //and must and should use it.
  //LINE 61 TO 64 in Department1 class is shown
  describe() {
    console.log("Accounting Department", this.name);
  }
}

const accounting1 = new ITDepartment("DCT", 8);

//----------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////

//SingleTon
//Ensuring only one certain instance of the class
//which means ITDepartment2 can only be instantiated or created ONCE..!!
//NO MULTIPLE OBJECTS
class ITDepartment2 extends Department1 {
  //----------------------------------------------------------------------------
  //this instance variable os the type class itself
  private static instance: ITDepartment2;

  //This makes sure no one can instantiate the class
  //by ading private to the constructor
  private constructor(public name: string, public yearsOld: number) {
    super(name);
  }
  static getInstance() {
    //if the instance already exists return dont create a new instance
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ITDepartment2("ATN", 6);
  }
}

//Beacuse we dont have access to the constructor as its private we made the satic class
//and we use that to make sure we only create one instance
const dept2 = ITDepartment2.getInstance();
const dept3 = ITDepartment2.getInstance();
console.log(dept2 === dept3);
// prints:true
//This is beacuse for the second time i'e dept3 dept2 itself is returned
//as a previous instatiation
//----------------------------------------------------------------------------
