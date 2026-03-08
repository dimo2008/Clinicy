import { ExpressExample } from "./ExpressExample.js";
import { runExamples } from "./Examples.js";
// Call the main examples function
//console.log("Hello World2");
// runExamples().catch(console.error);
// const myFunc = (num: number): number => {
//   return num * num;
// };
// const fullName = (firstName: string, lastName: string): string => {
//   return `${firstName} ${lastName}`;
// };
// export { myFunc, fullName };
import express from "express";
import FileController from './FileController.js';
import UserController from './UserController.js';
import PatientController from './PatientController.js';
const app = express();
app.use(express.json());
const port = 4000;
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
app.use('/appendfile', FileController);
app.use('/users', UserController);
app.use('/patients', PatientController);
//# sourceMappingURL=index.js.map