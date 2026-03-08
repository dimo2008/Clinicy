import express from 'express';
import { promises as fsPromises } from 'fs';

const router = express.Router();

router.get('/', async (req, res) => {
  /**
   * @swagger
   * /appendfile:
   *   get:
   *     summary: Append to a file
   *     tags: [Files]
   *     parameters:
   *       - in: query
   *         name: name
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       400:
   *         description: Bad request
   */
  console.log(req);
  res.status(400);
  res.send(`Hello, world! name: ${req.query.name}`);
  const myFile = await fsPromises.open(req.query.name + ".txt", "a+");
  myFile.write(req.query.name as string);
});

export default router;