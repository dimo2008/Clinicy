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

import { promises as fsPromises, write } from "fs";

import express from "express";
const app = express();
const port = 4000;

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
app.get("/appendfile", async (req, res) => {
  console.log(req);
    res.status(400);

  res.send(`Hello, world! name: ${req.query.name}`);
  const myFile = await fsPromises.open(req.query.name + ".txt", "a+");
  myFile.write(req.query.name as string);
});
