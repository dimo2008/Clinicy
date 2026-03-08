import express, { type Request, type Response, Router, type NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { UserService } from '../services/UserService.js';

const router = express.Router();

const usersFile = 'users.txt';

interface User {
  username: string;
  password: string;
}

function jwtAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }
  const token = authHeader.slice(7);
  try {
    const secret = process.env.JWT_SECRET || "CHANGE_ME_TO_SECRET_IN_PROD";
    const payload = jwt.verify(token, secret);
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
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
  try {
    const { username, password } = req.body;
    const message = await UserService.register(username, password);
    res.send(message);
  } catch (error) {
    const err = error as Error;
    if (err.message === 'User already exists') {
      res.status(409).send(err.message);
    } else {
      res.status(400).send(err.message);
    }
  }
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
  try {
    const { username, password } = req.body;
    const message = await UserService.login(username, password);
    res.send(message);
  } catch (error) {
    const err = error as Error;
    res.status(401).send(err.message);
  }
});

export default router;