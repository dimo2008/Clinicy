import express from 'express';
import { promises as fsPromises } from 'fs';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log(req);
  res.status(400);
  res.send(`Hello, world! name: ${req.query.name}`);
  const myFile = await fsPromises.open(req.query.name + ".txt", "a+");
  myFile.write(req.query.name as string);
});

export default router;