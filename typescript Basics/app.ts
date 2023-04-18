// object types
// typescript create its own key value type pair objects
const person: { name: string; age: number; hobbies: string[] } = {
  name: "umer",
  age: 30,
  hobbies: ["sports"],
};

//tuple array-push is an exception here in tuple
const person_tuple: [string, string] = ["SDE", "25LPA"];
//XXXXXX THIS SHOULDNT WORK ACTUALLY BUT IS AN EXCEPTION XXXXXX
person_tuple.push("admin");
//XXXXXXXXXXXXXXXXXXXXXXXX

//ENUMS

console.log(person);
