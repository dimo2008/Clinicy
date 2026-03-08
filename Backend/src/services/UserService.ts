import bcrypt from 'bcrypt';
import { promises as fsPromises } from 'fs';

interface User {
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
    users.push({ username, password: hashedPassword });
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
      return 'Login successful';
    } else {
      throw new Error('Invalid credentials');
    }
  }
}