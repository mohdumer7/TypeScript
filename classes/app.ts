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

//private and public class methods

class Department1 {
  // name: string;

  //once its private noone can modify it outside the class,but inside class you can
  private employees: string[] = [];

  //readonly allows you to never change the value even inside the class
  //once set through a constructor its donee
  private readonly id: string;

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

  describe(this: Department) {
    console.log("My dept is" + this.name);
  }

  //----------------------------------------------------------------------------
  //private and public class
  addEmployee(employee: string) {
    //becaue id is set to readonly i cannot changeits value
    // this.id = '3'
    this.employees.push(employee);
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
  //inherit from the parent class calls super
  constructor(public name: string) {
    super(name);
  }
}

//----------------------------------------------------------------------------
