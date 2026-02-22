import { runExamples } from "./Examples.js";

// Call the main examples function

//console.log("Hello World2");
//runExamples().catch(console.error);

const myFunc = (num: number): number => {
  return num * num;
};

const fullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};
export { myFunc, fullName };