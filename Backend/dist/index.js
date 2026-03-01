import { ExpressExample, runExpressExample } from "./ExpressExample.js";
import { runExamples } from "./Examples.js";
// Call the main examples function
//console.log("Hello World2");
runExamples().catch(console.error);
const myFunc = (num) => {
    return num * num;
};
const fullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
};
export { myFunc, fullName };
// const expressExample = new ExpressExample();
// runExamples().catch(console.error);
//# sourceMappingURL=index.js.map