import { ExpressExample } from "./ExpressExample.js";
import {runExamples} from "./Examples.js";
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
const app = express();
const port = 4000;


    app.listen(port, () => {
      console.log(`server started at locfffalhost:${port}`);
    });
    app.get("/api", (req, res) => {
      console.log(req);
      res.send(`Hello, world! name: ${req.query.name}`);
    });