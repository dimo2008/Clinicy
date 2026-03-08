import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { promises as fsPromises } from 'fs';

interface User {
  id: number;
  username: string;
  password: string;
}

const usersFile = 'Files/users.txt';

export class UserService {
  static async readUsers(): Promise<User[]> {
    try {
      const data = await fsPromises.readFile(usersFile, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  static async writeUsers(users: User[]): Promise<void> {
    await fsPromises.writeFile(usersFile, JSON.stringify(users, null, 2));
  }

  static async register(username: string, password: string): Promise<string> {
    if (!username || !password) {
      throw new Error('Username and password required');
    }
    const users = await this.readUsers();
    if (users.find(u => u.username === username)) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);
    await this.writeUsers(users);
    return 'User registered';
  }

  static async login(username: string, password: string): Promise<string> {
    if (!username || !password) {
      throw new Error('Username and password required');
    }
    const users = await this.readUsers();
    const user = users.find(u => u.username === username);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return await this.authenticate(user, 'user');
    } else {
      throw new Error('Invalid credentials');
    }
  }

  static async authenticate(user: User, roleName: string): Promise<string> {
    const payload = { sub: user.id, username: user.username, role: roleName };
    const secret = process.env.JWT_SECRET || 'CHANGE_ME_TO_SECRET_IN_PROD';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
  }
}