// object types
// typescript create its own key value type pair objects
const person: { name: string; age: number; hobbies: string[] } = {
  name: "umer",
  age: 30,
  hobbies: ["sports"],
};

//---------------------------------------------------------------------
//tuple array-push is an exception here in tuple
const person_tuple: [string, string] = ["SDE", "25LPA"];
//XXXXXX THIS SHOULDNT WORK ACTUALLY BUT IS AN EXCEPTION XXXXXX
person_tuple.push("admin");
//XXXXXXXXXXXXXXXXXXXXXXXX
console.log(person);

//---------------------------------------------------------------------
//ENUMS..kind of like const derivates...
//this below code maps LABELS to NUMBERS Ex- ADMIN=1 , READ_ONLY=7 , AUTHOR = 8
//IF EXPLICITLY SET EXAMPLE FOR LIKE READ_ONLY=7 then thje rest follows the same numbering or
//even a string
enum Role {
  ADMIN,
  READ_ONLY = 7,
  AUTHOR,
  TEST = "TESTER",
}

console.log(Role.ADMIN);
//prints: 1

//---------------------------------------------------------------------
//UNION TYPES
//work two diffrent types at once, say combinig numbers and strings
//Now | says you can EITHER send Number ORRR send a STRING
//can add as many as possible
function combine(input1: number | string, input2: number | string) {
  //This cannot be done even if its correct..EXCEPTION
  // const result = input1 + input2;

  let result: any;
  if (typeof input1 === "number" && typeof input2 === "number") {
    //EXPLICITLY TELLING ONLY NUMBERS
    result = input1 + input2;
  } else {
    //EXPLICITLY TELLING ONLY STRINGS
    result = input1.toString() + input2.toString();
  }
  return result;
}
const combineAges = combine(10, 12);
console.log(combineAges);
//prints:22
//XXXXXXXXXXX  XXXXXXXXXXXXXXXXXX
console.log(combine("mohammed", "umer"));
//prints:mohammedumer

//---------------------------------------------------------------------
//THIS is LITERAL type, Literally the same string (returnValue)
function combine2(
  input1: number | string,
  input2: number | string,
  returnValue: "as-text" | "as-number"
) {
  //This cannot be done even if its correct..EXCEPTION
  // const result = input1 + input2;

  let result: any;
  if (typeof input1 === "number" && typeof input2 === "number") {
    //EXPLICITLY TELLING ONLY NUMBERS
    result = input1 + input2;
  } else {
    //EXPLICITLY TELLING ONLY STRINGS
    result = input1.toString() + input2.toString();
  }
  if (returnValue === "as-text") {
    return result.toString();
  } else {
    return +result;
  }
}

const combineAges2 = combine2(10, 12, "as-number");
console.log(combineAges2);
//prints:22
//XXXXXXXXXXX  XXXXXXXXXXXXXXXXXX
console.log(combine2("mohammed", "umer", "as-text"));
//prints:mohammedumer

//---------------------------------------------------------------------
//ALISASES
//Give a different name to the types either in UNION or even if singular
type Combinable = number | string;
function combine3(
  input1: Combinable,
  input2: Combinable,
  returnValue: "as-text" | "as-number"
) {
  //This cannot be done even if its correct..EXCEPTION
  // const result = input1 + input2;

  let result: any;
  if (typeof input1 === "number" && typeof input2 === "number") {
    //EXPLICITLY TELLING ONLY NUMBERS
    result = input1 + input2;
  } else {
    //EXPLICITLY TELLING ONLY STRINGS
    result = input1.toString() + input2.toString();
  }
  if (returnValue === "as-text") {
    return result.toString();
  } else {
    return +result;
  }
}

const combineAges3 = combine3(10, 12, "as-number");
console.log(combineAges3);
//prints:22
//XXXXXXXXXXX  XXXXXXXXXXXXXXXXXX
console.log(combine3("mohammed", "umer", "as-text"));
//prints:mohammedumer
