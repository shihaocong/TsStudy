let str: string = "ss";
// console.log(str);

// enum Color {Red, Green, Blue}
// let c: Color = Color.Green;

// console.log(Color, c);

enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];

// console.log(colorName);

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

function error(message: string): never {
  throw new Error(message);
}

// error("error");

let someValue: number = 1111;

let strLength: number = (someValue as any).length;

interface labelledObjType {
  label: string;
  size: number;
}
function printLabel(labelledObj: labelledObjType) {
  console.log(labelledObj);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
