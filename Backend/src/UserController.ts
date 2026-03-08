import express, { type Request, type Response, Router, type NextFunction } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { promises as fsPromises } from 'fs';

const router = express.Router();

const usersFile = 'users.txt';

interface User {
  username: string;
  password: string;
}


async function readUsers(): Promise<User[]> {
  try {
    const data = await fsPromises.readFile(usersFile, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeUsers(users: User[]): Promise<void> {
  await fsPromises.writeFile(usersFile, JSON.stringify(users, null, 2));
}

router.post('/register', async (req, res) => {
  /**
   * @swagger
   * /users/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User registered
   *       400:
   *         description: Bad request
   *       409:
   *         description: User already exists
   */
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password required');
  }
  const users = await readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(409).send('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  await writeUsers(users);
  res.send('User registered');
});

router.post('/login', async (req, res) => {
  /**
   * @swagger
   * /users/login:
   *   post:
   *     summary: Login a user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful
   *       400:
   *         description: Bad request
   *       401:
   *         description: Invalid credentials
   */
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password required');
  }
  const users = await readUsers();
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

export default router;